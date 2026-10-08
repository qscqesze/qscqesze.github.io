---
title: "灵魂石幸存者开发与宣发复盘 从免费试玩到百万销量"
date: 2026-10-08 12:00:00 +0800
permalink: /posts/soulstone-survivors-demo-marketing-postmortem/
excerpt: "还没参加新品节，Demo 就已出现三千多人同时在线。复盘 Game Smithing 如何从已有项目转向幸存者玩法，安排三轮免费内容，用构筑、社区更新和创作者传播积累关注，并走到抢先体验和百万销量。"
categories:
  - 独立游戏
tags:
  - 灵魂石幸存者
  - Steam
  - 游戏营销
  - Demo
  - 独立游戏
  - 调研
comments: true
share: false
related: false
read_time: true
translate: false
indie_game: true
header:
  teaser: /images/soulstone-survivors-postmortem/01-prologue-gameplay.jpg
---

<style>
.page__toc[hidden] { display: none; }
</style>

2022 年 8 月 2 日，《灵魂石幸存者》（Soulstone Survivors）的 Demo 达到 **3,205 人同时在线**。8 月 28 日，单独发布的免费序章达到 **4,818 人同时在线**。当年的十月 Steam 新品节，要到一个多月后才开始。[^demo-db][^prologue-db]

这两个日期说明了它的起量顺序：先把试玩交给玩家，出现反复游玩、创作者视频和商店曝光，再带着已有关注参加新品节。到了 11 月 7 日，游戏进入抢先体验；11 月 13 日，付费本体的同时在线人数达到 **18,854**。[^launch][^game-db]

Game Smithing 在 2026 年 9 月披露，游戏全平台累计销量已经超过 **130 万份**。这中间经历了近三年的抢先体验开发、正式版发行和持续运营。早期 Demo 帮它建立了第一批受众，后面的销售则由不断扩充的完整游戏承接。[^studio]

这篇复盘重点看 2022 年：团队怎样做出可玩的产品，为什么先发 Demo、再发免费序章，宣传具体做了什么，以及这些安排怎样帮助游戏获得关注。涉及后续销量和中国市场的数据，会单独标明年份。

<figure class="technical-figure">
  <a href="/images/soulstone-survivors-postmortem/01-prologue-gameplay.jpg"><img src="/images/soulstone-survivors-postmortem/01-prologue-gameplay.jpg" alt="灵魂石幸存者免费序章的实机画面，角色使用冰霜技能攻击成群敌人，底部展示技能与强化。" loading="eager" width="1920" height="1080"></a>
  <figcaption>图 1｜免费序章商店页展示的实机画面。技能、敌群、伤害数字和角色成长直接构成了宣传素材。图片来自 <a href="https://store.steampowered.com/app/2113430/Soulstone_Survivors_Prologue/">Game Smithing 官方商店页</a>；为当前页面素材，不作为 2022 年具体版本的截图证据。</figcaption>
</figure>

**先理解它卖给玩家的体验。** 《灵魂石幸存者》是一款俯视角动作游戏。玩家在地图里对抗越来越密集的敌人，获得经验、选择技能和强化，打败大型首领。一局结束后，材料和灵魂石用于制作武器、发展技能树和解锁角色，再带着新的选择进入下一局。

技能会自动施放，玩家仍需移动、躲避攻击，并根据技能调整位置和方向。它把一部分操作负担交给自动战斗，把大量决策留在角色培养和技能搭配上。开发者在宣传中直接用《暗黑破坏神》《吸血鬼幸存者》和《哈迪斯》帮助玩家理解这种组合。[^oct-reddit]

所谓“构筑”，就是把角色、技能和强化组合成一套打法。例如围绕投射物选择技能，再提高相应伤害与重复施放能力；或者集中发展召唤物，让它们承担主要输出。同一张地图上，换一组选择就能产生不同的战斗过程。

这个结构同时影响了开发和传播。开发者增加一个角色、一把武器或一种技能，就能改变已有内容的组合。玩家会讨论搭配，创作者能录制挑战与攻略，免费版本也能通过多轮游玩维持吸引力。

**它起步于已有项目，团队有开发经验。** Game Smithing 最初做的是《Rogue Soulstone》，一款同世界观的动作 Roguelite。后来团队用已有代码尝试《吸血鬼幸存者》式玩法，逐渐形成了《灵魂石幸存者》。在 2022 年 7 月的公开交流里，开发者还讨论过两种玩法对应的不同偏好：有玩家喜欢更主动的操作，有玩家喜欢自动战斗与大量敌人的组合。[^origin]

这条开发路线降低了试验成本。角色移动、敌人、法术和基础战斗已经有可用部分，新项目可以集中验证战斗节奏和成长结构。团队能够较快拿出一个完整体验，前提是此前积累的代码、素材和开发能力。

美术上，他们使用了 Synty 的现成资源。创始人在 2024 年访谈中回忆，最早制作《Rogue Soulstone》原型时，成员还在全职从事手游开发；借助 POLYGON Dungeon 资源，一两周内就搭起角色、敌人、施法和初步架构，大约一个月后建立了 Steam 页面。这里说的是早期原型与商店页的进度。[^synty]

随后，团队逐步加入自己的视觉特效、定制角色和敌人，让战斗形成更鲜明的辨识度。这个投入顺序很实用：先让玩家验证玩法，再围绕反复出现的战斗画面完善表现。需要被看见的技能效果、首领攻击和成长变化，直接关系到游戏是否容易理解、是否适合观看。

2022 年 7 月的宣传帖把团队介绍为两人团队。到 2026 年，工作室公布的人数是十人，多名成员此前已经有长期合作经历。复盘它的效率，应当把小团队规模、既有经验和资源复用一起考虑。[^july-reddit][^studio]

<figure class="technical-figure">
  <a href="/images/soulstone-survivors-postmortem/02-rogue-prototype.gif"><img src="/images/soulstone-survivors-postmortem/02-rogue-prototype.gif" alt="Rogue Soulstone 开发第二周原型，角色在立体地牢中移动并施放法术。" loading="lazy" width="600" height="322"></a>
  <figcaption>图 2｜《Rogue Soulstone》开发第二周的原型动图。它展示了前身项目的基础，也解释了后来试验新玩法时可复用的工作。来源：<a href="https://syntystore.com/blogs/blog/made-with-synty-soulstone-survivors">Synty 对 Game Smithing 的访谈</a>，2024 年 8 月。</figcaption>
</figure>

**2022 年的发行安排分成了连续几轮。** 从最初公开试玩到抢先体验发售，大约三个多月。其间每次重新宣传，都配有玩家能体验的新内容。

| 时间 | 发布与宣传动作 | 玩家得到的内容 |
|---|---|---|
| 7 月 27—28 日 | Demo 上线并发布公告、社区帖子 | 三名角色、三张地图，体验战斗、武器制作和技能树 |
| 8 月 5—7 日 | 首次 Skill Weekend 社区活动 | 提交技能创意、参与投票，入选技能计划加入游戏和 Demo |
| 8 月 26 日 | 免费序章 Prologue 发布，原 Demo 按计划撤下 | 换成另外三名角色，加入新技能、首领与改进 |
| 9 月 22 日 | 扩充版 Demo 回归，为新品节准备 | 首次把前后两组三名角色合并，开放六名角色 |
| 10 月 3—10 日 | 参加 Steam 新品节，安排社区直播 | 六角色 Demo；开幕日公布 11 月 7 日抢先体验日期与路线图 |
| 10 月 12 日 | 六角色 Demo 的公告关闭日期 | 免费序章按计划继续保留三名角色 |
| 10 月 26 日 | 序章更新、发售前速通活动 | 继续试玩，参加比赛与抽奖，关注即将发售的本体 |
| 11 月 7 日 | 抢先体验发售 | 购买本体，体验更多角色、技能与成长系统 |

时间线依据官方公告整理。最初 Demo 的 SteamDB 上线时间为 7 月 27 日 UTC，官方宣传公告为 7 月 28 日；序章采用商店标注的 8 月 26 日发售日期。[^demo-db][^first-demo][^skill-weekend][^prologue-plan][^six-demo][^ea-date][^speedrun][^launch]

这份排期最值得参考的是内容之间的衔接。七月底提供第一轮试玩，八月底给玩过的人新的角色，九月底用六角色版本迎接新品节，十月宣布明确发售日期并举办社区活动，十一月开放购买。团队一直有具体内容可以展示，玩家也一直知道下一步能玩到什么。

**第一版 Demo 已经有完整的重复游玩结构。** 开发者在七月的介绍中明确列出了三张地图，每张地图有不同材料；玩家可以制作武器，用灵魂石升级技能树，再尝试不同技能搭配。符文、更高难度的地图词缀和大量解锁内容，则预留给后续版本。[^july-reddit]

它给玩家的目标超过了“看一遍游戏”。一局结束，玩家可以继续收集材料、换武器、试角色，或者尝试更快击败首领。试玩结束时，前一局的积累会影响下一局的选择，这让重玩有了清楚的理由。

对于这种靠系统组合提供乐趣的游戏，Demo 需要展示组合真正产生差异的阶段。玩家只有拿到几种技能、选过若干强化、打过首领，才容易形成自己的判断。角色刚开始变强就结束，玩家看到的可能只是基础攻击和移动。

《灵魂石幸存者》的免费内容允许玩家走完这段过程。正式版的购买理由则是继续扩展已经喜欢的玩法：更多角色、更多技能，以及进一步改变构筑和难度的系统。

**八月的免费序章，用内容更换制造了新的试玩理由。** 官方在 8 月 19 日预告，8 月 26 日将撤下原 Demo，推出 Prologue。原先的 Spellbreaker、Sentinel、Arcane Weaver 暂时退出免费版本，换成 Barbarian、Pyromancer、Hound Master。同时增加技能、首领，以及修复和优化。[^prologue-plan]

因此，八月底的变化是“三名新角色替换三名旧角色”。六名角色同时开放，要等到九月的新版 Demo。这个区分很重要，因为它决定了老玩家为什么愿意重新下载：他们得到的是不同的玩法选择。

官方还提前说明存档继承。技能树、材料和灵魂石保留，新角色和武器需要解锁，相关进度之后可以带入完整游戏。对已经在免费版投入时间的人，这降低了更换版本的负担。[^prologue-plan]

换一个版本名称本身没有多少可讲的内容。换角色、加技能、加首领，再保留成长进度，就同时照顾了两类人：新玩家得到更完善的免费游戏，老玩家有理由回来尝试新的组合。这也是第二轮宣传可以成立的产品基础。

**Demo 与 Prologue 在当时承担了不同的商店曝光任务。** Demo 是附属于本体的试玩应用，Prologue 则以独立免费产品的形式上架，有自己的商店页。2022 年 10 月，开发者在 Reddit 上明确解释，两者在 Steam 上有不同的曝光机会；参加新品节又需要 Demo，因此活动前出现了两个免费版本并存的安排。[^oct-reddit]

从这次案例看，团队在做两件相关的事：利用免费产品让更多玩家接触游戏，再把对完整内容有兴趣的人引向付费本体。官方序章公告直接链接本体，提醒玩家为本体加入愿望单，并说明序章不会自动变成完整游戏。[^prologue-plan]

这套安排也产生了实际的沟通成本。九月的官方公告专门用视频解释两个版本的关系；十月社区里仍有玩家弄不清该下载哪个版本。试玩、序章和本体的名字相似，内容又在变化，玩家需要额外阅读才能理解。[^six-demo][^oct-reddit]

因此，这个案例值得学习的是让免费内容接触受众、再清楚介绍完整版价值的做法。若采用多个应用，就要在商店描述、游戏内入口和公告中反复说明可玩内容、进度继承与购买对象。否则，增加的曝光也会带来找错页面、下载旧版本和收藏错对象的问题。

**早期流量已经相当可观，而且有可核对的时间点。** SteamDB 记录了原始 Demo、免费序章和付费本体各自的同时在线峰值。三个应用的峰值发生在不同日期，展示的是各阶段的活跃规模。

<figure class="technical-figure">
  <a href="/images/soulstone-survivors-postmortem/03-concurrent-peaks.png"><img src="/images/soulstone-survivors-postmortem/03-concurrent-peaks.png" alt="三个独立应用的同时在线峰值：原始Demo于2022年8月2日达到3205人；免费序章于8月28日达到4818人；付费本体于11月13日达到18854人。" loading="lazy" width="2160" height="1080"></a>
  <figcaption>图 3｜同时在线人数是某一时刻正在运行游戏的玩家数。这三个数分别属于不同应用，不能相加，也不能据此计算从试玩到购买的转化率。数据来源：SteamDB 的 <a href="https://steamdb.info/app/2083070/charts/">Demo</a>、<a href="https://steamdb.info/app/2113430/charts/">Prologue</a> 和<a href="https://steamdb.info/app/2066020/charts/">本体</a>页面。<a href="/files/soulstone-survivors-postmortem/data.json">下载本文数据</a>。</figcaption>
</figure>

How To Market A Game 在 2022 年 8 月 4 日的报道中披露，游戏曾在一天获得 **2,986 个愿望单**，并给出 **34,724 个愿望单的月度新增量**。报道同时记录了它进入 Steam 热门 Demo 榜单，以及创作者对试玩的传播。[^early-report]

报道没有列出这项月度统计的起止日期；它披露的是八月初的早期成绩。

对发行排期而言，已经清楚的事实是：八月初出现了数千人同时游玩、单日数千愿望单的表现。十月新品节面对的是一款已经被玩家和创作者验证过吸引力、又经过多轮更新的游戏。

**宣传从目标玩家聚集的地方开始，内容一直指向可玩的版本。** 2022 年 7 月 28 日，开发者在 Reddit 的 r/roguelites 和 r/letsplay 发布试玩信息。8 月 7 日，他们又参加 r/Games 的 Indie Sunday 展示。到了 10 月 2 日，新品节开幕前一天，团队再次在 r/Games 介绍六角色试玩和即将公布的新消息。[^origin][^july-reddit][^aug-reddit][^oct-reddit]

这些帖子的结构很直接：说明游戏类型，给出预告片和 Steam 链接，介绍角色、技能与成长系统，并在评论里回答玩家。开发者讨论了存档继承、武器装备、操作与界面等具体问题，帖子由此成为试玩反馈的一部分。

这种沟通适合早期项目。玩家看完视频可以马上下载，下载后遇到的问题又能回到原帖交流。宣传信息与产品体验之间只有很短的一段距离，团队也能迅速发现文案没有解释清楚的地方。

创作者内容则把玩法展示得更具体。早期报道链接了 Sifd 的一支视频，主题是近战多重攻击构筑。视频标题突出的是一套威力很强的打法。[^sifd]

它展示了这类游戏适合怎样被传播：给观众一个容易看懂的目标，让观众看见技能如何叠加，再展示最终效果。相同游戏可以围绕不同角色、不同搭配或速通目标继续制作视频。创作者有新的选题，老观众也有继续观看的理由。

在这样的内容里，开发者的介绍文案只负责把人带到门口。玩家更容易记住的，是某个技能组合怎样清掉整片敌人、一个首领怎样被快速击败，以及自己能否复现这套打法。游戏的系统设计决定了这些素材是否持续出现。

**Demo 更新本身也在生产宣传内容。** 七月底发布后，团队持续修复并扩充试玩。8 月 2 日的更新加入 Frozen Warhammer 等内容，并处理技能伤害、升级选项和攻击提示问题；8 月 5 日补丁增加精英敌人，让拾取大型灵魂石时自动吸取场上经验，同时修正瞄准、导航和视觉反馈。[^patch-aug2][^patch-aug5]

这些改动直接影响多轮游玩的体验。敌人攻击更清楚，玩家更容易理解失败原因；拾取经验更顺畅，战斗节奏更连贯；新敌人与技能则为已经玩过的人提供新变化。一次补丁可以同时改善留存和产生再次介绍游戏的理由。

到 9 月 20 日，团队继续完善结算时的伤害统计和技能说明，调整升级与技能相关机制。玩家更容易看清自己的搭配为什么有效，也更方便比较不同技能的表现。[^patch-sept]

这类信息对构筑游戏尤其有用。玩家能够解释一套打法，才更容易写攻略、给别人建议，或者针对某个目标重新配装。完整的统计和清楚的说明，也会减少开发者在社区里反复解释同一个机制的工作。

**社区活动围绕玩家已经喜欢的事情展开。** 8 月 5—7 日的 Skill Weekend，让玩家到 Discord 提交主动技能创意，再进行投票。团队承诺把入选技能加入游戏和 Demo，并在相关界面完成后署名。[^skill-weekend]

这个活动把社区参与和游戏内容直接联系起来。喜欢研究技能的人有了提出设计的机会，其他玩家可以参与选择；后续技能加入游戏，又会带来一次值得回访的更新。加入 Discord 的理由因此非常具体。

新品节的直播也用了熟悉游戏的人。10 月 2 日公告邀请 VyvLiveGaming 和 moorhuhnschlaechter 两名玩家与速通者，在开幕日从 Demo 开始游玩，演示角色、技能、技巧和速通。开发者在聊天区回答问题。[^stream]

这把直播中的工作分开了：熟练玩家展示游戏的玩法空间，开发者解释系统与后续计划。刚接触游戏的人可以看基础操作，已经试玩的人能看技巧，准备购买的人能了解完整版。

10 月 26 日，团队又把序章更新与发售前速通活动放在一起。奖品包括六份本体 Steam Key、由 VyvLiveGaming 提供的 30 美元 Steam 礼品卡，以及 Discord 身份组；普通参与者也有抽取 Key 的机会。[^speedrun]

奖品规模不大，活动目标却与游戏很贴合。此前已经在研究构筑、比通关时间的人，有了集中参与的场合。距离发售不到两周，这批玩家再次打开试玩、讨论打法，也再次看到本体的发售日期。

**新品节放大了已有兴趣，六角色版本负责承接。** 9 月 22 日回归的 Demo，第一次把此前两批角色放到同一个版本里。它给已玩过七月 Demo 或八月序章的人提供了更完整的免费体验，同时在开幕前留出了继续游玩与反馈的时间。[^six-demo]

10 月 3 日，团队配合新品节开幕宣布 11 月 7 日进入抢先体验，并公开路线图。公告把付费版新增内容写得很具体：符文、诅咒、成就与解锁、100 个新技能，以及新角色和武器。[^ea-date]

这让新品节期间的宣传有了明确去向。感兴趣的玩家先玩六角色 Demo，再了解一个月后能买到的内容；玩够免费版的人，也能判断付费版是否提供了自己想要的扩展。

<figure class="technical-figure">
  <a href="/images/soulstone-survivors-postmortem/04-next-fest-2022.png"><img src="/images/soulstone-survivors-postmortem/04-next-fest-2022.png" alt="2022年十月新品节历史页面截图，在Popular Upcoming标签下可见Manor Lords、ZERO Sievert和Soulstone Survivors等游戏。" loading="lazy" width="715" height="805"></a>
  <figcaption>图 4｜2022 年十月新品节的历史页面截图，《灵魂石幸存者》出现在 Popular Upcoming 列表的可见位置。图中是当时某一页面状态，不是活动最终总排名。图片由 <a href="https://howtomarketagame.com/2022/11/04/steam-next-fest-october-2022-how-did-games-perform/">How To Market A Game 的当届复盘</a>留存。</figcaption>
</figure>

新品节后的调查还记录了一个突出的产品指标：《灵魂石幸存者》Demo 的玩家试玩时长中位数达到 **3 小时**，是该调查里最高的游戏。整份调查收录 41 款作品，各游戏试玩时长中位数的中间水平为 **18 分钟**。[^fest-report]

<figure class="technical-figure">
  <a href="/images/soulstone-survivors-postmortem/05-demo-playtime.png"><img src="/images/soulstone-survivors-postmortem/05-demo-playtime.png" alt="2022年十月新品节调查中，灵魂石幸存者的试玩时长中位数为180分钟，调查游戏的中间水平为18分钟。" loading="lazy" width="2160" height="972"></a>
  <figcaption>图 5｜这里比较的是各款游戏的玩家试玩时长中位数。3 小时指累计试玩指标，不代表每局玩三小时；18 分钟也不是把所有游戏玩家混在一起计算的中位数。来源：<a href="https://howtomarketagame.com/2022/11/04/steam-next-fest-october-2022-how-did-games-perform/">2022 年 10 月新品节调查</a>。</figcaption>
</figure>

长时间试玩与这套产品结构相吻合：一局完成后仍有角色、武器和搭配可以尝试，既有成长能保留下来，换构筑还可能获得明显不同的战斗效果。免费版本已经能让目标玩家投入多轮游玩。

同时在线人数也会受游玩时间影响。同样数量的新玩家进入，如果有人愿意留下来反复玩，就更容易与后续进入的人同时在线。因此，三千、四千的在线人数同时反映了进入游戏的人数与他们停留的情况，不能直接当作新客数量。

从可见结果看，游戏同时具备了站外内容传播、Steam 页面曝光和较长试玩时长。对它的流量，更合理的解释是这些因素彼此配合：视频让人发现游戏，免费版本让人亲自验证，反复游玩又产生新的攻略、讨论和活跃。

**为什么它的免费试玩特别容易传播。** 结合玩法与发布记录，我认为有四个因素共同起作用。

第一，类型让玩家迅速理解基本乐趣。2022 年，《吸血鬼幸存者》式玩法正在吸引大量关注。看到不断增多的敌人、自动释放的技能和迅速提高的伤害，目标玩家很容易知道自己将得到怎样的体验。熟悉类型减少了介绍成本。

第二，它提供了清楚的变化。三维画面、主动躲避、大型首领、技能搭配、武器与局外成长，把熟悉的幸存者循环和动作 RPG 的兴趣结合起来。宣传能够围绕这些可见内容展开，玩家也能在试玩中检验它们。

第三，系统适合不断生成新内容。一个固定剧情片段看完后，创作者需要新的故事进度；《灵魂石幸存者》则可以通过角色、构筑、难度和速度目标，反复使用同一批基础场景。开发团队每增加一部分内容，玩家的组合空间也随之增加。

第四，公开版本持续得到维护。八月更新、换角色的序章、九月六角色 Demo、十月直播与速通，各自都对应新的内容或参与方式。已经离开的玩家有回访理由，尚未接触的人也会在不同时间点看到游戏。

这四点需要放在一起理解。一个能反复游玩的 Demo 提供了传播材料，创作者和社区把材料带给更多玩家，而更新与发售安排让新增关注继续向前走。只把免费版本上架，通常不会自动形成同样的过程。

**购买理由被安排在了免费内容之后。** 试玩给了完整的基础循环，付费本体继续提供更多构筑维度。符文允许玩家在进入战斗前定制能力，诅咒提高地图挑战，更多技能与角色扩大可选组合。团队在新品节期间就公开这些内容，帮助已经喜欢 Demo 的玩家理解付费版的价值。[^ea-date]

从新品节结束到 11 月 7 日发售，间隔约四周。期间序章继续提供体验，社区活动继续聚集玩家。发售公告随后承接前几个月积累的关注，首周本体在线峰值达到 18,854 人。[^launch][^game-db]

这条路径也解释了为什么免费内容可以给得比较充分。它让玩家先确认自己喜欢核心玩法，后续销售再围绕更多组合、更高挑战和长期成长展开。对于同样依靠系统重玩的项目，值得优先设计的是免费内容与完整内容之间的关系，然后再决定试玩开放多久。

**后来的中国市场宣传，是另一个阶段。** Game Smithing 在 2023 年 8 月开始与 HUQIAO 合作拓展中国市场。合作方披露，四个月内，中国市场销售占比从 **12.9% 提高到 20%**，增加 7.1 个百分点；合作开始后，中国市场新增销量约 **2.3 万份**，累计销量约 **11.8 万份**。[^china]

其执行内容包括对接抖音、Bilibili 创作者，经营本地玩家社区，并把文化与玩家反馈提供给开发团队。案例还列出近百条自然产生的视频，以及小黑盒约 **5.4 万个心愿单**。小黑盒与 Steam 是不同平台，这一数字应单独理解。[^china]

这段后续经历显示，早期成功之后，团队仍在寻找新的玩家群体。完整游戏持续更新，本地创作者有内容可做，社区反馈又回到开发。这里的中国市场成绩属于 2023 年的抢先体验运营，时间上晚于最初 Demo 起量一年。

**高流量之后，开发工作持续了很久。** 《灵魂石幸存者》在 2025 年 6 月 17 日推出 1.0。从 2022 年 11 月的抢先体验开始计算，约有 31 个月。2026 年的工作室回顾提到，他们在通往 1.0 的过程中发布了十余次更新，并通过 Discord 与 Steam 论坛持续和玩家交流。[^one-point-zero][^studio]

所以，超过 130 万份的销量应放在这条完整时间线上：早期试玩吸引受众，抢先体验开始销售，长期更新扩展游戏，正式版与多平台发行继续扩大覆盖。Demo 是其中的重要起点，完整产品的持续开发负责把兴趣变成长期销售。

对于开发者，这个案例最有用的地方有三处。

首先，公开试玩前，先完成能够代表游戏的核心过程。对《灵魂石幸存者》来说，是开始战斗、形成构筑、击败首领、获得成长、再尝试另一种打法。自己的游戏应当让玩家实际经历那个最值得购买的过程，随后再限制内容范围。

其次，把每一轮宣传和具体变化安排在一起。发布新角色时展示它如何改变打法，增加系统时解释它如何影响选择，举办活动时围绕玩家已经在做的事设计规则。团队会更容易写出有内容的公告，创作者也更容易找到选题。

最后，为关注之后的行动做好安排。玩家看完视频应当能找到试玩，玩得满意应当能找到本体，对更新感兴趣应当能找到社区，接近发售时应当知道日期与新增内容。免费序章、六角色 Demo、路线图和速通活动，在这次案例中分别承担了这些工作。

《灵魂石幸存者》的起量发生在新品节之前。它最值得复用的经验，是尽早把一套已经有吸引力的玩法交给目标玩家，持续根据反馈改善，再用真实的新内容一次次推动传播。新品节让这套准备接触了更多人，十一月的发售则给已经喜欢它的玩家一个继续玩下去的入口。

本文核查于 2026 年 10 月 8 日。数值、统计口径与来源保存在[配套数据文件](/files/soulstone-survivors-postmortem/data.json)中。对 Steam 新品节规则、普通项目预期与筹备流程的介绍，见[前一篇新品节调研](/posts/steam-next-fest-research-and-practice/)。

[^demo-db]: [SteamDB：Soulstone Survivors Demo](https://steamdb.info/app/2083070/charts/)，App 2083070，历史同时在线峰值 3,205，日期 2022-08-02；应用发行时间为 2022-07-27 UTC。
[^prologue-db]: [SteamDB：Soulstone Survivors Prologue](https://steamdb.info/app/2113430/charts/)，App 2113430，历史同时在线峰值 4,818，日期 2022-08-28；[官方商店页](https://store.steampowered.com/app/2113430/Soulstone_Survivors_Prologue/)标注发售日 2022-08-26。
[^game-db]: [SteamDB：Soulstone Survivors](https://steamdb.info/app/2066020/charts/)，App 2066020，历史同时在线峰值 18,854，日期 2022-11-13。
[^studio]: [Game Smithing：Starting a development blog](https://www.gamesmithing.blog/posts/intro/)，2026-09-03。工作室披露全平台销量超过 130 万份、当时团队十人，以及抢先体验期间的更新与社区工作。
[^origin]: [Game Smithing 在 r/roguelites 的试玩发布与交流](https://www.reddit.com/r/roguelites/comments/wador2/)，2022-07-28。开发者解释《Rogue Soulstone》与幸存者玩法试验的关系。
[^synty]: [Synty：Made with Synty — Soulstone Survivors](https://syntystore.com/blogs/blog/made-with-synty-soulstone-survivors)，2024-08-06，创始人访谈与早期原型动图。
[^july-reddit]: [Game Smithing 在 r/letsplay 的 Demo 发布帖](https://www.reddit.com/r/letsplay/comments/waeclb/)，2022-07-28。包含团队自述、三张地图、制作与成长系统、后续功能以及评论区答复。
[^aug-reddit]: [Game Smithing 参加 r/Games 的 Indie Sunday](https://www.reddit.com/r/Games/comments/wihgyu/)，2022-08-07。
[^oct-reddit]: [Game Smithing 在新品节前的 r/Games 展示与答复](https://www.reddit.com/r/Games/comments/xtp6wa/)，2022-10-02。正文介绍定位与六角色试玩，评论解释 Demo 和 Prologue 的曝光差异及版本安排。
[^first-demo]: [官方公告：Our 3D Bullet Heaven Roguelite just got a new demo](https://store.steampowered.com/news/app/2066020/view/3370399657484164324)，2022-07-28。
[^skill-weekend]: [官方公告：Community Event — Skill Weekend #1](https://store.steampowered.com/news/app/2066020/view/3381659291158602850)，活动时间 2022-08-05 至 08-07。
[^prologue-plan]: [官方公告：Play the Prologue on the 26th of August with 3 new characters](https://store.steampowered.com/news/app/2066020/view/3344505862352513151)，2022-08-19。说明角色更换、内容新增、进度继承和本体入口。
[^six-demo]: [官方公告：New demo — Try out 6 characters for the first time](https://store.steampowered.com/news/app/2066020/view/3291591738142374624)，2022-09-22 UTC；[9 月 20 日公告](https://store.steampowered.com/news/app/2113430/view/5478088824487662092)预告 9 月 22 日开放。六角色版当时计划保留至 10 月 12 日。
[^early-report]: [How To Market A Game：Inspiration Thursday August 4th](https://howtomarketagame.com/2022/08/04/inspiration-thursday-august-4th/)，2022-08-04。报道中的 34,724 为未注明准确起止日的月度新增愿望单；2,986 为单日新增。原文另有《Rogue Soulstone》的交叉推广数据，本文没有将其计入《灵魂石幸存者》。
[^sifd]: [Sifd：The MOST POWERFUL Build in The Game! Melee Multistrike! — Soulstone Survivors](https://www.youtube.com/watch?v=C599LiyWKWs)，由 2022-08-04 的早期报道链接，可作为当时构筑视频的实例。
[^patch-aug2]: [官方公告：Update v0.5.018i](https://store.steampowered.com/news/app/2066020/view/3370399657502699096)，2022-08-02。
[^patch-aug5]: [官方公告：Update v0.5.019a](https://store.steampowered.com/news/app/2066020/view/3381659291159697067)，补丁标注 2022-08-05，公告时间为 08-06 UTC。
[^patch-sept]: [官方公告：Demo with 6 characters + Update v0.7.022c](https://store.steampowered.com/news/app/2113430/view/5478088824487662092)，2022-09-20。
[^stream]: [官方公告：How to Soulstone Survivors](https://store.steampowered.com/news/app/2066020/view/3269074373284167768)，2022-10-02；预告 10 月 3 日社区直播。
[^ea-date]: [官方公告：Early Access on November 7th](https://store.steampowered.com/news/app/2066020/view/3269074373300087789)，2022-10-03。公布发售日期、路线图及抢先体验新增内容。
[^fest-report]: [How To Market A Game：Steam Next Fest October 2022 — How did games perform](https://howtomarketagame.com/2022/11/04/steam-next-fest-october-2022-how-did-games-perform/)，2022-11-04。整份调查收录 41 款游戏，未单列试玩时长题的有效样本数；本文使用其时长统计和历史页面截图。
[^speedrun]: [官方公告：Pre-Release Event — Steam Key Giveaway, Speedrunning and Update v0.8.025a](https://store.steampowered.com/news/app/2066020/view/3370407901765994314)，2022-10-26。
[^launch]: [官方抢先体验发售公告](https://store.steampowered.com/news/app/2066020/view/3405311447051499833)，2022-11-07。
[^china]: [HUQIAO：Game Smithing 合作案例](https://www.huqiaogames.com/insights/53-increase-in-percent-of-sales-in-china-in-4-months-game-smithing-x-huqiao)。合作始于 2023 年 8 月，文中披露四个月阶段结果。本文采用原始占比 12.9% 与 20%，并将小黑盒心愿单与 Steam 数据分开。
[^one-point-zero]: [Soulstone Survivors 官方商店页](https://store.steampowered.com/app/2066020/Soulstone_Survivors/)，标注 2025-06-17 发售；[Rogueliker 创始人访谈](https://rogueliker.com/soulstone-survivors-interview/)，2025-06-01，讨论走向 1.0 的开发过程。
