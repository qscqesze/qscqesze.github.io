---
title: "RVQ 如何把音乐变成 Token：从 1982 年多级量化到 MiniMax Music 3"
date: 2026-08-14 10:30:00 +0800
permalink: /posts/rvq-minimax-music3/
lang: zh-CN
translate: false
excerpt: "从向量量化、残差级联和 VQ-VAE 的可微训练讲起，结合 SoundStream、EnCodec、DAC 的论文数据，逐行拆解 MiniMax Music 3 如何用一层语义码、七层声学码、两级语言模型与连续隐藏状态生成长音乐。"
categories:
  - 人工智能
tags:
  - RVQ
  - MiniMax Music 3
  - 音乐生成
  - 神经音频编解码器
  - 向量量化
  - Flow Matching
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/rvq-minimax-music3/hero.svg
---

<figure class="technical-figure">
  <img src="/images/rvq-minimax-music3/hero.svg" alt="MiniMax Music 3 中八层 RVQ、Global LLM、Local LLM 与 Flow Matching 的关系图" loading="eager">
  <figcaption>MiniMax Music 3 没有把 RVQ 仅仅当作压缩器：它用 RVQ 组织音乐语言、分配两级模型的计算，再把连续隐藏状态交给 Flow Matching 合成波形。本文全部结构图均依据论文、模型卡与公开代码原创重绘。</figcaption>
</figure>

如果把五分钟、44.1 kHz、双声道音乐直接交给语言模型，它面对的是每秒 88,200 个采样值。即使把每个采样值粗暴看成一个 token，五分钟也有 2,646 万步。Transformer 不可能用这种方式建模完整歌曲。

MiniMax Music 3 选择了另一条路线：先把音乐压成每秒 25 帧，每帧再表示成 8 个离散编号。第一层有 16,384 个可能值，负责主要音乐语义和结构；后七层各有 1,024 个可能值，逐层补足残余声学信息。8B Global LLM 只沿时间轴预测第一层，约 0.6B 的 Local LLM 在每一帧内部预测后七层。最后，系统不是把八个编号直接送进传统 codec decoder，而是收集预测这些编号时的连续隐藏状态，用 Flow Matching 和 Flow-VAE 合成波形。

这套设计的核心就是 RVQ，Residual Vector Quantization，残差向量量化。

> **本文的核心判断：**在 MiniMax Music 3 中，RVQ 同时是信息瓶颈、音乐 token 词表、粗到细监督、Global/Local 两级模型的分工协议，以及离散规划通向连续音频合成的桥梁。它不是最终音质的唯一来源，却决定了整个系统“怎样思考一首歌”。

<div class="article-brief" markdown="1">
**读完本文，你应该能够回答：**

- 普通 VQ、RVQ、VQ-VAE 和 neural audio codec 分别是什么？
- RVQ 为什么不是简单地并排使用多个码本？
- 残差量化是谁发明的，SoundStream 又真正新增了什么？
- VQ 的最近邻选择不可微，神经网络怎样训练码本？
- SoundStream 论文中“6 kbps、75 帧/秒、80 bit/帧、8×1024 码本”是怎样算出来的？
- MiniMax Music 3 的 8 层 RVQ 分别多大，理论索引率是多少？
- Global LLM 与 RVQ Depth Decoder 如何逐帧、逐层生成 token？
- 为什么 Music 3 生成了 RVQ token，却不直接用离散 token 解码波形？
- RVQ 对长程结构、音质、速度与可控性分别起什么作用？
</div>

<nav class="article-toc" markdown="1">
**本文目录**

* 目录
{:toc}
</nav>

## 一、先把结论讲清楚：Music 3 的 RVQ 有两条输出路径

理解 MiniMax Music 3 最容易犯的错误，是看到 `RVQDepthDecoder` 这个名字，就把它理解成“负责把 RVQ token 解码成音乐波形的 decoder”。实际上，它解码的是一帧内部的 **RVQ 深度序列**，不是波形。

Music 3 中存在两条同时运行的路径。

第一条是离散 token 路径：

```text
歌词与音乐描述
    ↓
Global LLM 生成当前帧第一层语义码 c₀
    ↓
Local LLM 生成后七层残差码 c₁…c₇
    ↓
八层 token embedding 相加并反馈给 Global LLM
    ↓
继续生成下一帧
```

这条路径负责自回归决策：当前唱什么、段落怎样推进、这一帧应选择哪些离散声学类别。

第二条是连续隐藏状态路径：

```text
Global LLM 的隐藏状态 h₀
+ Local LLM 七次预测的隐藏状态 h₁…h₇
    ↓
学习式融合与时间重采样
    ↓
2.4B Flow Matching Transformer
    ↓
Flow-VAE latent
    ↓
DAC 风格神经声码器
    ↓
双声道音乐波形
```

这条路径负责连续合成。它保留了离散编号不能完整表达的发音、音色、纹理和连续变化。

因此更准确的说法不是“Music 3 用 RVQ codec 直接解码音乐”，而是：

> RVQ 为自回归音乐生成建立离散的粗到细决策空间；真正的波形渲染使用生成这些决策时留下的连续神经网络状态。

后文先从 VQ 和 RVQ 的数学开始，再回到这两条路径。

## 二、普通向量量化：把连续向量替换成一个整数编号

### 1. 为什么音频特征需要离散化

神经音频编码器会把一段波形变成较低频率的连续特征。假设某一帧得到：

$$
z\in\mathbb R^D.
$$

这个向量可能有数百维，每一维都是浮点数。它适合卷积网络或连续生成模型，却不适合直接作为语言模型词表中的类别。向量量化准备一个含有 $K$ 个向量的码本：

$$
\mathcal C=\{e_1,e_2,\ldots,e_K\},\qquad e_i\in\mathbb R^D.
$$

编码时寻找距离 $z$ 最近的码字：

$$
k=\arg\min_{i\in\{1,\ldots,K\}}\|z-e_i\|_2^2.
$$

系统不再保存 $D$ 个浮点数，只保存整数 $k$。解码时查表得到：

$$
\hat z=e_k.
$$

如果每个码字出现概率接近，编号大约需要 $\log_2K$ bit。一个有 1,024 个条目的码本只需 10 bit，一个有 16,384 个条目的码本只需 14 bit。

这与文字 token 很相似：词表保存 embedding，文本序列只保存词表索引。不同之处在于，文字词表中的 token 由分词规则产生，音频 VQ token 则由最近邻量化和端到端训练产生。

### 2. 单个大码本为什么会爆炸

假设希望每帧携带 80 bit 信息，单层 VQ 就需要：

$$
K=2^{80}
$$

个码字。这不仅无法存储，每一帧进行最近邻搜索也不可行。

容易产生一个误解：把码字维度增大是否能解决问题？不能。维度决定每个码字的形状，码字数量决定能表示多少种离散选择。若目标是 80 bit 的离散容量，单一码本仍需要 $2^{80}$ 个入口。

RVQ 的出发点正是：**不要让一个码本一次完成 80 bit 的决定，而让多个小码本依次修正误差。**

## 三、RVQ 的数学：后一个码本只量化前一个码本没做好的部分

令原始输入的初始残差为：

$$
r_0=z.
$$

第 $m$ 层有自己的码本 $\mathcal C_m$。它从当前残差中寻找最近码字：

$$
k_m=\arg\min_j\|r_{m-1}-e_j^{(m)}\|_2^2,
$$

$$
q_m=e_{k_m}^{(m)}.
$$

随后减去这一层已经解释的部分：

$$
r_m=r_{m-1}-q_m.
$$

经过 $M$ 层后，重建向量是各层码字之和：

$$
\hat z=\sum_{m=1}^{M}q_m,
$$

最终误差是：

$$
r_M=z-\hat z.
$$

伪代码非常短：

```python
residual = z
quantized = 0
indices = []

for codebook in codebooks:
    index = nearest_neighbor(residual, codebook)
    code = codebook[index]
    indices.append(index)
    quantized += code
    residual -= code
```

真正重要的是 `residual -= code`。如果删除它，让八个码本都独立量化原始向量，那就不再是经典 RVQ，而更接近并行的多码本/加性量化方案。

<figure class="technical-figure">
  <img src="/images/rvq-minimax-music3/rvq-residual.svg" alt="RVQ 使用多个码本逐层量化剩余误差，残差范数逐步下降" loading="lazy">
  <figcaption>每一层都只负责前面没有表达好的部分。第一层通常承载最大能量和最稳定结构，后层逐渐转向细节；但具体“哪层对应什么”仍由数据、损失与训练策略共同决定。</figcaption>
</figure>

### 1. 为什么存储从指数爆炸变成线性增加

假设总预算 80 bit，使用 8 个大小为 1,024 的码本。每层输出 10 bit，八层正好 80 bit。码本只需要存储：

$$
8\times1024=8192
$$

个向量，却能形成最多：

$$
1024^8=2^{80}
$$

种索引组合。不同组合得到不同的码字和。实际可区分的向量数可能因为码字和碰撞而小于这个上限，但复杂度仍然从单层的指数级大码本，变成多个小码本开销之和。

### 2. 为什么它天然具有“粗到细”结构

第一层直接面对 $z$，有机会解释输入中最主要、方差最大的成分。第二层只能看到 $z-q_1$；如果第一层已经解释了整体轮廓，第二层就更倾向于修正较小偏差。层数增加时，重建通常逐步改善。

但这里必须避免过度拟人化：经典 RVQ 不会自动保证“第一层是旋律，第二层是人声，第三层是鼓”。它保证的是残差依赖关系，不保证人类可解释的声部分解。MiniMax Music 3 把第一层明确训练为 semantic codebook，是额外的训练设计，不是 RVQ 数学本身必然产生的标签。

## 四、这项技术是谁发明的：不要把 1982、2017 和 2021 混成一件事

RVQ 没有一个可以简单归给单篇现代深度学习论文的“发明时刻”。更准确的技术谱系包含四步。

<figure class="technical-figure">
  <img src="/images/rvq-minimax-music3/rvq-history.svg" alt="从 1980 年 LBG 算法到 2026 年 MiniMax Music 3 的 RVQ 技术时间线" loading="lazy">
  <figcaption>SoundStream 让 neural RVQ 在端到端音频 codec 中成为主流，但残差级联量化的经典形式至少可以追溯到 1982 年的 multiple-stage vector quantization。</figcaption>
</figure>

### 1. 1980：LBG 解决“怎样从数据中学习码本”

Yoseph Linde、Andrés Buzo 与 Robert M. Gray 在论文 [An Algorithm for Vector Quantizer Design](https://doi.org/10.1109/TCOM.1980.1094577) 中系统化了后来称为 LBG 的码本训练算法。它交替进行两步：

1. 按最近邻规则把训练向量分给当前码字；
2. 用每个分区的质心更新码字。

这与 Lloyd 算法和 k-means 的交替优化高度相关。它解决的是普通 VQ 的码本设计，不等于已经给出今天 neural RVQ 的完整系统。

### 2. 1982：Juang 与 Gray 提出用于语音编码的多级 VQ

Biing-Hwang Juang 与 Augustine H. Gray Jr. 在 ICASSP 1982 的 [Multiple Stage Vector Quantization for Speech Coding](https://doi.org/10.1109/ICASSP.1982.1171604) 中提出多级向量量化。论文摘要明确强调：原始单级 VQ 的存储和计算随 bit rate 指数增长，而多级设计把总体要求变成各级要求之和，并可以方便地通过增加级数提高 bit rate、降低失真。

早期文献常称它为 MSVQ，Multiple-Stage Vector Quantization；现代深度学习文献更常称 Residual Vector Quantization。二者在“逐级量化剩余误差”这一核心结构上是一脉相承的。

### 3. 2017：VQ-VAE 解决“离散最近邻怎样端到端反传”

Aaron van den Oord、Oriol Vinyals 与 Koray Kavukcuoglu 在 [Neural Discrete Representation Learning](https://papers.nips.cc/paper/2017/hash/7a98af17e63a0ac09ce2e96d03992fbc-Abstract.html) 中提出 VQ-VAE。其前向过程使用真正的最近邻硬选择，但最近邻的 `argmin` 几乎处处没有可用梯度。

论文采用 Straight-Through Estimator：

- 前向传播把编码器输出 $z_e(x)$ 替换为最近码字 $e_k$；
- 反向传播把 decoder 传来的梯度近似原样复制给 encoder 输出。

经典 VQ-VAE 目标可写成：

$$
\mathcal L=
-\log p(x\mid z_q(x))
+\|\operatorname{sg}[z_e(x)]-e_k\|_2^2
+\beta\|z_e(x)-\operatorname{sg}[e_k]\|_2^2.
$$

其中 $\operatorname{sg}$ 是 stop-gradient：

- 第一项是重建损失，训练 encoder/decoder；
- 第二项把码字拉向 encoder 输出，训练码本；
- 第三项是 commitment loss，防止 encoder 输出无约束漂移，迫使它“承诺”靠近所选码字。

VQ-VAE 原论文还指出，码本也可以用 encoder 输出的指数移动平均更新。后来的神经 codec 在具体实现上会使用 EMA、梯度更新、码字重启等不同组合，但“硬离散前向 + 近似梯度”的基本难题没有消失。

### 4. 2021：SoundStream 把可学习 RVQ 做成可变码率端到端音频 codec

Google 的 [SoundStream](https://arxiv.org/abs/2107.03312) 使用因果卷积 encoder、RVQ、因果卷积 decoder，并通过波形和 STFT 判别器提供重建与对抗监督。论文报告它在 24 kHz 音频上覆盖 3–18 kbps，并可在手机单 CPU 线程实时运行。

SoundStream 论文中有一个非常具体的 6 kbps 算例：

- 24 kHz 音频；
- encoder 总下采样倍数 320；
- 每秒得到 $24000/320=75$ 帧；
- 6,000 bit/s 除以 75 帧/s，得到 80 bit/帧；
- 单层 VQ 需要 $2^{80}$ 个码字；
- 使用 8 层 RVQ，每层分到 10 bit，因此每层只需 $2^{10}=1024$ 个码字。

SoundStream 真正重要的新增工程之一是 Quantizer Dropout。训练时随机抽取：

$$
n_q\sim\operatorname{Uniform}\{1,\ldots,N_q\},
$$

只保留前 $n_q$ 层量化器。decoder 因而不能假设永远收到全部层，必须学会在不同层数下重建。推理时减少 RVQ 层数就降低 bit rate，增加层数就提高质量，同一个模型可以覆盖多种码率。

所以准确的历史结论是：**SoundStream 没有发明残差级联思想，但把它发展成端到端可学习、感知质量优化、支持 quantizer dropout 的现代神经音频 RVQ。**

## 五、SoundStream 之后：RVQ 为什么变成音乐生成的通用接口

### 1. EnCodec：码率、感知质量与熵编码

Meta 的 [High Fidelity Neural Audio Compression](https://arxiv.org/abs/2210.13438) 延续 encoder—RVQ—decoder 结构。论文训练 24 kHz 单声道模型支持 1.5、3、6、12、24 kbps，48 kHz 立体声模型支持 3、6、12、24 kbps，目标码率同样通过保留不同数量的 RVQ codebook 实现。

EnCodec 还在 RVQ token 上训练小型 Transformer 做 entropy coding。论文报告额外语言模型可把带宽再降低约 25%–40%；例如表 1 中 3 kbps 配置的平均熵编码带宽约为 1.9 kbps。这说明 RVQ 索引不是均匀随机的：不同层、不同时间之间仍有可预测冗余。

这里可以看到 codec 与生成模型的连接：

- 对通信系统，预测 token 分布可以减少实际编码 bit 数；
- 对生成系统，预测 token 分布就可以从条件中创造新的音频序列。

同一个离散表示，既可以被压缩，也可以被语言模型生成。

### 2. DAC：把 44.1 kHz 音频压成适合生成模型使用的 token

Descript Audio Codec 论文 [High-Fidelity Audio Compression with Improved RVQGAN](https://arxiv.org/abs/2306.06546) 面向 44.1 kHz 音频，报告约 90 倍压缩、8 kbps token 表示，并同时覆盖语音、环境声与音乐。DAC 的意义不只在压缩指标，还在于它提供了高采样率、通用、可开源使用的离散音频表示，后续很多音频生成系统都借鉴了其卷积 decoder、Snake 激活和 RVQGAN 训练经验。

但从 SoundStream、EnCodec 或 DAC 得到的经验不能直接当成 MiniMax Music 3 的训练细节。Music 3 模型卡没有公开完整音频 tokenizer 结构、全部损失、码本更新方式和训练数据配方。下文只把官方模型卡和开放推理代码能够确认的事实写成 Music 3 的确定实现。

## 六、MiniMax Music 3 的八层 RVQ：一层语义，七层声学

根据 [MiniMax Music 3 官方模型卡](https://huggingface.co/MiniMaxAI/MiniMax-Music3)，训练 tokenizer 使用 8 层 RVQ：

| 层 | 码本大小 | 每帧索引位数 | 官方描述 | 推理时由谁预测 |
|---|---:|---:|---|---|
| $c_0$ | 16,384 | 14 bit | 核心音乐语义与结构 | 8B Global LLM |
| $c_1$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |
| $c_2$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |
| $c_3$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |
| $c_4$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |
| $c_5$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |
| $c_6$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |
| $c_7$ | 1,024 | 10 bit | 残余声学信息 | Local LLM |

官方描述的训练顺序是：先优化第一层 semantic codebook，再联合训练全部八层。这个顺序很重要，因为它主动要求第一层在单独使用时保留有意义的音乐结构，而不是期待普通 RVQ 自发产生可用的语义层。

### 1. 一帧到底有多少 bit

第一层：

$$
\log_2 16384=14\ \text{bit}.
$$

后七层：

$$
7\log_2 1024=7\times10=70\ \text{bit}.
$$

所以完整一帧是：

$$
14+70=84\ \text{bit/frame}.
$$

开放实现的自回归帧率是 25 Hz，因此离散索引的理论固定长度码率是：

$$
84\times25=2100\ \text{bit/s}=2.1\ \text{kbps}.
$$

一帧八层最多形成：

$$
16384\times1024^7=2^{84}
$$

种索引组合，而码本条目总数只有：

$$
16384+7\times1024=23552.
$$

这组数字非常直观地体现 RVQ 的组合效率。

不过，2.1 kbps **不是最终 WAV 码率，也不是可直接传输的 Music 3 文件格式**。它没有计入熵编码、协议、结束标记，更没有计入 Music 3 合成时使用的连续隐藏状态。它只是每帧八个离散类别在固定长度编码下的信息预算。

### 2. 为什么第一层使用更大的 16,384 码本

模型卡没有给出专门消融，因此不能断言“16,384 一定是最优值”。从结构上可以作出的合理解释是：第一层承担 Global LLM 的主要音乐决策，需要覆盖比普通 1,024 类更丰富的语义状态；后七层只需逐步修正残差，每层使用较小码本。

这里的“语义”仍然是 learned latent semantics。编号 527 不会稳定对应“C 大调”、编号 913 也不会稳定对应“女声进入”。第一层只是在统计上更集中地承载对长程结构有用的信息，不是可读乐谱。

## 七、开放代码逐步拆解：一帧 RVQ token 是怎样生成的

<figure class="technical-figure">
  <img src="/images/rvq-minimax-music3/music3-rvq-architecture.svg" alt="MiniMax Music 3 从歌词、两级自回归 RVQ 到 Flow Matching 和波形的完整公开推理数据流" loading="lazy">
  <figcaption>蓝色是离散 RVQ 决策与跨帧反馈；紫色是连续隐藏状态旁路。两条路径在同一次自回归生成中产生，承担不同职责。</figcaption>
</figure>

### 1. Prompt 被组成 conditional / unconditional 两行

Diffusers 参考实现把音乐描述、歌词结构标签和特殊 token 组合成模型训练时约定的 prompt。随后复制成两行：

- conditional 行保留真实音乐条件；
- unconditional 行把大部分条件替换为 audio CFG token。

自回归 Global/Local 两级采样都使用 classifier-free guidance。当前参考实现的 AR CFG scale 是 1.5，语义和残差采样均限制在 top-k 50。对应常量和采样循环可在 [Diffusers `encoders.py`](https://github.com/huggingface/diffusers/blob/9cdd65902a576493acea190d6bc115afb41d4709/src/diffusers/modular_pipelines/minimax_music3/encoders.py) 中核对。

### 2. Global LLM 每帧只采样第一层 $c_0$

Global LLM 由 Qwen3-8B 初始化。模型卡的表述是：先把 embedding 和输出层适配到 semantic music token，再与 Local LLM 联合训练全部 RVQ codebook。

每个时间步，Global LLM 输出当前隐藏状态 $h_t^G$，language-model head 只保留：

- 16,384 个 semantic audio token；
- 一个音频结束 token。

经过 CFG 与 top-k 采样后得到当前帧 $c_{t,0}$。如果采到结束 token，歌曲提前结束；因此用户给出的 `audio_duration` 或 `max_new_tokens` 是上限，不保证一定生成到该长度。

为什么大模型只预测第一层？因为全局时间建模是最昂贵的部分。25 帧/秒、5 分钟约有：

$$
25\times300=7500
$$

个全局时间步。如果把八层 codebook 全部展平成同一条 8B Transformer 序列，token 数会接近八倍，普通全注意力的理论交互数还会随序列长度平方增加。Music 3 把帧内七层交给较小模型，使大模型的长上下文集中于每帧最重要的语义决策。

### 3. RVQ Depth Decoder 在帧内采样 $c_1$ 到 $c_7$

开放配置中的 `MiniMaxMusic3RVQDepthDecoder` 具有：

- 4 个 Transformer block；
- hidden size 4096；
- intermediate size 6144；
- 16 个 attention head；
- 8 个 codebook，其中需要预测 7 个 residual codebook；
- 7 个独立输出 head，每个输出 1,024 类。

其输入序列从两项开始：

$$
[\operatorname{Proj}(h_t^G),\ \operatorname{Proj}(\operatorname{Emb}(c_{t,0}))].
$$

Local LLM 运行因果 attention，取最后位置的 hidden state，经过第一个 audio head 得到 $c_{t,1}$。然后把 $c_{t,1}$ 的 embedding 追加到输入序列，再预测 $c_{t,2}$，依次进行到 $c_{t,7}$。

于是联合分布被分解为：

$$
p(c_{t,0:7}\mid\text{past},y)
=p_G(c_{t,0}\mid\text{past},y)
\prod_{m=1}^{7}
p_L(c_{t,m}\mid h_t^G,c_{t,<m},y),
$$

其中 $y$ 是歌词与音乐描述，`past` 是此前所有完整音乐帧。

这不是经典最近邻 RVQ 编码过程，因为推理时没有输入音频向量可供量化。训练 tokenizer 时，$c_0\ldots c_7$ 来自对真实音频的 RVQ 编码；生成时，两个语言模型学习并采样这些 code 的条件分布。

### 4. 完整八层怎样反馈给下一帧

一帧八个 token 生成后，参考代码：

1. 用 Global LLM 的 token embedding 查找 $c_0$；
2. 用 Local LLM 的分层 embedding 查找 $c_1\ldots c_7$；
3. 把八个 embedding 相加；
4. 乘以 $8^{-1/2}$ 做尺度归一化；
5. 把得到的一个帧 embedding 输入 Global LLM，继续预测下一帧。

可写成：

$$
u_t=\frac{1}{\sqrt 8}
\left(
E_0(c_{t,0})+\sum_{m=1}^{7}E_m(c_{t,m})
\right).
$$

这一步很像 RVQ 的“码字求和重建”，但要区分两个空间：这里相加的是供语言模型反馈使用的 **token embedding**，不应直接等同于训练期音频 tokenizer 中用于重建连续声学 latent 的原始码本向量。

### 5. 两个自回归方向形成二维生成

Music 3 实际上把原来一个 $T\times8$ 的 token 网格拆成两个方向：

| 方向 | 序列 | 模型 | 主要任务 |
|---|---|---|---|
| 时间方向 | $t=1,2,\ldots,T$ | 8B Global LLM | 长程歌曲结构与第一层语义码 |
| 深度方向 | $m=1,2,\ldots,7$ | 0.6B Local LLM | 当前帧内部的残差声学码 |

这类结构有时被概括为 Global/Local、Temporal/Depth 或 Dual-AR。其优势不只是少算几个 token，而是把“跨几分钟的依赖”和“同一 40 ms 帧内部的声学修正”交给不同容量、不同上下文长度的网络。

## 八、最关键的一步：为什么最终不用离散 tokenizer decoder 出声

如果把 RVQ 只用于传统 codec，重建上限由八个离散码字决定。量化过程有意丢失信息：同一 Voronoi 分区里的许多连续向量都会映射到同一个编号。后端 decoder 可以凭数据先验补细节，但无法知道被量化抹掉的所有差异。

MiniMax Music 3 采取混合方案。每生成一帧，它不仅保存八个编号，还保存：

$$
h_t^G,h_{t,1}^L,h_{t,2}^L,\ldots,h_{t,7}^L.
$$

每个 hidden state 是 4096 维，拼接后每帧是：

$$
8\times4096=32768
$$

维。公开 `MiniMaxMusic3ConditionEncoder` 将其 reshape 为八层，学习 softmax 权重：

$$
w_m=\frac{\exp(\alpha_m)}{\sum_j\exp(\alpha_j)},
$$

再进行加权融合：

$$
\bar h_t=s\sum_{m=0}^{7}w_mh_{t,m}.
$$

随后用一维卷积把 4096 维投影到 2048 维，并从 25 Hz 重采样到 Flow-VAE latent 的时间分辨率。由公开配置：

$$
\frac{44100}{512}\approx86.13\ \text{latent frames/s}.
$$

这部分可以在 [`condition_embedder_minimax_music3.py`](https://github.com/huggingface/diffusers/blob/9cdd65902a576493acea190d6bc115afb41d4709/src/diffusers/models/condition_embedders/condition_embedder_minimax_music3.py) 中直接验证。

### 1. 离散 code 与连续 hidden state 分别保留什么

可以把二者的职责理解为：

| 表示 | 优点 | 局限 | 在 Music 3 中的用途 |
|---|---|---|---|
| RVQ 离散编号 | 类别有限、便于交叉熵训练、适合 AR 采样、结构稳定 | 量化有损，细微连续差异会消失 | 决定生成路径、反馈下一帧、提供分层监督 |
| LLM 连续隐藏状态 | 信息密度高，可保留“为什么选择这个 token”的上下文 | 不能直接作为离散语言词表采样 | 条件化 Flow Matching，控制最终声学合成 |

一个 token 只表示“选了哪一类”，hidden state 则还包含在歌词、段落、此前音乐和当前深度上下文下作出这个选择的连续证据。Music 3 让两者各司其职，而不是要求一个离散 codec 同时解决长程规划和高保真重建。

### 2. Flow Matching 怎样接住这些状态

融合条件驱动一个约 2.4B 参数、36 层的 1D Transformer，对 128 通道 Flow-VAE latent 执行 flow matching。当前 Diffusers 默认每个窗口使用 30 个 Euler 调度步，CFG scale 为 1.7。

开放实现不是一次性生成整首歌的全部 latent，而是：

- 200 个自回归帧一个窗口，即约 8 秒；
- hop 为 100 帧，即相邻窗口错开约 4 秒；
- 相邻窗口共享一段历史 condition 与 latent；
- 在每次 flow step 中，把重叠区域向前一窗口的 latent 约束；
- vocoder 解码后裁掉重叠边缘，再拼成完整波形。

分块、重叠 latent 与裁剪常量可在 [`denoise.py`](https://github.com/huggingface/diffusers/blob/9cdd65902a576493acea190d6bc115afb41d4709/src/diffusers/modular_pipelines/minimax_music3/denoise.py) 和 [`decoders.py`](https://github.com/huggingface/diffusers/blob/9cdd65902a576493acea190d6bc115afb41d4709/src/diffusers/modular_pipelines/minimax_music3/decoders.py) 中核对。

Diffusers vocoder 的原生采样率配置是 44.1 kHz 双声道；官方参考服务另外重采样到模型卡所说的 32 kHz 输出。这解释了模型卡与 Diffusers 配置表面上的采样率差异。

## 九、RVQ 在 Music 3 中具体起到的七个作用

### 1. 把高采样率波形降为 LLM 能处理的序列

44.1 kHz stereo 是每秒 88,200 个标量采样，而 Global LLM 只需处理 25 个音乐帧。RVQ 让音乐从连续信号问题转化为有限词表上的序列建模问题。

注意这不是简单的 $88200/25$ 倍无损压缩。RVQ token 是学习到的有损潜表示，后端生成模型还会根据音乐先验重新合成细节。

### 2. 建立第一层语义骨架

Global LLM 只预测 $c_0$，使昂贵的长程模型把容量集中在主要音乐状态。段落是否已经进入副歌、歌手身份是否持续、主题动机是否回归等长时依赖，首先需要在这一全局路径上保持一致。

不过不能把五分钟一致性全部归功于 RVQ。Global LLM 的上下文能力、训练数据、歌词结构标签、反馈 embedding 和后端分块连续合成都参与其中。RVQ 提供的是适合建模的层次，不是单独的质量保证。

### 3. 让后七层做逐级声学修正

Local LLM 不需要重新决定整首歌，只在 $h_t^G$ 和 $c_0$ 给定后补齐当前帧。其任务空间更短、更局部，适合用小模型多次调用。

第一层出错会改变当前帧的主要内容，后层很难完全救回；后层出错通常更像声学纹理或局部细节偏差。这种不对称性正是 residual hierarchy 带来的粗到细性质。

### 4. 降低大模型长序列计算成本

把八层全部放进 8B 模型的时间序列，会显著增加 KV cache、attention 和采样次数。Music 3 保持 Global LLM 每帧一个时间位置，把七次帧内计算放在 0.6B Local LLM 中，是一种用小模型换取长程生成效率的结构性设计。

### 5. 提供密集、分层的训练目标

每个真实音频帧不只提供一个标签，而是提供八层条件标签。Global LLM 学第一层，Local LLM 学条件分解：

$$
c_1\to c_2\to\cdots\to c_7.
$$

后层的监督明确建立在前层结果上，模型不必在一个巨大联合 softmax 中同时选择 $2^{84}$ 种组合。

### 6. 形成两个模型之间稳定的协议

$c_0$ 是 Global LLM 给 Local LLM 的离散决策，完整八层 embedding 又是 Local LLM 返回 Global LLM 的帧摘要。这使两级模型可以联合训练，却保持清晰分工。

### 7. 为连续生成提供语义对齐的条件轨迹

Flow Matching 不直接阅读歌词，也不独立规划副歌。它主要沿已经生成的每帧 LLM hidden state 合成 latent。因此 RVQ 自回归过程决定了连续合成模块沿时间应该渲染什么内容；hidden-state 旁路则避免最终音质被 84 bit 离散索引完全卡死。

## 十、与“传统 RVQ 音频 codec”相比，Music 3 改变了什么

| 问题 | SoundStream / EnCodec / DAC 式 codec | MiniMax Music 3 开放推理路径 |
|---|---|---|
| 输入 | 已存在的真实音频 | 歌词与音乐描述 |
| RVQ 编号从哪里来 | encoder latent 最近邻量化 | Global/Local LLM 条件采样 |
| RVQ 的主要目标 | 压缩并重建输入音频 | 组织生成空间和两级 AR 任务 |
| 后端主要读取什么 | 量化码字之和 | 八层 LLM 连续隐藏状态 |
| 波形怎样产生 | codec decoder 直接解码 | Flow Matching → Flow-VAE → vocoder |
| 码率是否是产品输出码率 | 通常是 | 2.1 kbps 只是内部索引理论值 |
| 是否必须有 audio encoder | 编码时必须 | 文生音乐推理时不需要 |

这张表也解释了为什么“把 Music 3 的 RVQ token 导出后直接用普通 DAC decoder 解码”在概念上不成立：tokenizer、码本空间、token 语义和后端条件接口都需要匹配，不能因为都叫 RVQ 就互换。

## 十一、几个最容易被写错的技术点

### 1. “SoundStream 发明了 RVQ”——不准确

残差/多级向量量化可追溯到 1982 年甚至更早的量化研究。SoundStream 的贡献是现代可学习音频 codec 设计、端到端感知训练和 quantizer dropout 等组合。

### 2. “第一层就是旋律，第二层就是人声”——没有依据

第一层被描述为核心音乐语义和结构，后七层为 residual acoustic information，但这不意味着每层可一一对应人类声部。RVQ 的层是误差层，不是 stem 分轨。

### 3. “后层总会让声音更好”——通常成立，但不是无条件保证

若模型训练良好、码本利用充分，增加 residual level 通常降低量化误差；但码本坍塌、分布外输入、预测错误或后端没有在相应层数上训练好，都可能让额外层收益很小甚至带来伪影。

### 4. “2.1 kbps 就能传输最终 Music 3 歌曲”——不成立

2.1 kbps 是根据码本大小和 25 Hz 算出的固定长度索引预算。Music 3 的最终合成依赖连续 hidden state，并未把这套内部表示定义成独立可传输、可由另一端仅凭 token 重建的标准 codec bitstream。

### 5. “RVQ Depth Decoder 是声码器”——错误

它是帧内 Local LLM。真正的声学后端是 condition encoder、2.4B flow transformer、Flow-VAE latent 和 DAC 风格 vocoder。

### 6. “所有训练细节都已开源”——目前不能这样说

当前仓库公开了模型权重、配置、推理组件和参考脚本，并在模型卡中概述 tokenizer 训练顺序；但没有给出一篇完整 Music 3 技术论文，也未公开训练数据组成、完整 tokenizer 架构与全部损失消融。本文因此把 Music 3 的结论限定在模型卡和开放代码能够验证的范围内。

另外，仓库采用 [MiniMax-Music3 Community License](https://huggingface.co/MiniMaxAI/MiniMax-Music3/blob/main/LICENSE)，并非无条件的 OSI 标准开源许可；本文为了行文方便使用“开放模型/开放实现”这一表述。

## 十二、如果重新设计一套 RVQ 音乐生成系统，需要做哪些决定

理解 Music 3 后，可以把 RVQ 系统的设计空间拆成九个问题：

1. **帧率是多少？**帧率越高，瞬态越细，但语言模型序列越长。
2. **每层码本多大？**大码本提高单层容量，也增加分类难度和码本利用问题。
3. **一共有多少层？**层数决定总 bit budget、Local AR 次数和声学精度。
4. **第一层怎样变得更语义化？**单独预训练、语义蒸馏、辅助任务和训练顺序都可能影响结果。
5. **码本怎样更新？**梯度、EMA、码字重启和归一化会改变稳定性。
6. **是否使用 quantizer dropout？**它能提供可变码率，却也改变各层承担的信息量。
7. **多层 token 怎样生成？**展平、delay pattern、并行 masked prediction 或 depth autoregression 各有取舍。
8. **最终只用 token，还是保留 continuous bypass？**前者接口更干净，后者可能保留更高音质。
9. **长音频怎样分块？**重叠条件、latent carry、cross-fade 和状态缓存决定接缝质量。

MiniMax Music 3 的答案是：25 Hz、1 个 16,384 语义码本、7 个 1,024 声学码本、Global/Depth 双自回归、连续 hidden-state bypass、Flow Matching 分块合成。这个组合不一定适用于所有音频任务，但它非常明确地服务于“带歌词、长结构、高保真完整歌曲”这一目标。

## 十三、总结：RVQ 负责把“音乐”变成一种可计算的语言

RVQ 最初是一个压缩思想：用第一层近似向量，再让后续层逐级量化剩余误差，以多个小码本替代不可实现的巨大码本。VQ-VAE 让这种离散瓶颈能够进入端到端神经网络；SoundStream、EnCodec 与 DAC 证明它可以在低 bit rate 下重建高质量音频，也可以把声音转换成适合 Transformer 预测的 token。

MiniMax Music 3 又向前走了一步：

- 它把八层 RVQ 明确分成一层 semantic 与七层 acoustic residual；
- 用 8B Global LLM 沿时间生成语义骨架；
- 用约 0.6B Local LLM 在每帧内部补全七层残差；
- 用完整八层 embedding 反馈下一帧；
- 同时保留八次预测的连续 hidden state；
- 再用 Flow Matching 与 Flow-VAE 完成高保真波形合成。

所以，RVQ 在 Music 3 中既不是简单压缩器，也不是最终声码器。它更像一套音乐生成的内部语法：第一层先决定大意，后七层逐句修饰；Global LLM 管一首歌跨分钟的叙事，Local LLM 管 40 ms 内部的声学细节，而连续生成后端负责把这些决定演奏出来。

一句话概括：

> **RVQ 让 Music 3 能先用离散 token“写歌”，再用连续 hidden state“演奏和制作”这首歌。**

## 参考论文与实现

1. Y. Linde, A. Buzo, R. M. Gray. [An Algorithm for Vector Quantizer Design](https://doi.org/10.1109/TCOM.1980.1094577). *IEEE Transactions on Communications*, 1980.
2. B.-H. Juang, A. H. Gray Jr. [Multiple Stage Vector Quantization for Speech Coding](https://doi.org/10.1109/ICASSP.1982.1171604). *ICASSP*, 1982, pp. 597–600.
3. A. van den Oord, O. Vinyals, K. Kavukcuoglu. [Neural Discrete Representation Learning](https://arxiv.org/abs/1711.00937). *NeurIPS*, 2017.
4. N. Zeghidour, A. Luebs, A. Omran, J. Skoglund, M. Tagliasacchi. [SoundStream: An End-to-End Neural Audio Codec](https://arxiv.org/abs/2107.03312). *IEEE/ACM TASLP*, 2021/2022.
5. A. Défossez, J. Copet, G. Synnaeve, Y. Adi. [High Fidelity Neural Audio Compression](https://arxiv.org/abs/2210.13438). 2022.
6. R. Kumar, P. Seetharaman, A. Luebs, I. Kumar, K. Kumar. [High-Fidelity Audio Compression with Improved RVQGAN](https://arxiv.org/abs/2306.06546). *NeurIPS*, 2023.
7. MiniMax Team. [MiniMax Music 3 Model Card](https://huggingface.co/MiniMaxAI/MiniMax-Music3), 2026.
8. Hugging Face Diffusers. [MiniMax Music 3 integration, PR #14456](https://github.com/huggingface/diffusers/pull/14456), 2026.
