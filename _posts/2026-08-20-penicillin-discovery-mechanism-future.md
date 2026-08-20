---
title: "青霉素不是一次幸运事故：从培养皿、β-内酰胺到抗菌药耐药性"
date: 2026-08-20 20:00:00 +0800
permalink: /posts/penicillin-discovery-mechanism-future/
excerpt: "青霉素究竟是被谁、在何时‘发明’的？本文重读 Fleming 1929、Chain–Florey 1940、Oxford 临床报告、Tipper–Strominger 1965 等论文，从霉菌竞争、分离纯化、动物与人体证据、深罐发酵讲到 PBP 共价酰化、耐药演化与下一代抗菌药研发。"
categories:
  - 科学与健康
tags:
  - 青霉素
  - 抗生素
  - 微生物学
  - 药理学
  - 科学史
  - 抗菌药耐药性
comments: true
share: true
related: true
read_time: true
translate: false
math: true
header:
  teaser: /images/penicillin-history-mechanism/01-fleming-at-desk.jpg
---

> **证据与图片声明：**本文所称“青霉素”依语境分别指 1929 年的含活性物质霉菌培养滤液、天然青霉素化合物或青霉素类药物家族；三者不能混为一谈。全文以原始论文、牛津大学档案、诺贝尔奖资料、美国农业部与 WHO 报告为主要证据，核查截至 **2026 年 8 月 20 日**。文中共收录 **16 张真实历史照片、实物照片、培养物照片或显微图像**，没有 AI 生成图；每张图均标明来源与许可。现代培养皿和显微照片只展示相应生物学对象，**不是**冒充 1928 年的原始培养皿。

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/01-fleming-at-desk.jpg" alt="Alexander Fleming 身穿白大褂坐在堆满培养皿的实验台前的历史照片" loading="eager">
  <figcaption>图 1｜Alexander Fleming 与他的培养皿。青霉素史最常被压缩成“一个人、一个脏培养皿、一次偶然”，但一盘出现抑菌圈的培养基还不是药物。照片：美国海军医学档案，经 <a href="https://commons.wikimedia.org/wiki/File:Alexander_Fleming_at_his_desk_in_a_white_lab_coat_with_penicillin_mold_in_petrie_dishes_around_him.jpg">Wikimedia Commons</a>；无已知使用限制。</figcaption>
</figure>

## 摘要：青霉素不是一个瞬间，而是一条因果链

如果把“发明青霉素”理解为看见霉菌周围没有细菌，答案是 **Alexander Fleming，1928 年**。如果把它理解为证明一种霉菌滤液具有可重复、选择性的抗菌活性，关键文献是 Fleming **1929 年**的论文。如果把它理解为把不稳定的“霉菌汁”变成能救治全身感染的制剂，答案是 Howard Florey、Ernst Chain、Norman Heatley、Edward Abraham、Margaret Jennings、Arthur Gardner 等组成的**牛津团队，1938—1941 年**。如果把它理解为让每一名伤员而不只是少数实验患者得到药物，则必须把美国农业部 Peoria 实验室、战时政府协调、Pfizer、Merck、Squibb、Lilly 等企业及数以千计的技术人员写进答案。

青霉素因此是一个极好的博士生讨论班案例：**发现现象、分离变量、制造测量标准、建立动物因果证据、完成临床转化、放大生物过程、解析分子靶点**，每一步都可能失败，也都需要不同专业的人。偶然只提供了一个异常观测；真正改变世界的是把异常变成可复制的系统。

本文将回答五个问题：

1. 1928 年的培养皿到底证明了什么，又没有证明什么？
2. 为什么从发现到第一篇系统治疗论文隔了十二年？
3. 青霉菌怎样合成青霉素，工业上又怎样把产量放大几个数量级？
4. β-内酰胺怎样在分子层面“骗过”青霉素结合蛋白，细菌又为何死亡？
5. 当耐药性已经与数百万人的死亡相关时，青霉素留给未来的究竟是遗产，还是警告？

<nav class="article-toc" markdown="1">
**目录**

* 目录
{:toc}
</nav>

## 一、先把“发现”“发明”“开发”拆开

### 1. 青霉素史的四个完成条件

药物不是一个分子名字，而是一组被同时满足的条件。至少要有：

| 层级 | 要回答的问题 | 青霉素史上的关键完成者 |
|---|---|---|
| 现象发现 | 霉菌附近为什么出现细菌裂解/抑制区？ | Fleming，1928—1929 |
| 实验对象化 | 活性是否可过滤、可定量、具有选择性？ | Fleming；随后 Oxford 团队改进测定 |
| 治疗成立 | 制剂能否在动物和人体内达到有效而低毒的暴露？ | Chain、Florey、Heatley、Gardner、Jennings、Abraham、Fletcher 等，1938—1941 |
| 工业与制度成立 | 能否稳定、无菌、标准化、低成本地生产亿万人份？ | NRRL、OSRD/CMR、War Production Board 与多家企业，1941—1945 |

这也解释了为什么 1945 年诺贝尔生理学或医学奖授予 Fleming、Chain 与 Florey，颁奖理由是“青霉素的发现及其对多种传染病的治疗作用”，而不是只奖励那只受污染的培养皿。[^nobel]

### 2. “第一种抗生素”也要限定语境

青霉素常被称为“第一种抗生素”，但博士层面的表述应更精确。Paul Ehrlich 的砷凡纳明在 1910 年已经开创化学治疗，磺胺类在 1930 年代也先于青霉素进入系统用药。青霉素的历史地位在于：它是第一种得到大规模成功开发的、由微生物产生并用于系统治疗的抗菌药之一，并塑造了后来“从微生物中筛选抗生素”的范式。“antibiotic”一词本身要到 1940 年代才由 Selman Waksman 等推广。[^prehistory]

早在 19 世纪，John Burdon-Sanderson、William Roberts、John Tyndall、Joseph Lister 等已注意到 Penicillium 与细菌生长之间的拮抗；1890 年代 Vincenzo Tiberio 与 Ernest Duchesne 也做过霉菌提取物和感染动物实验。它们是重要前史，却没有形成一个被稳定继承的菌株、活性单位、纯化方法、系统治疗证据和制造流程。**先看到类似现象，不自动等于已经开发出同一种药。**[^prehistory]

## 二、1928—1929：Fleming 究竟看见了什么

### 1. 偶然污染之前，已经有一套训练过的观察系统

1928 年，Fleming 在伦敦 St Mary’s Hospital 研究葡萄球菌变异。一些培养皿被放在实验台上并反复观察，暴露空气后混入了霉菌。某一只培养皿里，霉菌菌落周围的葡萄球菌菌落变透明，出现肉眼可见的裂解区。这个污染是偶然的；把它判断为**霉菌释放了可扩散的抑菌物质**，则不是偶然。

Fleming 先把霉菌转种，再让它在肉汤中生长，过滤掉菌丝，然后检验滤液。他发现活性：

- 能穿过滤器并在琼脂中扩散；
- 对葡萄球菌、链球菌、肺炎球菌、淋球菌、脑膜炎球菌、白喉杆菌等有不同程度活性；
- 对当时所谓“coli-typhoid group”等许多革兰阴性菌作用很弱；
- 对白细胞和某些动物组织的毒性远低于当时常用消毒剂；
- 很不稳定，受温度、pH 和保存时间显著影响。

这些结果使“霉菌附近细菌少”从一张逸闻照片变成了**可转种、可过滤、可比较、具有选择性的实验对象**。Fleming 为避免反复写“mould broth filtrate”，把这种滤液称为 *penicillin*。[^fleming1929]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/02-fleming-1929-paper.jpg" alt="Fleming 1929年青霉素论文首页的历史扫描图" loading="lazy">
  <figcaption>图 2｜1929 年论文首页。标题把当时最现实的用途写得很清楚：利用选择性抑菌作用，从混合培养物中分离 <em>B. influenzae</em>。原件：Wellcome Collection，经 <a href="https://commons.wikimedia.org/wiki/File:First_page_of_Alexander_Fleming%27s_paper_on_penicillin_Wellcome_L0007150.jpg">Wikimedia Commons</a>，CC BY 4.0。</figcaption>
</figure>

### 2. 重读 1929 论文：它远比传说严谨，也远没有完成药物开发

Fleming 的论文题为 *On the Antibacterial Action of Cultures of a Penicillium, with Special Reference to Their Use in the Isolation of B. influenzae*，1929 年 5 月 10 日收稿，刊于 *British Journal of Experimental Pathology* 第 10 卷 226—236 页。论文结论不是“我已制成能治败血症的药”，而是更克制的十余项实验总结。[^fleming1929]

特别值得注意的是三点。

第一，Fleming 已经提出治疗可能性。他认为青霉素可作为表面消毒剂，或用于敏感微生物感染区域；不能说他“完全没有看见医学价值”。

第二，他的核心实用演示却是**选择培养基**：在混合样本中抑制敏感菌，使对青霉素不敏感的 *B. influenzae* 更容易分离。这与论文标题一致，说明他对最可靠用途的判断仍停留在实验室诊断。

第三，他没有得到足以支持全身治疗的化学制剂。滤液效价低、批间差异大、热不稳定，活性物质无法结晶，体内又会很快排出。Frederick Ridley 与 Stuart Craddock 曾协助尝试萃取，但没有跨过稳定纯化这道门槛。**一个低毒的体外抑菌滤液，并不必然是一个有用的系统药物。**

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/05-fleming-mould-sample-1935.jpg" alt="Fleming于1935年赠送给Douglas Macleod的青霉菌样本实物照片" loading="lazy">
  <figcaption>图 3｜Fleming 1935 年赠给 Douglas Macleod 的青霉菌样本。保留和分发菌株，使后来的研究者能够从同一生物材料继续工作；这是可重复性基础设施的一部分。藏品：Science Museum London，经 <a href="https://commons.wikimedia.org/wiki/File:Sample_of_penicillin_mould_presented_by_Alexander_Fleming_to_Douglas_Macleod,_1935_(9672239344).jpg">Wikimedia Commons</a>，CC BY-SA 4.0。</figcaption>
</figure>

### 3. 1930 年已经有人治好局部感染，但仍不是系统药物

Fleming 的学生 Cecil George Paine 把霉菌滤液带到 Sheffield。保存下来的病历表明，他在 1930—1931 年曾用局部滴注成功治疗若干眼部感染，包括新生儿淋球菌性眼炎。这些工作当时没有正式发表，证据主要在半个世纪后由病历、访谈和档案重建。它说明粗制滤液确有临床活性，也说明**局部给药的成功无法自动解决血液浓度、分布、排泄、无菌与剂量标准**。[^paine]

### 4. 那只霉菌叫什么？答案经历了近一个世纪的分类修订

历史文献先后把 Fleming 菌株称为 *Penicillium rubrum*、*P. notatum*、*P. chrysogenum*。2011 年，多位点系统发育和次生代谢物分析把 Fleming 原始菌株重新鉴定为 **Penicillium rubens**。工业生产菌株的命名在文献中仍常沿用 *P. chrysogenum*，所以读者会看到不同名称。讨论历史时最好注明“按当时命名”，讨论现行分类时则使用 *P. rubens*。[^taxonomy]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/06-penicillium-petri-dish.jpg" alt="培养皿中生长的Penicillium commune和Penicillium chrysogenum真实菌落照片" loading="lazy">
  <figcaption>图 4｜现代培养皿中的 <em>Penicillium commune</em> 与 <em>P. chrysogenum</em> 菌落。不同菌株的产物谱和产量可相差巨大，不能从“长得像青霉”推出“适合制药”。这不是 1928 年原皿。摄影：Convallaria majalis，经 <a href="https://commons.wikimedia.org/wiki/File:Penicillia_on_Petri_dish.jpg">Wikimedia Commons</a>，CC BY-SA 4.0。</figcaption>
</figure>

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/07-penicillium-microscopy.png" alt="染色后青霉分生孢子梗和孢子的真实显微图像" loading="lazy">
  <figcaption>图 5｜来源页面按旧名标注为 <em>Penicillium notatum</em> 的染色显微图像。青霉属的分生孢子梗末端呈“毛笔”样分枝，属名 <em>Penicillium</em> 也源于拉丁语“小刷子”。图像不代表 Fleming 原始菌株的分子鉴定。Louis Bontemps，经 <a href="https://commons.wikimedia.org/wiki/File:Penicillium_notatum.png">Wikimedia Commons</a>，CC BY 4.0。</figcaption>
</figure>

## 三、1938—1941：牛津团队把“霉菌汁”变成系统治疗

### 1. 为什么沉寂十年：真正困难的是活性物质的工程属性

常见叙事说 Fleming 的论文“被所有人忽视”，这不够准确。它被引用、菌株被分发、选择培养基用途也有人使用；但青霉素在几个关键维度上都不讨药物化学家喜欢：

- **浓度低**：大量培养液只含极少活性成分；
- **不稳定**：酸碱、热和某些纯化步骤会迅速损失活性；
- **无法用质量直接定量**：早期样品绝大部分是杂质，只能靠生物效价；
- **药代不利**：注入后很快由肾脏排泄；
- **结构未知**：无法靠既定官能团化学设计稳定路线。

真正的转折发生在 1938—1939 年。Oxford 的 Ernst Chain 系统重访天然抗菌物质，Howard Florey 组织跨学科项目；他们选择青霉素，一方面因为它对葡萄球菌有效，另一方面正因为其不稳定性构成了值得解决的生化问题。[^oxfordhistory]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/03-fleming-laboratory.jpg" alt="二战期间Fleming在St Mary's Hospital实验室工作的真实照片" loading="lazy">
  <figcaption>图 6｜二战期间 Fleming 仍在 St Mary’s Hospital 研究青霉素对细菌的作用。发现者并未在 1929 年后完全停止研究；更准确的判断是，他的团队没有建立出可放大的稳定纯化与全身治疗系统。英国信息部照片 D17801，经 <a href="https://commons.wikimedia.org/wiki/File:Professor_Alexander_Fleming_at_work_in_his_laboratory_at_St_Mary%27s_Hospital,_London,_during_the_Second_World_War._D17801.jpg">Wikimedia Commons</a>；公有领域。</figcaption>
</figure>

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/04-howard-florey.jpg" alt="Howard Florey前往中东讲授青霉素时的历史肖像" loading="lazy">
  <figcaption>图 7｜Howard Florey。把青霉素开发写成“Fleming 对 Florey”之间的署名竞争，会再次抹去团队与制度。Florey 的关键贡献是设定研究问题、组织药理—病理—生化—临床协作，并持续寻找生产资源。摄影：Sidney Smith / Wellcome Collection，经 <a href="https://commons.wikimedia.org/wiki/File:Howard_Florey.jpg">Wikimedia Commons</a>，CC BY 4.0。</figcaption>
</figure>

### 2. Heatley 的方法学贡献：萃取、回萃和“杯板法”

Norman Heatley 是这段历史中最容易被大众叙事漏掉的人。他把生物活性变成了可以工程迭代的读数，并设计出适应战时匮乏条件的生产装置。

早期纯化利用了青霉素的酸碱性质：在低温下调节培养滤液 pH，使活性物质进入有机相，再调回较温和 pH，把它回萃到水相；反复处理后浓缩，并以冷冻干燥得到更稳定的粉末。这个过程必须在活性降解和杂质去除之间抢时间。其思想可写成分配平衡：

$$
K_D(pH)=\frac{[P]_{org}}{[P]_{aq}},
$$

其中青霉素羧基的电离状态随 pH 改变，进而改变表观分配系数 $K_D$。这不是“把霉菌过滤掉”那么简单，而是一个对 pH、温度、相体积、乳化和操作时间高度敏感的过程。

Heatley 还发展了 Oxford cup-plate assay：在接种指示菌的琼脂上放置小杯，加入未知样品和标准样品，根据抑菌圈尺寸估算效价。它把“看起来更清”转化成可以跨批次比较的生物测量，使培养条件、萃取步骤和剂量可以共同优化。由于早期样品不纯，**单位效价比毫克质量更有意义**。[^heatley]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/08-heatley-apparatus.jpg" alt="Norman Heatley收藏中用于早期青霉素生产的装置真实历史照片" loading="lazy">
  <figcaption>图 8｜Norman Heatley 收藏中的早期青霉素生产装置。牛津团队使用过便盆、饼干罐、奶桶，并委托陶器厂制造可堆叠培养容器；“简陋”不等于“没有工程设计”。Wellcome Collection，经 <a href="https://commons.wikimedia.org/wiki/File:PENICILLIN;_apparatus_used_in_the_production_Wellcome_L0032175.jpg">Wikimedia Commons</a>，CC BY 4.0。</figcaption>
</figure>

### 3. 团队名单不是礼仪，而是实验链条

1940 年 *The Lancet* 的三页论文由 Chain、Florey、Gardner、Heatley、Jennings、Orr-Ewing、Sanders 七人共同署名。各人承担的环节并不相同：Chain 负责生化与纯化路线，Florey 主导药理与项目组织，Heatley 负责生产、测定与装置，Arthur Gardner 研究敏感谱和形态学反应，Margaret Jennings 研究毒性与白细胞效应，Jean Orr-Ewing、Arthur Gordon Sanders 等支撑生产和实验。Edward Abraham 随后在纯化、青霉素酶与结构研究中成为关键成员；Charles Fletcher 承担临床给药。[^chain1940]

科学史上的“某人发明某物”是一种高压缩编码。它便于记忆，却把真正可复制的知识——组织接口、失败反馈、测量标准与技术劳动——压缩掉了。

### 4. 1940 年小鼠实验：从体外抑菌到体内因果

1940 年 5 月的著名预实验给 8 只小鼠注入致死量链球菌，4 只接受青霉素，4 只作为对照；次日对照组死亡，而治疗组存活。随后更大规模实验扩展到链球菌、葡萄球菌和产气荚膜相关感染，结果发表于 1940 年 8 月 24 日的 *The Lancet*。这一步首次有力证明：部分纯化的青霉素在完整动物体内能达到有效暴露，并且样品杂质没有立刻造成压倒性的毒性。[^chain1940]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/09-mouse-experiment-1943.jpg" alt="1943年研究人员在青霉素研究中给小鼠注射的真实历史照片" loading="lazy">
  <figcaption>图 9｜1943 年英、美、加联合研究中的小鼠给药。此照不是 1940 年最初 8 只小鼠的现场记录，但真实呈现了战时动物药理流程。英国信息部照片 D16963，经 <a href="https://commons.wikimedia.org/wiki/File:Penicillin_Past,_Present_and_Future-_the_Development_and_Production_of_Penicillin,_England,_1943_D16963.jpg">Wikimedia Commons</a>；公有领域。</figcaption>
</figure>

### 5. 1941 年临床报告：神效、失败与供给不足同时出现

严格说，Oxford 团队在系统治疗前先给一名晚期癌症患者少量静脉注射以观察毒性。1941 年 2 月 12 日，43 岁警员 Albert Alexander 成为第一位接受足量、连续系统治疗的重症感染者。他有葡萄球菌和链球菌混合感染、面部与眼眶脓肿，病情濒危。流传最广的“修剪玫瑰时划伤”缺少坚实同期证据；Oxford 的档案项目认为更可能与空袭中的面部裂伤有关。[^clinicalarchive]

静脉给药后，他的体温、食欲和局部感染迅速改善。由于药物太稀缺，团队甚至从尿液中回收尚未代谢的青霉素再给药。五天后库存耗尽，感染复燃，Alexander 于 3 月 15 日死亡。这不是“青霉素无效”，也不是已经证明“耐药导致失败”；它首先暴露了**剂量—时间—供给**三者不可分离。[^clinical1941]

1941 年 8 月的 *Further Observations on Penicillin* 报告了 5 名接受静脉治疗的严重感染患者以及局部眼科病例。后续病例出现显著改善，多名患者康复；一名病人在感染基本控制后死于霉菌性动脉瘤破裂。该研究不是现代随机对照试验，样本量小、病例异质、制剂效价也在变化，但疗效幅度之大，结合动物证据和细菌学转阴，使“青霉素可以系统治疗敏感菌感染”成为合理结论。[^clinical1941]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/15-british-standard-penicillin-vial.jpg" alt="英国标准青霉素玻璃药瓶实物照片" loading="lazy">
  <figcaption>图 10｜英国标准青霉素玻璃瓶。标准品把不同实验室的“单位”锚定到共同效价；1944 年建立国际标准后，剂量才更能跨地点、跨批次比较。National Institute for Medical Research 藏品 / Wellcome Collection，经 <a href="https://commons.wikimedia.org/wiki/File:Glass_phial_of_British_Standard_penicillin,_London,_England,_Wellcome_L0059573.jpg">Wikimedia Commons</a>，CC BY 4.0。</figcaption>
</figure>

## 四、1941—1945：真正改变世界的是放大，而不只是发现

### 1. 表面培养的硬上限

Oxford 的霉菌在液面形成菌毯，氧主要从气液界面进入。要增加产量，只能增加浅容器数量和表面积。实验室逐渐变成一座由数百个陶罐和大量人工维持的微型工厂；约 2,000 L 培养液才足以治疗一个败血症病例。继续堆容器可以线性增加劳动和污染风险，却无法提供战争需要的数量。[^museum]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/10-surface-flasks-1943.jpg" alt="1943年工作人员检查数千只表面培养青霉菌烧瓶的真实照片" loading="lazy">
  <figcaption>图 11｜1943 年，工作人员检查 4,000 只装有玉米浆培养基和青霉菌孢子的烧瓶。表面培养可以生产药，却把产量与容器表面积、人工和无菌操作次数锁在一起。Richard Stone，IWM D16958，经 <a href="https://commons.wikimedia.org/wiki/File:Penicillin_Past,_Present_and_Future-_the_Development_and_Production_of_Penicillin,_England,_1943_D16958.jpg">Wikimedia Commons</a>；公有领域。</figcaption>
</figure>

### 2. Peoria 的三项突破：培养基、菌株与深层发酵

1941 年夏，Florey 与 Heatley 在 Rockefeller Foundation 支持下赴美。他们最终到达美国农业部位于 Illinois, Peoria 的 Northern Regional Research Laboratory（NRRL）。这里的优势不是“更懂医学”，而是懂农业副产物、真菌育种和工业发酵。

NRRL 与产业协作解决了三类问题：

1. **培养基**：Andrew Moyer 用乳糖替代蔗糖，并加入玉米湿磨副产物 corn steep liquor，效价大幅提高；后续加入苯乙酸等前体，促进青霉素 G 形成。
2. **菌株**：团队广泛筛选霉菌。Peoria 市场一只发霉甜瓜上分离的 NRRL 1951 菌株适合液下培养；X 射线和紫外诱变、连续选择又提高产量。“Moldy Mary”是谁的口述版本并不完全一致，USDA 近年的档案研究也提醒不要把团队筛选再次变成一个单人传奇。[^moldymary]
3. **过程**：Pfizer 等企业把既有的有机酸发酵经验迁移到带搅拌、通无菌空气、控温、控泡的深罐系统。1944 年 3 月，Pfizer 在 Brooklyn 启用含 14 个 7,500 加仑罐的工厂；深层发酵成为主路线。[^acsproduction]

对需氧丝状真菌，放大的核心不是几何体积，而是氧传递。常用近似为：

$$
\mathrm{OTR}=k_La(C^*-C_L),
$$

其中 $k_La$ 是体积氧传质系数，$C^*$ 是饱和溶氧浓度，$C_L$ 是液相溶氧。扩大罐体会改变搅拌功率密度、气泡停留、黏度、菌丝形态、热移除和剪切。增大通气又会造成 corn steep liquor 强烈起泡，需要消泡剂；消泡剂反过来可能改变 $k_La$。这就是为什么“在大桶里多养一些霉菌”不是放大理论。

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/11-filtration-1943.jpg" alt="1943年青霉素生产人员稀释并过滤发酵液的真实照片" loading="lazy">
  <figcaption>图 12｜1943 年的下游处理：稀释棕色培养液、灭菌并通过截留细菌的过滤器。发酵只生成稀溶液；回收、纯化、除菌和稳定化决定最终有多少活性进入药瓶。Richard Stone，IWM D16970，经 <a href="https://commons.wikimedia.org/wiki/File:Penicillin_Past,_Present_and_Future-_the_Development_and_Production_of_Penicillin,_England,_1943_D16970.jpg">Wikimedia Commons</a>；公有领域。</figcaption>
</figure>

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/12-freeze-drying-1943.jpg" alt="1943年工作人员将纯化青霉素分装到药瓶准备冷冻干燥的真实照片" loading="lazy">
  <figcaption>图 13｜将纯化青霉素分装后冷冻，并在真空中升华除冰，留下较稳定的粉末。稳定性不是包装末端的小事，而是青霉素能离开实验室的必要条件。Richard Stone，IWM D16959，经 <a href="https://commons.wikimedia.org/wiki/File:Penicillin_Past,_Present_and_Future-_the_Development_and_Production_of_Penicillin,_England,_1943_D16959.jpg">Wikimedia Commons</a>；公有领域。</figcaption>
</figure>

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/13-usda-research-team-1944.webp" alt="1944年美国农业部Peoria青霉素研究团队合影" loading="lazy">
  <figcaption>图 14｜USDA 的青霉素研究团队，1944 年 6 月。照片列出 William Schmidt、Kenneth Raper、Robert Coghill、Andrew Moyer、Dorothy Fennell Alexander、Z. Louise Smith 等十余人，直接反驳“量产只是某家公司灵机一动”的叙事。美国农业部，经 <a href="https://commons.wikimedia.org/wiki/File:The_USDA%27s_penicillin_research_team.webp">Wikimedia Commons</a>；美国政府作品，公有领域。</figcaption>
</figure>

### 3. 战时协作为什么异常有效

美国 Committee on Medical Research 和 War Production Board 让政府实验室、大学和互为竞争者的企业共享部分菌株、效价测定和过程经验，同时给关键建设材料以优先级。1943 年美国生产约 210 亿单位，1944 年跃升至 1.663 万亿单位，1945 年超过 6.8 万亿单位；1945 年 3 月起，民用分配限制开始取消。单剂价格也从 1943 年约 20 美元大幅下降。数字的意义不只在“产得多”，而在于药物从配给对象变成临床基础设施。[^acsproduction]

青霉素量产常被说成 D-Day 的秘密武器。更稳健的说法是：1944 年诺曼底登陆时，盟军已有足够产能为严重伤员提供青霉素，它显著改善了感染控制；但不能把战争胜负或所有死亡下降单因归于一种药。青霉素对创伤感染有效，对出血、烧伤、病毒、寄生虫和不敏感菌则无能为力。

## 五、霉菌怎样合成青霉素：三步反应与细胞器分工

工业发酵不是让真菌“分泌一种固定化学品”。*P. rubens* 把初级代谢提供的三种氨基酸装配成一个高度应变的双环天然产物，核心基因集中在约 15 kb 的生物合成基因簇中：[^biosynthesis]

1. **`pcbAB` / ACV synthetase**：一种大型非核糖体肽合成酶依次装载 L-α-aminoadipate、L-cysteine、L-valine，生成线性三肽 ACV；其中 valine 在装配中发生构型调整。
2. **`pcbC` / isopenicillin N synthase（IPNS）**：Fe(II) 与氧依赖酶对 ACV 进行氧化环化，一次构建四元 β-内酰胺环和五元噻唑烷环，得到 isopenicillin N。
3. **`penDE` / isopenicillin N acyltransferase**：在过氧化物酶体样微体中去掉 α-aminoadipyl 侧链，再接上由 CoA 活化的疏水侧链；供给 phenylacetyl-CoA 倾向形成 benzylpenicillin（penicillin G），供给 phenoxyacetyl 前体则可形成 penicillin V。

工业高产株并不是只改一个“产量基因”。经典诱变选择造成基因簇扩增、染色体重排和全局代谢重编程；碳氮源、pH、氧、菌丝团形态、前体毒性与次生代谢启动时序共同决定效价。Fleming 原始菌株的基因组在 2020 年得到测序，与工业高产谱系相比，其青霉素合成基因存在序列差异，也没有经历数十轮产量选择。[^fleminggenome]

## 六、分子机制：β-内酰胺如何让细胞壁合成失去闭环

### 1. 先看细菌正在建设什么

多数细菌的肽聚糖由 N-acetylglucosamine（GlcNAc）与 N-acetylmuramic acid（MurNAc）交替组成糖链；MurNAc 上连着短肽。新生前体的末端通常包含 `D-Ala–D-Ala`。糖链合成之后，转肽酶把一条链的肽基与相邻链交联，释放末端 D-Ala，形成承受膨压的网状 sacculus。

转肽酶反应可简写为两步酰基转移：

$$
\mathrm{PBP{-}Ser{-}OH}+\mathrm{donor{-}D{-}Ala{-}D{-}Ala}
\rightarrow \mathrm{PBP{-}Ser{-}O{-}acyl}+\mathrm{D{-}Ala}
$$

$$
\mathrm{PBP{-}Ser{-}O{-}acyl}+\mathrm{acceptor{-}NH_2}
\rightarrow \mathrm{crosslink}+\mathrm{PBP{-}Ser{-}OH}.
$$

执行这些反应的酶家族因能被放射性青霉素标记而统称 **penicillin-binding proteins（PBPs）**。不同细菌含多种 PBP：有的参与细胞伸长，有的参与分裂隔膜，有的兼具转糖基酶和转肽酶结构域。药物对不同 PBP 的亲和力组合，决定细胞出现膨大、丝状化、球化还是快速裂解。

### 2. β-内酰胺是一个被预加载的酰化陷阱

青霉素 G 有一个四元 β-内酰胺环与五元噻唑烷环稠合。四元酰胺环偏离普通酰胺的平面共振构型，具有较高应变和亲电反应性。PBP 活性位点 Ser 进攻 β-内酰胺羰基，开环生成相对稳定的 **penicilloyl–PBP 共价酰化复合物**：

$$
\mathrm{PBP{-}Ser{-}OH}+\beta\text{-lactam}
\xrightarrow{k_2}\mathrm{penicilloyl{-}PBP}
\xrightarrow{k_3\,\text{(slow)}}\mathrm{PBP}+\mathrm{hydrolyzed\ product}.
$$

药效取决于结合和酰化效率 $k_2/K_D$，也取决于去酰化 $k_3$ 足够慢。Tipper 与 Strominger 在 1965 年提出青霉素与 acyl-D-Ala-D-Ala 的结构相似性解释，给出了今天教科书机制的概念核心；后来的结构生物学又表明，“相似”不是简单二维形状复制，而是反应几何、过渡态和活性位点网络共同造成的化学拟态。[^tipper]

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/14-hodgkin-penicillin-model.jpeg" alt="Dorothy Hodgkin根据X射线晶体学制作的青霉素电子密度模型实物照片" loading="lazy">
  <figcaption>图 15｜Dorothy Hodgkin 团队约 1945 年的青霉素结构模型：多层透明板上的等高线表示电子密度。Edward Abraham 较早提出含 β-内酰胺的正确结构，Hodgkin 与 Barbara Low 等的 X 射线晶体学解决了当时激烈争议。Museum of the History of Science, Oxford，经 <a href="https://commons.wikimedia.org/wiki/File:Model_of_the_Structure_of_Penicillin,_by_Dorothy_Hodgkin,_Oxford,_c.1945.jpeg">Wikimedia Commons</a>，CC BY-SA 3.0。</figcaption>
</figure>

### 3. 为什么主要伤细菌，而不是人

人类细胞没有肽聚糖，也没有参与肽聚糖交联的 PBP，构成了极高治疗指数的基础。这不是说青霉素对人体“绝对无毒”：过敏反应可从皮疹到危及生命的过敏性休克；高剂量、肾功能异常或特定制剂也可能带来神经等不良反应。选择性来自**靶点缺失**，临床安全仍取决于免疫、剂量、制剂和个体状态。

### 4. “阻断交联，所以细胞被渗透压撑爆”只说对了上半句

β-内酰胺对快速生长的细胞通常更有效。PBP 被抑制后，新肽聚糖交联不足；与此同时，细菌为了伸长和分裂必须不断用自溶素切开旧壁。合成与水解失衡可造成无效循环、壁材释放、形态异常和裂解。但不是所有细菌都以同一种方式死亡：

- 缺少主要自溶素的突变株可能仍死亡，却不明显裂解；
- 静止期、营养受限或生物膜中的细胞可在不具经典耐药突变时表现耐受；
- 抑制 PBP2 与 PBP3 可能分别造成球化或丝状化；
- 代谢状态、膜电位、应激反应和修复资源会改变杀菌动力学。

因此，**近端靶点**“PBP 转肽酶活性被共价抑制”相当确定，**终极致死网络**却具有物种、药物与生理状态依赖性。把两层混为一句“细胞壁一破就爆”，会掩盖耐受与持留细胞研究真正关心的问题。[^metabolism]

### 5. 机制并非 1928 年一起被发现，而是花了约四十年

| 年份 | 关键证据 | 机制认识增加了什么 |
|---|---|---|
| 1928—1929 | 抑菌圈、裂解、选择性敏感谱 | 有可扩散的抗菌物质 |
| 1940 | Gardner 观察细胞膨大、分裂异常 | 作用与生长和形态发生相关 |
| 1949 | Park–Johnson 发现青霉素处理后尿苷核苷酸前体积累 | 上游前体仍生成，阻断点靠近细胞壁装配末端 |
| 1950s—1960s | 肽聚糖化学与转肽反应被解析 | 交联反应成为候选靶点 |
| 1965 | Tipper–Strominger 结构拟态模型 | β-内酰胺作为 D-Ala-D-Ala 反应类似物 |
| 1960s—1970s | 放射性标记检出多个 PBPs | “一个靶酶”扩展为功能分化的蛋白家族 |

Park 与 Johnson 1949 年发现，青霉素处理的 *S. aureus* 积累酸溶性、含磷的尿苷核苷酸；后来这些“Park nucleotides”被识别为肽聚糖前体。这个例子很有启发性：经典机制不是由药物结构直接“看出来”，而是由**代谢物堆积位置、形态学表型、酶学反应与共价标记**逐层三角验证。[^park]

## 七、耐药性不是后来才出现的副作用，而是青霉素系统的一部分

### 1. 青霉素酶在大规模临床使用前已经被报告

1940 年 12 月，Edward Abraham 与 Ernst Chain 报告某些大肠杆菌提取物含有能破坏青霉素的酶，后来称 penicillinase，即 β-lactamase。换句话说，工业量产还没完成，最重要的耐药机制之一就已经出现在同一研究计划中。Fleming 在 1945 年诺贝尔演讲中也警告，低于致死浓度的暴露可在实验室筛出耐药菌。[^penicillinase]

这不应被简化成“患者没吃满疗程就一定制造耐药”。耐药演化由药物暴露、感染部位浓度、种群规模、突变或水平基因转移、传播机会、适应度代价和宿主环境共同决定；不同感染的最佳疗程也并非越长越好。Fleming 的警告抓住了**选择压力**，现代抗菌药管理则要用具体药代/药效和临床试验证据定义剂量与疗程。

### 2. 四条主要逃逸路线

1. **毁掉药物**：丝氨酸 β-lactamase 或金属 β-lactamase 水解 β-内酰胺环；抑制剂可暂时恢复某些 β-内酰胺活性。
2. **改造靶点**：PBP 序列或表达改变，降低药物酰化效率。MRSA 的 `mecA` 编码低亲和力 PBP2a，是最著名例子之一。
3. **降低到达**：革兰阴性菌外膜孔蛋白减少、通透性改变，并可与外排泵协同，使周质药物浓度下降。
4. **改变生理状态**：慢生长、生物膜、持留细胞和自溶网络改变造成耐受；MIC 可能不变，杀灭速度却显著下降。

<figure class="technical-figure">
  <img src="/images/penicillin-history-mechanism/16-mrsa-sem.jpg" alt="耐甲氧西林金黄色葡萄球菌与细胞碎片的彩色扫描电镜图" loading="lazy">
  <figcaption>图 16｜耐甲氧西林金黄色葡萄球菌（MRSA，棕色）及细胞碎片的彩色扫描电镜图。甲氧西林本来就是为抵抗葡萄球菌青霉素酶而设计的半合成 β-内酰胺；PBP2a 随后让细菌绕开了这次化学修补，展示了药物创新与进化响应的循环。NIAID/NIH，经 <a href="https://commons.wikimedia.org/wiki/File:Methicillin-resistant_Staphylococcus_aureus_(MRSA)_Bacteria.jpg">Wikimedia Commons</a>；美国政府作品，公有领域。</figcaption>
</figure>

### 3. 6-APA：把一次天然发现变成可编程药物平台

1959 年，Beecham 团队从不加侧链前体的发酵液中分离出 6-aminopenicillanic acid（6-APA）。它保留 β-内酰胺—噻唑烷核心，6 位氨基可以接上不同酰基侧链。药物化学家由此不必全合成整个高应变双环，只需“换侧链”，便能调节：

- 酸稳定性与口服利用度；
- 对不同 PBP 的亲和力与抗菌谱；
- 穿越革兰阴性菌外膜的能力；
- 对某些 β-lactamase 的稳定性；
- 蛋白结合、半衰期与组织分布。

氨苄西林、阿莫西林、苯唑西林/甲氧西林、哌拉西林等由此构成半合成青霉素家族。天然产物在这里不再只是最终药物，而是一个可组合的**反应性核心与侧链设计平台**。[^sixapa]

## 八、青霉素怎样改变现代医学与科研制度

### 1. 直接影响：把若干细菌感染从命运变成可干预变量

青霉素首先改变的是肺炎球菌、链球菌、部分葡萄球菌、梅毒螺旋体、淋球菌及创伤感染的治疗前景。它没有消灭感染，但让医生第一次能在宿主体内以较高选择性直接压低敏感细菌负荷。产后感染、丹毒、化脓性伤口和败血症不再只有引流、清创、血清治疗、磺胺药或等待免疫系统这几种选择。

不要用一个夸张的“累计拯救了 X 亿人”数字概括影响：反事实人口、诊断改善、疫苗、卫生条件、外科清创和其他抗生素无法从历史死亡曲线中干净分离。更可靠的判断是，青霉素使许多原本高致死感染的病例病死率发生数量级变化，并作为第一个大规模证明，触发了整个抗生素时代。

### 2. 间接影响：让高风险医学成为可扩展系统

今天的复杂外科、剖宫产、早产儿救治、化疗、器官移植、重症监护、植入物和免疫抑制治疗，都把感染控制当作底层条件。抗生素不是这些技术的唯一原因，却提高了它们可接受的风险上限。若可靠抗菌治疗失效，影响不会局限在“感染科”，而会逆向收缩整个现代医学的可行域。

### 3. 对工业生物技术的影响

青霉素把发酵工程从食品和有机酸生产推向高附加值、低浓度、严格无菌的药物制造。菌株改良、补料策略、在线溶氧、消泡、低温萃取、冻干、效价标准和无菌灌装后来成为抗生素与许多生物制品的共同技术谱系。它证明制造不是发现之后的“执行环节”，而是会反过来决定什么分子真正能成为社会技术。

### 4. 对科学组织的影响

青霉素项目的结构很现代：大学提出问题，政府承担战争时期的协调和需求保证，公共实验室开放菌株与工艺知识，企业竞争放大，临床网络反馈疗效和毒性。它的成功既不能被解释成纯粹自由竞争，也不能被解释成单一国家计划；它是**使命导向协调与分布式试错的混合系统**。[^collaboration]

与此同时，早期临床使用也暴露出今天不能照搬的部分：没有现代知情同意框架，病例选择和药物配给高度依赖机构关系，制剂不断变化，证据标准与战时紧迫性相互拉扯。把历史成就神圣化，不应妨碍我们看见研究伦理与公平可及性的演进。

## 九、未来影响：青霉素的下一个世纪不是再等一只幸运培养皿

### 1. 耐药负担会增长，但预测不是命运

*The Lancet* 2024 年的全球系统分析估计，2021 年约 **471 万例死亡与细菌耐药相关**，其中约 **114 万例可归因于耐药本身**；参考情景预测到 2050 年，年度可归因死亡约 191 万，与耐药相关死亡约 822 万。这里“associated with”与“attributable to”是不同反事实定义，不能互换。预测上升很大程度还受人口增长和老龄化驱动，不是一个不可改变的机械倒计时。[^amrburden]

WHO 2024 优先病原体清单覆盖 15 个耐药细菌家族；2025 年管线评估仍认为临床和新近获批产品不足以应对耐药扩散。尤其棘手的是碳青霉烯耐药革兰阴性菌、耐药结核、MRSA、耐药淋球菌等。[^whopipeline]

### 2. β-内酰胺仍不会很快退场

β-内酰胺的优势很难复制：靶点必需且位于胞质膜外侧，人体缺少对应通路，化学可调空间大，临床经验深。未来更可能出现以下组合，而不是“彻底抛弃青霉素原理”：

- 新 β-内酰胺与新 β-lactamase inhibitor 组合，用抑制剂保护主药；
- 更精确利用不同 PBP 的必需性、结构差异和协同关系；
- siderophore 等递送策略借助细菌摄铁通路提高革兰阴性菌周质暴露；
- 以快速诊断和本地耐药数据缩短经验性广谱治疗时间；
- 用群体 PK/PD、治疗药物监测和延长/持续输注优化时间依赖性杀菌；
- 结合疫苗、感染控制与卫生基础设施，从源头减少抗生素需求。

青霉素类常见的药效指标是游离药物浓度高于 MIC 的时间比例 $fT>MIC$。这提醒我们，未来抗菌药创新不全是“找一个新分子”：更快识别病原体、在感染灶形成正确暴露、避免无效广谱覆盖，同样能延长既有分子的有效寿命。

### 3. 合成生物学将重新设计“霉菌工厂”

经典诱变像在黑箱中攀爬适应度地形；基因组学、转录组学、代谢流分析和 CRISPR 允许研究者明确调整 `pcbAB–pcbC–penDE` 拷贝、前体供给、过氧化物酶体运输、全局调控和副产物通路。未来的目标不只是提高滴度，还包括降低能耗、减少溶剂使用、使用可再生碳源、提高批次鲁棒性，并构造非天然 β-内酰胺或新的侧链前体。

但“可编辑”不等于“可预测”。丝状真菌形态、细胞器分工、代谢负担、分泌与大罐流体力学仍跨越多个尺度。青霉素的历史教训依然有效：**分子设计必须和可制造性一起优化。**

### 4. AI 的合理位置：压缩搜索，不替代实验因果

机器学习可用于抗菌分子筛选、蛋白结构与耐药突变预测、培养基优化和临床耐药监测；它最有价值的地方是缩小候选空间、发现人类启发式忽略的组合。可是，活性预测不能替代细胞通透性、血清结合、毒性、动物感染模型、药代和演化稳定性。

从 Fleming 培养皿到深罐发酵的整段历史，可以写成对 AI 药物发现的提醒：**异常信号只是候选，标准化测定使候选可比较，机制实验使因果可解释，制造和临床暴露才决定它能否成为药。**

### 5. 真正的未来遗产是一个“保有效性”的制度

抗生素具有特殊经济学：新药最好少用，企业却依赖销量回收研发成本；使用还会给全社会施加耐药外部性。仅靠“再发现一个更强的青霉素”无法解决这个结构。需要把创新与使用量脱钩的支付机制、全球监测、稳定供应链、低收入地区可及性、农业与环境排放治理以及抗菌药管理共同设计。

1940 年代的协作完成了“怎样把稀缺药物迅速做多”；21 世纪还要回答一个相反问题：**怎样让足够多人及时得到药，同时又不让总系统把它过快用坏。**

## 十、八个常见说法，哪些对，哪些需要改写

| 常见说法 | 证据更支持的版本 |
|---|---|
| Fleming 因为实验室很脏，意外发明了青霉素 | 污染是偶然；识别扩散性抑菌、转种、测敏感谱并发表不是偶然 |
| 发现日期就是 1929 年 | 1928 年观察，1929 年收稿并发表；“发现”和“论文”日期不同 |
| Fleming 没意识到它能治病 | 他明确提出局部治疗可能性，但没有解决系统给药所需的纯化和供给 |
| Oxford 团队只是把 Fleming 的成果拿来量产 | 他们建立了稳定提取、效价测定、动物保护、药理和系统临床证据；这是新的知识层级 |
| 第一位接受青霉素的人是 Albert Alexander | 他是第一位接受足量连续系统治疗的重症患者；此前有 Paine 的局部眼科治疗和 Oxford 的毒性试注 |
| Alexander 被玫瑰刺划伤 | 这是著名版本，档案证据更倾向空袭裂伤；病因细节仍不应写成确定事实 |
| 青霉素让细菌细胞壁破掉后立即爆裂 | PBP 抑制是近端机制；裂解和死亡还受生长、自溶素、代谢和物种背景影响 |
| Fleming 1945 年已经准确预言“必须吃完整个疗程” | 他预见低浓度选择耐药；现代最佳疗程需针对感染由临床证据决定，并非一律越长越好 |

## 结语：偶然的价值，在于它进入了一个能纠错和放大的系统

青霉素最动人的地方，不是“一点蓝绿色霉菌拯救了世界”，而是一条几乎每一步都曾断裂的链条最终接通：Fleming 没有扔掉异常培养皿；菌株和论文没有消失；Chain 与 Florey 重启了问题；Heatley 让活性可提取、可测量；Jennings、Gardner、Abraham、Fletcher 等把毒性、敏感谱、结构和人体反应接起来；病人用真实风险提供证据；Peoria 团队、企业工程师与工厂工人把毫克变成吨级工业；结构化学和细胞生物学又在二十多年后解释了靶点。

所以，“谁发明了青霉素”最好的答案不是一个名字，而是一张有时间方向的因果图：

> **偶然污染 → 受训练的观察 → 可复现实验 → 可计量效价 → 动物因果 → 人体疗效 → 发酵放大 → 结构与靶点 → 半合成平台 → 耐药治理。**

青霉素改变未来的方式也不会只是继续提供一种老药。它留下了一种研发文明：自然界给出分子，人类用测量、协作和工程把它变成公共能力；微生物用进化作答，人类再决定能否让这种能力持续下去。

---

## 论文与史料索引

为便于继续阅读，下面按“发现—转化—机制—未来”列出最关键的原始文献与权威资料：

1. Fleming A. (1929). *On the Antibacterial Action of Cultures of a Penicillium...* *Br J Exp Pathol* 10:226–236. [PMC 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC2048009/)。
2. Chain E, Florey HW, Gardner AD, Heatley NG, Jennings MA, Orr-Ewing J, Sanders AG. (1940). *Penicillin as a Chemotherapeutic Agent*. *Lancet* 236:226–228. [DOI](https://doi.org/10.1016/S0140-6736(01)08728-1)。
3. Abraham EP, Chain E, Fletcher CM, Gardner AD, Heatley NG, Jennings MA, Florey HW. (1941). *Further Observations on Penicillin*. *Lancet* 238:177–189. [Oxford 扫描全文](https://www.ndorms.ox.ac.uk/files/news/19410816_florey_furtherobservationsonpenicillin_lancet.pdf/view)，[DOI](https://doi.org/10.1016/S0140-6736(00)72122-2)。
4. Abraham EP, Chain E. (1940). *An Enzyme from Bacteria able to Destroy Penicillin*. *Nature* 146:837. [DOI](https://doi.org/10.1038/146837a0)。
5. Park JT, Johnson MJ. (1949). *Accumulation of Labile Phosphate in Staphylococcus aureus Grown in the Presence of Penicillin*. *J Biol Chem* 179:585–592. [DOI](https://doi.org/10.1016/S0021-9258(19)51254-6)。
6. Batchelor FR, Doyle FP, Nayler JHC, Rolinson GN. (1959). *Synthesis of Penicillin: 6-Aminopenicillanic Acid in Penicillin Fermentations*. *Nature* 183:257–258. [DOI](https://doi.org/10.1038/183257b0)。
7. Tipper DJ, Strominger JL. (1965). *Mechanism of Action of Penicillins: A Proposal Based on Their Structural Similarity to Acyl-D-alanyl-D-alanine*. *PNAS* 54:1133–1141. [PMC 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC219812/)，[DOI](https://doi.org/10.1073/pnas.54.4.1133)。
8. Houbraken J et al. (2011). *Fleming’s Penicillin Producing Strain Is Not Penicillium chrysogenum but P. rubens*. *IMA Fungus* 2:87–95. [PMC 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC3317369/)。
9. Cairns TC et al. (2020). *Comparative Genomics of Alexander Fleming’s Original Penicillium Isolate...* *Sci Rep* 10:15705. [PMC 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC7515868/)。
10. GBD 2021 AMR Collaborators. (2024). *Global Burden of Bacterial Antimicrobial Resistance 1990–2021: a Systematic Analysis with Forecasts to 2050*. *Lancet*. [DOI](https://doi.org/10.1016/S0140-6736(24)01867-1)。

## 脚注

[^nobel]: Nobel Prize Outreach, [The Nobel Prize in Physiology or Medicine 1945](https://www.nobelprize.org/prizes/medicine/1945/summary/)；Fleming 的 [1945 Nobel Lecture](https://www.nobelprize.org/prizes/medicine/1945/fleming/lecture/) 也保留了他对早期实验、低毒性与耐药选择的回顾。

[^prehistory]: Kong K-F, Schneper L, Mathee K. [Beta-lactam Antibiotics: From Antibiosis to Resistance and Bacteriology](https://pmc.ncbi.nlm.nih.gov/articles/PMC2894812/). *APMIS*. 2010；有关 Duchesne 的后世神话化，见 Shama G. [La Moisissure et la Bactérie: Deconstructing the Fable...](https://doi.org/10.1016/j.endeavour.2016.07.005). *Endeavour*. 2016。

[^fleming1929]: Fleming A. [On the Antibacterial Action of Cultures of a Penicillium...](https://pmc.ncbi.nlm.nih.gov/articles/PMC2048009/). *Br J Exp Pathol*. 1929;10:226–236。原文明确记录约 7 天达峰、随后衰减、可过滤、敏感谱、毒性比较及选择培养用途。

[^paine]: Wainwright M, Swan HT. [C. G. Paine and the Earliest Surviving Clinical Records of Penicillin Therapy](https://pmc.ncbi.nlm.nih.gov/articles/PMC1139580/). *Med Hist*. 1986;30:42–56。这里的“成功”指有病历支持的局部临床治愈，不等同于纯化药物的静脉系统治疗。

[^taxonomy]: Houbraken J, Frisvad JC, Samson RA. [Fleming’s Penicillin Producing Strain Is Not *Penicillium chrysogenum* but *P. rubens*](https://pmc.ncbi.nlm.nih.gov/articles/PMC3317369/). *IMA Fungus*. 2011;2:87–95。

[^oxfordhistory]: University of Oxford, Sir William Dunn School of Pathology, [The Discovery of Penicillin](https://www.path.ox.ac.uk/centenary/our-history/the-discovery-of-penicillin/)。此档案史特别说明 Chain 与 Florey 选择研究对象的不同理由，以及 Heatley、Jennings、Gardner、Abraham 等人的分工。

[^heatley]: Oxford University, [The Lasting Legacy of Norman Heatley](https://www.ox.ac.uk/giving/stories/norman-heatley-the-unassuming-penicillin-pioneer-who-changed-the-course-of-medicine)；American Chemical Society, [Discovery and Development of Penicillin](https://www.acs.org/education/whatischemistry/landmarks/flemingpenicillin.html)。

[^chain1940]: Chain E et al. [Penicillin as a Chemotherapeutic Agent](https://doi.org/10.1016/S0140-6736(01)08728-1). *Lancet*. 1940;236:226–228；Oxford Dunn School 对早期与扩大动物实验的档案总结见 [The Discovery of Penicillin](https://www.path.ox.ac.uk/centenary/our-history/the-discovery-of-penicillin/)。

[^clinicalarchive]: Oxford Health Histories, [Penicillin](https://oxfordhealth.web.ox.ac.uk/penicillin)。该档案项目把 Alexander 的入院原因关联到空袭裂伤；“玫瑰划伤”仍常见于 ACS 等二手历史页面。这里采用明确标注争议，而非选择更戏剧化版本。

[^clinical1941]: Abraham EP et al. [Further Observations on Penicillin](https://www.ndorms.ox.ac.uk/files/news/19410816_florey_furtherobservationsonpenicillin_lancet.pdf/view). *Lancet*. 1941;238:177–189；James Lind Library 提供 [文献记录与全文入口](https://www.jameslindlibrary.org/abraham-ep-chain-e-fletcher-cm-gardner-ad-heatley-ng-jennings-am-florey-hw-1941/)。

[^museum]: History of Science Museum, University of Oxford, [Original Penicillin Culture and Specimen](https://www.hsm.ox.ac.uk/original-penicillin-culture-and-specimen)。馆藏说明估计一个败血症病例需要约 2,000 L 培养液。

[^moldymary]: USDA ARS, [The Enduring Mystery of “Moldy Mary”](https://scientificdiscoveries.ars.usda.gov/tellus/stories/articles/enduring-mystery-moldy-mary)；USDA ARS, [Penicillin: Opening the Era of Antibiotics](https://www.ars.usda.gov/midwest-area/peoria-il/national-center-for-agricultural-utilization-research/docs/penicillin-opening-the-era-of-antibiotics/)。

[^acsproduction]: American Chemical Society, [Discovery and Development of Penicillin](https://www.acs.org/education/whatischemistry/landmarks/flemingpenicillin.html)；[Penicillin Production through Deep-tank Fermentation](https://www.acs.org/education/whatischemistry/landmarks/penicillin.html)。产量、价格、工厂规模和技术节点均据这两份化学史地标资料。

[^biosynthesis]: Martín JF. [Molecular Control of Expression of Penicillin Biosynthesis Genes in Fungi](https://pmc.ncbi.nlm.nih.gov/articles/PMC111294/). *Int Microbiol*. 2000；Martín JF et al. [Regulation and Compartmentalization of β-lactam Biosynthesis](https://pmc.ncbi.nlm.nih.gov/articles/PMC3815371/). *Microb Biotechnol*. 2012。

[^fleminggenome]: Cairns TC et al. [Comparative Genomics of Alexander Fleming’s Original *Penicillium* Isolate](https://pmc.ncbi.nlm.nih.gov/articles/PMC7515868/). *Sci Rep*. 2020;10:15705。

[^tipper]: Tipper DJ, Strominger JL. [Mechanism of Action of Penicillins: A Proposal Based on Their Structural Similarity to Acyl-D-alanyl-D-alanine](https://pmc.ncbi.nlm.nih.gov/articles/PMC219812/). *PNAS*. 1965;54:1133–1141；现代 PBP 化学综述见 Bertonha AF et al. [PBP Inhibitor Development](https://pmc.ncbi.nlm.nih.gov/articles/PMC10723023/). *Med Res Rev*. 2024。

[^metabolism]: Lopatkin AJ, Yang JH. [Bacterial Metabolism and Susceptibility to Cell Wall-active Antibiotics](https://pmc.ncbi.nlm.nih.gov/articles/PMC11024984/). *Curr Opin Microbiol*. 2023；Dörr T. [Understanding Tolerance to Cell Wall-active Antibiotics](https://pmc.ncbi.nlm.nih.gov/articles/PMC8359209/). *Ann N Y Acad Sci*. 2021。

[^park]: Park JT, Johnson MJ. [Accumulation of Labile Phosphate in *Staphylococcus aureus* Grown in the Presence of Penicillin](https://doi.org/10.1016/S0021-9258(19)51254-6). *J Biol Chem*. 1949;179:585–592。

[^penicillinase]: Abraham EP, Chain E. [An Enzyme from Bacteria able to Destroy Penicillin](https://doi.org/10.1038/146837a0). *Nature*. 1940;146:837；Fleming A. [Nobel Lecture: Penicillin](https://www.nobelprize.org/prizes/medicine/1945/fleming/lecture/), 1945。

[^sixapa]: Batchelor FR, Doyle FP, Nayler JHC, Rolinson GN. [Synthesis of Penicillin: 6-Aminopenicillanic Acid in Penicillin Fermentations](https://doi.org/10.1038/183257b0). *Nature*. 1959;183:257–258。

[^collaboration]: Quinn R. [Rethinking Antibiotic Research and Development: World War II and the Penicillin Collaborative](https://pmc.ncbi.nlm.nih.gov/articles/PMC3673487/). *Am J Public Health*. 2013;103:426–434。

[^amrburden]: GBD 2021 Antimicrobial Resistance Collaborators. [Global Burden of Bacterial Antimicrobial Resistance 1990–2021: a Systematic Analysis with Forecasts to 2050](https://doi.org/10.1016/S0140-6736(24)01867-1). *Lancet*. 2024。论文的参考情景还显示粗死亡率上升而年龄标化率可能下降，说明人口结构是预测的重要组成部分。

[^whopipeline]: WHO, [Bacterial Priority Pathogens List 2024](https://www.who.int/publications/b/64088)；WHO, [Analysis of Antibacterial Agents in Clinical and Preclinical Development 2025](https://www.who.int/publications/b/80370)。
