---
title: "语音 AI 的三年跃迁：从声波、Codec Token 到全双工语音大模型"
date: 2026-08-06 20:00:00 +0800
permalink: /posts/speech-ai-large-language-model-review/
lang: zh-CN
translate: false
excerpt: "一篇从采样、频谱、声学表征和神经编解码器讲起，系统梳理 2023—2026 年 ASR、TTS、语音翻译、Audio LLM、原生 speech-to-speech、实时全双工与语音智能体的技术综述，并讨论训练、推理、评测、安全和未来方向。"
categories:
  - 人工智能
tags:
  - 语音大模型
  - Audio LLM
  - 语音识别
  - 语音合成
  - 神经音频编解码器
  - 全双工对话
  - 多模态大模型
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/speech-ai-review/01-neumann-u87.jpg
---

> **范围说明：**本文把“近三年”界定为 2023 年初至 2026 年 8 月，并向前追溯少量必要基础工作。重点是语音与大模型的交叉：ASR、TTS、speech-to-speech 翻译、Audio LLM、实时语音智能体和全双工对话；音乐生成与通用音效生成只在共用技术处提及。文中的产品能力与数字以厂商技术报告或模型卡为来源，不把不可复现的官方宣称当成横向可比的学术结论。图片均为真实照片、真实语音频谱或本文绘制的技术图，不含 AI 生成图片。

**作者：qscqesze**　｜　**更新至：2026 年 8 月**　｜　**稿件类型：技术综述 / 大模型系统**

<figure class="technical-figure">
  <img src="/images/speech-ai-review/01-neumann-u87.jpg" alt="录音棚中的 Neumann U87 电容麦克风真实照片，金属网罩和防震架清晰可见" loading="eager">
  <figcaption>图 1｜语音 AI 的入口仍是一个真实的换能器：麦克风把空气压力变化变成电信号，之后才轮到采样、频谱、token 和 Transformer。摄影：Will Fisher，2014；经 <a href="https://commons.wikimedia.org/wiki/File:Neumann_U87_Condenser_Microphone_-_Studio_A,_In_Your_Ear_Studios.jpg">Wikimedia Commons</a>，CC BY-SA 2.0；本文缩放。</figcaption>
</figure>

## 摘要

过去三年，语音 AI 最重要的变化不是“识别更准了”或“合成更像真人了”，而是语音从大语言模型外围的输入输出插件，逐渐变成模型自身可以读取、预测和持续交互的一种原生序列。2023 年的 VALL-E 把文本转语音明确写成神经 codec token 的条件语言建模；AudioPaLM 把文本知识与语音 token 放进统一模型；SeamlessM4T 把识别、翻译和语音输出合并为多语言系统。2024 年，GPT-4o 让原生音频交互进入大众产品叙事，Moshi 则公开展示了低码率流式 codec、多码本分层预测和双音频流如何组成约 200 ms 实际延迟的全双工模型。2025 年以后，Qwen2.5-Omni 的 Thinker–Talker、Kimi-Audio 的连续输入与离散输出、MiniMax-Speech 的可学习说话人编码器，以及面向生产的 realtime audio API，进一步把“理解、推理、说话、工具调用”放进同一个流式系统。[^valle][^audiopalm][^seamless][^gpt4o][^moshi][^qwenomni][^kimiaudio][^minimax]

但“端到端”没有消灭工程现实。真实语音产品仍要处理波束形成、回声消除、VAD、说话人分离、断句、上下文偏置、网络抖动、首包时延、工具调用、内容安全、声纹授权和失败回退。对会议转写、呼叫中心或高风险业务而言，ASR → 文本 LLM → TTS 的串联架构常因可观测、可替换、可审计而更合适；对陪伴、口语教学、同声传译和无障碍交互而言，能保留语气、停顿、重叠和打断的原生 speech-to-speech 或全双工模型更有吸引力。

本文的核心判断是：**语音 AI 正从“语音任务模型”进入“时间连续的多模态智能体”阶段。**决定下一轮能力上限的，不只是参数量，而是四件更底层的事：能否用低帧率 token 保住语义与声学细节；能否在流式条件下维持强推理和工具使用；能否学习真实的人类互动时序；能否把身份授权、来源证明与在线安全做成系统默认，而不是上线后的补丁。

<div class="article-brief" markdown="1">
**读完本文，你应该能回答：**

- 一秒语音为什么比一秒文字难建模几个数量级？
- Mel 频谱、连续 SSL 表征、语义 token、codec token 各保留什么、丢掉什么？
- CTC、RNN-T、Whisper 类 encoder–decoder 在今天分别还有什么位置？
- VALL-E、SoundStorm、Mimi、Moshi、Qwen2.5-Omni 和 Kimi-Audio 的关键差异是什么？
- “原生音频”“端到端”“speech-to-speech”“全双工”为什么不是同义词？
- 一个真的能上线的语音智能体，时延、打断、回声、检索与安全要怎样拆？
- WER、MOS、说话人相似度和端到端问答分数为什么都不够？
- 未来三到五年，语音大模型最可能沿哪些方向演进？
</div>

<nav class="article-toc" markdown="1">
**本文目录**

* 目录
{:toc}
</nav>

## 一、先给结论：语音 AI 正在从“转写接口”变成“实时行为模型”

把 2023—2026 年压缩成一张路线图，可以看到五次迁移。

| 旧问题 | 新问题 | 技术迁移 | 尚未解决的代价 |
|---|---|---|---|
| 把话听成字 | 理解“说了什么、怎么说、在什么环境说” | ASR → rich audio understanding | 情绪、讽刺、重叠声与环境因果仍弱 |
| 把字念出来 | 用指定身份、风格和节奏表演 | 声学回归 → codec LM / diffusion / flow | 长文一致性、精确可控和授权 |
| 先转文字再翻译 | 边听边保留语气地说另一种语言 | cascade → direct / unified S2ST | 低资源语言、音色迁移和幻觉毒性 |
| 一问一答 | 可以附和、停顿、被打断、继续听 | half-duplex → full-duplex | 对话时序数据稀缺，错误更难审计 |
| 语音聊天 | 一边说话一边检索、看屏幕、调用工具 | voice UI → multimodal agent | 推理延迟、安全边界和事务一致性 |

这里最容易混淆的是几个营销词：

- **语音输入模型**可能只把一个声学编码器接到文本 LLM 上，最终仍只输出文字。
- **speech-to-speech**只说明接口从语音到语音；内部完全可能是 ASR、文本 LLM、TTS 三段串联。
- **端到端训练**表示梯度可以跨模块联合优化，不代表系统中没有编码器、tokenizer 或独立解码器。
- **原生音频**通常意味着模型能直接利用非文字声学信息，具体架构却可能不公开。
- **实时**只说明吞吐或首包够快；**全双工**还要求系统在自己说话时继续听，并正确处理重叠、附和和打断。

所以，讨论一个语音大模型时，不应只问“是不是端到端”，而应问五个可验证的问题：输入是什么表示？输出是什么表示？是否因果流式？用户与系统是否处在同一时间轴？工具调用和安全决策发生在音频生成之前、之中还是之后？

## 二、最底层：机器拿到的不是“声音”，而是一串采样值

### 1. 从空气压力到 PCM

人声由肺部气流、声带振动和声道共振共同形成。麦克风把随时间变化的空气压力 $x(t)$ 转为电信号；模数转换器以采样率 $f_s$ 取样：

$$
x[n]=x\left(\frac{n}{f_s}\right),\qquad n=0,1,2,\ldots
$$

电话语音常见 8 kHz 或 16 kHz，现代语音生成常用 24 kHz、44.1 kHz 或 48 kHz。根据奈奎斯特条件，$f_s$ 最多无混叠地表达低于 $f_s/2$ 的频率。16 kHz 足以覆盖多数语音可懂度信息，却不等于能还原录音棚级空气感、高频齿音或环境细节。

若模型直接以 24 kHz 波形自回归，一秒就有 24,000 个时间步；一个普通说话者一秒只产生约 3—6 个文本 token。两者之间不是小常数差，而是四个数量级的序列率差异。这就是音频大模型首先必须解决的物理约束：**先压缩时间，再谈规模化 Transformer。**

### 2. 为什么要分帧和做频谱

语音在很短的窗口内可近似平稳。传统前端常取 20—25 ms 窗，步长 10 ms，对每帧做短时傅里叶变换（STFT）：

$$
X(m,k)=\sum_n x[n],w[n-mH]e^{-j2\pi kn/N},
$$

其中 $m$ 是帧序号，$H$ 是 hop size，$w$ 是窗函数。结果横轴是时间、纵轴是频率、颜色是能量。再把线性频率映射到更接近人耳感知的 Mel 尺度：

$$
\operatorname{mel}(f)=2595\log_{10}\left(1+\frac{f}{700}\right).
$$

Mel-spectrogram 不是“声音图片”，而是一次有目的的信息重排：局部频率结构更清楚，绝对相位和部分细粒度信息被弱化。10 ms hop 对应每秒约 100 帧；再经卷积或 patching 下采样到 50、25 甚至 12.5 帧/秒，才逐渐接近 Transformer 可负担的长度。

<figure class="technical-figure">
  <img src="/images/speech-ai-review/02-vowel-spectrogram.png" alt="真实录制的德语元音 a e i o u 的频谱图，横轴时间、纵轴频率，可见不同元音的共振峰结构" loading="lazy">
  <figcaption>图 2｜真实录制的德语元音 a、e、i、o、u 的频谱。低频处成组的水平能量带是基频谐波与声道共振共同留下的结构；元音的第一、第二共振峰位置不同，因此即使文字标注缺失，模型也能从频谱学习音素。Thomas Haslwanter 据真实语音用 MATLAB 计算；经 <a href="https://commons.wikimedia.org/wiki/File:Vowel_spectrogram.png">Wikimedia Commons</a>，CC BY-SA 3.0。</figcaption>
</figure>

### 3. 前端从来不只有“录音文件”

实验室里的干净单声道 wav 会掩盖生产难度。手机、汽车、会议室和电话系统通常还需要：

1. **自动增益控制（AGC）**：把远近不同的说话声维持在可用动态范围；
2. **降噪与去混响**：抑制风扇、交通、键盘和房间尾响，但不能把弱辅音一起擦掉；
3. **波束形成**：用多麦克风阵列增强某个方向；
4. **回声消除（AEC）**：从麦克风混合信号中去掉扬声器正在播放的模型声音；
5. **VAD / endpointing**：判断用户开始说、暂时停顿还是已经结束；
6. **说话人分离与 diarization**：回答“谁在何时说了什么”。

全双工系统尤其依赖 AEC。设麦克风收到的信号为

$$
m(t)=u(t)+h(t)*s(t)+n(t),
$$

$u(t)$ 是用户语音，$s(t)$ 是扬声器播放的系统语音，$h(t)$ 是房间与设备形成的回声路径，$n(t)$ 是噪声。模型若把自己的回声当成用户，会自我打断、复述或进入反馈循环。端到端大模型可以学到部分鲁棒性，却不能取消声学系统辨识这一层。

<figure class="technical-figure">
  <img src="/images/speech-ai-review/speech-stack.svg" alt="现代语音大模型从物理声波、声学前端、连续与离散表示进入多模态语言模型，再输出语音、文字和工具动作的完整技术栈" loading="lazy">
  <figcaption>图 3｜从声波到行动的完整栈。所谓“语音大模型”通常只覆盖中间若干层；一套可用产品还需要输入声学、表示、推理、解码、网络与业务系统共同工作。本文绘制。</figcaption>
</figure>

## 三、表示层：过去三年真正的发动机是“怎样把声音变成 token”

### 1. 连续自监督表征：最擅长听懂，不一定能原样说回去

wav2vec 2.0、HuBERT、WavLM 等自监督语音模型奠定了现代声学表征。共同思想是遮住部分时间片，让编码器从上下文恢复量化目标、聚类单元或潜在表示，从大量未转写音频中学习音素、说话人和声学结构。它们能作为 ASR、说话人识别、情感识别和音频理解的通用 encoder。[^ssl]

连续表示的优势是信息密、优化稳定、适合作为 LLM 的输入。典型做法是：

$$
\text{waveform}\xrightarrow{E_{\text{audio}}}h_{1:T}
\xrightarrow{\text{projector / resampler}}z_{1:T'}
\xrightarrow{\text{LLM}}y.
$$

其中 projector 把声学维度投到 LLM 的词嵌入维度，resampler 或卷积继续压缩时间。Qwen2-Audio 一类模型可以直接对语音、自然声音和音乐做文字问答；Kimi-Audio 则把连续声学向量与离散语义 token 共同作为输入。[^qwen2audio][^kimiaudio]

它的局限也明确：连续向量没有有限词表，不能像文本 token 那样直接交叉熵预测；每秒仍可能有几十个高维向量；而且若只训练音频到文字，编码器会学会丢掉对文字无用、对自然对话却重要的韵律与声纹。

### 2. 语义 token：把“说什么”与“怎么说”分开

另一条路线从自监督模型的隐藏层聚类离散单元，例如用 k-means 把每帧映射为 unit id。这类 token 更接近音素或发音内容，常故意弱化说话人和背景。直接 speech-to-speech 翻译可以先预测目标语言的语义单元，再由 unit vocoder 在目标音色条件下还原语音。

优点是词表有限、速率低、跨语言内容建模容易；代价是它不是完整音频压缩码。只靠语义 unit 通常无法精确恢复原说话人的气息、房间、基频微动和高频质感，需要另外的 speaker embedding、prosody encoder 或声学 decoder 把细节补回来。

### 3. 神经音频 codec：把语音生成改写成语言建模

SoundStream、EnCodec、DAC、Mimi 等神经 codec 的基本结构是：

$$
x\xrightarrow{E}z\xrightarrow{Q}\hat z\xrightarrow{D}\hat x.
$$

编码器 $E$ 把波形压成低帧率潜变量，量化器 $Q$ 把连续向量变为离散索引，解码器 $D$ 还原波形。为了在有限码率中逐层补细节，常使用残差向量量化（RVQ）：

$$
r_0=z,\qquad q_k=\operatorname*{argmin}_{e\in\mathcal C_k}\|r_{k-1}-e\|^2,
$$

$$
r_k=r_{k-1}-e_{q_k},\qquad \hat z=\sum_{k=1}^{K}e_{q_k}.
$$

第一个码本解释潜变量的大结构，后续码本逐层编码残差。若每秒 $F$ 帧、使用 $K$ 个码本、每个码本大小为 $V$，理论索引码率约为

$$
R=F\cdot K\cdot\log_2 V\quad\text{bits/s}.
$$

Moshi 使用的 Mimi 处理 24 kHz 音频，把帧率压到 12.5 Hz；Moshi 配置使用 8 个、每个 2048 项的码本，因此 $12.5\times8\times11=1100$ bit/s，即约 1.1 kbps。第一层还通过 WavLM 蒸馏增强语义性，后续层补声学细节；codec 自身是流式的，一帧 80 ms。[^mimi]

这带来一个决定性的抽象变化：**TTS 不再一定回归 Mel 频谱，而可以像 GPT 预测词一样预测音频离散码。**VALL-E 在 2023 年用三秒目标说话人录音作为 acoustic prompt，条件生成 EnCodec token，展示了 codec language model 的零样本声音克隆能力；SoundStorm 又用双向注意力和置信度并行填码，在其实验硬件上用 0.5 秒生成 30 秒音频，说明声学码本不必全部串行解码。[^valle][^soundstorm]

### 4. 低帧率不是免费午餐

语音 tokenizer 的目标不是“压得越狠越好”，而是优化三个互相拉扯的指标：

- **语义可预测性**：前层 token 最好像音素，语言模型容易续写；
- **重建保真度**：所有 token 合起来要能还原音色、韵律和环境；
- **时间与码本并行度**：每秒预测步数越少，实时生成越容易。

一个 codec 可以在波形重建上很好，却给语言模型制造高熵、难预测的 token；也可以语义层很好，却把说话人和音乐性丢掉。论文里的 PESQ、STOI、ViSQOL 或 codec MOS 只衡量重建，不等于下游生成容易。真正适合语音 LM 的 tokenizer，必须联合考察 token 可预测性、声学自然度、流式因果性与下游对话延迟。

<figure class="technical-figure">
  <img src="/images/speech-ai-review/token-rate-bottleneck.svg" alt="原始波形、Mel 或自监督帧、语义单元、神经 codec 和文本 token 的典型时间速率及信息权衡" loading="lazy">
  <figcaption>图 4｜压缩语音的矛盾。文本 token 最适合推理，但会抹掉“怎么说”；codec token 能重建声音，却往往是多码本序列。数值为典型数量级，不代表统一标准。本文绘制。</figcaption>
</figure>

## 四、ASR：识别没有结束，而是从“模型准确率”转向“上下文中的可靠转写”

### 1. 三类解码范式仍在共存

现代 ASR 并未被一种结构统一。

**CTC**假设给定声学编码后，各时间步条件独立；它引入 blank，并把所有折叠后等于目标转写 $y$ 的对齐路径求和：

$$
p(y\mid x)=\sum_{\pi\in\mathcal B^{-1}(y)}\prod_t p(\pi_t\mid x).
$$

CTC 简单、并行、易流式，但语言依赖主要靠外部 LM、浅融合或 encoder 上下文补足。

**RNN-T / Transducer**同时维护声学时间轴与输出 token 轴，prediction network 根据已输出文本建模语言依赖，joint network 决定输出字符还是继续等待音频。它天然适合在线识别，仍广泛用于手机和服务端流式 ASR。

**Attention encoder–decoder**直接生成文本序列。Whisper 以 68 万小时多语言、多任务弱监督训练，把语言识别、转写、翻译与时间戳统一成 decoder token 任务，展示了大规模弱标注对零样本鲁棒性的价值；缺点是自回归 decoder 在静音、音乐、切块错误或域外语言上可能生成“听起来像文本”的幻觉。[^whisper]

Conformer 把局部卷积与全局注意力结合，已成为三类解码头常见的声学骨干。真正的结构选择取决于是否流式、是否长音频、目标语言数、算力和可否使用文本 LM，而不是简单的排行榜高低。

### 2. 2023—2026 年的 ASR 主线

第一条是**多语言规模化**。Google USM 在数百种语言上做自监督预训练，再用有标注语音、文本注入和多任务训练适配 ASR/翻译；FLEURS 用 102 种语言、每种约 12 小时平行语音推动统一评测。语音覆盖正在从“几十种商业语言”扩展到上百种，但高资源与低资源语言的错误率、口音和领域覆盖仍远不均衡。[^usm][^fleurs]

第二条是**蒸馏与边缘部署**。Distil-Whisper 用大规模伪标签把 Whisper 压缩，在其报告的设置中实现 5.8 倍推理加速、参数减少 51%，域外 WER 与教师相差不到 1%；它还可作为 draft model 做 speculative decoding。[^distil]

第三条是**后训练进入识别**。2025 年的 `gpt-4o-transcribe` 等产品说明中，OpenAI 把中期训练、音频专项数据和强化学习用于降低 WER 与幻觉。这提醒我们，ASR 也不再只是 maximum likelihood：专有名词恢复、格式遵循、置信拒绝、长音频一致性都可以进入 post-training。由于训练数据与评测细节未全部公开，这类厂商结果应视作产品证据，不能替代可复现实验。[^openaudio2025]

第四条是**从无上下文听写变为可提示识别**。生产系统需要注入联系人、商品名、会议词表、地名、代码混合和前文摘要，同时防止 prompt 把没说过的词硬塞进结果。上下文偏置不只是“给 LLM 一段提示”，还涉及热词召回、发音词典、位置约束与置信校准。

### 3. WER 不是终点

词错误率定义为：

$$
\operatorname{WER}=\frac{S+D+I}{N},
$$

其中 $S,D,I$ 分别是替换、删除和插入，$N$ 是参考词数。中文常用 CER。这个指标必要但不充分：

- “一百五十万”错成“一百十五万”只算少量 token，却可能造成严重业务事故；
- 人名、药名和订单号的代价远高于虚词；
- 自动标点、大小写和逆文本归一化会改变计分；
- 说话人归属错误不一定进入 WER；
- 长静音中整段幻觉可能让 WER 爆炸，也可能因测试切分被隐藏。

可上线 ASR 至少还要看实体召回、时间戳、diarization error rate、数字准确率、置信度校准、实时率（RTF）、首个 partial 延迟和长音频稳定性。

## 五、TTS：从“清楚朗读”进入“可提示的声音生成”

### 1. 旧流水线为什么仍有价值

传统 TTS 大致是：文本规范化 → 分词 / G2P → 音素与韵律预测 → acoustic model → vocoder。FastSpeech、Tacotron、VITS、HiFi-GAN 等把其中若干环节神经化。它们的优势是发音控制明确、对齐可解释、推理成本低；在固定播报音色、导航、读屏等场景，一套小而稳定的专用 TTS 可能比语音大模型更合适。

大模型路线改变的是条件空间。输入不再只有音素和 speaker id，而可以包含一段参考音频、自然语言风格指令、情绪标签、对话上下文甚至另一个模态。生成目标也从单一 Mel 频谱扩展到语义 token、声学 token、连续 latent 或波形。

### 2. 四条生成路线正在汇合

| 路线 | 代表机制 | 优势 | 常见弱点 |
|---|---|---|---|
| 自回归 codec LM | VALL-E、AudioLM 类 | 长上下文、in-context 声音克隆、表达丰富 | 逐 token 慢，错误会累积 |
| 掩码 / 并行 token | SoundStorm 等 | 声学码本可并行，生成快 | 流式和可变长控制更复杂 |
| diffusion / flow | 频谱、codec latent 或 VAE latent 上生成 | 音质高，条件控制灵活 | 多步采样；流式需滑窗或蒸馏 |
| 混合层级 | AR 语义规划 + 并行声学细化 | 把“说什么”与“声音细节”拆开 | 模块接口、对齐与训练复杂 |

MiniMax-Speech 是混合设计的一个清楚例子：可学习 speaker encoder 从未转写参考音频抽取音色，AR Transformer 以 25 Hz 生成离散语音 token，再用 Flow-VAE 与 latent flow matching 提升连续声学质量；论文还展示了情绪 LoRA、文字描述生成音色与只优化说话人条件向量的专业克隆扩展。[^minimax]

Qwen2.5-Omni 的 Talker 则从 Thinker 隐藏状态生成音频 token，并用滑动窗口 DiT 解码为流式语音；Kimi-Audio 使用 12.5 Hz tokenizer 和 chunk-wise flow-matching detokenizer。它们体现同一趋势：**语义规划可以自回归，声学细节可以用另一支小模型并行或局部生成。**[^qwenomni][^kimiaudio]

### 3. 声音克隆最难的不是“像”，而是“拆开”

参考录音混合了至少五种因素：说话人身份、语言内容、情绪风格、录音环境和当时健康状态。若模型简单复用 prompt token，确实可能很像，却也把背景噪声、语速甚至参考文本绑定进新语句。更强的系统希望得到近似解耦表示：

$$
z_{\text{speech}}\approx z_{\text{content}}+z_{\text{speaker}}+z_{\text{prosody}}+z_{\text{environment}}.
$$

这不是严格线性分解，只是建模目标。现实中各因素相互作用：一个人的音色会随语言、情绪、年龄和麦克风变化。所谓 zero-shot voice cloning 也不代表“零样本”：模型见过海量其他说话人，只是没针对目标说话人更新参数。

### 4. TTS 的工程细节仍然决定体验

短 demo 很容易掩盖长文本问题。真正部署时需要处理：

- 数字、货币、单位、缩写、公式和 URL 的规范化；
- 中文多音字、方言与中英混说；
- 专名发音词典和用户纠正；
- 句间呼吸、段落节奏与 30 分钟以上音色漂移；
- 流式首包与后续生成实时率；
- 情绪指令不能牺牲可懂度；
- 用户打断后，声卡缓冲区里尚未播放的音频必须立刻丢弃。

“MOS 更高”不等于以上问题已经解决。合成模型越像真人，授权、欺诈和人格权风险也越直接，后文会单独讨论。

## 六、语音翻译：目标从“语义正确”变成“仍然像这个人在说”

传统 speech-to-speech translation 是 ASR → 文本机器翻译 → TTS。它便于调试和使用大规模平行文本，却会在第一步就抹掉语速、停顿、语气与声音身份；任一模块的错误还会级联。

直接 S2ST 预测目标语言语义 unit 或 acoustic token，可以绕过文字瓶颈，也能覆盖缺少标准书写系统的语言。Meta 在 2023 年的 SeamlessM4T v2、SeamlessExpressive 与 SeamlessStreaming 中，把识别、speech/text 翻译和语音生成放进同一系列模型；其中 EMMA 用单调注意力决定何时已有足够源信息可以输出，PRETSSEL 等模块尝试转移说话速度、停顿、音色和情绪。官方报告 SeamlessStreaming 的目标是约两秒延迟。[^seamless]

“边听边译”的难点不只是快。不同语言词序不同：英语很早出现动词，德语从句的关键动词可能在句末；中文省略主语，目标语言又可能必须补性别。系统必须在三者中权衡：

1. **等待更多上下文**，质量更高但延迟更大；
2. **提前猜测**，更快但可能自我修正；
3. **改写语序**，先说不依赖未知信息的部分。

所以同时传译的核心指标是质量—延迟 Pareto 曲线，而不是单独 BLEU。表达保持还带来安全问题：跨语言保留音色有助于自然沟通，也使未授权跨语言冒用更容易。

## 七、Audio LLM：语音理解不再等于 ASR 后做文本问答

如果用户问“门外这段声音是下雨还是水管漏水”，ASR 没有任何可转写文字；如果他说“没事”，文本完全正确，却可能因语气而分别表示安慰、讽刺、恼怒或真正无所谓。Audio LLM 的任务是把人声内容、说话方式、环境事件、音乐结构与文字知识一起推理。

2024 年的 Qwen2-Audio 区分 voice chat 与 audio analysis：前者接受口头指令，后者允许文字问题和复杂音频共同输入；AIR-Bench 则把人声、自然声音和音乐的基础任务与开放问答分开评测。[^qwen2audio][^airbench] 2025 年 Kimi-Audio 报告使用超过 1300 万小时的语音、声音和音乐预训练数据，并在同一模型中支持识别、理解、问答与语音对话。这个数字说明数据工程正在进入“互联网音频规模”，但各团队对时长、去重、切片和合成数据的统计口径不同，不能直接拿小时数排能力。[^kimiaudio]

Audio LLM 常见的输入桥接有三种：

1. **连续 encoder + projector**：保留声学细节，接入成熟文本 LLM 最容易；
2. **离散语义 / codec token**：可与文本一起做 next-token prediction，输入很长；
3. **混合输入**：连续特征负责细节，离散 token 提供紧凑语义骨架。

一个重要失败模式叫**模态休眠**：模型有强文本先验时，会忽略音频中与常识冲突或难提取的信息，回答“通常会发生什么”，而不是“这段录音实际发生了什么”。解决它需要 audio-grounded 对比样本、细粒度时间问答、反事实干扰和能迫使模型引用声学证据的训练，而不只是把更多音频接到 projector 上。

## 八、三种系统架构：串联、统一模型与全双工多流

<figure class="technical-figure">
  <img src="/images/speech-ai-review/architecture-routes.svg" alt="串联式语音智能体、统一语音文本模型与全双工多流语音模型的结构对比" loading="lazy">
  <figcaption>图 5｜近三年的语音系统演化不是简单替代，而是三条路线各自扩大边界。本文绘制。</figcaption>
</figure>

### 1. 串联式：今天仍然是生产主力

最成熟的语音智能体仍可写成：

$$
\text{mic}\rightarrow\text{AEC/VAD}\rightarrow\text{streaming ASR}
\rightarrow\text{text LLM/tools}\rightarrow\text{streaming TTS}.
$$

它有四个实际优势：每段日志可读；ASR、LLM、TTS 可以独立更换；文本工具调用生态成熟；安全规则可以在语音生成前审查完整文本。客服必须核对订单号、医疗记录要保留转写、金融操作要审计时，这些优势往往大于原生语音带来的自然感。

串联不必然慢。只要所有模块流式工作，ASR partial 可以提前喂给 LLM，LLM 第一小句可以立刻喂给 TTS，三段形成流水线。真正拖慢系统的常是 endpointing 等用户“说完”、工具阻塞、网络往返和 TTS 首包，而不是模型计算总和。

缺点是文本形成信息瓶颈。ASR 把“嗯……我、我觉得还行吧”规范成“我觉得还行”，会丢掉犹豫；模型无法自然听见用户在自己说话时的附和；错误还会沿模块传递。为弥补这一点，生产管线开始附加 prosody embedding、说话人状态、VAD 事件和音频片段引用，而不只传一串字。

### 2. 统一式：同一个模型理解多模态，输出文字或语音

统一模型通常保留一个强文本 LLM 作为语义核心，在输入侧加音频 encoder，在输出侧加 audio tokenizer / decoder。其联合概率可粗略写成：

$$
p(y^{\text{text}},y^{\text{audio}}\mid x^{\text{audio}},x^{\text{text}},x^{\text{vision}}).
$$

“统一”不意味着所有 token 共用一张表。音频输入可能是连续向量，文字输出是 BPE token，音频输出又是多个 codec 码本；它们只在隐藏状态与训练目标上耦合。

Qwen2.5-Omni 的 **Thinker–Talker** 是这个拆分的代表。Thinker 负责多模态理解和文本生成，Talker 读取 Thinker 隐藏状态，以双轨自回归方式生成音频 token；这样可以同时流式输出文本和语音，又减少声音建模对高层推理的干扰。音频与视频输入分块处理，TMRoPE 按时间对齐不同模态位置。[^qwenomni]

Kimi-Audio 则采用连续声学向量 + 离散语义 token 输入、文字与离散音频输出头、chunk-wise flow detokenizer。它反映另一种工程判断：输入理解需要保留丰富连续信息，输出生成需要有限词表和流式可解码表示，不必追求形式上的完全对称。[^kimiaudio]

统一模型的风险是**能力干扰**。高频率音频 token 占用大量训练步和上下文；若混合比例不当，文本推理能力会下降，或者模型只学会把音频转写成内部文本再回答，非文字声学能力没有真正增长。冻结 LLM 训练 adapter 能保住语言能力，却限制跨模态深度适应；全量联合训练能融合得更深，又容易灾难性遗忘。

### 3. 全双工多流：把对话本身当作序列

半双工系统的隐含协议是：用户说完 → 模型听完 → 模型说完 → 用户再说。人类对话不是这样。我们会在对方说话时发出“嗯”“对”，会用吸气或拖长音暗示还没结束，会在误解出现时立刻打断，也会允许短暂重叠。

Moshi 的关键不是“声音好听”，而是把用户与模型音频表示为并行时间流。每个 80 ms 时间步，Temporal Transformer 维护跨时间上下文；较小的 Depth Transformer 在该时刻预测多层 codec 码本。audio token 采用 delay pattern，让粗语义码先出现、细节码滞后若干步，从而把二维的“时间 × 码本”生成变成可流式层级序列。[^moshi]

它还预测与自身语音时间对齐的文字 token，称为 **Inner Monologue**。文字不是必须播放的中间波形，而是一条高语义密度的辅助轨道，帮助模型先稳定“要说什么”，再让 codec 轨道实现“怎么说”。这解释了一个看似矛盾的趋势：原生 speech-to-speech 并没有抛弃文字，反而常把文字变成隐式计划、监督或审计通道。

Moshi 论文报告理论延迟 160 ms、实践约 200 ms；GPT-4o 发布页报告音频输入响应最低 232 ms、平均 320 ms。这些数字展示了模型级潜力，但定义、硬件、网络、端点判断和用户地理位置不同，不能直接作为排行榜。[^moshi][^gpt4o]

## 九、全双工难在哪里：会说话不等于会对话

### 1. 关键能力是时序判断

全双工模型至少要学会五类行为：

- **pause handling**：用户句中停顿时不抢答；
- **backchannel**：在不夺取话轮时发出简短附和；
- **turn taking**：判断谁获得下一个话轮；
- **barge-in**：用户真正打断时停止、听懂并更新计划；
- **overlap recovery**：双方同时说后，知道哪些内容彼此听见了。

Full-Duplex-Bench 正是按停顿、附和、轮替与打断拆分评测，说明“对话自然度”开始从主观 demo 变成可复现实验对象。[^fullbench]

难点在于同一声学事件含义依上下文改变。“嗯”可以是认同、催促、犹豫或仅表示我还在听；200 ms 的停顿可能是自然换气，也可能是让出话轮。只用 VAD 的二值 speech / silence 状态无法解决，需要内容、韵律、目光或屏幕行为、历史说话风格共同判断。

### 2. 模型必须在自己说话时继续思考

文本 LLM 通常先生成完整推理，再给答案；口语不能让用户等十秒，也不能把长链式思考逐字念出来。更合理的实时架构会把进程拆成：

1. 低延迟 front-end 先确认意图并开始自然回应；
2. 后台并行完成检索、工具调用或更重推理；
3. 关键事实返回后，在语法允许的位置注入；
4. 若工具失败，及时修正，而不是继续自信填空。

2026 年的 MoshiRAG 把这种思路具体化：模型用特殊 token 决定何时检索，前端先说自然引入语，异步后端在关键答案出现前返回材料。它在官方实验中提高了事实问答，同时保留全双工交互。这个设计不证明“填充语越多越好”，但提示未来语音推理会更多采用**异步、分层、可打断**的调度，而不是把超大模型每个音频帧都跑一遍。[^moshirag]

### 3. “闭嘴”是一项需要训练的能力

文本聊天的多说几句只是冗长，语音里的多说会占用真实时间、阻止用户插入并增加通话成本。系统必须知道：何时只说“好的”并执行，何时复述高风险信息，何时等待，何时拒绝，何时把操作结果读出来。

这意味着偏好优化不能只比较答案内容，还要比较响应起点、长度、打断反应和音色策略。一个事实正确但总抢话的模型不是好语音助手；一个声音温柔却在支付确认上省略关键信息的模型也不安全。

## 十、训练一套语音大模型：数据比“接一个音频 encoder”复杂得多

### 1. 六类数据承担不同职责

| 数据类型 | 训练什么 | 主要风险 |
|---|---|---|
| 未转写单人音频 | codec、SSL 表征、音频先验 | 版权、身份与域偏差 |
| 音频—转写对 | ASR、时间对齐、语音到语义 | 自动字幕错误、规范化偏见 |
| 文本语料 | 知识、推理、工具语法 | 与真实口语分布不一致 |
| 文本—语音 / 参考语音 | TTS、声音克隆、风格控制 | 说话人授权与泄漏 |
| 平行语音 / 翻译 | S2ST、跨语言保持 | 语言不平衡、翻译腔 |
| 双声道真实对话 | 轮替、重叠、附和、打断 | 极稀缺、隐私最敏感 |

Moshi 报告约 700 万小时无监督音频预训练集合，Kimi-Audio 报告超过 1300 万小时多类型音频。大数值说明未标注音频的重要性，也说明“小时”已像文本 token 一样成为规模指标；但音频时长会受静音、重复、切片、采样率和合成数据影响，不能离开数据清洗与抽样策略解释。[^moshi][^kimiaudio]

真正稀缺的不是普通单人朗读，而是**带明确同意、声道分离、时间精确、包含自然重叠且语言多样的对话**。电话客服数据规模大，却有脚本化、领域窄和隐私限制；播客自然，但多人声道常混合；合成双人对话便宜，却会把 TTS 的完美轮替和固定韵律教给模型。

### 2. 常见训练阶段

一套统一语音模型通常不会从随机初始化端到端硬训，而会分阶段：

1. 训练或选择流式 audio codec / SSL encoder；
2. 以强文本 LLM 初始化语义主干；
3. 冻结 LLM，用 ASR、caption、对比学习把 audio encoder 对齐到语言空间；
4. 混合文本、语音、音频理解做 continued pretraining；
5. 用语音指令、对话和工具轨迹做 supervised fine-tuning；
6. 用偏好数据、DPO / RL 改善帮助性、安全、风格与互动时序；
7. 对流式部署做蒸馏、量化、声学 decoder 优化。

多任务目标可抽象为：

$$
\mathcal L=lambda_t\mathcal L_{\text{text}}
+\lambda_a\mathcal L_{\text{audio-token}}
+\lambda_r\mathcal L_{\text{recon}}
+\lambda_c\mathcal L_{\text{contrast}}
+\lambda_p\mathcal L_{\text{preference}}.
$$

困难不只是挑 $lambda$。文本 batch 以 token 计，音频 batch 以秒和多码本计；长静音也消耗声学计算。若简单按样本混合，某一模态可能主宰梯度。团队还要控制语言、说话人、音质、任务难度和真实/合成比例。

### 3. 合成数据既是扩展器，也是偏差放大器

大模型可以生成转写、音频描述、问答、角色对话和偏好比较；TTS 可以把海量文字变成语音指令。这解决人工标注昂贵的问题，却会制造闭环：

- 合成 TTS 过于清楚，ASR 学不会真实吞音；
- 对话没有自然重叠，模型学会礼貌但僵硬地轮流说；
- 教师 LLM 的知识错误进入语音监督；
- 少数音色与口音被反复使用，真实多样性缩水；
- 自动情绪标签把文化差异压成几个西方心理学类别。

高质量数据管线因此要保留来源、授权、教师版本和置信度，并用真实录音、人类听评和域外集持续校准。

## 十一、推理系统：低延迟是一条链，不是一个模型数字

### 1. 首个可听响应的分解

用户感受到的首音频延迟可粗略拆为：

$$
T_{\text{first-audio}}=
T_{\text{capture}}+T_{\text{endpoint}}+T_{\text{uplink}}+
T_{\text{encode}}+T_{\text{reason}}+T_{\text{decode-first}}+
T_{\text{downlink}}+T_{\text{jitter}}.
$$

厂商常报告其中的模型响应，用户体验却包含整条链。每项都有矛盾：采集 chunk 越小，调用越频繁；endpoint 越激进，越容易抢话；jitter buffer 越短，网络波动越容易卡顿；TTS 首包越早，模型越难回头修改前半句。

持续播放还要求生成实时率低于 1：生成一秒音频的墙钟时间必须小于一秒，并留下工具调用、GC、网络抖动和并发峰值余量。仅首包快、后续越说越慢，会导致缓冲耗尽和断音。

### 2. 流式模型的结构选择

- **因果卷积 / causal attention**只看过去，延迟最低，丢失未来上下文；
- **chunk-wise attention**在小块内看双向、块间因果，质量与时延折中；
- **有限 lookahead**多等几十到几百毫秒换取断句和辅音识别；
- **KV cache**避免每个音频帧重算全部历史，但长会话仍需压缩或滑窗；
- **多码本 depth decoder**把大 Transformer 的时间步与同帧声学细化分开；
- **speculative decoding / distillation**用小模型提出候选，由大模型验证或提供教师分布；
- **flow / diffusion sliding window**只在局部 latent 窗生成，换取首包与连续播放。

Qwen2.5-Omni 的 block-wise 音视频 encoder 与 sliding-window DiT，Moshi 的 12.5 Hz Mimi + Temporal/Depth Transformer，都在解决同一个系统问题：不要让高频声学细节迫使最大模型按最高频率运行。[^qwenomni][^moshi]

### 3. 成本按“每分钟双向音频”计算

文本聊天只在用户提交后推理，语音会话可能持续上传音频、同时生成音频、维持 VAD 与连接状态。成本来自输入 encoder、LLM、audio decoder、ASR/TTS 辅助服务、带宽和常驻 GPU，并随沉默处理策略大幅变化。

因此实际部署经常做模型路由：设备端 VAD/AEC；小 ASR 处理确认词；中型实时模型负责互动；复杂问题异步交给强推理模型；固定通知用专用 TTS；高风险操作转文字确认。未来更像一套调度系统，而不是一只“全能模型”独占每个音频帧。

## 十二、评测：语音模型必须同时过“耳朵、脑子和时间轴”三关

### 1. 单任务指标及其盲区

| 能力 | 常用指标 | 它回答什么 | 最大盲区 |
|---|---|---|---|
| ASR | WER / CER、实体召回 | 转写字符或词是否正确 | 错误代价不等、幻觉、说话人归属 |
| Codec | PESQ、STOI、ViSQOL、MUSHRA | 重建是否接近原音频 | 下游 token 是否容易预测 |
| TTS 可懂度 | 用 ASR 计算 WER | 生成内容能否被识别 | ASR 偏好“机器式清楚”语音 |
| TTS 自然度 | MOS / CMOS | 人类主观是否自然 | 受耳机、母语、样本与实验设计影响 |
| 声音克隆 | speaker SIM、SMOS | 是否像参考说话人 | 相似不等于已获授权，也不保证稳定 |
| 翻译 | BLEU / COMET、ASR-BLEU | 语义翻译质量 | 韵律、音色、延迟和口语修正 |
| 音频理解 | 准确率、LLM judge | 回答是否符合标注 | judge 偏差、模型可能只靠文本先验 |
| 对话 | 首包、RTF、打断成功率 | 是否及时互动 | “快”可能来自抢话或简化答案 |

语音生成最终必须有人听。客观指标适合大规模筛选，人类听评决定口音自然度、情绪可信度、疲劳感和伪影。听评也要盲测、随机化、报告受试者语言背景与置信区间，不能只挑几个好听样例。

### 2. 综合 benchmark 开始出现

AIR-Bench 在 2024 年把语音、自然声音、音乐的 19 类基础任务与 2000 条开放式音频对话分开；VoiceBench 在 2024 年加入真实与合成口语指令，考察说话人、环境和内容变化下的语音助手；Full-Duplex-Bench 在 2025 年针对暂停、附和、轮替与打断。[^airbench][^voicebench][^fullbench]

这些基准推动了可比性，也有共同局限：开放回答常靠另一个 LLM 评分；多数交互是预录单轮，不是真实在线双方共同适应；语言、残障语音、方言和强噪声覆盖有限；闭源系统的采样温度、系统提示和网络版本会变化。

### 3. 应该怎样做一次可信横评

至少需要四层：

1. **固定音频层**：相同采样率、响度、噪声条件和设备；
2. **任务层**：转写、事实问答、声学事件、情绪、工具调用分开；
3. **互动层**：真实网络下测 partial、首音频、RTF、暂停误判和打断；
4. **安全层**：冒充、越权克隆、隐私泄漏、诱导、背景指令注入与水印保持。

还应报告失败分布，而非只报平均数。一个模型平均 WER 低，却在儿童、口吃、某种方言或车载远场上系统性失败，产品结论会完全不同。

## 十三、近三年的代表性进展：不要把模型名当成同一赛道

下表按“它把哪一层往前推”排列，不做统一排名。

| 时间 | 代表工作 / 产品 | 主要推进 | 阅读时应保留的限定 |
|---|---|---|---|
| 2023-01 | VALL-E | 把 TTS 写成 codec token 条件 LM，三秒 prompt 做零样本克隆 | 英文为主；研究 demo，不是通用对话模型 |
| 2023-05 | SoundStorm | 并行填充多层 codec token，显著加快声学生成 | 依赖上游语义 token 与专用硬件实验 |
| 2023-06 | AudioPaLM | 文字 LLM 知识与语音 token 统一，支持听、说、翻译 | 研究模型，非全双工 |
| 2023-08/11 | SeamlessM4T v1/v2 | 多语言 ASR、文本/语音翻译、表达保持和流式 S2ST | 主要聚焦翻译，不等于开放域智能体 |
| 2024-05 | GPT-4o | 原生多模态实时语音进入大规模产品路线 | 核心音频架构与训练数据未公开 |
| 2024-07 | Qwen2-Audio | 音频分析与语音聊天统一为 audio-to-text LLM | 主要输出文字，不是原生语音生成 |
| 2024-09 | Moshi + Mimi | 12.5 Hz 流式 codec、内心独白、双音频流、约 200 ms 实践延迟 | 7B 语义能力有限；论文自己也强调事实性差距 |
| 2025-03 | Qwen2.5-Omni | Thinker–Talker、音视频时间对齐、流式文本与语音输出 | 综合模型的各项峰值未必超过专用模型 |
| 2025-04 | Kimi-Audio | 连续+离散音频输入、12.5 Hz 输出、chunk-wise flow、1300 万小时级数据 | 小时口径与闭源数据组成不可比 |
| 2025-05 | MiniMax-Speech | 可学习 speaker encoder、Flow-VAE、多语言零样本 TTS | 专注合成，不是完整语音智能体 |
| 2025 | 新一代 realtime / transcribe / steerable TTS API | 语音后训练、流式接口和声音指令控制进入生产平台 | 厂商 benchmark 不等于独立横评 |
| 2026 | GPT-Realtime-2、Gemini 3.1 Audio / 3.5 Live Translate、MoshiRAG 等 | 强推理、实时翻译、水印、异步检索进入语音接口 | 快速迭代的产品名与能力会变化，应查最新模型卡 |

2026 年公开资料显示，OpenAI 把 GPT‑Realtime‑2 描述为具备 GPT‑5 级推理的实时语音模型，并发布实时翻译与流式转写模型；Google 的 Gemini 3.1 Flash Audio 模型卡则强调原生音频、低延迟对话、可控 TTS，并为输出加入 SynthID。它们说明竞争焦点已经从“能不能语音对话”转到“能否一边对话一边可靠完成复杂任务”。这些都是官方产品定位，版本更新很快，本文不把其内部实现反推为已公开事实。[^openrealtime2026][^geminiaudio2026]

## 十四、怎样选技术路线：不是所有产品都需要“原生全双工”

### 1. 先按任务损失函数选架构

| 场景 | 更合适的起点 | 理由 | 必须额外做的事 |
|---|---|---|---|
| 会议纪要 / 法务转写 | 流式 ASR + diarization + 文本 LLM | 可审计、能引用时间戳、便于人工修订 | 实体词表、录音授权、原文与摘要分离 |
| 呼叫中心事务 | 串联或混合式 voice agent | 工具调用和脚本控制成熟，便于回退人工 | AEC、打断、号码复述、权限与审计 |
| 陪伴 / 口语教学 | 原生 S2S 或低延迟混合式 | 语气、节奏、纠音和附和是核心价值 | 身份边界、依赖风险、年龄保护 |
| 同声传译 | 直接 / 统一流式 S2ST | 能降低级联时延并保留表达 | 术语表、质量—延迟策略、原声授权 |
| 有声内容生产 | 专用高质量 TTS | 长文、音色与风格控制比对话更重要 | 发音编辑器、章节一致性、水印 |
| 车载 / 耳机 / 无障碍 | 端侧前端 + 云端推理的混合系统 | 隐私、断网、功耗和响应速度需平衡 | 本地唤醒、降噪、离线最小能力 |

一个稳妥原则是：**先用最可观测的架构建立任务与评测，再只在确实被文字瓶颈或时延卡住的部分引入原生音频。**这不是保守，而是让模型复杂度与产品损失函数匹配。

### 2. 生产系统的推荐分层

即使使用原生 speech-to-speech 模型，外围仍建议保留独立控制面：

1. **媒体层**：WebRTC / 电话网关、重采样、AEC、抖动缓冲；
2. **会话层**：VAD、话轮状态、barge-in、超时和重连；
3. **模型层**：实时语音模型或 ASR–LLM–TTS 流水线；
4. **工具层**：权限、幂等、事务、重试与回滚；
5. **安全层**：身份、内容策略、PII、声纹授权和输出标记；
6. **观测层**：音频片段、转写、模型版本、调用轨迹、延迟分位数与用户反馈。

高风险动作不要只靠“听起来像确认了”。支付、删除、签约或医疗指令应把关键字段转为可见文本，要求明确确认，并由工具层校验。语音是方便的界面，不应成为绕过事务安全的理由。

### 3. 先做这组最小评测，再决定换模型

如果要比较两套方案，建议用自己的真实流量抽样建立以下集合：

- 近场、远场、车载、电话压缩、混响和多人重叠；
- 中文普通话、主要方言、英文与中英 code-switch；
- 人名、地名、订单号、数字、单位和品牌词；
- 句中长停顿、假启动、自我修正、连续说 30 秒；
- 模型说话时用户附和、否定、改口和紧急打断；
- 工具成功、超时、返回冲突、需要二次确认；
- 诱导克隆、背景音频注入、越权请求与隐私索取。

报告 P50 / P95 / P99 首包和中断响应，而不只报平均延迟；同时保留失败录音供人听。语音系统最有价值的诊断通常不是一个总分，而是十几个“为什么它在这里没有闭嘴”的具体样本。

## 十五、安全、授权与真实性：声音既是内容，也是生物特征和社会身份

### 1. 风险不只是假新闻

零样本克隆降低了以下攻击的成本：冒充家属或高管进行汇款诈骗；伪造名人或候选人发言；未经演员同意复制表演；绕过只依赖静态声纹的认证；从长期语音交互推断健康、年龄、情绪或环境。

与此同时，克隆也有真实公共价值：让失声者保留自己的声音；为影视本地化提供经授权的跨语言表演；让读屏与教育拥有更自然的个性化声音。问题不在“克隆是否存在”，而在**谁能授权、授权到什么用途、能否撤销、输出是否可追溯**。美国 FTC 2023—2024 年 Voice Cloning Challenge 也把防护分成上游预防/认证、实时检测/监控和事后评估三处，明确指出单一技术不能解决全部风险。[^ftc]

### 2. 四层防线缺一不可

1. **数据与权限**：录音用途明确、说话人可撤回、训练与产品克隆分权；
2. **生成时约束**：敏感人物阻止、用户活体与同意校验、速率限制、审计；
3. **来源标记**：不可感知水印、文件元数据、C2PA Content Credentials；
4. **接收端防护**：反欺诈流程、多因素认证、深伪检测、人工升级。

AudioSeal 在 2024 年提出对生成语音做局部水印检测，可定位一段音频中被合成的部分；Google SynthID 把不可感知水印用于其生成音频，并强调对加噪、MP3 压缩和变速等常见修改的鲁棒性。[^audioseal][^synthid] 水印仍不是“真伪证明”：未检出可能表示模型没加水印、信号被破坏或检测器不兼容；检出也只证明某生成系统的标记存在。它需要与签名来源、平台显示和业务认证配合。

### 3. 防御重点要从“识别假声音”前移到“重要操作不信任声音”

纯深伪检测是一场不断移动的竞赛。更稳的原则是：银行、企业审批和家庭紧急转账不要把“声音像某人”当作身份充分证据。使用独立回拨、设备绑定、共享口令、交易签名和异常行为检测，能同时防真人录音回放、克隆和社会工程。

对开发者而言，至少应记录克隆授权、参考音频来源、模型版本、生成时间和接收方可见标识；为声音提供者设计撤销与用途范围，而不是把一段上传音频视为无限期、全场景许可。

## 十六、现在还卡在哪里：六堵比“扩大参数”更硬的墙

### 1. 音频序列仍太贵

12.5 Hz 已比 50—75 Hz codec 大幅缩短时间轴，但每帧还有多个码本；双人全双工又翻倍。上下文保存十分钟语音，比十分钟转写昂贵得多。未来需要更强的层级 cache：近期保留声学 token，中期压成语义与对话事件，长期只存可检索记忆，并能在需要时引用原音频。

### 2. 强推理与低延迟天然冲突

模型越大、思考越长，首音频越慢；太早开口又可能在事实未确定前承诺错误。Thinker–Talker、异步 RAG、小模型前台 + 大模型后台都是折中，但还没有统一解。语音模型需要学会“先确认我听懂了，但不提前编答案”。

### 3. 真实互动数据缺乏

互联网有海量单人视频，却少有合法、干净、分声道、时间精确的自然对话。对话模型很容易从播客学会长篇独白，从客服录音学会脚本化礼貌，从合成数据学会永不重叠。下一轮数据突破可能来自经同意的多人采集、端侧隐私学习和更好的交互模拟，而不只是抓更多网页音频。

### 4. 低资源语言的问题不只是“少几小时”

方言、语码转换、口头传统语言和残障语音可能缺文字标准、发音词典、评测者和产品反馈。把高资源语言的 tokenizer 与情绪标签硬迁移过去，会丢掉声调、节奏与文化语用。通用模型扩大覆盖的同时，也需要社区参与的数据治理与本地化评测。

### 5. 声学理解很容易被语言常识偷懒

模型可能正确回答“烟雾报警器通常是什么声音”，却无法判断录音里究竟是报警器还是微波炉；也可能从转写猜情绪，忽略真实韵律。未来 benchmark 要多用最小对：文字相同、语气不同；环境声相似、事件因果不同；常识答案与录音证据冲突。

### 6. 语音错误更难被发现

文字可以扫描、复制、引用，语音错误一闪而过。用户又容易把自然音色误当成更可靠、更有同理心。系统需要把关键数字和依据同步显示在屏幕，允许回放与引用，明确区分模型猜测、工具结果和用户原话。

## 十七、未来三到五年的展望

### 1. Audio tokenizer 会成为语音时代的 BPE，但不会只有一种

文本大模型的规模化建立在共享 token 接口上。语音也需要低帧率、流式、可重建、可预测、跨语言的 tokenizer。未来可能不是一套万能 codec，而是分层接口：第一层承载语言/事件，第二层承载韵律/说话人，第三层按需补高保真声学。理解任务只读前两层，通话生成读到中层，内容制作再启用全部码本。

tokenizer 还会与模型联合优化。今天常先训练 codec 再冻结；未来会更多直接优化“重建质量 + 下游语言建模熵 + 流式延迟 + 水印鲁棒性”，让表示为智能体服务，而不只是为压缩比赛服务。

### 2. 语音模型会从同步单体转向异步认知架构

人说话时也会边组织、边检索记忆、边观察对方反馈。未来 voice agent 很可能包含不同频率的循环：

- 10—100 Hz 的声学与话轮循环；
- 1—10 Hz 的语义生成循环；
- 按需触发的搜索、代码、数据库和规划循环；
- 更慢的会话记忆压缩与个性化更新。

小实时模型负责“在场”，大推理模型负责“想清楚”，工具负责“做成”，安全控制面负责“哪些不能做”。MoshiRAG 已展示异步检索雏形；更成熟系统会让这些循环共享可验证状态，而不是靠模型在口头上假装工具完成。

### 3. 全双工会从产品特效变成基础协议

未来的自然性不主要靠更丰富的笑声，而靠正确的节奏：不抢话、能被打断、短确认不打断任务、网络差时会说明、听不清时问最小澄清问题。WebRTC、AEC、端侧 VAD、流式 token 协议和模型话轮策略会逐渐像今天的 HTTP 栈一样模块化。

这也会改变 UI。屏幕不再只是一个发光球，而会同步显示实时转写、模型正在使用的工具、待确认字段和可中断状态。最好的语音界面不是隐藏系统，而是用声音降低操作摩擦，同时在关键处恢复可见性。

### 4. 语音、视觉和行动会汇成“在场的多模态智能体”

耳机能听见环境，手机能看见摄像头，桌面代理能读屏和点击。语音将成为协调这些模态的实时通道：用户指着设备说“这个灯为什么闪”，模型要把指代、画面、机器声和设备手册同时对齐；回答后还可能调用诊断工具。

Qwen2.5-Omni 的音视频时间对齐、Gemini Live 类产品和视觉扩展的 speech model 已指向这条路线。真正难的不是多放一个 encoder，而是建立**同一世界时间轴**：哪句话对应哪一帧、哪个声音来自哪个物体、工具动作发生后环境是否改变。

### 5. 端侧语音会先于端侧“全能大模型”普及

唤醒、VAD、AEC、降噪、说话人偏好、小词表识别、短 TTS 和隐私过滤很适合本地；复杂推理仍可上云。codec 降帧率、模型蒸馏、量化和 NPU 进步会让更完整的对话逐步下沉。端侧最大价值不是炫耀参数，而是低延迟、离线可用、敏感音频不离开设备和持续个性化。

长期看，用户的发音词典、常用联系人、听力需要、语速偏好和声学环境会形成私有适配层。这个层应可导出、可删除、与基础模型分离，而不是成为平台锁定的隐形声纹档案。

### 6. “声音真实性”会成为生成链的一等数据

水印、Content Credentials、授权凭证和模型日志将更靠近 codec 与生成协议，而不是导出文件时再补。接收端会显示“由谁的授权声音、哪个模型、何时生成、是否编辑”。但技术标记必须与法律、平台激励和公众习惯配合；否则最可靠的水印也可能在转录、扬声器重录或恶意平台中失去上下文。

### 7. 评测会从静态题库转向可交互环境

下一代 benchmark 应让模型与模拟用户实时对话：用户会停顿、口误、改变主意、背景有人插话、工具超时、网络掉包。分数同时考虑任务成功、事实性、首包、抢话、恢复、用户负担和安全。模型若通过快答提高延迟分，却让用户重复三次，就不应算更好。

## 十八、最后的判断：语音不是给 LLM 加一张嘴，而是给它加入时间

从 1939 年纽约世博会的 VODER 到今天的神经语音模型，机器“发出像人声的声音”已经走过近九十年。真正的新阶段不在于波形更逼真，而在于模型开始把语义、声音身份、情绪、环境和双方行为放在连续时间中共同预测。

<figure class="technical-figure">
  <img src="/images/speech-ai-review/03-voder-1939.jpg" alt="1939 年纽约世界博览会上观众围观 Bell Labs VODER 语音合成演示的历史真实照片" loading="lazy">
  <figcaption>图 6｜1939 年纽约世界博览会 Bell Labs VODER 演示现场。早期系统由受训操作员实时控制音高、共振和辅音；今天模型自动学习这些控制，但“何时说、如何回应另一个人”仍然是核心难题。图像原载 1940 年《Bell Telephone Quarterly》；经 <a href="https://commons.wikimedia.org/wiki/File:VODER_demonstrated_on_1939_New_York_World_Fair_-_The_VODER_fascinates_the_crowds_-_Bell_Telephone_Quarterly_(January_1940).jpg">Wikimedia Commons</a> / Internet Archive Book Images，无已知版权限制；本文缩放。</figcaption>
</figure>

近三年的路线可以用四句话收束：

1. **ASR 与 TTS 不会消失**，它们会成为更大的语音系统中可独立优化、可审计的基础能力；
2. **codec token 与连续声学表征会长期共存**，前者适合生成，后者适合理解，混合设计会更多；
3. **原生 speech-to-speech 的价值在非文字信息和互动时序**，不在“少画两个模块框”；
4. **未来的语音 AI 是实时多模态智能体**，它必须一边听、一边想、一边说、一边行动，还要知道何时停下来让人接管。

如果只看 demo，下一代语音 AI 像是“更像人的声音”；从底层看，它其实在解决一个更深的问题：怎样让机器以有限计算理解一条永不停止的世界时间轴，并在正确的毫秒做出可以被打断、被核查、也能承担后果的回应。

## 参考论文与官方资料

### 基础表征、识别与 codec

- Alec Radford et al. [Robust Speech Recognition via Large-Scale Weak Supervision](https://arxiv.org/abs/2212.04356), 2022.
- Alexei Baevski et al. [wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations](https://arxiv.org/abs/2006.11477), NeurIPS 2020.
- Wei-Ning Hsu et al. [HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units](https://arxiv.org/abs/2106.07447), 2021.
- Sanyuan Chen et al. [WavLM: Large-Scale Self-Supervised Pre-Training for Full Stack Speech Processing](https://arxiv.org/abs/2110.13900), IEEE JSTSP 2022.
- Yu Zhang et al. [Google USM: Scaling Automatic Speech Recognition Beyond 100 Languages](https://arxiv.org/abs/2303.01037), 2023.
- Alexandre Défossez et al. [High Fidelity Neural Audio Compression](https://arxiv.org/abs/2210.13438)（EnCodec）, 2022.
- Neil Zeghidour et al. [SoundStream: An End-to-End Neural Audio Codec](https://arxiv.org/abs/2107.03312), 2021.

### 语音生成、翻译与语音大模型

- Chengyi Wang et al. [Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers](https://arxiv.org/abs/2301.02111)（VALL-E）, 2023.
- Zalán Borsos et al. [SoundStorm: Efficient Parallel Audio Generation](https://arxiv.org/abs/2305.09636), 2023.
- Paul K. Rubenstein et al. [AudioPaLM: A Large Language Model That Can Speak and Listen](https://arxiv.org/abs/2306.12925), 2023.
- Meta AI. [Seamless: Multilingual Expressive and Streaming Speech Translation](https://ai.meta.com/research/publications/seamless-multilingual-expressive-and-streaming-speech-translation/), 2023.
- Alexandre Défossez et al. [Moshi: a speech-text foundation model for real-time dialogue](https://arxiv.org/abs/2410.00037), 2024；[官方代码与 Mimi 说明](https://github.com/kyutai-labs/moshi).
- Yunfei Chu et al. [Qwen2-Audio Technical Report](https://arxiv.org/abs/2407.10759), 2024.
- Jin Xu et al. [Qwen2.5-Omni Technical Report](https://arxiv.org/abs/2503.20215), 2025.
- Kimi Team. [Kimi-Audio Technical Report](https://arxiv.org/abs/2504.18425), 2025.
- Bowen Zhang et al. [MiniMax-Speech: Intrinsic Zero-Shot Text-to-Speech with a Learnable Speaker Encoder](https://arxiv.org/abs/2505.07916), 2025.

### 评测、实时系统与安全

- Qian Yang et al. [AIR-Bench: Benchmarking Large Audio-Language Models via Generative Comprehension](https://arxiv.org/abs/2402.07729), 2024.
- Yiming Chen et al. [VoiceBench: Benchmarking LLM-Based Voice Assistants](https://arxiv.org/abs/2410.17196), 2024.
- Guan-Ting Lin et al. [Full-Duplex-Bench](https://arxiv.org/abs/2503.04721), 2025.
- Robin San Roman et al. [Proactive Detection of Voice Cloning with Localized Watermarking](https://arxiv.org/abs/2401.17264)（AudioSeal）, 2024.
- U.S. Federal Trade Commission. [The FTC Voice Cloning Challenge](https://www.ftc.gov/news-events/contests/ftc-voice-cloning-challenge), 2023—2024.
- Google DeepMind. [SynthID](https://deepmind.google/models/synthid/), 持续更新。

---

[^valle]: Chengyi Wang et al., [Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers](https://arxiv.org/abs/2301.02111), 2023. 论文以 6 万小时英文语音训练 VALL-E，并用三秒未见说话人录音作为 acoustic prompt。
[^audiopalm]: Paul K. Rubenstein et al., [AudioPaLM: A Large Language Model That Can Speak and Listen](https://arxiv.org/abs/2306.12925), 2023.
[^seamless]: Meta AI, [Seamless: Multilingual Expressive and Streaming Speech Translation](https://ai.meta.com/research/publications/seamless-multilingual-expressive-and-streaming-speech-translation/), 2023；[官方模型说明](https://ai.meta.com/research/seamless-communication/)。
[^gpt4o]: OpenAI, [Hello GPT-4o](https://openai.com/index/hello-gpt-4o/), 2024。232 ms 最低、320 ms 平均为官方发布数字，不能与定义和环境不同的论文时延直接比较。
[^moshi]: Alexandre Défossez et al., [Moshi: a speech-text foundation model for real-time dialogue](https://arxiv.org/abs/2410.00037), 2024.
[^qwenomni]: Jin Xu et al., [Qwen2.5-Omni Technical Report](https://arxiv.org/abs/2503.20215), 2025.
[^kimiaudio]: Kimi Team, [Kimi-Audio Technical Report](https://arxiv.org/abs/2504.18425), 2025；[官方代码仓库](https://github.com/MoonshotAI/Kimi-Audio)。
[^minimax]: Bowen Zhang et al., [MiniMax-Speech: Intrinsic Zero-Shot Text-to-Speech with a Learnable Speaker Encoder](https://arxiv.org/abs/2505.07916), 2025.
[^ssl]: Alexei Baevski et al., [wav2vec 2.0](https://arxiv.org/abs/2006.11477), 2020；Wei-Ning Hsu et al., [HuBERT](https://arxiv.org/abs/2106.07447), 2021；Sanyuan Chen et al., [WavLM](https://arxiv.org/abs/2110.13900), 2021/2022.
[^qwen2audio]: Yunfei Chu et al., [Qwen2-Audio Technical Report](https://arxiv.org/abs/2407.10759), 2024.
[^mimi]: Kyutai, [Moshi / Mimi 官方代码与模型说明](https://github.com/kyutai-labs/moshi)；Mimi 24 kHz、12.5 Hz、1.1 kbps、80 ms frame 与 8 码本配置亦见 Moshi 论文。
[^soundstorm]: Zalán Borsos et al., [SoundStorm: Efficient Parallel Audio Generation](https://arxiv.org/abs/2305.09636), 2023。速度数字来自论文在 TPU-v4 上的实验，不代表消费设备或端到端服务时延。
[^whisper]: Alec Radford et al., [Robust Speech Recognition via Large-Scale Weak Supervision](https://arxiv.org/abs/2212.04356), 2022.
[^usm]: Yu Zhang et al., [Google USM: Scaling Automatic Speech Recognition Beyond 100 Languages](https://arxiv.org/abs/2303.01037), 2023.
[^fleurs]: Alexis Conneau et al., [FLEURS: Few-shot Learning Evaluation of Universal Representations of Speech](https://arxiv.org/abs/2205.12446), 2022.
[^distil]: Sanchit Gandhi et al., [Distil-Whisper: Robust Knowledge Distillation via Large-Scale Pseudo Labelling](https://arxiv.org/abs/2311.00430), 2023.
[^openaudio2025]: OpenAI, [Introducing next-generation audio models in the API](https://openai.com/index/introducing-our-next-generation-audio-models/), 2025.
[^airbench]: Qian Yang et al., [AIR-Bench](https://arxiv.org/abs/2402.07729), 2024.
[^fullbench]: Guan-Ting Lin et al., [Full-Duplex-Bench](https://arxiv.org/abs/2503.04721), 2025.
[^moshirag]: Kyutai, [MoshiRAG: Asynchronous Knowledge Retrieval for Full-Duplex Speech Language Models](https://kyutai.org/blog/2026-04-30-moshi-rag/), 2026.
[^voicebench]: Yiming Chen et al., [VoiceBench: Benchmarking LLM-Based Voice Assistants](https://arxiv.org/abs/2410.17196), 2024.
[^openrealtime2026]: OpenAI, [Advancing voice intelligence with new models in the API](https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/), 2026。产品名称和可用性会继续变化。
[^geminiaudio2026]: Google DeepMind, [Gemini 3.1 Flash Audio Model Card](https://deepmind.google/models/model-cards/gemini-3-1-flash-audio/), 2026；[Gemini Audio](https://deepmind.google/models/gemini-audio/)。
[^ftc]: U.S. Federal Trade Commission, [The FTC Voice Cloning Challenge](https://www.ftc.gov/news-events/contests/ftc-voice-cloning-challenge)；[Approaches to Address AI-enabled Voice Cloning](https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/04/approaches-address-ai-enabled-voice-cloning), 2024.
[^audioseal]: Robin San Roman et al., [Proactive Detection of Voice Cloning with Localized Watermarking](https://arxiv.org/abs/2401.17264), 2024.
[^synthid]: Google DeepMind, [SynthID](https://deepmind.google/models/synthid/)。官方说明覆盖图像、音频、文字和视频；不同产品、模态与版本的嵌入和检测范围应以当期模型卡为准。
