---
title: "参数不是全部：大模型的数据规模、质量与 Scaling Laws"
date: 2026-07-17 10:00:00 +0800
permalink: /posts/llm-data-scaling-laws-quality/
excerpt: "从 Kaplan、Chinchilla 到 DataComp-LM、FineWeb、Llama 3、DeepSeek-V3 与 Qwen3，系统解释模型规模、训练 token、有效数据量、数据质量和部署成本之间的定量关系。"
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/llm-data-scaling/scale-law-map.svg
---

> **证据范围：**本文讨论以自回归 Transformer 为主的大语言模型预训练、mid-training 与数据工程，证据检索截至 **2026 年 7 月 17 日**。文中明确区分同行评审论文、技术报告和最新预印本；不同 tokenizer、架构、语料与评测体系下的数值不能无条件外推。

<figure>
  <img src="/images/llm-data-scaling/scale-law-map.svg" alt="参数量、训练 token、训练计算量和数据质量共同决定大语言模型性能的 Scaling Law 总图" loading="eager">
  <figcaption>图 1｜大模型扩展不是单变量竞赛。参数、数据、计算和数据效用共同决定损失；训练成本最优与全生命周期成本最优并不是同一个问题。</figcaption>
</figure>

## 摘要

大语言模型的经典 Scaling Law 表明，语言建模损失随模型参数量、训练数据量和计算量增加而近似按幂律下降。Kaplan 等人的早期研究把固定算力更多分配给参数规模；Hoffmann 等人的 Chinchilla 研究重新估计后指出，许多早期模型实际上“参数过大、数据不足”，并给出模型规模与训练 token 近似同步增长的计算最优策略。[^1][^2] 由此流行起来的“约 20 tokens/参数”是一个极有价值的工程参照，但它不是自然常数，也不是任何架构、语料、目标函数和商业场景下都成立的训练标准。

2024–2026 年的研究进一步改变了问题的表述：如果模型会承接巨大推理流量，为降低长期部署成本，训练一个更小、但远超 Chinchilla token 比率的模型可能更经济；如果高质量人类文本成为瓶颈，重复次数、合成数据比例、来源混合和训练阶段调度就会成为新的扩展维度；如果目标是数学、代码、中文或企业知识，抽象的“通用高质量”也必须让位于目标条件下的效用。

本文提出一个面向研究和工程决策的核心区分：

$$
D_{\mathrm{raw}} \neq D_{\mathrm{unique}} \neq D_{\mathrm{seen}} \neq D_{\mathrm{effective}}.
$$

原始池 token 数描述可获取规模，唯一 token 数描述非重复观测，训练曝光 token 数描述优化器实际消费量，有效 token 数才描述对目标损失和能力的真实贡献。所谓“好数据”，不是某个分类器分数，而是在来源可追溯、内容可解析、信息非冗余、覆盖充分、事实可验证、目标相关、训练阶段适配和评测隔离等约束下，能在固定算力上稳定提高目标模型表现的数据。

**关键词：**大语言模型；Scaling Law；Chinchilla；训练数据；数据质量；有效数据量；数据混合；合成数据；数据去重

## 一、首先定义问题：究竟在扩展什么

### 1. 四个基本变量

| 符号 | 含义 | 必须说明的口径 |
|---|---|---|
| $N$ | 模型参数量 | 是否排除 embedding；MoE 应同时报告总参数与每 token 激活参数 |
| $D$ | 优化器消费的训练 token 数 | 是否包含多 epoch、重采样、合成数据和重复曝光 |
| $C$ | 训练计算量 | dense Transformer 常用 $C\approx6ND$ 近似；是否计入数据处理、失败运行和超参搜索 |
| $L$ | 验证交叉熵或其他损失 | 验证集来源、tokenizer 和域分布必须固定 |
| $Q$ | 数据质量或效用 | 尚不存在跨语料、跨模型普适的单一标量；必须给出估计方法和目标 |
| $\pi$ | 数据混合比例 | 域、语言、来源、难度或能力标签的采样分布 |
| $s(t)$ | 训练阶段或调度 | 不同数据在训练早期、退火期和 mid-training 的放置方式 |

对于标准 dense decoder-only Transformer，训练 FLOPs 的常用一阶近似是：

$$
C_{\mathrm{train}} \approx 6ND.
$$

系数 6 来自前向传播与反向传播的主要矩阵乘成本，实际系统还包含 attention、embedding、优化器、重计算、通信和硬件利用率损失。对 MoE，主 token 计算更接近由激活参数决定，但专家总参数仍影响容量、路由、显存和通信，因此不能只报一个参数数值。

### 2. Scaling Law 是经验规律，不是物理定律

经典联合损失模型通常写成：

$$
L(N,D)=E+\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}},
$$

其中 $E$ 是在给定数据分布和 tokenizer 下的不可约损失，$A,B,\alpha,\beta$ 由实验拟合。该式表达三层含义：

1. 参数不足时，增加容量降低模型受限项；
2. 数据不足时，增加观测降低数据受限项；
3. 两者都会出现边际收益递减。

它没有说明模型一定获得某种离散“涌现能力”，也没有保证验证 loss 的微小下降会在每个下游任务上同步兑现。系数换一批语料、tokenizer、架构、学习率日程或验证分布就可能改变，因此严谨做法是使用它来设计本项目的模型梯度实验，而不是抄用另一家模型的拟合系数。

## 二、从 Kaplan 到 Chinchilla：为什么行业从“堆参数”转向“喂数据”

### 1. Kaplan 2020：幂律可预测，但偏向增大参数

Kaplan 等人发现，语言模型损失在多个数量级上随 $N$、$D$ 和 $C$ 呈近似幂律。他们给出的固定算力最优分配更偏向扩展模型：参数规模大约按 $C^{0.73}$ 增长，而数据量约按 $C^{0.27}$ 增长。[^1] 这与 GPT-3 时代的实践相符：175B 参数模型只训练约 300B tokens，约为 **1.7 tokens/参数**。

该结果的历史意义不是“0.73 永远正确”，而是第一次把大模型训练从直觉工程变成可外推的资源规划问题。其局限也很明确：训练日程、数据规模范围和大模型是否充分收敛会影响拟合出来的最优点。

### 2. Chinchilla 2022：许多大模型其实没有被充分训练

Hoffmann 等人训练了 400 多个、从 70M 到 16B 参数的模型，并在 5B–500B tokens 范围内重新拟合。他们发现，在固定训练计算量下，模型参数和训练 token 应近似等比例扩展；70B 参数 Chinchilla 使用 1.4T tokens，在与 280B 参数 Gopher 相近的训练算力下取得更好表现。[^2]

若使用联合损失式并加上 $C\approx6ND$ 约束，最优规模满足：

$$
N_{\mathrm{opt}} \propto C^{\frac{\beta}{\alpha+\beta}},
\qquad
D_{\mathrm{opt}} \propto C^{\frac{\alpha}{\alpha+\beta}}.
$$

Chinchilla 的经验拟合使这两个指数都接近 $1/2$。其著名训练点对应：

$$
\frac{D}{N}\approx20\ \text{tokens/parameter}.
$$

但“20”应被理解为**特定实验体系的数量级尺**，而不是硬性阈值。即使 Chinchilla 论文内部的不同拟合方法也存在不确定性；训练语料的信息密度、tokenizer 粒度和超参数都能移动最优比例。

### 3. 为什么现代模型经常远超 20 tokens/参数

训练 FLOPs 最优只最小化一次预训练的成本。真实产品的目标函数更接近：

$$
\min_{N,D}
\left[
C_{\mathrm{train}}(N,D)
+\lambda\,C_{\mathrm{inference}}(N,R)
+C_{\mathrm{data}}(D,Q)
\right],
$$

其中 $R$ 是预期推理请求或生成 token 总量，$\lambda$ 把生命周期推理成本纳入决策。模型越小，每次推理越便宜；因此可以在预训练阶段多付出数据和计算，把能力压入一个更小的模型。

Gadre 等人在从计算最优到 32 倍过训练的实验中发现，验证损失和聚合下游误差仍可被稳定预测；Sardana 等人在 ICML 2024 将推理需求显式加入 Scaling Law，指出当推理请求足够多时，训练更小但更久的模型会优于纯 Chinchilla 策略。[^3][^4] 后者还测试了最高约 10,000 tokens/参数的极端区域，但这不等于任意重复数据都能持续有效，也不意味着如此高的比率在所有项目中经济。

## 三、数据量多大才算大：没有绝对值，但有可计算的相对尺度

<figure>
  <img src="/images/llm-data-scaling/how-much-data.svg" alt="不同参数规模的 Chinchilla 参照 token 数以及 GPT-3、Llama 3、DeepSeek V3 和 Qwen3 的 token 参数比" loading="lazy">
  <figcaption>图 2｜“大”是相对于模型规模和目标函数而言的。表中 FLOPs 仅按 dense 模型 $6ND$ 估算；MoE 必须同时报告总参数和激活参数口径。</figcaption>
</figure>

### 1. 一个实用但有限的数量级尺

以 $D\approx20N$ 作为训练计算最优的粗略起点：

| 参数规模 | Chinchilla 邻域训练量 | 近似训练 FLOPs | 2026 年常见定位 |
|---:|---:|---:|---|
| 0.5B | 10B tokens | $3\times10^{19}$ | 数据与训练管线代理模型 |
| 1B | 20B | $1.2\times10^{20}$ | 数据消融、小型基座 |
| 3B | 60B | $1.08\times10^{21}$ | 端侧或领域模型 |
| 7B | 140B | $5.88\times10^{21}$ | 成熟开放基座的最低成熟量级之一 |
| 13B | 260B | $2.03\times10^{22}$ | 中型通用或专业基座 |
| 70B | 1.4T | $5.88\times10^{23}$ | 大型 dense 模型 |
| 400B | 8T | $1.92\times10^{25}$ | dense 前沿规模 |

由此可给出一套**工程经验口径**，但不能作为论文定律：

- **1–10B tokens：**对领域继续预训练、长上下文扩展或小规模实验已经很大；对通用 7B 基座则远远不足。
- **10–100B：**足以系统训练亚十亿参数模型，也适合做多轮数据消融。
- **0.1–1T：**进入成熟开放基座训练量级；能支持数十亿至数百亿参数的有效实验。
- **1–10T：**前沿级预训练语料工程，需要严肃处理去重、数据血缘、混合和污染。
- **超过 10T：**属于超大规模训练数据；此时主要瓶颈往往从“有没有文本”转为“哪些 token 值得花 FLOPs”。

### 2. 前沿模型的公开数字说明了什么

| 模型 | 架构与规模 | 训练 token | tokens/参数 | 应如何解释 |
|---|---:|---:|---:|---|
| GPT-3 | 175B dense | 300B | 1.7 | 典型训练不足基线 |
| Chinchilla | 70B dense | 1.4T | 20 | 固定训练计算最优参照 |
| Llama 3 | 405B dense | 15.6T | 38.5 | 已超过 Chinchilla 比率；同系列 8B/70B 因使用相近规模语料，比率更高[^5] |
| DeepSeek-V3 | 671B 总参数、37B 激活 | 14.8T | 22（总）/ 400（激活） | MoE 的容量口径与计算口径不同[^6] |
| Qwen3-235B-A22B | 235B 总参数、22B 激活 | 36T | 153（总）/ 1,636（激活） | 包含通用、约 5T 高质量推理/STEM/代码及长上下文阶段[^7] |

这些数字不能直接排成“谁的数据更多谁就更强”的榜单，原因至少有五个：

1. tokenizer 不同，同一文本会产生不同 token 数；中文、代码和低资源语言的差异尤其明显；
2. 公开数字通常是训练曝光量，不一定是唯一语料量；
3. 合成、翻译、PDF OCR 和多模态转写可能被计入；
4. 模型架构、上下文长度和多 token 预测会改变每个 token 的计算与学习信号；
5. 通用 loss、数学能力、代码能力、事实新鲜度和对话质量不是同一个目标。

### 3. 原始池大，不等于训练数据大

DataComp-LM 提供了一个 240T-token 的 Common Crawl 原始池，但其 DCLM-Baseline 7B 模型实际训练约 2.6T tokens。FineWeb 是从 96 个 Common Crawl 快照中处理出的 15T-token 语料，而 FineWeb-Edu 是其中约 1.3T 的教育性子集。原始池、过滤后语料和最终采样量是三个完全不同的数字。

同样，重复数据不能无限创造新信息。数据受限 Scaling Law 的 400 次训练实验覆盖最高 9B 参数与 900B 训练 tokens：在固定算力下，约 4 个 epoch 以内的重复与使用等量唯一数据相比，loss 变化可以很小；继续重复后，新增计算的边际价值最终趋近于零。[^8] 因此，应同时报告 $D_{\mathrm{unique}}$、epoch/重采样策略与 $D_{\mathrm{seen}}$。

一项 2024 年数据供给研究估计，经质量和重复调整的公开人类文本有效存量约为 300T tokens，90% 区间约 100T–1000T，并预测若趋势延续，可能在 2026–2032 年间被前沿训练充分利用。[^9] 这是高度不确定的情景估计，不是对互联网文字的精确普查；私有数据、多模态转写、合成数据和数据效率进步都会改变结论。

### 4. 世界上到底有多少数据，LLM 已经“用掉”多少

这个问题必须先拆成三个不同问题：全球每年发生多少数字数据活动、其中有多少是可获取的人类文本、模型实际读取了多少训练 token。若把三者混在一起，会得到一个看似精确、实际上没有统计意义的“AI 已使用世界数据百分比”。

<figure>
  <img src="/images/llm-data-scaling/world-data-layers.svg" alt="全球年度数据活动量、互联网流量、公开网页、有效人类文本与前沿模型训练 token 的分层比较" loading="lazy">
  <figcaption>图 3｜从全球 ZB 到模型 token 不是简单漏斗。上层是年度字节活动或网络流量，下层才逐渐接近可训练文本；模型公开的 token 数又通常是训练曝光量，而非唯一语料覆盖量。</figcaption>
</figure>

Broadband Commission 与 ITU 在 2025 年发布的报告援引 IDC 估计：全球“创建、采集、复制和消费”的数据量在 2024 年约为 **149 ZB**，到 2028 年预计超过 **394 ZB**。[^itu-datasphere] 因而截至 2026 年，稳妥的说法是全球年度数据活动已经处于 **200 ZB 以上数量级**；这只是根据公开预测区间作出的数量级判断，不是对全球硬盘做出的实时盘点。更重要的是，该指标同时计入视频流、IoT 传感器、交易、日志、模型输出、备份和复制，同一字节在创建、传输、缓存和复制时可能被多次计数。

ITU 的另一组口径显示，2025 年全球终端固定宽带流量约 **7.3 ZB**，移动宽带流量约 **1.5 ZB**，合计约 **8.8 ZB**。[^itu-traffic] 这仍是“流量”而不是唯一内容存量：一段热门视频被一亿人观看会产生巨大流量，却不会给语言模型增加一亿份独立知识。

| 数据层级 | 最新可引用数量级 | 它实际测量什么 | 能否回答“LLM 已经用了多少” |
|---|---:|---|---|
| 全球数据活动 | 149 ZB（2024）；预计 $>394$ ZB（2028） | 一年内创建、采集、复制和消费的字节 | 不能；包含非文本、私有数据、缓存和重复副本 |
| 全球终端互联网流量 | 8.8 ZB（2025） | 固定与移动宽带传输流量 | 不能；是传输事件，不是唯一内容 |
| Common Crawl 单次快照 | 2.16B 网页、364 TiB 未压缩内容（2025-12） | 46M hosts 的一次公开网页抓取切片[^commoncrawl-2025] | 仍不能；尚未完成正文抽取、去重、授权和质量过滤 |
| 公开人类文本有效存量 | 约 300T tokens；90% 区间 100T–1,000T | 对质量、重复和有限多 epoch 调整后的情景估计 | 是目前最接近语言模型问题的分母，但不确定性很大 |
| 本文所列前沿单次训练 | 14.8T–36T token 曝光 | 优化器消费量 $D_{\mathrm{seen}}$ | 只能比较曝光数量级，不能解释为唯一覆盖率 |
| DCLM 透明案例 | 240T 原始池 → 2.6T 训练曝光 | 固定管线从原始池到 7B 训练采样量 | 名义采样比约 1.1%，但不是“世界数据使用率” |

若暂以 300T tokens 为可用公开人类文本的中心估计，可以计算一个**名义曝光—存量比**：

$$
r_{\mathrm{nominal}}=\frac{D_{\mathrm{seen}}}{S_{\mathrm{effective}}}.
$$

于是 Llama 3 405B 的 $15.6\mathrm{T}/300\mathrm{T}\approx5.2\%$，DeepSeek-V3 的 $14.8\mathrm{T}/300\mathrm{T}\approx4.9\%$，Qwen3 的 $36\mathrm{T}/300\mathrm{T}\approx12\%$。这些百分比**不是模型已经读过全世界多少唯一文本**，因为分子混有重复曝光、合成数据、OCR、代码及其他来源，不同模型的 tokenizer 也不同。真正的唯一覆盖率应写成：

$$
r_{\mathrm{coverage}}
=
\frac{
\left|D_{\mathrm{unique}}\cap S_{\mathrm{public\ human\ text}}\right|
}{
\left|S_{\mathrm{public\ human\ text}}\right|
}.
$$

公开技术报告几乎从不披露这个交集。因此，截至 2026 年 7 月，并不存在一个可审计的“全世界大模型累计使用了多少唯一数据”的统计数值。把所有模型的 $D_{\mathrm{seen}}$ 相加也没有意义，因为 Llama、Qwen、DeepSeek 及闭源模型会高度复用 Common Crawl、GitHub、Wikipedia、论文和书籍；重复训练同一个网页十次，只会产生十份曝光，不会产生十份新知识。

作为纯数量级换算，300T tokens 的裸文本若粗略按每 token 3–4 bytes 计，大约只有 0.9–1.2 PB，即约百万分之一 ZB。这个换算仅用于说明：**语言模型所需的人类文本，在全球数字字节活动中是极小而特殊的一层**；它不能用于推导训练数据占全球数据的精确比例，因为图片、音视频、压缩、格式、元数据和重复结构完全不同。

## 四、什么是“好数据”：质量是条件效用，不是审美标签

### 1. 更严谨的定义

设目标模型、训练阶段、算力预算与评测分布分别为 $M,s,C,T$。一条样本 $x$ 的质量不应被定义为“像不像维基百科”，而应近似理解为其条件边际效用：

$$
u(x\mid M,s,C,T)
=
\mathbb{E}\left[
\mathcal{R}_{T}(\theta_{S})-
\mathcal{R}_{T}(\theta_{S\cup\{x\}})
\right],
$$

其中 $S$ 是当前训练集，$\theta_S$ 与 $\theta_{S\cup\{x\}}$ 分别表示在加入样本前后、按同一训练程序得到的模型。该式表示加入样本后目标风险期望下降多少。这个定义揭示四个重要事实：

- 同一文档对 300M 和 70B 模型的价值可能不同；
- 对通用模型有价值的数据，对医疗或代码模型未必最优；
- 预训练早期需要广覆盖，退火或 mid-training 可能更需要高密度技能数据；
- 与公开基准高度相似的数据可能提高分数，也可能只是造成污染和能力偏置。

工程上无法逐样本精确计算 $u(x)$，所以使用规则、质量分类器、参考模型 loss、目标相似度、可验证性和小模型消融作为代理。代理分数必须由受控训练结果校准。

### 2. 八个可操作维度

<figure>
  <img src="/images/llm-data-scaling/effective-data-pipeline.svg" alt="从原始数据池经抽取、治理、去重、质量评估、混合和去污染形成有效训练 token 的流程" loading="lazy">
  <figcaption>图 4｜数据质量是一条生产管线。仅报告最终保留率无法复现数据，也无法判断性能提升来自抽取、过滤、混合还是测试污染。</figcaption>
</figure>

**可解析与连贯。** 正文抽取要保留标题、段落、代码块、公式和文档边界，同时去除导航、广告、cookie 提示和模板。低困惑度并不自动等于高质量：大量模板文本和常见套话也可能很容易预测。

**正确与可验证。** 事实内容应能追溯来源；数学和推理最好可验算；代码数据最好能够解析、编译、运行测试或静态检查。对合成数据，生成者置信度不等于真实性，必须加入外部验证器或多模型交叉检查。

**信息密度与非冗余。** 训练需要适度重复来学习稳定模式，但网页镜像、SEO 复制、跨快照模板和题库泄漏会消耗 FLOPs 并增加记忆。Lee 等人在 ACL 2022 发现，去重可使模型无提示输出训练原文的频率降低约 10 倍，并以更少训练步数达到相同或更好准确率。[^10]

**覆盖与长尾。** 高平均分但只有单一风格的语料会压缩分布尾部。真正的覆盖包括语言、领域、年代、文体、难度、推理类型、代码语言和观点差异。去重与过滤不能把罕见但有价值的长尾误删。

**目标相关性。** “好”必须相对于目标能力定义。数学证明、API 文档、法律文本和日常对话的价值不同；通用模型又不能为追逐少数 benchmark 而牺牲分布外能力。

**训练阶段适配。** 预训练强调广覆盖、语法与世界模型；mid-training 强调数学、代码、长上下文和高密度知识；SFT 强调指令—响应正确性；偏好与 RL 数据强调比较信号、奖励可靠性和探索覆盖。

**来源、权利、隐私与安全。** 许可、域名、抓取时间、作者、删除请求、PII、恶意代码和合成来源都应进入元数据。它们不一定直接降低 validation loss，却决定数据资产能否合法复用、更新和审计。

**评测隔离与新鲜度。** 应建立 benchmark 哈希、近重复搜索、时间切片和冻结测试集。若训练集包含答案，分数提升不是 Scaling Law，而是测量失效。

## 五、近期实证：质量如何真正改变 Scaling Law

### 1. 文本抽取本身就是高杠杆变量

DataComp-LM 在固定模型与训练配方下比较数据方法，发现将 Common Crawl WET 预抽取文本换成 resiliparse 或 trafilatura，在 1B-1x 实验中可使核心指标提升至少约 2.5 个百分点；原因之一是更好地移除了导航和模板。其模型过滤产生的 DCLM-Baseline，使 7B 模型用 2.6T tokens 达到约 64% 的 5-shot MMLU，并以更少训练计算接近当时部分闭源或闭数据模型。[^11]

FineWeb 则通过对 96 个 Common Crawl 快照的抽取、去重与过滤消融构造 15T tokens，并进一步得到 1.3T-token FineWeb-Edu；后者在知识和推理评测上显著优于更宽泛的数据集。[^12] RefinedWeb 更早证明，经过良好过滤和去重的纯网页语料可以与人工策展多源语料竞争。[^13]

这些结果反驳了“网页数据天然低质、书籍和百科天然高质”的简单二分。真正重要的是抽取质量、过滤目标、覆盖范围和固定算力下的实证结果。

### 2. 混合比例是能力结构，不是数据仓库占比

DoReMi 用 280M 代理模型通过 group DRO 学习域权重，再训练 8B 模型；在 The Pile 上，其平均 few-shot 准确率比原始混合高 6.5 个百分点，并用约 2.6 倍更少训练步数达到基线表现。[^14]

此后的 Data Mixing Laws 将模型表现表示为混合比例的可拟合函数，在 RedPajama 上为 1B/100B-token 训练找到的混合达到与默认配方多训练 48% 步数相当的表现。[^15] RegMix 训练 512 个 1M 参数代理模型探索混合，用回归预测大模型方案；它在最高 7B/100B-token 实验中优于人工选择，并以 DoReMi 约 10% 的计算达到相当或更好结果。[^16]

一个尤其重要的反常识结果是：RegMix 中广泛网页语料与下游表现的正相关可能强于人们直觉上更“高质量”的 Wikipedia。原因不是 Wikipedia 差，而是高质量的定义包含覆盖、互补性和与其他域的交互，不能用单域声誉代替实验。

### 3. 小模型代理很有用，但并不总能可靠外推

DataComp-LM 发现 400M/1B 数据方案到 7B 的排序相关性较高，支持用小模型做数据研究。但 DataDecide 2025 在 25 种语料、最高 1B 参数、最高 100B tokens 和 3 个随机种子上进一步检验后发现：150M 单尺度排序可以正确预测约 80% 的 1B 规模两两数据决策；测试的 8 种 Scaling Law 外推方法没有超过单尺度方法的计算—决策前沿。连续的答案似然指标比离散准确率更适合小模型代理，部分任务仅用目标计算量的 0.01% 就能达到超过 80% 的决策正确率。[^17]

这意味着：

- 代理模型值得做；
- 必须使用多个随机种子和低方差连续指标；
- 数据方案排序可能随规模交叉；
- “拟合了一条曲线”不等于外推已经可信。

### 4. 目标匹配能大幅提高效率，也会精确塑造偏科

BETR 通过将预训练文档与目标 benchmark 示例嵌入到同一空间，再训练轻量分类器扩展到全语料。其 500 多个模型覆盖 $10^{19}$–$10^{22}$ FLOPs；相对 DCLM-Baseline 获得约 2.1 倍计算乘数，相对未过滤数据约 4.7 倍，并在 10 项任务中的 9 项提升。研究同时发现，模型越大，最佳过滤通常越不激进。[^18]

这类方法说明目标相关性是真实的质量维度，但也带来严肃的方法学风险：若目标就是公开测试集，数据选择可能演化为“合法形式的 benchmark 过拟合”。通用模型应使用与最终评测隔离的能力代理集、时间后移测试和分布外评估来约束这种偏置。

### 5. 数据密度过高也会出现 sub-scaling

ACL 2025 的研究基于 400 多个模型，将性能增益减速归因于高数据密度造成的冗余和资源分配不当，并提出更适合 sub-scaling 区域的经验模型。[^19] 这里的“密度”不应简单理解为文本更难，而是相似信息高度聚集、独特信号增长慢于 token 计数。它支持用 $D_{\mathrm{effective}}$ 替代原始 $D$ 的直觉，但仍没有给出跨项目通用的有效 token 计量器。

### 6. 质量感知 Scaling Law 正在形成，但尚未定型

2026 年 ICLR 工作在 Chinchilla 形式中引入无量纲质量参数 $Q$，通过受控噪声和覆盖缺失实验，将质量解释为有效样本量和信息缺失。[^20] 这是重要的形式化尝试，但实验主要基于受控机器翻译和自回归建模设置；尚不能把一个固定 $Q$ 值直接用于数十万亿 token 的多语言前沿语料。

2026 年另一项最新预印本把质量进一步写成随时间变化的调度变量，提出 Drop-Stable-Rampup：切换到高质量数据时先降低 batch size，保持一段稳定期，再增大 batch。其在单一 15B MoE（2.4B 激活参数）、108B-token mid-training 设置中，相对 WSD 平均准确率提高 1.70，相对 cosine 提高 2.98。[^21] 作者也明确指出，这一结果尚未在 dense 架构、不同规模或不同数据预算上验证，并带来约 1.1 倍墙钟开销。因此它应被视为值得复现的新方向，而不是新的行业标准。

## 六、合成数据：放大有效信息，还是制造闭环退化

### 1. 合成数据不是一种单一分布

至少应区分：

- **改写型：**保留原始事实，改善结构、语言或难度；
- **教材型：**围绕概念主动生成解释、例题与推导；
- **指令型：**将原始文档转为问答、任务或多轮对话；
- **推理轨迹型：**生成中间步骤、候选解、反例与验证；
- **程序型：**生成可执行代码、测试、错误修复和证明对象；
- **蒸馏型：**用更强模型的分布训练更小模型。

它们的错误机制、覆盖和验证手段不同，不能用一个“合成比例”概括。

### 2. 模型坍塌与单轮混合并不矛盾

Shumailov 等人在 *Nature* 2024 证明，若生成模型世代递归地用前代生成数据替代真实分布，分布尾部会先丢失，最终可能发生模型坍塌；保留一部分原始数据可以减轻退化。[^22] 该结论针对递归反馈和原始数据被污染/替代的情形，不等于任何单轮使用合成数据都会失败。

2025–2026 年一项超过 1,000 次模型训练的系统研究发现：纯改写数据不一定比自然网页更快；约 1/3 高质量改写数据与 2/3 自然网页混合，在较大数据预算下可用 5–10 倍更少数据达到同等验证 loss；教材式纯合成数据在部分域上损失更高，较优改写比例随规模与预算变化并趋向约 30%。[^23] 这些是特定生成与语料体系下的结果，不能把 30% 当成通用配方。

### 3. 合成数据的科学使用原则

1. 保留人类来源基准分布和清晰的来源标签；
2. 用执行器、定理证明器、检索证据或独立模型验证答案；
3. 控制生成模板、温度、教师模型和 prompt 的多样性；
4. 按来源和生成批次去重，避免教师口癖形成新模板；
5. 在自然、合成及其混合上分别拟合 Scaling Law；
6. 使用时间后移和分布外测试，检查是否只是更像现有 benchmark。

## 七、不同训练阶段，对“好数据”的定义不同

| 阶段 | 数据目标 | 质量关键 | 常见错误 |
|---|---|---|---|
| 通用预训练 | 获得广覆盖语言、知识和表征 | 覆盖、非冗余、连贯、多语言与来源多样 | 过滤过严，模型只会一种“标准文风” |
| Mid-training / 退火 | 提高数学、代码、科学、工具与长上下文能力 | 可验证、高难度、结构完整、能力配比 | 高质量数据放得太晚且学习率已经过低 |
| 领域继续预训练 | 注入目标领域术语、文体与知识 | 目标相关性、新鲜度、来源权威 | 混合比例过高导致通用能力遗忘 |
| SFT | 学会指令遵循和输出格式 | 指令清晰、答案正确、覆盖真实任务 | 数量堆叠、模板同质、教师错误复制 |
| 偏好学习 | 学会相对偏好和风格边界 | 比较可辨识、标注一致、难负例 | 大量无差异 pair 稀释梯度信号 |
| 可验证 RL | 发展搜索、规划和推理 | 奖励正确、任务可解、难度课程 | reward hacking、题库泄漏、只优化单一形式 |

Dolma 的开放数据工作强调将来源保持分离、记录过滤和混合过程，并用固定模型进行数据消融；其 3T-token 英文语料包含网页、论文、代码、公共领域书籍、社交媒体和百科。[^24] 这种可追溯性本身就是科研质量：如果所有数据在进入训练前就被混成一个无来源大文件，后续既无法解释能力，也无法响应删除、更新和偏差问题。

## 八、一套可复现的数据 Scaling 实验方法

### 第一步：冻结目标与评测

先写清楚目标是通用 loss、中文、代码、数学、企业知识还是推理效率。建立三层评测：

1. 与训练同分布的验证 loss；
2. 与目标能力相关、但不直接用于过滤的开发集；
3. 时间后移、去污染、分布外的最终测试集。

如果先看测试分数再反复调整过滤器，测试集事实上已经变成训练信号。

### 第二步：建立数据账本

每个文档至少保存来源、抓取时间、许可、语言、内容哈希、近重复簇、处理版本、质量分数、合成标记和安全标记。每一步都记录：

- 输入/输出文档数与 token 数；
- 丢弃原因分布；
- 域、语言、年代、长度和质量分布变化；
- 精确和近重复率；
- 与评测集的重合率。

### 第三步：只改变一个数据变量

比较抽取器时固定过滤；比较过滤器时固定抽取和去重；比较混合时固定 token 预算与训练配方。否则模型提升无法归因。

### 第四步：训练模型梯度，而不是只训一个代理

建议至少使用 3 个参数规模、2–3 个 token 预算和 3 个随机种子。连续 loss、答案对数似然和任务聚合误差通常比小模型的离散准确率更稳定。对于候选语料 $j$，可分别拟合：

$$
L_j(N,D)=E_j+\frac{A_j}{N^{\alpha_j}}+\frac{B_j}{D^{\beta_j}},
$$

并检查不同语料的曲线是否交叉。曲线交叉意味着“小模型赢家”不一定是“大模型赢家”。

### 第五步：优化的是 Pareto 前沿

一个可用的数据方案必须同时考虑：

- 固定训练 FLOPs 的能力；
- 数据处理与存储成本；
- 数据许可、删除和审计成本；
- 记忆、PII、毒性和污染风险；
- 长期推理成本；
- 目标能力与通用能力的权衡。

因此最终输出不应是“唯一最佳语料”，而应是多目标 Pareto 前沿。

## 九、三个定量设计示例

### 示例 A：训练一个计算受限的 7B 通用基座

Chinchilla 起点约为 140B tokens，近似训练量 $5.88\times10^{21}$ FLOPs。实际方案可设置 100B、200B、400B 三个预算，用 0.3B/1B/3B 代理模型比较数据方案，并观察 7B 目标是否发生排序交叉。若只拥有 30B 高质量唯一 tokens，允许有限重复，但应比较加入较低分网页、代码或合成改写是否比第 5–10 个 epoch 更有价值。

### 示例 B：训练一个高请求量的 7B 部署模型

若模型将服务数十亿请求，1–3T 甚至更高训练 tokens 可能具有经济意义。此时目标不是一次训练 FLOPs 最小，而是训练与多年推理总成本最小。需要在 20、100、300 tokens/参数等区域拟合本项目曲线，同时把模型量化、KV cache、吞吐和平均输出长度纳入成本。

### 示例 C：训练 200B 总参数、20B 激活参数的 MoE

以总参数计算 20N 得到 4T，以激活参数计算得到 400B，两者都不是完整答案。主训练 FLOPs 更接近激活参数口径，但专家容量、负载均衡和领域专门化由总参数与路由决定。合理做法是同时报告：

$$
r_{\mathrm{total}}=D/N_{\mathrm{total}},
\qquad
r_{\mathrm{active}}=D/N_{\mathrm{active}},
$$

再通过小型 MoE 梯度实验拟合，而不是从 dense 模型复制 20:1。

## 十、最常见的十个错误

1. **把原始池大小当成训练 token。** 240T 原始网页池可能只产生数 T 的最终训练样本。
2. **把 20 tokens/参数当作普适定律。** 它只回答特定的固定训练算力问题。
3. **只报告参数总量，不报告 MoE 激活量。** 这会同时误导容量和计算比较。
4. **认为困惑度最低的数据一定最好。** 模板和常见套话也容易预测。
5. **认为百科、书籍天然优于网页。** 良好抽取和过滤的网页数据可以非常强。
6. **去重越激进越好。** 必须删除机器复制，同时保留教学所需重复和稀有长尾。
7. **一个质量分类器通吃所有规模。** 最优阈值会随模型规模和目标改变。
8. **合成数据可以无限生成，所以数据瓶颈消失。** 教师误差、模式收缩和来源闭环仍在。
9. **用 benchmark 相似度过滤，再用同一 benchmark 宣称泛化。** 这是目标泄漏风险。
10. **只跑一个小模型和一个随机种子。** 数据决策噪声可能比方案差异更大。

## 十一、2024–2026 年值得继续追踪的研究方向

| 方向 | 当前最强证据 | 尚未解决的问题 |
|---|---|---|
| 有效 token 的计量 | 数据受限 Scaling Law、ACL 2025 sub-scaling | 如何跨语料测量独特信息与迁移价值 |
| 质量感知 Scaling Law | ICLR 2026 的显式 $Q$ | $Q$ 能否在多语言、数十 T 语料上稳定估计 |
| 自动数据混合 | DoReMi、Data Mixing Laws、RegMix | 小模型到前沿规模的排序交叉 |
| 目标化选择 | BETR 等方法 | 如何提升目标能力而不造成 benchmark 过拟合 |
| 动态课程 | 2026 质量—batch 联合调度 | dense/MoE、不同优化器和规模能否复现 |
| 合成数据比例 | 2025–2026 大规模系统实验 | 多世代反馈、教师演化和长期分布尾部 |
| 数据治理 | Dolma、FineWeb、DCLM 开放管线 | 许可、删除、贡献归因和跨版本审计标准 |
| 多模态到文本 | OCR、ASR、图表与代码执行数据 | 模态转换是否真正增加可验证知识，而非放大噪声 |

## 结论

“模型规模和数据量哪个更重要”是一个错误的二选一。参数决定模型可以吸收多少结构，数据决定它能观察什么，计算决定两者能被优化到什么程度，而数据质量决定每次计算到底在学习独特规律、重复模板还是错误信号。

Chinchilla 的核心遗产不是一个永远不变的 20:1，而是**在固定预算下联合优化模型和数据**的方法。其后的研究又把目标函数扩展到了推理成本、数据稀缺、混合比例、目标能力、合成数据和训练顺序。到 2026 年，真正前沿的大模型数据研究已经从“抓取更多 token”转向以下问题：

> 在给定模型、算力、训练阶段和部署目标下，哪一批可追溯的数据，以什么比例、什么顺序、重复多少次，能提供最大的、可验证的边际学习信号？

这也是判断“数据量是否足够大”和“数据是否足够好”时，唯一足够科学的问法。

---

## 参考文献

[^1]: Kaplan J, et al. Scaling Laws for Neural Language Models. 2020. [arXiv](https://arxiv.org/abs/2001.08361)

[^2]: Hoffmann J, et al. Training Compute-Optimal Large Language Models. 2022. [arXiv](https://arxiv.org/abs/2203.15556)

[^3]: Gadre SY, et al. Language Models Scale Reliably With Over-Training and on Downstream Tasks. *ICLR*. 2025. [论文](https://proceedings.iclr.cc/paper_files/paper/2025/hash/a91869936a63d814971b6423990ecf6e-Abstract-Conference.html)

[^4]: Sardana N, Portes J, Doubov S, Frankle J. Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws. *ICML*. 2024. [PMLR](https://proceedings.mlr.press/v235/sardana24a.html)

[^5]: Grattafiori A, et al. The Llama 3 Herd of Models. 2024. [arXiv](https://arxiv.org/abs/2407.21783)

[^6]: DeepSeek-AI. DeepSeek-V3 Technical Report. 2024. [arXiv](https://arxiv.org/abs/2412.19437)

[^7]: Yang A, et al. Qwen3 Technical Report. 2025. [arXiv](https://arxiv.org/abs/2505.09388)

[^8]: Muennighoff N, et al. Scaling Data-Constrained Language Models. *JMLR*. 2025. [JMLR](https://www.jmlr.org/papers/v26/24-1000.html)

[^9]: Villalobos P, et al. Will We Run Out of Data? Limits of LLM Scaling Based on Human-Generated Data. 2024. [arXiv](https://arxiv.org/abs/2211.04325)

[^itu-datasphere]: Broadband Commission for Sustainable Development. *The State of Broadband: Our Digital World*. 2025. [ITU 报告](https://www.itu.int/dms_pub/itu-s/opb/pol/s-pol-broadband.33-2025-pdf-e.pdf)

[^itu-traffic]: International Telecommunication Union. *Measuring Digital Development: Facts and Figures 2025 — Internet Traffic*. 2025. [ITU](https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-traffic/)

[^commoncrawl-2025]: Common Crawl Foundation. December 2025 Crawl Archive Now Available. 2025. [Common Crawl](https://commoncrawl.org/blog/december-2025-crawl-archive-now-available)

[^10]: Lee K, et al. Deduplicating Training Data Makes Language Models Better. *ACL*. 2022. [ACL Anthology](https://aclanthology.org/2022.acl-long.577/)

[^11]: Li J, et al. DataComp-LM: In Search of the Next Generation of Training Sets for Language Models. *NeurIPS Datasets and Benchmarks*. 2024. [论文](https://papers.neurips.cc/paper_files/paper/2024/file/19e4ea30dded58259665db375885e412-Paper-Datasets_and_Benchmarks_Track.pdf)

[^12]: Penedo G, et al. The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale. 2024. [arXiv](https://arxiv.org/abs/2406.17557)

[^13]: Penedo G, et al. The RefinedWeb Dataset for Falcon LLM. 2023. [arXiv](https://arxiv.org/abs/2306.01116)

[^14]: Xie SM, et al. DoReMi: Optimizing Data Mixtures Speeds Up Language Model Pretraining. 2023. [arXiv](https://arxiv.org/abs/2305.10429)

[^15]: Ye J, et al. Data Mixing Laws: Optimizing Data Mixtures by Predicting Language Modeling Performance. *ICLR*. 2025. [arXiv](https://arxiv.org/abs/2403.16952)

[^16]: Liu Q, et al. RegMix: Data Mixture as Regression for Language Model Pre-training. *ICLR*. 2025. [arXiv](https://arxiv.org/abs/2407.01492)

[^17]: Magnusson I, et al. DataDecide: How to Predict Best Pretraining Data with Small Experiments. *ICML*. 2025. [arXiv](https://arxiv.org/abs/2504.11393)

[^18]: Mizrahi D, et al. Language Models Improve When Pretraining Data Matches Target Tasks. 2025. [arXiv](https://arxiv.org/abs/2507.12466)

[^19]: Chen Z, et al. Revisiting Scaling Laws for Language Models: The Role of Data Quality and Training Strategies. *ACL*. 2025. [ACL Anthology](https://aclanthology.org/2025.acl-long.1163/)

[^20]: Subramanyam A, Chen Y, Grossman RL. Scaling Laws Revisited: Modeling the Role of Data Quality in Language Model Pretraining. *ICLR*. 2026. [arXiv](https://arxiv.org/abs/2510.03313)

[^21]: Zhu Z, et al. How Should LLMs Consume High-Quality Data? Optimal Data Scheduling via Quality-Aware Functional Scaling Laws. 2026. [arXiv](https://arxiv.org/abs/2605.25698)

[^22]: Shumailov I, et al. AI Models Collapse When Trained on Recursively Generated Data. *Nature*. 2024. [Nature](https://www.nature.com/articles/s41586-024-07566-y)

[^23]: Kang F, et al. Demystifying Synthetic Data in LLM Pre-training: A Systematic Study of Scaling Laws, Benefits, and Pitfalls. 2025–2026. [arXiv](https://arxiv.org/abs/2510.01631)

[^24]: Soldaini L, et al. Dolma: An Open Corpus of Three Trillion Tokens for Language Model Pretraining Research. 2024. [arXiv](https://arxiv.org/abs/2402.00159)
