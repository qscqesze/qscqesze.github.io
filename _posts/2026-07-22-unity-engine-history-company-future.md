---
title: "Unity 二十年史：三位创始人、引擎演进、公司起伏与未来"
date: 2026-07-22 16:20:00 +0800
permalink: /posts/unity-engine-history-company-future/
excerpt: "Unity 由谁创造，为什么会在移动游戏时代崛起，又为何在上市、并购与收费风波中失去部分开发者的信任？这是一篇从 2003 年写到 Unity 7 的完整历史与客观评价。"
categories:
  - 游戏开发
tags:
  - Unity
  - 游戏引擎
  - 游戏行业
comments: true
share: false
related: false
read_time: true
---

> **资料说明：**本文所称“Unity”，视语境分别指 Unity 游戏引擎、Unity Technologies 品牌或上市公司 Unity Software Inc.。历史事实主要依据 Unity 官方资料、美国证券交易委员会（SEC）文件及同期报道；公司数据、产品价格和未来路线更新至 **2026 年 7 月 22 日**。文中的“已公布计划”与“作者判断”会明确分开。本文图片均来自网络检索，不包含 AI 生成图片。

<figure>
  <img src="/images/unity-history/unity-logo-2021.svg" alt="Unity 自 2021 年起使用的官方标志">
  <figcaption>Unity 自 2021 年起使用的标志。图片来自 <a href="https://commons.wikimedia.org/wiki/File:Unity_2021.svg">Wikimedia Commons</a>，原作者 Unity Technologies；该文件在 Commons 标注为公共领域的简单几何与文字标志，但 Unity 名称和图形仍受商标规则约束。</figcaption>
</figure>

## 先把最容易说错的结论讲清楚

Unity 不是由一个人“发明”的。

它由 **David Helgason、Joachim Ante 和 Nicholas Francis** 三位联合创始人共同创造。三人的分工大致是：Helgason 负责公司经营、融资和对外战略，Ante 主导底层引擎技术，Francis 负责创意、产品与工具体验。早期官方材料分别将他们列为 CEO、CTO 和首席创意官，但创业团队的实际工作不可能像成熟公司那样边界分明。把 Unity 单独归功于 Helgason，或者把后来担任 CEO 的 John Riccitiello 称为 Unity 的发明者，都是不准确的。[^1]

更严格地说，Unity 也不是在《GooBall》失败以后才突然出现的“副产品”。创始团队本来就有把自研引擎授权给其他开发者的想法，《GooBall》既是第一款商业游戏，也是工具链的验证项目。游戏没有取得商业成功，但开发游戏时积累的编辑器和跨平台工具显然比游戏本身更有价值，于是公司把重心彻底转向了引擎。[^2]

Unity 真正改变行业的地方，不是发明了 3D 图形、物理模拟或组件系统，而是把原本昂贵、复杂、往往只属于大公司的开发能力，装进一个相对易学的可视化编辑器，并以较低门槛提供给小团队，再让同一项目能够发布到不断增加的平台。这就是 Unity 长期所说的 **“让游戏开发民主化”**。

<figure>
  <img src="/images/unity-history/unity-founders.jpg" alt="Unity 的三位联合创始人合影">
  <figcaption>Unity 的三位联合创始人。图片来自 Unity Learn 的 <a href="https://learn.unity.com/tutorial/what-is-unity?tab=overview">“What is Unity?”</a> 课程页面，版权归 Unity 或原权利人所有，本文用于历史资料说明。</figcaption>
</figure>

## Unity 到底是什么

通常所说的 Unity，至少包含四层东西：

1. **Unity Editor**：开发者摆放场景、导入模型、配置灯光、动画和物理、编写脚本、调试与打包的可视化编辑器。
2. **Unity Engine 与 Runtime**：负责渲染、物理、音频、动画、资源管理、输入、脚本运行和平台适配的引擎及运行时。
3. **开发生态**：包括 Package Manager、Asset Store、学习资料、插件、第三方中间件和庞大的开发者社区。
4. **商业服务**：包括多人游戏、云构建、版本控制、广告投放、用户获取、变现与数据服务。

Unity 的典型开发模型是“场景—游戏对象—组件”：开发者把渲染器、碰撞体、脚本、动画等组件组合到 GameObject 上，再用 C# 描述行为。引擎核心并不是用 C# 写成的；大量底层代码属于原生实现，C# 是绝大多数项目面对的主要脚本与扩展语言。IL2CPP 等后端还可以把托管程序集转换为 C++，以适配 iOS、主机等需要提前编译或强调原生性能的平台。

今天的 Unity 公司也早已不只卖引擎。它把业务分为 **Create Solutions** 与 **Grow Solutions**：前者包括编辑、运行和迭代实时 2D/3D 内容的产品与服务，后者主要帮助应用获得用户、投放广告和变现。理解这两部分，才能理解 Unity 后来的并购、争议和财务结构。[^3]

## 从哥本哈根的一间小团队开始：2003—2005

Unity 的故事大约始于 2003 年。三位创始人希望降低 3D 内容开发的难度；2004 年，他们在丹麦哥本哈根正式成立 **Over the Edge Entertainment（OTEE）**。公司后来才使用 Unity Technologies 这一名称；今天负责上市与财务披露的法律实体则是 Unity Software Inc.。SEC 文件确认，公司最初于 2004 年在丹麦以 Over the Edge Entertainment 名义创立，2009 年重组为特拉华州公司。[^4]

团队最先推出的不是引擎，而是 2005 年的 Mac 游戏《GooBall》。它是一款让玩家控制球体在 3D 场景中滚动、碰撞和解谜的游戏，明显受到《Monkey Ball》一类作品影响。它没有成为热门产品，却迫使团队解决了场景编辑、物理、资源导入和打包发布等一整套问题。

<figure>
  <img src="/images/unity-history/gooball-2005.png" alt="Unity 创始团队 2005 年游戏 GooBall 的画面">
  <figcaption>《GooBall》游戏画面。图片来自 Unity Learn 的 <a href="https://learn.unity.com/tutorial/what-is-unity?tab=overview">Unity 历史课程</a>，版权归 Unity 或原权利人所有，本文用于历史资料说明。</figcaption>
</figure>

2005 年 6 月，Unity 1.0 在苹果全球开发者大会 WWDC 上公开亮相。当时它是面向 Mac OS X 的引擎和编辑器，远不是今天覆盖手机、PC、主机、Web 与 XR 的庞大平台。苹果邀请团队在 WWDC 发布，也让这个默默无闻的欧洲工具第一次进入国际开发者视野。[^1]

这一步的历史意义不在于 Unity 1.0 已经多么先进，而在于它确立了此后没有改变的产品哲学：**编辑器优先、所见即所得、组件组合、快速迭代，以及尽可能把平台差异藏到统一工作流背后。**“Unity”这个名字本身也表达了协作与统一多平台工作流的愿望。[^5]

## 第一次真正的机会：移动互联网，2006—2010

早期 Unity 的用户增长并不快。2000 年代中期，PC 和主机游戏仍以自研引擎或昂贵商业引擎为主，Mac 游戏市场又很小。如果行业一直沿着这条路线发展，Unity 很可能只是一款小众工具。

转折来自智能手机。

2007 年 iPhone 发布，2008 年 App Store 开放，市场突然出现大量没有能力自研引擎、却希望尽快推出 3D 游戏的小团队。Unity 在 2008 年 10 月开始销售 iPhone 发布许可，恰好卡在移动游戏爆发的起点。到 2009 年末，Unity 官方称已有数百款 iPhone 游戏使用其技术。[^6]

与此同时，Unity 连续降低开发门槛：

- **Unity 2.0（2007）**扩展了核心编辑与渲染能力，公司品牌也逐渐从 OTEE 转向 Unity Technologies。
- **Unity 2.5（2009）**第一次提供 Windows 编辑器。此前开发者必须在 Mac 上制作项目；Windows 支持让潜在用户规模发生了质变。[^7]
- **Unity 2.6（2009）**把基础版本改为免费。Unity 由此不再只是“更便宜的商业引擎”，而成为学生、爱好者和独立开发者可以零成本开始学习的工具。[^8]
- **Unity 3.0（2010）**把 Android、iPad 和 PlayStation 3 纳入路线，并继续扩展 PC、Web、Wii、iPhone 与主机发布能力。[^9]
- **Unity Asset Store（2010）**允许开发者买卖模型、纹理、音频、代码和编辑器插件。小团队不再需要自己制作所有基础设施，Unity 也从一款软件变成了双边生态市场。[^10]

Unity 的移动成功并非偶然。它当时的画面上限未必最高，底层开放程度也不如提供源码的引擎，但它解决的是移动创业团队更急迫的问题：**能不能在几个月内做出来，能不能同时发布到 iOS 和 Android，能不能用有限的人把内容迭代起来。**

## 从“能做游戏”到完整生产工具：2011—2015

移动市场带来了用户，接下来 Unity 必须证明自己不仅适合小型 3D 项目。

2012 年发布的 **Unity 4.0**加入 Mecanim 动画系统、DirectX 11、Linux 发布预览等能力；2013 年的 **Unity 4.3**又正式加入 Sprite 工作流、自动图集、2D 渲染与 Box2D 物理。后一个变化非常关键：Unity 从“经常被拿来勉强做 2D 的 3D 引擎”，变成了拥有正式 2D 工具链的通用游戏引擎。[^11]

2014 年，联合创始人 David Helgason 卸任 CEO，前 Electronic Arts CEO **John Riccitiello** 接任。Helgason 继续负责战略与沟通。这个交接标志着 Unity 从创始人主导的工具公司进入职业经理人扩张阶段。[^12]

2015 年的 **Unity 5**是另一个标志性版本。它强化了物理渲染、光照、音频、PhysX、64 位编辑器和 WebGL 导出，并推出免费 Personal 与付费 Professional 的新结构。WebGL 让 Unity 内容能够绕过旧式浏览器插件；免费版本则把许多过去属于 Pro 的能力交给更广泛的创作者。[^13]

这一阶段也形成了后来人们熟悉的 Unity 印象：C# 门槛相对友好，导入资源后很快就能看见结果，独立团队可以依靠 Asset Store 补齐技术短板，再把同一项目发布到多个平台。大量教程、课程、插件与现成答案进一步形成网络效应——工具越多人用，新用户越容易找到答案；新用户越多，插件作者越愿意投入。

## 年份版本、SRP 与 DOTS：2016—2019

Unity 5.6 之后，公司不再继续使用 6、7、8 这样的连续大版本号，而从 **Unity 2017**开始按年份命名，并逐步采用更频繁的 Tech Stream 与长期支持版本。Unity 2017.1 加入 Timeline、Cinemachine 和后期处理工具，让非程序人员可以更直接地制作过场、镜头和叙事序列。[^14]

2018 年，Unity 同时推动两项雄心很大的底层改造：

- **Scriptable Render Pipeline（SRP）**允许团队用 C# 和着色器更深地控制渲染流程，并逐渐形成面向广泛平台的 URP 与面向高端硬件的 HDRP。
- **C# Job System、Burst 与 Entity Component System（ECS）**试图通过数据导向设计更充分地使用多核 CPU，后来合称 DOTS 的核心部分。

这些变化提升了 Unity 的性能上限和图形可定制性，却也埋下新的复杂性：内置管线、URP、HDRP 的材质与功能并不完全兼容，传统 GameObject 工作流与 ECS 长期并存，不同包的成熟速度也不一致。Unity 变得更强，同时也变得更难选型、更难升级。[^15]

2019 LTS 时，URP、HDRP、Burst、增量垃圾回收、新资源导入管线等逐步走向生产可用。LTS 制度则承认了一件重要事实：商业项目需要的不是永远追新，而是一个能够持续修复、尽量不改变功能面的稳定版本。[^16]

## Unity 为什么能成为一种行业基础设施

到 2010 年代后期，Unity 的优势已经不再是某一项孤立技术，而是几个因素叠加：

**第一，平台覆盖广。**移动、PC、Web、主机、AR、VR 和各种新硬件都希望吸引开发者，平台方也愿意与 Unity 合作。开发者因此可以先用统一工作流完成大部分内容，再处理各平台的性能、输入、商店和认证差异。

**第二，学习和招聘成本相对可控。**C#、组件模型和可视化场景对新手友好；大量从业者、课程与现成代码又降低了团队扩张成本。

**第三，Asset Store 放大了小团队。**角色控制器、行为树、着色器、UI、网络框架乃至完整模板都可以购买。它不会消除整合成本，却能显著缩短原型期。

**第四，适用范围很宽。**Unity 可以制作 2D 独立游戏、移动游戏、PC 与主机作品、VR 培训、汽车可视化和数字孪生。它未必在每个方向都是最强，却能让一家团队用相近的人员和知识覆盖很多方向。

《Hollow Knight》《Cuphead》《Among Us》《Cities: Skylines》《Pokémon GO》《原神》等风格、规模和平台完全不同的作品都使用过 Unity。列举这些游戏不是为了证明“用 Unity 就会成功”，而是说明它的技术边界远比“只适合小游戏”宽。以《Hollow Knight》为例，Team Cherry 把手绘 2D 资源放进 3D 场景，结合 Unity 的 2D、粒子和第三方可视化脚本工具，用极小团队完成了跨平台作品。[^17]

## 上市与扩张：Unity 不再只是一家引擎公司，2020—2022

2020 年 9 月，Unity Software Inc. 在纽约证券交易所上市，代码为 **U**，IPO 发行价为每股 52 美元。公司从私人软件企业变成必须持续向公开市场解释增长、利润和商业化的上市公司。[^18]

<figure>
  <img src="/images/unity-history/unity-ipo-2020.png" alt="Unity 2020 年以远程方式参与纽约证券交易所上市仪式">
  <figcaption>Unity 2020 年的数字化上市仪式。图片来自 Unity 官方文章 <a href="https://unity.com/blog/news/ringing-the-nyse-bell-together-how-unity-put-the-u-in-upo">“Ringing the NYSE bell together”</a>，版权归 Unity 或原权利人所有，本文用于公司史说明。</figcaption>
</figure>

上市前后，Unity 的战略从“制作游戏的工具”扩大为“制作、运营、获客和变现的一体化平台”。这条路线并非 2020 年才开始：公司早在 2014 年收购 Applifier，把视频广告与游戏分享服务纳入体系；2017 年又收购多人游戏托管业务 Multiplay。[^19]

扩张在 2021—2022 年达到高峰：

- 2021 年，Unity 以约 **3.2 亿美元现金**收购低延迟远程桌面公司 Parsec。
- 同年，Unity 以 **16.25 亿美元现金加股票**收购 Weta Digital 的工具、管线、知识产权和工程团队；电影视觉特效服务团队则保留为独立的 Wētā FX。
- 2022 年，Unity 完成与移动广告和应用商业化公司 **ironSource** 的全股票合并，宣布交易时给出的估值约为 **44 亿美元**。[^20]

这些交易的逻辑可以理解：Unity 希望从编辑器席位费之外获得更大的收入，把引擎、云协作、广告、用户获取和变现连成闭环，也试图进入影视、汽车和工业实时 3D。但问题同样明显：业务边界扩张得比产品整合更快，昂贵并购消耗了管理注意力，开发者也越来越担心公司是否仍把核心引擎放在第一位。

## 2023 年 Runtime Fee：一次伤害信任的定价实验

2023 年 9 月 12 日，Unity 宣布计划从 2024 年起引入 **Runtime Fee**：当游戏收入和安装量达到相应门槛后，按运行时安装数量收费。最初方案迅速引发反弹，因为开发者难以预测重复安装、订阅服务、慈善包、盗版和免费游戏会怎样计费，也担忧既有项目在完成后面对新的成本结构。[^21]

争议的核心不只是“开发者不愿付钱”。Unreal Engine 长期收取收入分成，商业团队也普遍接受引擎公司需要收入。真正的问题是：

1. 安装次数不是开发者能完全控制、也不容易独立审计的计费单位；
2. 新规则最初被理解为会影响已经投入多年开发的项目；
3. 官方说明多次补充和修正，进一步放大了不确定性；
4. 游戏引擎属于长周期基础设施，团队一旦开工便很难中途迁移，因此合同稳定性本身就是产品价值的一部分。

9 月 22 日，Unity 公开道歉并大幅修改方案：Personal 不收 Runtime Fee，提高免费门槛，收费只适用于未来 LTS，并在分成与按用户自报初始参与量计算之间取较低者。10 月 9 日，John Riccitiello 退休并立即离开 CEO、董事长和董事职位。公司公告没有把他的离任直接归因为收费风波，因此更严谨的说法是：两件事时间紧密相邻，但不应把因果关系写成已经证实的事实。[^22]

2024 年 9 月，新任 CEO Matt Bromberg **彻底取消游戏客户的 Runtime Fee**，恢复按席位订阅的模式，并承诺影响编辑器的条款改变不会追溯破坏开发者继续使用既有版本的权利。取消收费避免了最坏结果，但信任不会因为一篇公告立刻恢复。对许多团队而言，2023 年事件已经把“供应商是否会改变规则”从抽象风险变成了项目立项时必须评估的现实变量。[^23]

## 重组、裁员与 Unity 6：2024—2025

收费风波只是公司问题的一部分。2024 年 1 月，Unity 向 SEC 披露将削减约 **1,800 个岗位**，约占当时员工总数的 25%，以收缩产品组合并聚焦核心业务。这是一次大规模“公司重置”，也意味着此前快速扩张路线告一段落。[^24]

2024 年 5 月 15 日，Matt Bromberg 正式出任 CEO、总裁和董事。与 Riccitiello 时代相比，新管理层的公开叙事明显更聚焦：修复与开发者的关系、提高引擎稳定性和性能、砍掉非核心业务，同时改善现金流和利润率。[^25]

2024 年 10 月发布的 **Unity 6**原本被称为 Unity 2023 LTS，后来改回代际编号。它不是彻底推翻旧架构的新引擎，而是一次以稳定、性能和生产可用性为重点的整合：URP 与 HDRP 优化、GPU Resident Drawer、遮挡剔除、Render Graph、多人游戏工作流、移动 Web 与更大 WebAssembly 内存等成为重点。Unity 官方称部分内部和客户测试中的 CPU 性能可提高到 4 倍；这个数字应理解为特定场景的厂商测试，不是所有项目的普遍加速。[^26]

<figure>
  <img src="/images/unity-history/unity-6-editor-build-profile.png" alt="Unity 6 编辑器中的 Build Profiles 窗口">
  <figcaption>Unity 6 编辑器的 Build Profiles 窗口，展示其面向多平台的构建配置。图片来自 Unity 官方文章 <a href="https://unity.com/blog/unity-6-features-announcement">“Unity 6 is here: See what's new”</a>，版权归 Unity 或原权利人所有。</figcaption>
</figure>

2025 年 12 月，**Unity 6.3 LTS**发布，成为 Unity 6 系列新的长期支持版本，支持期至 2027 年 12 月；Enterprise 与 Industry 用户还可获得额外一年支持。Unity 6.3 增加 Platform Toolkit、更多平台适配和无障碍能力。它传达的产品策略是：减少大版本迁移的震荡，用同一代架构持续交付，并把 LTS 重新做成商业项目可以信赖的固定点。[^27]

## 2026 年的 Unity 公司到底是什么状况

截至 2025 年 12 月 31 日，Unity 有 **4,412 名全职员工、25 个办公室，业务覆盖 16 个国家**；约 65% 员工从事技术岗位，77% 位于美国以外。总部位于旧金山，CEO 仍为 Matt Bromberg。[^28]

2025 财年的数字揭示了一个常被忽略的事实：Unity 是游戏引擎公司，也是一家规模更大的广告与增长平台。

| 2025 财年指标 | 金额 | 如何理解 |
| --- | ---: | --- |
| 总收入 | 18.50 亿美元 | 较 2024 年约增长 2% |
| Create Solutions | 6.21 亿美元 | 包含引擎订阅、支持、专业与用量型服务，不等于纯编辑器收入 |
| Grow Solutions | 12.28 亿美元 | 约占总收入 66%，核心是广告、获客与变现 |
| GAAP 净亏损 | 4.01 亿美元 | 比 2024 年 6.64 亿美元亏损收窄，但仍未实现 GAAP 年度盈利 |
| 年末现金及受限现金 | 20.64 亿美元 | 提供了继续重组与研发的缓冲 |

这些数字说明 Unity 不是一家即将没有现金的微型工具商，但也不能简单说它已经完成复苏。2025 年收入恢复增长、自由现金流和调整后利润指标改善；另一方面，GAAP 仍亏损，Create 的规模明显小于 Grow，部分昂贵并购资产也没有按最初设想转化为核心产品。[^29]

2026 年第一季度，公司收入为 **5.08 亿美元**，同比增长 17%；其中战略收入 4.32 亿美元，同比增长 35%。但当季 GAAP 净亏损达到 3.47 亿美元，主要包含与关闭 ironSource Ads Network、计划出售 Supersonic 游戏发行业务有关的 **2.79 亿美元减值**。旧 ironSource 广告网络已于 2026 年 4 月 30 日停止，公司把增长重心转向新的 AI 广告平台 **Unity Vector**。[^30]

因此，对当前公司的准确概括是：**它正在从“并购很多业务的综合实时 3D 平台”收缩为“Unity 引擎 + 广告增长基础设施”两根主柱。**财务状况比 2023—2024 年重组初期更有秩序，但广告业务与引擎业务之间如何分配资源，仍会长期影响开发者对公司的评价。

## 当前授权与费用：已经没有按安装收费

截至 2026 年 7 月 22 日，游戏客户使用 Unity 不再支付 Runtime Fee，基本规则如下：

- **Unity Personal** 免费，适用于过去 12 个月相关收入与融资低于 20 万美元的个人和小型组织；Unity 6 起启动画面可以取消。
- **Unity Pro** 对超过 20 万美元门槛的游戏企业为必需。官网当前标价为每席位每月 210 美元，年度方案起价 2,310 美元；主机与 Apple Vision Pro 发布也列在 Pro 权益中。
- **Unity Enterprise** 对过去 12 个月收入或融资超过 2,500 万美元的企业为必需，价格与最低采购量需洽谈。
- 游戏与娱乐之外的工业应用另有 Unity Industry 规则；公司总财务规模超过 100 万美元时，通常需要 Industry 方案。

这只是便于选型的摘要，不是法律意见。实际项目还应核对最新服务条款、客户与承包商的收入归属、主机平台协议及地区价格。[^31]

## 客观评价：Unity 强在哪里

### 1. 它仍然是跨平台中小团队最均衡的选择之一

Unity 最大的价值不是单项指标第一，而是“足够好的编辑器 + C# + 足够广的平台 + 足够大的生态”形成的组合。对需要同时发布 iOS、Android、PC、主机或 XR 的团队，这种均衡往往比某一项极致功能更重要。

### 2. 原型速度和内容工作流成熟

Prefab、Inspector、场景编辑、动画、粒子、Timeline、Cinemachine、Package Manager 与 Asset Store 让程序、美术和设计可以在同一项目里快速迭代。Unity 适合先做出可玩的核心，再逐步替换临时资源与系统。

### 3. 2D、移动和 XR 经验深

Unity 并不是最轻的 2D 引擎，但 2D 工具、跨平台、插件与商业发布经验完整。移动端长期积累的平台适配、性能工具、广告与内购生态仍然很难被短时间复制。XR 领域也受益于多硬件厂商希望通过 Unity 获得开发者这一结构性优势。

### 4. 性能上限并不低

“Unity 游戏性能都差”是一种过度概括。Burst、Jobs、ECS、SRP、原生插件、内存分析和平台专用优化可以支持很复杂的项目。真正的问题是，Unity 允许开发者很快堆出一个能运行的版本，也因此很容易把资源生命周期、GC 分配、Draw Call、Shader Variant 和加载尖峰留到后期。**易上手不等于自动优化。**

### 5. 人才和知识存量仍然庞大

即使 2023 年后 Godot 获得更多关注，Unity 二十年积累的教程、答案、插件和从业者仍是一道深护城河。商业团队选择的不只是一个可执行文件，而是一整套招聘、培训、外包、技术支持和移植能力。

## 客观评价：Unity 的主要问题

### 1. 架构与包生态存在碎片化

Built-in、URP、HDRP 之间不能无成本切换；旧 UI 与 UI Toolkit、MonoBehaviour 与 ECS、不同多人游戏方案、不同输入系统和持续变化的包版本会增加决策负担。官方文档明确提醒，后期切换渲染管线可能非常耗时。[^32]

### 2. 大项目的编辑器迭代成本偏高

资源导入、脚本编译、Domain Reload、场景序列化和大型项目启动时间长期是开发者痛点。Unity 7 把 CoreCLR、近乎即时的 Play Mode 和只重载变化代码列为核心目标，本身也侧面说明当前工作流仍有改进空间。

### 3. 核心不是完全开源

普通开发者无法像使用 Godot 那样审查、修改和重新分发整个引擎；Unity Enterprise 虽提供只读源码访问，但这不等于自由软件授权。对于必须长期维护自定义平台、深改渲染或规避供应商风险的团队，这是实质限制。

### 4. 高端 AAA 的默认体验不是它最强的战场

HDRP 能制作高质量画面，Unity 也有大型 PC 与主机作品，但与 Unreal Engine 相比，Unity 在超高端写实渲染、完整源码可用性以及一体化 AAA 工具的默认体验上通常需要团队投入更多工程工作。反过来，Unreal 的体量、C++ 复杂度和移动端成本也可能对小团队过重。这里没有脱离项目类型的绝对赢家。

### 5. 公司治理和授权信任尚未完全修复

Runtime Fee 已经取消，但它留下的不是一个功能 Bug，而是供应商信用折价。对于开发周期五到十年的项目，团队会更加重视版本锁定、合同存档、退出方案和替代引擎评估。这种信任损失很难用一次版本发布完全抵消。

### 6. 引擎与广告业务存在潜在张力

广告平台贡献了公司多数收入，可以为引擎研发提供现金，也可能让管理层更关注移动获客与变现，而不是纯粹的创作工具。两者并非天然冲突，但资源配置是否透明、开发者数据如何使用、核心引擎能否持续获得投入，都值得长期观察。

## Unity、Unreal 与 Godot 怎么选

下面的比较不是排名，而是 2026 年常见项目的取舍：

| 维度 | Unity | Unreal Engine | Godot |
| --- | --- | --- | --- |
| 核心授权 | 专有软件；Personal 免费，超门槛按席位 | 专有 EULA，但提供源码访问；游戏通常在单产品终身总收入超过 100 万美元后，对超出部分收取 5% 版税 | MIT，自由开源，可修改和再分发 |
| 主要脚本 | C# | C++、Blueprint | GDScript、C#、C++ 扩展 |
| 突出优势 | 跨平台、移动、XR、2D/3D 均衡、生态大 | 高端 3D、写实渲染、AAA 工具、源码可用 | 开源、轻量、2D 体验、供应商风险低 |
| 常见代价 | 包与管线碎片化、订阅、核心闭源 | 引擎庞大、学习与构建成本高、移动项目可能偏重 | 商业生态和大型团队工具较弱，官方主机移植受封闭 SDK 限制 |
| 更典型的项目 | 多平台独立游戏、移动游戏、XR、中型 2D/3D 项目 | 高画质 PC/主机、AAA、虚拟制片 | 小型 2D/3D、教学、开源优先、希望深改引擎的项目 |

Unreal 当前公开许可对游戏采用版税模式：单产品终身总收入超过 100 万美元后，超出部分通常收取 5%；Godot 则采用 MIT 许可证，但主机 SDK 受平台保密协议限制，官方基金会不直接提供公开的主机导出模板，通常需要自行移植或使用认证第三方。[^33]

一个实用的选型结论是：

- 如果团队熟悉 C#，强调移动、多平台、XR 或快速内容迭代，Unity 仍然很有竞争力。
- 如果目标是高端 PC/主机写实画面，并且团队能承受 C++ 与大型引擎流程，Unreal 往往更合适。
- 如果最在意完全开源、许可确定性、轻量 2D 和自主控制，Godot 的吸引力最强。
- 如果项目已经进入中后期，除非遇到无法解决的技术或合同问题，继续使用现有引擎通常比迁移更理性。引擎迁移不是“换一个编辑器”，而是重写工具、资源管线、插件、平台层与团队知识。

## 已经确定的未来：Unity 7

2026 年 7 月 21 日，Unity 在 Unite Seoul 公布 **Unity 7** 路线。按官方计划，它将在 2026 年 12 月进入早期 Beta，完整版本在 **2027 年第一季度**发布。Unity 特别强调，Unity 7 是 Unity 6 架构的直接延续，不要求传统意义上的重建项目或学习新语言。[^34]

<figure>
  <img src="/images/unity-history/unity-7-unite-seoul-2026.jpg" alt="2026 年 Unite Seoul 大会发布 Unity 7 的现场">
  <figcaption>2026 年 Unite Seoul 大会现场，Unity 公布 Unity 7 路线。图片来自 Unity 官方 <a href="https://unity.com/blog/unite-seoul-keynote-2026-recap">大会回顾</a>，版权归 Unity 或原权利人所有；图片仅缩小尺寸，未生成或改变内容。</figcaption>
</figure>

Unity 7 已公布的重点包括：

- 用 **CoreCLR** 现代化脚本运行核心，目标是近乎即时进入 Play Mode、只重载发生变化的代码；
- Shader 构建在官方目标场景中最高加速 90%；
- Surface Cache GI 等实时全局光照和跨设备图形伸缩；
- 新 CLI 与公开 API，让构建、资源验证和自动化不必全部依赖完整编辑器；
- 免费 MCP 接口与 Unity AI Gateway，使第三方编程代理能够在受控上下文中操作 Unity 项目；
- Unity Vector、直接面向消费者的内购与 Web 商店继续进入增长和变现链路；
- Unity 与 Epic 展示了通过 PolySpatial 让 Unity 游戏在 Unreal 环境中原生呈现的技术演示，早期访问意向指向 2027 年。[^35]

这些都是官方路线与目标，不是已经在大规模商业项目中验证的交付结果。尤其是“无破坏升级”“近乎即时”“最高加速 90%”等表述，需要等 Beta、正式版和真实项目测试后再评价。

## Unity 未来最可能怎么发展

下面不是公司承诺，而是基于产品路线与财务结构作出的判断。

### 基准情景：守住移动与多平台，恢复为稳健的第二选择

最可能的结果不是 Unity 取代所有引擎，也不是它突然消失。Unity 会继续在移动、独立游戏、XR 和中型跨平台项目中占据重要位置，同时通过 Unity 6/7 解决编译、进入 Play Mode、渲染和升级体验。它在高端 AAA 正面追赶 Unreal，在开放和轻量方向面对 Godot，但自己的核心位置仍是两者之间的广阔中间地带。

### 上行情景：Unity 7 与 AI 工作流重新形成代差优势

如果 CoreCLR、增量重载、CLI、公开 API 和代理接口真正稳定，Unity 可以把“容易上手”推进为“最适合人机协作的生产环境”。对小团队而言，AI 自动处理资源、场景、测试、构建和平台配置，可能比单纯提升画质更有商业价值。Vector 若持续增长，还能为引擎研发提供稳定现金流。

### 下行情景：广告增长很好，引擎信任却恢复不足

公司也可能在财务上因 Vector 成功而改善，却让开发者认为引擎只是广告生态入口。如果核心 Bug、包碎片化、迁移成本和授权沟通没有同步改善，新的独立项目会更多流向 Godot，高端团队继续偏向 Unreal，Unity 则越来越集中在既有移动项目与存量客户。

### 真正决定未来的五个观察指标

与其猜股价或听发布会口号，不如观察：

1. Unity 7 是否按期发布，Unity 6 项目能否低成本升级；
2. Editor 迭代时间在大型真实项目中是否显著下降；
3. URP、HDRP、ECS、多人游戏和 UI 工具是否减少分裂与反复重做；
4. 公司是否继续把 Create 的订阅增长转化为核心研发投入；
5. 授权条款是否连续多年保持可预测，并在变更前真正与开发者沟通。

## 最后的评价

Unity 的历史是一条非常清楚的曲线：

它从三个创始人为一款失败的 Mac 游戏打造的工具链出发，抓住 iPhone 与独立游戏革命，用免费版本、跨平台发布和 Asset Store 把专业游戏开发带给了更小的团队；随后又从引擎扩张到广告、云服务、影视和工业实时 3D，在上市与大型并购中变成一家复杂的全球公司；扩张过快、产品分散和 Runtime Fee 又迫使它收缩、换帅并重新争取开发者。

客观地说，Unity 既不是“过时到不能用”，也不是“任何项目的最佳答案”。它仍是世界上能力覆盖最完整、人才与插件生态最深的通用游戏引擎之一，尤其适合 C#、移动、XR、独立及中型跨平台团队；同时，它的架构碎片化、核心闭源、供应商信用和公司对广告业务的依赖，都是真实成本。

对开发者最理性的态度不是站队，而是把引擎当成一项长期工程决策：用目标平台、团队能力、画面要求、性能预算、授权风险和五年维护成本来选择。Unity 值得继续被认真评估，但不再值得被无条件信任——而这或许正是它二十年历史留给行业最重要的教训。

## 参考资料

[^1]: Unity Technologies, [“Unity Wins Develop's Grand Prix Award”](https://unity.com/news/unity-wins-develops-grand-prix-award), 2010。该文列出三位联合创始人的早期职务，并记载 Apple 邀请 Unity 于 2005 年 6 月在 WWDC 发布。
[^2]: Unity Learn, [“What is Unity? — The Unity Story”](https://learn.unity.com/tutorial/what-is-unity?tab=overview)。该课程说明《GooBall》、三位创始人及引擎转向；关于早期创业过程的补充参见 TechCrunch, [“How Unity built the world’s most popular game engine”](https://techcrunch.com/2019/10/17/how-unity-built-the-worlds-most-popular-game-engine/), 2019。
[^3]: Unity Software Inc., [2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1810806/000181080626000011/unity-20251231.htm)，Item 1 与财务报表注释；Create 与 Grow 的收入定义均据此。
[^4]: Unity Software Inc., [2024 Form 10-K](https://www.sec.gov/Archives/edgar/data/1810806/000181080625000026/unity-20241231.htm)，Item 1。文件记载公司 2004 年在丹麦以 Over the Edge Entertainment 创立，2009 年重组为 Unity Software Inc.。
[^5]: Cbox, [“Hosting Unity's First Public Release”](https://cbox.dk/blog/hosting-unitys-first-release), 2005/档案页面；TechCrunch, [“How Unity built the world’s most popular game engine”](https://techcrunch.com/2019/10/17/how-unity-built-the-worlds-most-popular-game-engine/), 2019。
[^6]: Unity 官方社区公告, [“Unity iPhone Publishing — now shipping!”](https://discussions.unity.com/t/unity-iphone-publishing-now-shipping/384586), 2008-10-22；Unity, [“Unity: Fastest Growing Game Development Platform for iPhone”](https://unity.com/news/unity-fastest-growing-game-development-platform-iphone), 2009-11-30。
[^7]: Unity, [“Unity 2.5 for Mac and Windows now available!”](https://unity.com/blog/2009/03/20/unity-25-for-mac-and-windows-now-available/), 2009-03-19。
[^8]: Unity, [“Unity 2.6 Released And Now Free!”](https://unity.com/news/unity-2-6-released-and-now-free), 2009。
[^9]: Unity, [“Unity Technologies Unveils Third Generation of Its Powerful Development Platform”](https://unity.com/news/unity-technologies-unveils-third-generation-its-powerful-development-platform), 2010-03-08。
[^10]: Unity 官方生态页面, [“Showcase, connect, thrive”](https://create.unity.com/showcase-connect-thrive)，记载 Asset Store 于 2010 年推出；Unity Docs, [“Introduction to the Asset Store”](https://docs.unity.com/en-us/asset-store/introduction)。
[^11]: Unity, [“Unity 4.0 Launches”](https://unity.com/news/unity-4-0-launches), 2012-11-14；Unity, [“Unity Releases 2D Tools with 4.3 Update”](https://unity.com/news/unity-releases-2d-tools-4-3-update), 2013-11-12。
[^12]: Unity, [“Unity Technologies Appoints John Riccitiello as CEO”](https://unity.com/news/unity-technologies-appoints-john-riccitiello-ceo), 2014-10-22。
[^13]: Unity, [“Unity 5 Is Here”](https://unity.com/news/unity-5-here), 2015-03-03；Mozilla, [“Unity 5 Ships and Brings One Click WebGL Export to Legions of Game Developers”](https://blog.mozilla.org/en/mozilla/unity-5-ships-and-brings-one-click-webgl-export-to-legions-of-game-developers/), 2015-03-03。
[^14]: Unity, [“Introducing Unity 2017”](https://unity.com/blog/technology/introducing-unity-2017)；Unity, [“Unity 2017.1 Now Available”](https://unity.com/news/unity-2017-1-now-available), 2017-07-11。
[^15]: Unity, [“2018.1 is now available”](https://unity.com/blog/engine-platform/2018-1-now-available), 2018-05-02。该文同时介绍 SRP、HDRP/LWRP、C# Job System 与 ECS 的早期预览。
[^16]: Unity, [“Unity 2019 LTS”](https://unity.com/releases/2019-lts)；[“Unity 2019.3 is now available”](https://unity.com/blog/technology/unity-2019-3-is-now-available)。
[^17]: Unity, [“Hollow Knight — Made with Unity”](https://unity.com/made-with-unity/hollow-knight)。文中其他作品只作知名案例列举，不代表 Unity 对其质量或商业成绩拥有决定性作用。
[^18]: Unity Investor Relations, [“Unity Announces Pricing of Initial Public Offering”](https://investors.unity.com/news/news-details/2020/Unity-Announces-Pricing-of-Initial-Public-Offering/default.aspx), 2020-09-17。
[^19]: Unity, [收购 Applifier 公告](https://unity.com/news/unity-technologies-acquire-applifier-bring-everyplay-social-gaming-community), 2014-03-13；[收购 Multiplay 游戏托管业务公告](https://unity.com/news/unity-technologies-acquires-game-hosting-division-multiplay-game-digital-plc), 2017-11-28。
[^20]: Unity Investor Relations, [Parsec 收购公告](https://investors.unity.com/news/news-details/2021/Unity-Enters-Into-Agreement-to-Acquire-Parsec/default.aspx), 2021-08-10；[Weta Digital 收购公告](https://investors.unity.com/news/news-details/2021/Unity-Announces-Intent-to-Acquire-Weta-Digital/default.aspx), 2021-11-09；[ironSource 合并公告](https://investors.unity.com/news/news-details/2022/Unity-Announces-Merger-Agreement-with-ironSource/default.aspx), 2022-07-13；[合并完成公告](https://investors.unity.com/news/news-details/2022/Unity-Completes-Merger-with-ironSource/default.aspx), 2022-11-07。
[^21]: Stephen Totilo, [“Unity rushes to clarify price increase plan, as game developers fume”](https://www.axios.com/2023/09/13/unity-runtime-fee-policy-marc-whitten), *Axios*, 2023-09-13；原始方案后来被修改和撤销，引用同期报道比引用已更新的价格页更能还原当时内容。
[^22]: Unity, [“An open letter to our community”](https://unity.com/blog/an-open-letter-to-our-community), 2023-09-22；Unity, [“Unity Announces Leadership Transition”](https://unity.com/news/unity-announces-leadership-transition-0), 2023-10-09。
[^23]: Matt Bromberg, Unity, [“Unity is canceling the Runtime Fee”](https://unity.com/blog/unity-is-canceling-the-runtime-fee), 2024-09-12。
[^24]: Unity Software Inc., [Form 8-K](https://www.sec.gov/Archives/edgar/data/1810806/000181080624000006/unity-20240108.htm), 2024-01-08。
[^25]: Unity, [“Unity Appoints Matthew Bromberg as New CEO”](https://unity.com/news/unity-appoints-matthew-bromberg-as-new-ceo), 2024-05-01。
[^26]: Unity, [“Unity 6 launches today!”](https://unity.com/blog/introducing-unity-6-launch), 2024-10-17；[“Unity 6 is here: See what's new”](https://unity.com/blog/unity-6-features-announcement), 2024-10-17。
[^27]: Unity, [“Unity 6.3 LTS is now available”](https://unity.com/blog/unity-6-3-lts-is-now-available), 2025-12-04；[Unity 6 release support](https://unity.com/releases/unity-6/support)。
[^28]: Unity Software Inc., [2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1810806/000181080626000011/unity-20251231.htm)，截至 2025-12-31 的 Human Capital、公司总部与签署页信息。
[^29]: Unity Software Inc., [2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1810806/000181080626000011/unity-20251231.htm)；Unity Investor Relations, [2025 财年业绩](https://investors.unity.com/news/news-details/2026/Unity-Reports-Fourth-Quarter-and-Fiscal-Year-2025-Financial-Results/default.aspx), 2026-02-11。本文采用 GAAP 亏损，并把调整后 EBITDA 与现金流仅作为补充观察，避免混为一谈。
[^30]: Unity Investor Relations, [2026 年第一季度财务业绩](https://investors.unity.com/news/news-details/2026/Unity-Reports-First-Quarter-2026-Financial-Results/default.aspx), 2026-05-07。
[^31]: Unity, [Plans & Pricing](https://unity.com/products)，访问于 2026-07-22；收费、资格和产品权益可能继续变化，应以签约时条款为准。
[^32]: Unity Manual, [“选择渲染管线”](https://docs.unity3d.com/cn/current/Manual/choose-a-render-pipeline.html) 与 [渲染管线功能比较](https://docs.unity3d.com/cn/current/Manual/render-pipelines-feature-comparison.html)。
[^33]: Epic Games, [Unreal Engine Licensing](https://www.unrealengine.com/license)；Godot Engine, [License](https://godotengine.org/license/) 与 [Console Support](https://godotengine.org/consoles/)，访问于 2026-07-22。
[^34]: Unity, [“Unity 7 Roadmap Revealed at Unite Seoul”](https://unity.com/news/unity-7-roadmap-revealed-at-unite-seoul), 2026-07-21。
[^35]: Unity, [“Unite Seoul 2026 Keynote Recap: Announcing Unity 7”](https://unity.com/blog/unite-seoul-keynote-2026-recap), 2026-07-22。Unity 7 性能、AI、商业化与 Unity—Epic 演示均来自官方路线，尚不等于第三方验证结果。
