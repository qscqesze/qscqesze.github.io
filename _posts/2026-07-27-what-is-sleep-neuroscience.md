---
title: "睡眠究竟是什么：从脑状态切换、记忆重写到细胞维护的多尺度科学"
date: 2026-07-27 18:00:00 +0800
permalink: /posts/what-is-sleep-neuroscience/
excerpt: "一篇面向博士生的睡眠科学长篇综述：从睡眠的操作性定义、多导睡眠图、昼夜节律与稳态调节，到神经环路、记忆巩固、突触重整、脑液流动、DNA修复、免疫代谢、跨物种演化及关键争议。"
categories:
  - 科学与健康
tags:
  - 睡眠
  - 神经科学
  - 昼夜节律
  - 记忆
  - 脑科学
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/sleep-science/01-sleeping-human.jpg
---

> **证据边界与图片声明：**本文面向神经科学、生理学、心理学、计算生物学及医学相关专业的研究生与博士生，资料检索截至 **2026 年 7 月 27 日**。文中区分人类证据、动物证据、细胞证据与理论推断，不把相关性写成因果，也不把麻醉动物实验直接外推为人的自然睡眠。全文图片均为真实摄影、真实实验场景或由开放多导睡眠原始记录重绘的数据图，不含 AI 生成图片；摄影作品的作者与许可写在图注中，数据图标明记录号、处理方式和开放许可。本文用于学术教育，不替代临床诊断。

**作者：qscqesze**　｜　**稿件类型：睡眠神经科学 / 系统生理学 / 批判性综述**

<nav class="article-toc" markdown="1">
**目录**

* 目录
{:toc}
</nav>

<figure>
  <img src="/images/sleep-science/01-sleeping-human.jpg" alt="一名正在睡眠的人类的真实摄影" loading="eager">
  <figcaption>图 1｜睡眠首先是一种可以观察、可以打断、也会反弹的生物状态，但闭眼和静止本身并不足以定义睡眠。摄影：Sasha Kargaltsev，经 <a href="https://commons.wikimedia.org/wiki/File:Sleeping_(10765632993).jpg">Wikimedia Commons</a>；CC BY 2.0；本文缩放。</figcaption>
</figure>

## 摘要

睡眠不是“脑停止工作”，也不是一个由单一分子开启、用来完成单一任务的开关。它是由中枢神经系统主动生成、受稳态睡眠压力与昼夜节律共同约束、在全脑和局部回路上均具有结构的可逆状态。对人类而言，睡眠可由脑电（EEG）、眼电（EOG）、肌电（EMG）及自主生理信号分为 N1、N2、N3 和 REM；但这些分期是对连续、高维动力学的临床离散化，不等于自然界预先写好了四只盒子。

“人为什么要睡”没有一个已被证明可以独占答案的函数。现有证据更支持一个多任务框架：睡眠在降低外界输入和行为输出的条件下，重排神经活动的时间结构；协调海马—丘脑—皮层记忆再激活；对部分突触进行选择性重整；改变脑血流、脑脊液和间质液动力学；促进某些 DNA 损伤反应、蛋白质稳态与氧化还原维护；重新配置自主神经、内分泌、免疫与能量代谢。不同任务未必由同一阶段完成，也未必对所有物种同等重要。

睡眠之所以在演化上昂贵而仍被保留，是最有力的总体现象之一：睡着会降低觅食、交配与防御能力，然而从水母、线虫和果蝇到鸟类与哺乳动物，都可观察到满足可逆静止、反应阈值升高和剥夺后补偿等标准的睡眠或睡眠样状态。动物并没有因此选择“永远清醒”，而是改变睡眠的时间、深度、半球分布与地点。这表明睡眠的某些收益很难由安静清醒完全替代。

本文的核心结论是：**睡眠不是为了做一件事，而是一种使多尺度维护、学习和全身协调变得可能的生理制度。**它更像操作系统进入受控维护窗口，而不是机器断电；但这个比喻也只能到此为止，因为睡眠中的脑仍在产生意识内容、选择信息、调节内脏并与环境交换。

**关键词：**睡眠；NREM；REM；多导睡眠图；昼夜节律；睡眠稳态；神经环路；记忆巩固；突触稳态；类淋巴系统

## 一、先回答四个不同的问题

日常语言把四个层次都塞进了“睡觉”二字，导致争论常常答非所问。

| 问题 | 科学上真正要问什么 | 主要方法 |
|---|---|---|
| **睡眠是什么？** | 如何把睡眠与安静清醒、昏迷、麻醉、冬眠区分 | 行为标准、PSG、神经元放电、状态空间模型 |
| **人为什么会困？** | 什么决定睡眠发生的时刻、强度和持续时间 | 睡眠剥夺、强迫去同步、光照操纵、药理与遗传 |
| **睡着时在做什么？** | 各阶段发生哪些神经、细胞与全身过程 | EEG/MEG、单元记录、成像、组学、代谢与免疫测量 |
| **睡眠为什么存在？** | 哪些过程必须依赖睡眠，且能解释其演化成本 | 因果干预、功能救援、跨物种比较、自然实验 |

第一个问题是**定义**，第二个是**调控**，第三个是**机制描述**，第四个才是**功能与演化解释**。例如，“N3 时脑脊液波动增大”描述睡眠中发生了什么；只有证明改变这套流动会改变一个有适应意义的终点，并排除温度、麻醉、血压和应激等混杂，才接近回答它是不是睡眠存在的原因。

为了避免把漂亮故事写成定论，本文粗略采用四级证据语言：

- **强证据：**跨实验室重复的人或动物因果操纵，并有剂量反应、时间顺序或救援实验；
- **中等证据：**受控干预一致，但对象、阶段或终点有限；
- **提示性证据：**观察关联、疾病自然实验、跨物种对应或体外机制；
- **开放假说：**机制合理，却存在相反结果，或尚未把中间指标连接到功能结局。

睡眠研究尤其需要这种克制。一个 EEG 相关、一个荧光示踪现象或一个基因表达差异，不能单独证明“这就是睡眠的终极目的”。

## 二、睡眠是什么：从行为定义到脑状态

### （一）仅凭闭眼、静止和不说话，不能定义睡眠

研究不能循环论证：“睡眠是人在睡觉时的状态，而睡着就是处于睡眠。”对缺少可比较 EEG 的动物，经典操作性标准至少包含三项：

1. **持续的行为静止或特定姿势；**
2. **对外界刺激的反应阈值升高，但状态可迅速逆转；**
3. **稳态补偿：**剥夺后，之后的静止会更长、更深或更难被唤醒。

第三项很关键。石头也静止，昏迷患者也难唤醒，但它们不会以“此前少睡了多少”来调节下一段状态。2017 年的倒立水母研究用脉动频率、刺激反应潜伏期和夜间剥夺后的补偿证明，没有中央脑的刺胞动物也可呈现睡眠样状态。[^4] 因此，睡眠比哺乳动物皮层更古老；但“睡眠样”并不保证水母与人的 NREM 具有同一神经实现。

对人类和其他哺乳动物，定义可以加入电生理：睡眠表现为脑电频谱、神经元同步方式、眼球运动、骨骼肌张力、自主神经与反应性的协调变化。这不是从外表推断内在，而是把状态拆成可测量的多维变量。

### （二）睡眠不是一个状态，而是一族反复转换的状态

成人夜间睡眠通常在 NREM 与 REM 之间往复。现行临床分期把 NREM 分为 N1、N2、N3，并把 REM 单列。AASM 要求对连续记录按 30 秒 epoch 评分；每个 epoch 被赋予一个主导标签。[^1]

| 阶段 | 常见电生理特征 | 功能性描述的边界 |
|---|---|---|
| **N1** | 低幅混合频率，枕区 α 节律消退，可见缓慢眼动 | 清醒—睡眠过渡；容易唤醒，但已非简单闭目休息 |
| **N2** | 睡眠纺锤与 K 复合波成为分期标志 | 丘脑—皮层门控和记忆相关耦合活跃；不能简称“没用的浅睡” |
| **N3** | 高幅慢波占据显著比例，皮层神经元出现同步 up/down 状态 | 稳态睡眠压力最直观的宏观读出；并非“脑活动最低”的同义词 |
| **REM** | 低幅混合频率 EEG、成簇快速眼动、颏下肌张力显著下降 | 梦报告概率高、脑代谢活跃、躯干肌肉受抑；并不等于所有梦 |

分期是一种有用压缩，却会损失信息。同一个 N2 epoch 的纺锤密度、慢波相位、心率和局部皮层状态可以很不一样；NREM 和 REM 内部也存在连续的微状态。把“深睡 73 分钟”当成一个纯净生物量，就像把复杂天气压成“多云 8 小时”：便于沟通，不足以描述动力学。

### （三）睡眠、麻醉、昏迷与冬眠不能互换

自然睡眠能被感觉刺激迅速逆转，具有典型周期结构和剥夺后反弹。全身麻醉由药物改变受体、离子通道和大尺度连接，某些麻醉状态虽出现慢波，却不等于获得了等量自然 NREM 或 REM；麻醉甚至可能留下 REM 反弹。昏迷缺乏正常可逆性和组织结构。冬眠或蛰伏则以显著的体温、代谢和时间尺度变化为核心，动物从深度蛰伏中恢复后还可能需要额外睡眠。相似的 EEG 外观不等于相同的生成机制与功能后果。

## 三、怎样看见睡眠：多导睡眠图和真实数据

<figure>
  <img src="/images/sleep-science/02-polysomnography.jpg" alt="接受多导睡眠检查的受试者及身体传感器的真实照片" loading="lazy">
  <figcaption>图 2｜真实多导睡眠检查场景。临床 PSG 同步记录 EEG、EOG、颏下 EMG，并可加入气流、胸腹运动、血氧、心电和肢体肌电。摄影：邱钰锋，经 <a href="https://commons.wikimedia.org/wiki/File:Polysomnography_tester.jpg">Wikimedia Commons</a>；CC BY-SA 4.0；本文缩放。</figcaption>
</figure>

### （一）PSG 测到的是电势与生理代理量，不是“睡眠本身”

头皮 EEG 是大量神经元突触后电流经脑组织、脑脊液、颅骨和头皮体积传导后的电位差。它对同步活动敏感，却不能直接读出某个神经元在想什么。EOG 主要利用眼球角膜—视网膜电偶极记录眼动；颏下 EMG 估计肌张力；呼吸、血氧和心电帮助识别睡眠呼吸事件及自主变化。

人工分期把这些连续信号与规则匹配。规则化带来可重复性，也造成边界效应：一个 epoch 中 16 秒是 N2、14 秒是 N3，最后仍只能得到一个标签；短暂觉醒、周期性肢动、呼吸事件与病理波形又会影响评分。博士生在使用公开睡眠数据时，应把“专家标签”理解为带噪声的参照标准，而不是自然真值。

### （二）一个真实夜晚长什么样

下列四张数据图均来自 PhysioNet Sleep-EDF Expanded 的匿名记录 **SC4001E0-PSG.edf** 与人工 hypnogram **SC4001EC-Hypnogram.edf**。该库包含整夜 EEG、EOG、EMG 等信号，采用 Open Data Commons Attribution 1.0；原研究与数据集说明见 Kemp 等及 PhysioNet。[^2][^3] 原标注使用 Rechtschaffen–Kales 体系，本文将 Stage 3 与 Stage 4 合并为现代 N3，未用生成式模型补画波形。

<figure>
  <img src="/images/sleep-science/03-real-night-hypnogram.png" alt="Sleep-EDF真实整夜睡眠分期图与慢波功率" loading="lazy">
  <figcaption>图 3｜真实整夜 hypnogram 与逐 30 秒计算的 0.5–4 Hz EEG 功率。可以看到前半夜 N3 和慢波功率较高，后半夜 REM 与清醒片段增多。单个受试者只用于展示结构，不代表群体平均。数据：<a href="https://physionet.org/content/sleep-edfx/1.0.0/">PhysioNet Sleep-EDF Expanded</a>；ODC Attribution 1.0；本文重绘。</figcaption>
</figure>

“每个周期固定 90 分钟”是教学近似，不是定律。健康成人的周期长度会在夜内和个体间变化；有的转换经过 N2，有的插入 N1 或短暂觉醒。前半夜慢波活动通常更强，是因为刚入睡时过程 S 较高；后半夜 REM 倾向延长，既涉及睡眠内部动力学，也受到昼夜相位影响。

<figure>
  <img src="/images/sleep-science/04-real-stage-epochs.png" alt="清醒、N1、N2、N3和REM的真实EEG EOG EMG信号" loading="lazy">
  <figcaption>图 4｜同一受试者 W、N1、N2、N3、REM 的真实 30 秒 EEG、EOG 与 EMG 片段。N3 的慢波、REM 的成簇眼动与低肌张力是统计上清楚、但在单 epoch 中仍有噪声的特征。数据与许可同图 3；本文重绘。</figcaption>
</figure>

### （三）频谱比阶段标签多告诉我们什么

对信号 \(x(t)\) 做功率谱估计，可把方差按频率分解。若记功率谱密度为 \(P(f)\)，某频带功率可写作

$$
P_{[f_1,f_2]}=\int_{f_1}^{f_2} P(f)\,df.
$$

N3 中 δ 范围功率显著升高；闭目清醒常有 α 峰；N2 可见 σ 范围的纺锤活动。但频带边界是约定，功率又受导联、参考方式、滤波、年龄、颅骨传导和伪迹影响。同一算法在 Fpz–Cz 与枕区导联得到的谱不应直接当成同一种组织量。

<figure>
  <img src="/images/sleep-science/05-real-eeg-spectra.png" alt="Sleep-EDF不同睡眠阶段的真实EEG功率谱" loading="lazy">
  <figcaption>图 5｜同一夜各阶段 30 秒 epoch 的 Fpz–Cz 功率谱中位数，阴影为四分位距。N3 的低频功率最大，N2 在约 13 Hz 附近出现纺锤相关峰。曲线是实际数据统计，不是理想化教科书曲线。数据与许可同图 3；本文重绘。</figcaption>
</figure>

<figure>
  <img src="/images/sleep-science/06-real-rem-transition.png" alt="真实多导睡眠记录中从NREM向REM转换的七分钟信号" loading="lazy">
  <figcaption>图 6｜一段从浅 NREM 转入 REM 的 7 分钟真实记录。REM 开始后 EOG 眼动更成簇，颏下 EMG 维持低水平；状态边界由 30 秒规则给出，底层生理却是多变量逐步重构。数据与许可同图 3；本文重绘。</figcaption>
</figure>

### （四）消费级手环为什么不能等同 PSG

手环和戒指通常从加速度、光电容积脉搏波、皮温和血氧估计阶段。它们可以连续、低成本地测睡眠—清醒节律，却没有直接测量头皮 EEG 与颏下 EMG。算法常利用“少动 + 心率模式”推断睡眠，因而容易把静卧判成睡眠，并在 N1、N2、N3、REM 之间发生系统性混淆。研究设计应报告设备型号、固件、算法版本、缺失处理和验证人群；“某晚深睡少了 12 分钟”通常小于模型误差，不宜被赋予细胞机制解释。

## 四、人为什么在某个时刻睡：过程 S 与过程 C

### （一）稳态压力：醒得越久，越需要睡

Borbély 的两过程模型把睡眠时序拆成睡眠—清醒依赖的稳态过程 \(S\) 与近 24 小时的昼夜过程 \(C\)。[^5][^6] 一个简化写法是

$$
\frac{dS}{dt}=
\begin{cases}
(S_U-S)/\tau_w, & \text{清醒}\\
-(S-S_L)/\tau_s, & \text{睡眠}
\end{cases}
$$

其中 \(S_U,S_L\) 是上下渐近线，\(\tau_w\) 与 \(\tau_s\) 是积累和消散时间常数。清醒时 \(S\) 上升，睡眠时下降；入睡后 NREM 慢波活动是 \(S\) 的重要读出。通宵后第一段恢复睡眠往往更快进入 N3、慢波功率更高，这比“总共补了多少分钟”更能体现稳态补偿。

腺苷是连接代谢与睡眠压力的重要候选分子。经典微透析研究发现，持续清醒时基底前脑细胞外腺苷增加，恢复睡眠时下降；腺苷又能抑制促醒神经元。[^9] 咖啡因拮抗 A1/A2A 受体，能降低睡意的表达，却没有把此前清醒造成的所有稳态负担从系统中删除。腺苷也不是唯一“睡眠物质”：ATP 代谢、炎症因子、CaMKII、氧化还原、DNA 损伤反应和局部突触使用都可能贡献睡眠压力。

### （二）昼夜节律：生物钟不是疲劳计时器

过程 \(C\) 来自视交叉上核（SCN）主时钟与全身细胞钟网络。SCN 接收视网膜内在光敏神经节细胞的光信息，通过神经、体温、激素和行为通路协调外周时钟。SCN 损毁实验会使睡眠—清醒的日节律破碎，却不一定显著改变 24 小时总睡眠量，说明“何时睡”与“需要睡多少”可以分离。[^7]

人的内源昼夜周期平均略长于 24 小时，个体间有差异；外界明暗、进食、活动与社会时间每天把它重新校准。严格受控实验估计年轻成人内源周期约 24.18 小时，而不是恰好 24.000 小时。[^8] 晚间普通室内光就可能抑制褪黑素并推迟相位，效应取决于强度、光谱、持续时间、既往光照与个体敏感性。

褪黑素最好理解为“生物夜信号”，不是把脑直接关掉的万能睡眠激素。它的分泌相位可标记中央时钟，外源褪黑素既有相位移动效应，也有温和的直接促睡效应；剂量和给药时刻决定两者比例。把失眠一概解释成“缺褪黑素”，会混淆时钟相位、稳态压力、条件性觉醒、呼吸障碍和其他病因。

### （三）两个过程为什么能同时解释“很累却睡不着”

连续清醒到傍晚时，\(S\) 已经很高；但昼夜促醒信号也接近强峰，人可能出现“第二阵精神”。接近惯常睡前，昼夜促醒驱动力下降，高 \(S\) 才越过入睡阈值。清晨时 \(S\) 已在夜间消散，昼夜促醒信号上升，于是觉醒稳定。倒时差和轮班工作的问题，不只是少睡，而是 \(S\)、\(C\)、光照、进食与社会时间相互错位。

两过程模型是极其有用的低维近似，却不是完整分子机制。现代数据表明，睡眠压力具有脑区局部性，昼夜钟也分布在 SCN 之外；阈值会受情绪、奖赏、温度、炎症与社会情境改变。模型成功不意味着脑内存在两个可解剖的“桶”。

## 五、谁在让我们睡着：分布式神经环路，而非单一睡眠中枢

### （一）清醒是一支并行的促醒联盟

稳定清醒依赖多个相互重叠的系统：蓝斑去甲肾上腺素、背缝核 5-羟色胺、结节乳头核组胺、基底前脑乙酰胆碱与 GABA、脑桥胆碱能核团、中脑多巴胺以及外侧下丘脑食欲素/下丘脑分泌素（orexin/hypocretin）神经元。它们在感觉增益、注意、动机、运动准备和自主调节上分工，损伤一个系统常由其他系统部分代偿。

食欲素尤其像“状态稳定器”。Orexin 基因敲除小鼠出现类似发作性睡病的清醒碎裂与猝倒；多数伴猝倒的人类 1 型发作性睡病患者脑脊液 hypocretin-1 极低。[^11][^12] 这说明食欲素并非制造所有清醒内容，而是帮助促醒网络抵抗突然坠入睡眠或 REM 肌张力抑制。

### （二）入睡是主动抑制与网络重构

腹外侧视前区（VLPO）和邻近视前区包含睡眠活跃、可向结节乳头核等促醒区域投射的 GABA/galanin 神经元。早期 Fos 与示踪实验首先建立了这一联系；后续细胞类型操纵进一步显示，视前区内部并非一个同质“睡眠开关”，不同亚群可影响 NREM、体温和清醒。[^10][^13]

睡眠促进与清醒促进系统之间的相互抑制常被画成 flip-flop 开关。这个模型解释了正常转换为何相对迅速、边界为何稳定，也解释食欲素缺失为何造成状态入侵。但真实系统存在过渡、混合与局部睡眠；图 6 的连续信号已经表明，生理不必遵守电路图里的理想瞬时切换。

### （三）NREM 的慢波、纺锤和涟漪如何形成层级节律

深 NREM 中，皮层神经元群在去极化 up state 与超极化 down state 之间同步摆动，头皮表现为慢振荡和高慢波功率。丘脑网状核—丘脑皮层回路产生约 11–16 Hz 睡眠纺锤；海马则在尖波—涟漪中短暂重放神经序列。这三种时间尺度可以嵌套：慢振荡的相位组织纺锤，纺锤窗口又与海马涟漪耦合，从而为跨区域可塑性提供时序条件。细胞内记录与多尺度电生理支持这一框架。[^14]

### （四）REM 是一种脑干—下丘脑—皮层共同维持的奇特状态

REM 同时具备“脑电像醒、身体像被制动”的组合。脑桥和延髓的 REM-on/REM-off 回路改变丘脑皮层激活；延髓抑制性通路降低脊髓运动神经元输出，造成姿势肌张力低下；呼吸、心率和体温调节更不规则。特定延髓 GABA 能神经元的因果操纵能够影响 REM 及肌张力抑制，但没有一个细胞群独自等同于 REM。[^15]

## 六、睡着以后，大脑没有停：它改变了计算方式

### （一）外部在线计算减少，内部生成与重放增加

清醒时，大脑需要把高带宽感觉输入与行动目标实时耦合。睡眠降低感觉门控和骨骼肌输出，却保留并重组内部动力学。NREM 的高同步慢波适合形成离散时间窗；REM 的去同步活动、海马 θ 节律和神经调质环境则更接近内部生成的虚拟情境。

这不是简单的“白天采集、夜间存盘”。有些记忆在安静清醒时也会巩固；有些学习依赖睡眠；有些内容在睡眠中被削弱或泛化。睡眠改变的是可塑性的边界条件与竞争规则，而不是替所有记忆按下保存键。

### （二）记忆重放：最直接的“睡觉时在做什么”证据之一

1994 年，Wilson 与 McNaughton 同时记录大鼠海马位置细胞，发现动物探索空间时共同放电的细胞在随后慢波睡眠中更倾向共同再激活。[^16] 后续研究显示，尖波—涟漪中的序列可按压缩时间重放；在睡眠中干扰涟漪会损害某些空间记忆，说明重放不只是学习留下的无功能回声。[^17]

人类的目标记忆再激活（targeted memory reactivation, TMR）提供另一条因果线索。学习空间位置时配对一种气味，随后在慢波睡眠重新呈现同一气味，可增强海马依赖记忆，并诱发海马活动；相同气味在 REM 或清醒期呈现没有同样效果。[^18] 在慢振荡特定相位闭环播放声音，也能增强慢振荡并改善次日记忆。[^19]

最有解释力的模型不是“记忆从海马搬到皮层”这一单向仓库比喻，而是**主动系统巩固**：海马快速索引近期事件，新皮层从多次、选择性重放中修改既有模型；慢振荡—纺锤—涟漪的相位耦合决定何时交换。不同记忆、脑区与任务的依赖不同，所谓“睡眠提升记忆”是条件命题。

### （三）突触稳态：睡眠是在普遍削弱连接吗

清醒学习总体上会增加部分突触强度与能耗。如果所有连接只增不减，网络会饱和、噪声增加并失去继续学习的动态范围。突触稳态假说据此提出：睡眠对清醒期净增强进行选择性重标定，保留重要结构，同时降低大量较弱连接的增益。

三维串行电镜研究重建了小鼠感觉与运动皮层 6920 个突触，发现睡眠后轴突—棘突界面平均较清醒后小约 18%；效应主要出现在约 80% 的小中型突触，最大、较稳定的突触相对保留。[^20] 另一研究显示，即刻早期蛋白 Homer1a 在睡眠中进入兴奋性突触，参与 AMPA 受体移除和尺度下调。[^21]

这支持“选择性重整”，不支持“睡一觉把所有突触统一削弱”。不同发育阶段、脑区、学习历史和突触类型可能出现增长、稳定或下降。睡眠中的记忆巩固与突触下调也不矛盾：网络可在总体降增益时，对少数任务相关通路重新分配相对权重。

### （四）局部睡眠：脑可以一部分先睡

人类完成依赖特定顶叶区域的视觉—运动适应任务后，随后睡眠中对应皮层的慢波活动局部增加，而且增加量与次日成绩改善相关。[^22] 大鼠在长时间清醒时，局部皮层神经元群可短暂进入类似 NREM down state，即使动物外表仍醒着；事件发生时，相应行为错误增多。[^23] 健康清醒人类的高密度 EEG 也显示，局部睡眠样慢波可预测注意游离、思维空白和冲动或迟缓反应。[^24]

因此，“整个脑在某一毫秒同时入睡”只是宏观近似。睡眠有全局协调，也有局部使用依赖；这为疲劳时“眼睛睁着却漏掉信息”提供了机制桥梁。

## 七、梦：睡眠不是无意识的同义词

梦报告在 REM 中最常见且更生动，但 NREM 也可有丰富体验。高密度 EEG 的定时唤醒研究发现，无论 NREM 还是 REM，报告有梦相对于无体验都与后部皮层“热点”低频功率局部下降相关；高频活动的位置又与面孔、空间和运动等梦内容相关。[^25] 这说明意识有无不能简单由全脑睡眠阶段决定。

清醒梦提供罕见的在线接口。熟练梦者能在确认自己做梦后，按约定左右移动眼球，在 EOG 留下时间标记。跨实验室研究甚至让处于验证 REM 的梦者听到问题，并用眼动或面部肌肉回答简单算术，证明部分睡眠中的意识可以双向交互。[^26] 但清醒梦样本小、个体高度选择，眼动伪迹又会污染额区高频 EEG；不能据此断言发现了“梦的单一频率”。

梦是否有独立适应功能仍开放。它可能是记忆重组、威胁模拟、情绪处理或生成模型更新的主观表面，也可能部分是这些神经过程的副产物。证明某脑区在梦中活跃，尚不能证明“人是为了做梦才进入 REM”。

## 八、细胞与脑液层面的维护：最吸引人，也最容易被夸大

### （一）“睡眠给大脑排毒”：有重要发现，但结论尚未封口

2013 年小鼠研究报告，自然睡眠或麻醉时脑间质空间增大，脑脊液—间质液交换增强，示踪物与 β-淀粉样蛋白清除加快，由此推动“类淋巴系统”假说。[^27] 2019 年同时 EEG-fMRI 的人类研究发现，NREM 慢波后接血流动力学变化与约 0.05 Hz 的大幅脑脊液流入波，证明人的睡眠中确有神经—血管—脑液耦合。[^28]

2024 年一项小鼠研究进一步通过化学遗传和光遗传操纵指出，同步神经活动产生的离子波可组织脑脊液灌注；人工增强波动能提高灌注。[^29] 但同年另一研究用荧光染料从脑实质向外的清除来测量，得到睡眠和麻醉时清除率反而下降的结果，并指出“染料进入更多”可能被误读为“排出更快”。[^30]

这些结果并非简单互相取消。**流入、混合、对流、扩散和最终外排是不同过程**；示踪物大小、注射位置、麻醉药、血压、体温、觉醒方式和观测时间窗都可能改变答案。现在较稳妥的表述是：睡眠显著重构脑液、血管与细胞外空间动力学；它是否对所有代谢物都产生净清除增益、在人脑中贡献多大、是否是睡眠不可替代的核心功能，仍需定量解决。

此外，脑间质 tau 水平随睡眠—清醒周期变化，小鼠睡眠剥夺与人类夜间清醒都可提高细胞外 tau。[^31] 这为长期睡眠紊乱与神经退行性疾病之间提供机制线索，却不等于“熬一夜就会得阿尔茨海默病”，也不证明改善睡眠能逆转既有病理。

### （二）DNA 修复：从单细胞成像得到的因果链

活体斑马鱼单细胞成像发现，清醒时神经元 DNA 双链断裂标记累积；睡眠时染色体运动增加，并与损伤降低相关。操纵神经活动、睡眠和染色体动力学后，研究者提出睡眠为神经元核维护提供时间窗。[^32] 后续研究显示，诱导 DNA 损伤可增加睡眠，PARP1 感知损伤并促进睡眠；抑制 PARP1 会降低睡眠相关染色体运动与修复活动。[^33]

这是很漂亮的“负担—感知—睡眠—修复—负担下降”闭环，但主要证据来自斑马鱼和小鼠。人脑不同细胞类型是否以相同方式依赖睡眠、需要何种阶段、效应对长期功能有多大，仍未知。它应被写成强动物机制、待验证人类外推，而非确定的人类夜间保养说明书。

### （三）蛋白稳态、氧化应激和线粒体负担

神经元持续放电、突触囊泡循环与蛋白合成会产生活性氧、错误折叠蛋白和细胞器损耗。睡眠改变抗氧化、未折叠蛋白反应、自噬和线粒体相关通路，但这些通路既受睡眠状态影响，也受昼夜相位控制，取样时间若不匹配极易混淆。

在果蝇和小鼠的极端睡眠剥夺模型中，肠道活性氧在死亡前累积；清除活性氧能延长生存，即使未恢复睡眠。[^34] 这把睡眠缺失的致死效应从“纯脑损伤”扩展到脑—肠—全身轴。它同时提醒我们：极端剥夺死亡机制未必等同于普通人少睡两小时的慢性风险。

## 九、身体在睡觉时做什么：全身调度，而不只是脑内维护

### （一）自主神经与心血管状态重排

NREM 通常伴随交感活动、心率和血压下降，呼吸更规则；REM 中自主波动增大，心率与呼吸更不稳定。正常夜间“降压”来自睡眠状态与昼夜时钟共同作用。阻塞性睡眠呼吸暂停中的反复缺氧、胸腔负压与微觉醒会频繁打断这套模式，因此“躺床八小时”不能替代连续、呼吸稳定的睡眠。

### （二）内分泌不是整夜匀速分泌

生长激素的大脉冲常与入睡后早期慢波睡眠耦合；皮质醇在生物夜早期较低，清晨受昼夜驱动上升；催乳素、甲状腺轴、性腺轴与葡萄糖调节也同时受睡眠和时钟影响。实验若只在早晨抽一次血，很难判断变化来自睡眠阶段、总时长、昼夜相位还是进食时间。

受控研究让健康男性连续一周每晚只有 5 小时睡眠机会，静脉葡萄糖耐量和高胰岛素正常血糖钳测得的胰岛素敏感性均下降；样本仅 20 人，且不能自动外推到所有性别、年龄和长期生活情境。[^35] 这类实验说明短睡能在短期内因果改变代谢，却不意味着单晚变化等于慢性糖尿病结局。

### （三）睡眠节能，但“为了省能”解释不完

全房间间接测热研究中，7 名成人一夜不睡使首个 24 小时能量消耗较基线增加约 7%，恢复期降低约 5%。[^36] 睡眠确实节省能量、降低运动与感觉处理成本，但数量级不足以独自解释动物为何冒着被捕食的风险失去响应能力数小时。安静躺着也能省下大量能量，却不能完全偿还睡眠压力。

睡眠不足还常增加进食机会和奖励性食物摄入。一项住院随机交叉实验中，限制睡眠 14 天使参与者摄入更多热量并增加腹部内脏脂肪，即使体重变化并未完全反映脂肪重新分布。[^37] 能量平衡因此是摄入、消耗、激素、奖励和时钟错位的合成，而不是一句“熬夜代谢变慢”。

### （四）免疫系统也有夜间时序

睡眠与先天、适应性免疫双向作用：感染与炎症因子能增加 NREM 倾向，睡眠又改变抗原呈递、T 细胞迁移和抗体反应。自然环境中用体动计测得较短睡眠的成人，在乙肝疫苗系列后抗体反应较低、达到临床保护阈值的概率也较低。[^38] 但观察研究仍可能受压力、行为和健康状态混杂，其他疫苗与轮班研究也并非全部同方向。

更准确的结论不是“睡眠增强免疫”这一单箭头，而是：睡眠—昼夜系统为免疫反应规定时间结构；不足、碎片化与相位错位可能改变这套结构，效应依抗原、性别、既往免疫和采样时刻而变。

## 十、为什么非睡不可：寻找不可替代功能

一个过程与睡眠同时发生，不代表它必须在睡眠中发生。要论证“为什么睡”，至少应满足其中若干条件：

1. 负担随清醒增加、随睡眠下降；
2. 选择性剥夺某阶段会产生对应缺陷；
3. 人为增强关键睡眠事件能改善终点；
4. 在不改变睡眠的情况下破坏候选过程，会复制缺陷；
5. 恢复候选过程能够救援缺陷；
6. 跨物种变化符合生态与神经系统约束。

记忆涟漪干扰、慢波闭环刺激、PARP1 与 DNA 修复、果蝇肠道活性氧救援都沿这条因果阶梯前进，但没有一项覆盖睡眠的全部表型。最合理的综合解释是**机会窗口 + 动力学制度**：

- 降低对外界的持续响应，减少新输入对可塑性和内部重放的干扰；
- 用慢振荡、纺锤、涟漪和 REM 等阶段化节律，把互相不兼容的计算分时执行；
- 降低运动与部分神经调质水平，允许温度、代谢、膜受体和基因表达进入另一工作区间；
- 将脑内维护与全身免疫、内分泌、循环和能量状态同步。

由此看，睡眠可能不是被某个单一“垃圾处理任务”迫使出现，而是演化形成的一种受控离线策略，使许多在高警觉、持续输入和行动状态下成本更高或互相干扰的过程成套发生。

## 十一、跨物种演化：动物不是不睡，而是想办法安全地睡

<figure>
  <img src="/images/sleep-science/07-drosophila.jpg" alt="黑腹果蝇真实微距照片" loading="lazy">
  <figcaption>图 7｜黑腹果蝇（<em>Drosophila melanogaster</em>）真实照片。果蝇研究把睡眠从哺乳动物 EEG 问题扩展为可遗传操纵的细胞与行为问题。此照片用于展示物种，不是文中实验个体。摄影：Alexis Tinker-Tsavalas，经 <a href="https://commons.wikimedia.org/wiki/File:Drosophila_melanogaster_53362116.jpg">Wikimedia Commons / iNaturalist</a>；CC BY 4.0；本文缩放。</figcaption>
</figure>

2000 年前后，两组研究者证明果蝇的长时间静止具有固定姿势、反应阈值提高、咖啡因敏感和剥夺后反弹等特征，建立了现代果蝇睡眠模型。[^39][^40] 此后，昼夜钟基因、离子通道、神经肽、胶质细胞和代谢通路得以用高通量遗传学研究。果蝇的“睡眠”按连续不动 5 分钟等行为规则定义，与人类 PSG 分期不同；模型的力量来自可检验机制，而非表面相似。

<figure>
  <img src="/images/sleep-science/08-cassiopea.jpg" alt="倒立水母Cassiopea xamachana真实水下照片" loading="lazy">
  <figcaption>图 8｜倒立水母 <em>Cassiopea xamachana</em> 真实照片。该属没有中央化大脑，却表现出可逆静止、反应阈值升高和剥夺后补偿，提示睡眠样状态在动物演化中非常古老。照片不是实验个体。摄影：Marco Almbauer，经 <a href="https://commons.wikimedia.org/wiki/File:Upside-down_jellyfish_(Cassiopea_xamachana).jpg">Wikimedia Commons</a>；作者释入公共领域；本文缩放。</figcaption>
</figure>

线虫发育期 lethargus、斑马鱼的神经活动状态、章鱼的安静/活跃睡眠以及水母睡眠样行为表明，睡眠不是皮层的专利。斑马鱼全脑成像甚至发现与哺乳动物慢波睡眠、REM 样状态相对应的神经动力学。[^41] 但同源与类比要区分：相似的行为标准可能由共同祖先保留，也可能是不同神经系统对维护压力的趋同解法。

### （一）飞着睡：军舰鸟把睡眠压到生态允许的缝隙里

<figure>
  <img src="/images/sleep-science/09-frigatebird.jpg" alt="飞行中的丽色军舰鸟真实照片" loading="lazy">
  <figcaption>图 9｜飞行中的丽色军舰鸟（<em>Fregata magnificens</em>）真实照片，用于展示军舰鸟的飞行生态。脑电实验研究的是近缘大军舰鸟（<em>F. minor</em>），并非此照片个体。摄影：Jongleur100，经 <a href="https://commons.wikimedia.org/wiki/File:FrigateBird.jpg">Wikimedia Commons</a>；作者释入公共领域；本文缩放。</figcaption>
</figure>

研究者给跨洋飞行的大军舰鸟佩戴双半球 EEG 和运动记录器，直接证明鸟可以在飞行中单半球或双半球睡眠。然而它们在飞行中平均每天仅睡约 0.69 小时，远少于陆地时睡眠，且短慢波片段多发生在盘旋滑翔。[^42] 单半球睡眠不是“照常睡满八小时”的魔法，而是一种在注意需求、气动控制和稳态压力之间的妥协。

### （二）潜水中睡：象海豹把风险、氧气和睡眠放进同一个轨迹

<figure>
  <img src="/images/sleep-science/10-elephant-seal.jpg" alt="海岸上睡眠的北象海豹真实照片" loading="lazy">
  <figcaption>图 10｜海岸上睡眠的北象海豹（<em>Mirounga angustirostris</em>）真实照片。野外 EEG 研究发现，该物种可在深潜中以不足 20 分钟的短周期睡眠；此照片不是论文中的带记录器个体。摄影：Robert Schwemmer / NOAA，经 <a href="https://commons.wikimedia.org/wiki/File:Northern_elephant_seal_sleeping.PNG">Wikimedia Commons</a>；美国政府作品，公共领域；本文放大转为 JPEG。</figcaption>
</figure>

北象海豹野外 EEG 显示，它们在下潜过程中进入短 NREM 和 REM，身体呈螺旋下沉；研究记录到 104 次睡眠潜水，并把脑电—运动模式推广到数百只动物的长期轨迹。远洋数月中它们平均每天约睡 2 小时，上岸后显著增加。[^43] 这说明睡眠量有极强生态可塑性，也说明不能从一个物种的平均时长推出睡眠的普适函数。

### （三）长睡者与短睡者都不是反例

<figure>
  <img src="/images/sleep-science/11-sleeping-bat.jpg" alt="倒挂睡眠的蝙蝠真实照片" loading="lazy">
  <figcaption>图 11｜倒挂睡眠的蝙蝠真实照片。许多蝙蝠表现出很长的静息/睡眠时间，但物种估计高度受记录方法、圈养环境、温度和静息误判影响；照片只展示真实姿势。摄影：Agravanteflav，经 <a href="https://commons.wikimedia.org/wiki/File:Bat_sleeping.jpg">Wikimedia Commons</a>；CC0 1.0；本文缩放。</figcaption>
</figure>

动物睡眠时长与体型、食性、捕食风险、栖息地、迁徙、育幼和测量方法纠缠。圈养食肉动物可能因安全且无事可做而长时间静息；野外大型草食动物必须花很久进食；海洋哺乳动物受呼吸和浮力约束。比较研究若只把教科书“每天小时数”与脑大小做回归，容易把生态和测量偏差当成进化规律。

更有信息量的是动物如何改变睡眠：单半球化、碎片化、在飞行或潜水中嵌入、迁徙期暂时压缩、繁殖竞争时减少，以及安全后反弹。演化没有找到普适的零睡眠脊椎动物，而是不断改造睡眠的实现方式。

## 十二、少睡会怎样：先区分总剥夺、限制、碎片化与错相

### （一）不同实验不是同一种“睡眠不足”

| 暴露 | 典型操作 | 主要混杂 |
|---|---|---|
| 总睡眠剥夺 | 连续 24–88 小时不睡 | 应激、活动增加、光照与进食异常 |
| 部分睡眠限制 | 多晚缩短睡眠机会 | 慢性累积、周末恢复、个体脆弱性 |
| 睡眠碎片化 | 反复唤醒而总时长可能近似 | 唤醒本身的交感和应激效应 |
| 阶段选择性剥夺 | 一出现 REM 或慢波就唤醒 | 无法只改变一个阶段，继发反弹 |
| 昼夜错相 | 强迫去同步、夜班、倒时差 | 睡眠损失与时钟错位共同存在 |

研究结论只有在暴露类型一致时才能合并。“轮班与糖尿病相关”不能直接证明原因是 REM 少；“一夜不睡炎症指标上升”也不能代表长期每晚睡 6 小时的效应大小。

### （二）注意和执行控制：主观适应快于客观恢复

经典剂量—反应实验将健康成人分到每晚 4、6 或 8 小时睡眠机会，持续 14 天，并与连续总剥夺比较。4 小时和 6 小时组的警觉性遗漏与认知缺陷逐日累积；参与者的主观困倦却没有同幅度上升。[^44] 人会习惯“觉得自己还能撑”，不等于神经行为性能已适应。

反应时平均值还会掩盖风险。睡眠不足的标志常是分布尾部出现极慢反应和短暂遗漏，即微睡眠或局部睡眠侵入。对驾驶、手术、实验操作和线上系统值守而言，一千次正常反应不能抵消一次关键漏检。

### （三）极端剥夺致死说明什么，又不能说明什么

持续强制剥夺可导致大鼠和果蝇死亡，并伴随能量失衡、体温调节失败、感染易感和氧化损伤。但装置本身的运动、压力、进食改变和物种差异难以完全排除。果蝇肠道活性氧救援实验显著加强了因果解释，却仍不是对人类正常短睡的伦理可行复制。[^34]

致死性家族性失眠也常被当作“人不睡必死”的直接证明。它是 PRNP D178N 与 129 位点背景相关的罕见朊病毒病，选择性损伤丘脑及其他网络，产生睡眠结构崩解、自主过度激活和运动症状。原始遗传病理研究确立了它的朊蛋白机制。[^45] 患者死亡来自进行性神经退行性疾病的全身后果，不能把它简化成普通失眠的极端版本。

## 十三、每个人需要的睡眠一样吗

年龄、发育、基因、既往睡眠、疾病、药物、光照、运动与社会时程都会改变睡眠表型。婴幼儿 REM 比例高且睡眠多相；青春期生物钟倾向推迟；老年人慢波振幅和睡眠连续性通常下降。EEG 的年龄变化部分来自皮层突触密度和颅骨传导变化，不能把“手环深睡减少”直接等同于修复失败。

人群中确有自然短睡者。一个家系的 DEC2/BHLHE41 P385R 变异与较短睡眠相关，将对应变异引入小鼠和果蝇也改变睡眠量与剥夺反应。[^46] 后续 ADRB1 等罕见变异也被报告。[^47] 这证明睡眠需要量具有遗传差异，却不支持普通人通过意志“训练成基因短睡者”。罕见变异的效应、外显率与健康结局需要长期、独立队列验证。

真正的睡眠需要量不是“能在床上睡多久”，而是使白天功能、情绪、代谢和稳态指标在长期内保持良好的剂量。它很难由单晚延长睡眠测试精确识别，因为机会、习惯、时钟相位与补偿睡眠会共同影响结果。

## 十四、八个常见误解

### 1. “睡眠时大脑只消耗很少能量”

全脑能量消耗并未降到接近零，REM 某些区域活动可接近或超过清醒。真正改变的是区域分配、神经调质、同步方式、感觉输入和行为输出。节能是收益之一，不是停机证明。

### 2. “梦只发生在 REM”

REM 梦报告更频繁、更生动，但 NREM 也有梦。梦的出现与后部皮层局部活动比与阶段标签一一对应更紧密。[^25]

### 3. “睡眠周期严格等于 90 分钟”

周期是有分布的，夜内会变化，还可被年龄、药物、剥夺和疾病改变。图 3 的真实夜晚已显示它不是等宽矩形。

### 4. “深睡越多越好”

阶段比例有年龄与个体背景。异常高慢波可能是剥夺后的反弹，也可能受药物或病理影响；单纯最大化 N3 会挤占其他状态。应关注原因、连续性与功能，而不是阶段排行榜。

### 5. “褪黑素就是天然安眠药”

褪黑素的核心作用是传递生物夜和移动时钟相位，直接催眠效应相对温和且依时相而异。错误时刻使用可能把时钟推向不想要的方向。

### 6. “麻醉等于补觉”

麻醉与自然睡眠共享某些回路和 EEG 模式，却缺少正常 NREM—REM 架构，药物还直接改变循环、体温与分子通路。出现慢波不等于完成了所有睡眠功能。

### 7. “周末睡一觉能把整周完全清零”

恢复睡眠会降低压力并改善部分表现，但不同功能恢复时间不同；延迟起床还可能推迟昼夜相位。是否恢复要用具体终点测量，不能只看主观精神。

### 8. “手环显示睡够，所以白天困与睡眠无关”

消费设备对睡眠—清醒估计有用，对阶段和呼吸事件能力有限。白天嗜睡还可来自睡眠呼吸障碍、周期性肢动、昼夜节律错位、药物、抑郁、贫血、甲状腺问题和神经系统疾病；反过来，主观失眠也可能与 PSG 总睡眠不完全一致。

## 十五、太空站的夜晚：当环境不再替时钟报时

<figure>
  <img src="/images/sleep-science/12-iss-night.jpg" alt="国际空间站乘员睡眠时舱内的真实照片" loading="lazy">
  <figcaption>图 12｜国际空间站第 38 远征队乘员睡眠时的舱内真实场景，摄于 2013 年 11 月 20 日。微重力、人工照明、任务排程与快速明暗变化把睡眠调控中的环境因素放大。摄影：NASA，照片编号 ISS038-E-006151，经 <a href="https://commons.wikimedia.org/wiki/File:ISS-38_Space_Station_while_the_crew_is_asleep.jpg">Wikimedia Commons</a>；美国政府作品，公共领域；本文缩放。</figcaption>
</figure>

太空飞行把睡眠问题从“个人习惯”变成系统工程：任务排程、噪声、温度、光谱、微重力、运动、压力与通信时区同时作用。没有稳定自然明暗时，照明必须承担时钟校准与视觉作业两种功能；而促进夜间警觉的光，可能推迟之后的生物夜。这个例子说明，睡眠不是孤立器官行为，而是脑、身体、环境和社会时钟的耦合结果。

同样的逻辑适用于医院、潜艇、极地站、夜班工厂和 24 小时算力运维。真正有效的疲劳风险管理不能只要求个体“自律早睡”，还要设计轮班方向、光照时相、任务冗余、关键操作窗口和可恢复的睡眠机会。

## 十六、博士生怎样研究睡眠：六个方法学陷阱

### （一）把睡眠效应与昼夜效应分开

晚上测“睡眠组”、早晨测“清醒组”，时间本身就不同。优先采用交叉设计、恒定常规、强迫去同步或至少匹配采样时相；同时记录光照、进食、体温和褪黑素相位。转录组和代谢组尤其容易把昼夜振荡误写成睡眠依赖。

### （二）睡眠剥夺不是一把无副作用的橡皮擦

轻拍、转笼、水平台、声音和社交刺激都会引入运动与应激。需要程序对照、应激指标、等量刺激或遗传/光遗传替代，并确认干预没有直接改变候选终点。若剥夺方法本身制造 ROS，就不能只凭 ROS 上升断言来自缺睡。

### （三）阶段时间、事件密度与相位耦合不要混为一谈

相同 N2 分钟数可以有不同纺锤密度；相同纺锤数可以与慢振荡处于不同相位；相同慢波功率可以由不同传播方向和局部源产生。机制研究应从“睡了多久”推进到事件检测、交叉频率耦合、空间传播和闭环因果干预。

### （四）个体内效应与个体间相关不同

“纺锤多的人记忆好”可能由年龄、智力或颅骨传导驱动，不代表让同一个人纺锤增加就会改善记忆。多层模型应拆开 within-person 与 between-person 斜率；干预研究应报告基线、顺序效应和个体响应分布。

### （五）自动分期要防止受试者泄漏

同一人的不同夜晚或相邻 epoch 高度相关。若随机把 epoch 分到训练和测试集，模型会识别人和夜，而不是真正泛化的睡眠阶段。应按受试者划分，外部验证不同设备/中心，并报告类别不平衡下的 macro-F1、Cohen's κ、混淆矩阵和校准，而不仅是准确率。

### （六）中间生物标志物不等于健康结局

慢波功率、脑脊液波、某个炎症因子、DNA 损伤标记和第二天记忆分数都很重要，但它们处于不同因果层。理想研究预先画出有向无环图，明确暴露、中介、混杂和结局；进行必要性、充分性与救援实验；对多重比较、探索性分析和阴性结果保持透明。

一个可复现的睡眠研究报告至少应给出：受试者纳排、年龄与性别结构、惯常作息、时间型、光照和咖啡因、适应夜、记录导联和参考、滤波与采样率、评分规则与盲法、阶段/事件定义、伪迹剔除、缺失值、主要终点、功效分析、代码与数据可用性。

## 十七、仍未解决的核心问题

1. **是否存在跨所有动物的最小核心功能？**水母、果蝇与人类共享的是细胞维护逻辑、网络可塑性，还是只有“可逆静止 + 稳态反弹”的功能类比？
2. **局部睡眠如何升级为全局行为状态？**哪些细胞负担被局部感知，何时需要脑干、下丘脑和丘脑把状态广播到全身？
3. **NREM 与 REM 为什么交替？**是互补计算、稳态对抗、神经调质复位，还是多种约束共同产生的极限环？
4. **脑液运动的净功能到底是什么？**需要同时量化流入、混合、细胞外扩散、血管周路径、淋巴外排及具体溶质，而非只看单一染料亮度。
5. **梦与记忆重组的因果关系是什么？**主观体验是机制的一部分、可读出表面，还是旁生现象？
6. **为什么不同人对睡眠限制的脆弱性如此稳定？**基因、受体可用性、脑网络储备、免疫代谢状态与行为补偿各占多少？
7. **传统阶段是否应被连续状态空间取代？**临床规则需要可解释的离散标签，基础研究却可能更适合神经动力学流形和局部状态。
8. **怎样把动物因果机制安全地验证到人？**闭环感觉刺激、无创脑刺激、机会性颅内记录、PET 配体和纵向多组学各有窗口，也各有测量偏差。

这些未解问题不是睡眠科学“不知道睡眠有什么用”的证据，而是说明一个覆盖分子、细胞、回路、认知、内脏和生态的状态不可能被一句口号耗尽。

## 结语：睡眠是一种有代价的生物学秩序

从外面看，睡眠是静止、闭眼和不回应；从 EEG 看，它是 NREM 与 REM 的周期状态；从神经元看，它是同步、去同步、重放、局部沉默和神经调质重配；从细胞看，它涉及突触受体、染色体运动、代谢与氧化还原；从全身看，它重新安排循环、体温、内分泌、免疫与能量；从演化看，它是动物在维护收益与环境风险之间反复优化、却没有轻易舍弃的策略。

所以，“人为什么要睡”最科学的短答不是“为了休息”“为了排毒”或“为了记忆”，而是：**持续清醒把神经系统和全身推向一组累积负担；睡眠用一套阶段化、可逆、受时钟约束的动力学，完成清醒状态难以同时完成的重整与维护。**哪些过程是核心、哪些是搭便车、它们在人类一生中怎样改变，仍是开放的科研前沿。

## 参考文献与数据源

[^1]: American Academy of Sleep Medicine. *The AASM Manual for the Scoring of Sleep and Associated Events*. 官方分期与事件评分资源：[AASM Scoring Manual](https://aasm.org/clinical-resources/scoring-manual/)。

[^2]: Kemp B. *Sleep-EDF Database Expanded*, PhysioNet v1.0.0 (2013/2018). [数据集主页](https://physionet.org/content/sleep-edfx/1.0.0/)；[ODC Attribution 1.0 许可](https://physionet.org/content/sleep-edfx/view-license/1.0.0/)。

[^3]: Kemp B, Zwinderman AH, Tuk B, Kamphuisen HAC, Oberyé JJL. Analysis of a sleep-dependent neuronal feedback loop: the slow-wave microcontinuity of the EEG. *IEEE Trans Biomed Eng*. 2000;47:1185–1194. [doi:10.1109/10.867928](https://doi.org/10.1109/10.867928)。

[^4]: Nath RD, Bedbrook CN, Abrams MJ, et al. The Jellyfish *Cassiopea* Exhibits a Sleep-like State. *Current Biology*. 2017;27:2984–2990.e3. [doi:10.1016/j.cub.2017.08.014](https://doi.org/10.1016/j.cub.2017.08.014)。

[^5]: Borbély AA. A two process model of sleep regulation. *Human Neurobiology*. 1982;1:195–204. [PubMed 7185792](https://pubmed.ncbi.nlm.nih.gov/7185792/)。

[^6]: Daan S, Beersma DGM, Borbély AA. Timing of human sleep: recovery process gated by a circadian pacemaker. *Am J Physiol*. 1984;246:R161–R183. [doi:10.1152/ajpregu.1984.246.2.R161](https://doi.org/10.1152/ajpregu.1984.246.2.R161)。

[^7]: Ibuka N, Nihonmatsu I, Sekiguchi S. Sleep-wakefulness rhythms in mice after suprachiasmatic nucleus lesions. *Waking Sleeping*. 1980;4:167–173. [PubMed 7190752](https://pubmed.ncbi.nlm.nih.gov/7190752/)。

[^8]: Czeisler CA, Duffy JF, Shanahan TL, et al. Stability, precision, and near-24-hour period of the human circadian pacemaker. *Science*. 1999;284:2177–2181. [doi:10.1126/science.284.5423.2177](https://doi.org/10.1126/science.284.5423.2177)。

[^9]: Porkka-Heiskanen T, Strecker RE, Thakkar M, et al. Adenosine: a mediator of the sleep-inducing effects of prolonged wakefulness. *Science*. 1997;276:1265–1268. [doi:10.1126/science.276.5316.1265](https://doi.org/10.1126/science.276.5316.1265)。

[^10]: Sherin JE, Shiromani PJ, McCarley RW, Saper CB. Activation of ventrolateral preoptic neurons during sleep. *Science*. 1996;271:216–219. [doi:10.1126/science.271.5246.216](https://doi.org/10.1126/science.271.5246.216)。

[^11]: Chemelli RM, Willie JT, Sinton CM, et al. Narcolepsy in orexin knockout mice: molecular genetics of sleep regulation. *Cell*. 1999;98:437–451. [doi:10.1016/S0092-8674(00)81973-X](https://doi.org/10.1016/S0092-8674(00)81973-X)。

[^12]: Nishino S, Ripley B, Overeem S, et al. Low cerebrospinal fluid hypocretin (orexin) and altered energy homeostasis in human narcolepsy. *Ann Neurol*. 2001;50:381–388. [doi:10.1002/ana.1130](https://doi.org/10.1002/ana.1130)。

[^13]: Chung S, Weber F, Zhong P, et al. Identification of preoptic sleep neurons using retrograde labelling and gene profiling. *Nature*. 2017;545:477–481. [doi:10.1038/nature22350](https://doi.org/10.1038/nature22350)。

[^14]: Steriade M, Nuñez A, Amzica F. A novel slow (<1 Hz) oscillation of neocortical neurons in vivo. *J Neurosci*. 1993;13:3252–3265. [doi:10.1523/JNEUROSCI.13-08-03252.1993](https://doi.org/10.1523/JNEUROSCI.13-08-03252.1993)。

[^15]: Weber F, Chung S, Beier KT, et al. Control of REM sleep by ventral medulla GABAergic neurons. *Nature*. 2015;526:435–438. [doi:10.1038/nature14979](https://doi.org/10.1038/nature14979)。

[^16]: Wilson MA, McNaughton BL. Reactivation of hippocampal ensemble memories during sleep. *Science*. 1994;265:676–679. [doi:10.1126/science.8036517](https://doi.org/10.1126/science.8036517)。

[^17]: Girardeau G, Benchenane K, Wiener SI, Buzsáki G, Zugaro MB. Selective suppression of hippocampal ripples impairs spatial memory. *Nature Neuroscience*. 2009;12:1222–1223. [doi:10.1038/nn.2384](https://doi.org/10.1038/nn.2384)。

[^18]: Rasch B, Büchel C, Gais S, Born J. Odor cues during slow-wave sleep prompt declarative memory consolidation. *Science*. 2007;315:1426–1429. [doi:10.1126/science.1138581](https://doi.org/10.1126/science.1138581)。

[^19]: Ngo HVV, Martinetz T, Born J, Mölle M. Auditory closed-loop stimulation of the sleep slow oscillation enhances memory. *Neuron*. 2013;78:545–553. [doi:10.1016/j.neuron.2013.03.006](https://doi.org/10.1016/j.neuron.2013.03.006)。

[^20]: de Vivo L, Bellesi M, Marshall W, et al. Ultrastructural evidence for synaptic scaling across the wake/sleep cycle. *Science*. 2017;355:507–510. [doi:10.1126/science.aah5982](https://doi.org/10.1126/science.aah5982)。

[^21]: Diering GH, Nirujogi RS, Roth RH, et al. Homer1a drives homeostatic scaling-down of excitatory synapses during sleep. *Science*. 2017;355:511–515. [doi:10.1126/science.aai8355](https://doi.org/10.1126/science.aai8355)。

[^22]: Huber R, Ghilardi MF, Massimini M, Tononi G. Local sleep and learning. *Nature*. 2004;430:78–81. [doi:10.1038/nature02663](https://doi.org/10.1038/nature02663)。

[^23]: Vyazovskiy VV, Olcese U, Hanlon EC, et al. Local sleep in awake rats. *Nature*. 2011;472:443–447. [doi:10.1038/nature10009](https://doi.org/10.1038/nature10009)。

[^24]: Andrillon T, Burns A, Mackay T, Windt J, Tsuchiya N. Predicting lapses of attention with sleep-like slow waves. *Nature Communications*. 2021;12:3657. [doi:10.1038/s41467-021-23890-7](https://doi.org/10.1038/s41467-021-23890-7)。

[^25]: Siclari F, Baird B, Perogamvros L, et al. The neural correlates of dreaming. *Nature Neuroscience*. 2017;20:872–878. [doi:10.1038/nn.4545](https://doi.org/10.1038/nn.4545)。

[^26]: Konkoly KR, Appel K, Chabani E, et al. Real-time dialogue between experimenters and dreamers during REM sleep. *Current Biology*. 2021;31:1417–1427.e6. [doi:10.1016/j.cub.2021.01.026](https://doi.org/10.1016/j.cub.2021.01.026)。

[^27]: Xie L, Kang H, Xu Q, et al. Sleep drives metabolite clearance from the adult brain. *Science*. 2013;342:373–377. [doi:10.1126/science.1241224](https://doi.org/10.1126/science.1241224)。

[^28]: Fultz NE, Bonmassar G, Setsompop K, et al. Coupled electrophysiological, hemodynamic, and cerebrospinal fluid oscillations in human sleep. *Science*. 2019;366:628–631. [doi:10.1126/science.aax5440](https://doi.org/10.1126/science.aax5440)。

[^29]: Jiang-Xie LF, Yin L, Zhao S, et al. Neuronal dynamics direct cerebrospinal fluid perfusion and brain clearance. *Nature*. 2024;627:157–164. [doi:10.1038/s41586-024-07108-6](https://doi.org/10.1038/s41586-024-07108-6)。

[^30]: Miao A, Luo T, Hsieh B, et al. Brain clearance is reduced during sleep and anesthesia. *Nature Neuroscience*. 2024;27:1046–1050. [doi:10.1038/s41593-024-01638-y](https://doi.org/10.1038/s41593-024-01638-y)；作者随后更正了一列源数据：[doi:10.1038/s41593-024-01698-0](https://doi.org/10.1038/s41593-024-01698-0)。

[^31]: Holth JK, Fritschi SK, Wang C, et al. The sleep-wake cycle regulates brain interstitial fluid tau in mice and CSF tau in humans. *Science*. 2019;363:880–884. [doi:10.1126/science.aav2546](https://doi.org/10.1126/science.aav2546)。

[^32]: Zada D, Bronshtein I, Lerer-Goldshtein T, Garini Y, Appelbaum L. Sleep increases chromosome dynamics to enable reduction of accumulating DNA damage in single neurons. *Nature Communications*. 2019;10:895. [doi:10.1038/s41467-019-08806-w](https://doi.org/10.1038/s41467-019-08806-w)。

[^33]: Zada D, Sela Y, Matosevich N, et al. Parp1 promotes sleep, which enhances DNA repair in neurons. *Molecular Cell*. 2021;81:4979–4993.e7. [doi:10.1016/j.molcel.2021.10.026](https://doi.org/10.1016/j.molcel.2021.10.026)。

[^34]: Vaccaro A, Kaplan Dor Y, Nambara K, et al. Sleep loss can cause death through accumulation of reactive oxygen species in the gut. *Cell*. 2020;181:1307–1328.e15. [doi:10.1016/j.cell.2020.04.049](https://doi.org/10.1016/j.cell.2020.04.049)。

[^35]: Buxton OM, Pavlova M, Reid EW, et al. Sleep restriction for 1 week reduces insulin sensitivity in healthy men. *Diabetes*. 2010;59:2126–2133. [doi:10.2337/db09-0699](https://doi.org/10.2337/db09-0699)。

[^36]: Jung CM, Melanson EL, Frydendall EJ, et al. Energy expenditure during sleep, sleep deprivation and sleep following sleep deprivation in adult humans. *J Physiol*. 2011;589:235–244. [doi:10.1113/jphysiol.2010.197517](https://doi.org/10.1113/jphysiol.2010.197517)。

[^37]: Covassin N, Singh P, McCrady-Spitzer SK, et al. Effects of experimental sleep restriction on energy intake, energy expenditure, and visceral obesity. *J Am Coll Cardiol*. 2022;79:1254–1265. [doi:10.1016/j.jacc.2022.01.038](https://doi.org/10.1016/j.jacc.2022.01.038)。

[^38]: Prather AA, Hall M, Fury JM, et al. Sleep and antibody response to hepatitis B vaccination. *Sleep*. 2012;35:1063–1069. [doi:10.5665/sleep.1990](https://doi.org/10.5665/sleep.1990)。

[^39]: Shaw PJ, Cirelli C, Greenspan RJ, Tononi G. Correlates of sleep and waking in *Drosophila melanogaster*. *Science*. 2000;287:1834–1837. [doi:10.1126/science.287.5459.1834](https://doi.org/10.1126/science.287.5459.1834)。

[^40]: Hendricks JC, Finn SM, Panckeri KA, et al. Rest in *Drosophila* is a sleep-like state. *Neuron*. 2000;25:129–138. [doi:10.1016/S0896-6273(00)80877-6](https://doi.org/10.1016/S0896-6273(00)80877-6)。

[^41]: Leung LC, Wang GX, Madelaine R, et al. Neural signatures of sleep in zebrafish. *Nature*. 2019;571:198–204. [doi:10.1038/s41586-019-1336-7](https://doi.org/10.1038/s41586-019-1336-7)。

[^42]: Rattenborg NC, Voirin B, Cruz SM, et al. Evidence that birds sleep in mid-flight. *Nature Communications*. 2016;7:12468. [doi:10.1038/ncomms12468](https://doi.org/10.1038/ncomms12468)。

[^43]: Kendall-Bar JM, Williams TM, Mukherji R, et al. Brain activity of diving seals reveals short sleep cycles at depth. *Science*. 2023;380:260–265. [doi:10.1126/science.adf0566](https://doi.org/10.1126/science.adf0566)。

[^44]: Van Dongen HPA, Maislin G, Mullington JM, Dinges DF. The cumulative cost of additional wakefulness: dose-response effects on neurobehavioral functions and sleep physiology. *Sleep*. 2003;26:117–126. [doi:10.1093/sleep/26.2.117](https://doi.org/10.1093/sleep/26.2.117)。

[^45]: Medori R, Tritschler HJ, LeBlanc A, et al. Fatal familial insomnia, a prion disease with a mutation at codon 178 of the prion protein gene. *N Engl J Med*. 1992;326:444–449. [doi:10.1056/NEJM199202133260704](https://doi.org/10.1056/NEJM199202133260704)。

[^46]: He Y, Jones CR, Fujiki N, et al. The transcriptional repressor DEC2 regulates sleep length in mammals. *Science*. 2009;325:866–870. [doi:10.1126/science.1174443](https://doi.org/10.1126/science.1174443)。

[^47]: Shi G, Xing L, Wu D, et al. A rare mutation of β1-adrenergic receptor affects sleep/wake behaviors. *Neuron*. 2019;103:1044–1055.e7. [doi:10.1016/j.neuron.2019.07.026](https://doi.org/10.1016/j.neuron.2019.07.026)。
