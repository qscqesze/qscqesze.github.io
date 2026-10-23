# 三篇旧传记修订：续写检查点

目标：将 2026-10-21、22、23 发布的哈里森、安宁、梅里安三篇分别重写为正文 18,000—22,000 汉字的独立非虚构传记。署名 qscqesze；最终覆盖各自原路径，保留日期和 permalink。三篇完成前，优先旧稿修订，不另选新人物。

## 当前状态

**尚未完成，尚未替换线上旧文。** `_drafts/revision-*.md` 是中间稿，均有 `published: false`，不能作为最终稿发布。正文汉字数及图数见 progress.json；这不是三篇两万字书稿的完成记录。

已做：重写开头、补入工作与交易过程、补充真实文献材料、删去部分章末升华、将数字引用改为 Markdown 脚注、每篇配置六幅历史图像并注明来源许可、加入年表和史料说明。

未做完：充分的长篇史料阅读、逐章扩展到目标篇幅、两轮全文审稿、全部图像的出版分辨率与本地保存检查、最终站点构建与部署。仅有博物馆短文和一部旧传记不够支撑两万字。不得重复解释同一中心论点凑数，不得编场景。当前各篇部分新增段落仍偏议论，需要以更具体的史料替换。

## 共同执行方式

1. 先读取线上原文和本目录进度，避免重复发布或覆盖他人的新修改。
2. 一次专注一篇，读资料、整理事件证据，再完整写作。逐章写入草稿并保存，不把初稿接缝留到最终稿。
3. 核查每一个金额、年份、人物关系、引语、版本、功劳归属。不得因为旧书公版，就假定旧书没有错误。
4. 扩写完成后进行事实审读，再做结构与逐段语言编辑；删除反复解释“不是孤独天才”“贡献不等于从不出错”之类的同义议论。
5. 用脚本统计汉字，剔除 front matter、标题、figure、图注、脚注、书目、年表及史料说明。合格范围 18,000—22,000；不能按文件总字节计算。
6. 配图约六至十幅。先尝试合法下载、压缩并本地保存；站点拒绝下载则记录原因，不绕过限制。H1 当前缩略图仅 250 × 294，不能作为出版定稿配图。
7. 达标后移除草稿专用 title 前缀、published:false、revision_status，将内容替换对应 `_posts` 原文件。保留旧日期、permalink 和署名；可增加 last_modified_at。核对末尾年表与正文一致。
8. 运行必要检查，提交到远端，确认 GitHub Pages 部署。仅在此后把该篇标为 completed。不要删除其余未完成草稿。全部完成后恢复常规新人物创作。

## 哈里森

当前草稿约四千汉字，技术与制度解释的比重仍高，人的经历不足。

已经实际阅读的长材料：Samuel Smiles, *Men of Invention and Industry* (1884), Chapter III。全文：https://www.gutenberg.org/files/725/725-h/725-h.htm 。公版；作者有英雄传记倾向。H2 被其写作缩小、1773 金额与年龄等，与现代记录有冲突，不能照搬。病榻听表、与 Graham 会面对话不用。

核查基础：Royal Museums Greenwich 的 H1—H4 藏品记录 79139—79142；Science Museum 1713 木钟藏品 co8557974；Clockmakers 的 H5；Westminster Abbey 的家庭和死亡记录；Jim Bennett 2014 “James Short and John Harrison: personal genius and public knowledge”，DOI 10.15180/140209。

下一步需要实际打开的材料（不得写成已经读完）：
- John Harrison 1763/1765 *Narrative*，尤其 1765 *A narrative of the proceedings relative to the discovery of the longitude at sea… subsequent to…1763*；RMG 藏品 https://www.rmg.co.uk/collections/objects/rmgc-object-478825 ，Cambridge 数字档案 https://cudl.lib.cam.ac.uk/view/MS-BGN-00000/63 。这是申诉者一方的陈述，应与委员会记录对照。
- Cambridge Board of Longitude 档案 https://cudl.lib.cam.ac.uk/view/MS-BGN-00000/13 ，查具体会议与资助。未经实际看到页码不要标页。
- 可合法获取的 Rupert T. Gould *The Marine Chronometer: Its History and Development* (1923)，先确认全文与使用权，再用相关章节；不能仅凭书名引用。

应展开的内容：木工家庭和早期定点钟；温度补偿与减摩的具体试验；伦敦同行网络；H1 出航后的结果；H2 未出海；H3 长期制造期间怎样获得经费、怎样与家人协作；Jefferys 怀表与 H4 的具体关系；威廉两次西印度群岛试验的程序；James Short 的支持；披露、复制与 Greenwich 检验的冲突；George III 与议会款项；K1 随 Cook 的实际使用及成本限制。每段要有新材料，不继续扩写抽象的“个人经验与公共知识”。

## 安宁

当前约五千三百汉字。主要增量来自亲笔信与来访日记，尚未形成完整长篇。

已读的一手材料转录：
- 1829-02-25 [年份由档案编定] 致 Charlotte Murchison，LDGSL/838/A/7/1；https://www.geolsoc.org.uk/the-library/online-exhibitions/mary-anning-and-the-geological-society/geologising-with-mary-anning/letter-from-mary-anning/ 。报价：两英尺鱼龙头骨 £5，一英尺菊石 £1；潮水险情是安宁自述，帮手言语为信中转述。网页把 Sowerby 注释为 1822 已去世的 James，时序冲突，暂只保留姓。
- 同页 1833-10-11 信 LDGSL/838/A/7/3，狗 Tray 被落石砸死的自述。
- Roderick Murchison 1825-09-14 日记，见同展 `geologising-with-mary-anning/murchisons-account-of-meeting-mary-anning/`。注意母亲也参与接待与讲解；已花 £10 工钱而买主未接手的经历。
- Henry De la Beche 1848 周年讲话，在同展 `later-years-and-friendships/final-years/` 摘录，原刊 *Quarterly Journal of the Geological Society* 4, pp. xxiv–xxv。

已核查关键点：1799-05-21 生；父亲 1810 死；兄长 1811 发现头骨、玛丽 1812 找躯干，不写“1811 玛丽独自发现第一具鱼龙”；1823-12 蛇颈龙、1824-02 伦敦展示；1828-12 英国首件被确认的翼龙；1847-03-09 死，47 岁；肖像馆方标 1850；Sowerby 个人身份暂不定。

下一步需要实际阅读：
- Michael A. Taylor 与 Michael J. Benton 整理 George Roberts 生前短传的学术论文及原手稿转录。可从 https://www.lymeregissociety.org.uk/wp-content/uploads/2023/01/jgs2022-053-1.pdf 查起；布里斯托档号 DM1186/5/1。新闻页面不等于读了论文。
- 1824 Conybeare、1829 Buckland 原论文与图版，查作者怎样表述标本来历、提出何种论证。
- 1844 年 Carus 随萨克森国王访问英国的出版游记，以及 1865 *All the Year Round* 的安宁文章，核对出版信息与回忆距离，不能先采信再找引文。

应展开：家族债务和救济；母亲与兄长的长期角色；标本商品链；Philpot 的独立收藏与交流；Lyme 具体地层及采掘清理技术；蛇颈龙争议的证据流转；鱼化石、墨囊和粪化石；Hawkins 收购与拼补问题需要独立核查；不同援助款项和年金如何形成；癌症与店铺最后几年。不能以“从未获承认”概括，她生前有声誉，但无会员资格和稳定职位。

## 梅里安

当前约五千二百汉字。已有出版过程、版本与殖民知识来源，但缺少足够具体的个案。

已实际阅读：James Duncan, “Madame Maria Sibilla Merian”, *The Naturalist’s Library*, *British Moths, Sphinxes, &c.*，https://c82.net/naturalists-library/memoirs/merian 。公版，含前言相关转述；不能把转述当作已直接读过 1705 原本。该文有性别与宗教偏见，父亲死亡年、母亲身份及婚姻指责等不可靠。它查看的是后期版本，不能将其全部描述回填到 1705 初版。

核查基础：NHM、Kew、Europeana、Rijksmuseum 2024 收购初版说明、Utrecht 图书馆版本与刻版记录、Lloyd 的订阅信息、Harvard 1679 展示。不同网页有出生具体日期、迁居年、同行女儿人数等冲突，采用文稿已有交叉核查结果；不要重新混入。

下一步要实际读的长材料：
- *Metamorphosis insectorum Surinamensium* 1705 初版的前言和相关图版说明。通过 Utrecht、Biodiversity Heritage Library 或可靠数字馆藏找到原页；直接检查第 1/2、18、45 等图版的文字，不能仅由现代介绍推导。特别注意当地人知识与奴役制度的相关说明，翻译需准确，不补写对话。
- 1679 欧洲毛毛虫著作，结合 Kay Etheridge *The Flowering of Ecology* (Brill, 2020) 的研究。现代译文与论文有版权，不能因为原作公版就整章照译现代版本。
- 1699—1701 苏里南的具体观察时间、寄主关系、观察失败和回国后的订阅资料；未见原记录不写具体日、物种或金额。

应展开：Marrel 作坊技能训练；婚后教学与花卉出版的生意；Johanna Helena 与 Dorothea 各自的工作；宗教社群经历但不虚构婚变动机；Amsterdam 收藏网络的具体交往；在殖民地实际怎样搜集、饲养、做笔记；几个有史料的物种观察过程；刻版、上色、订阅和版本差异；晚年经济与女儿的后续出版。现有图版中三幅都来自 1679，应补入更有叙事价值的苏里南图版，避免仅以凑足六图收尾。

## 核心验收

只有每篇完成约两万字、事实审读与文字审读后，才能覆盖旧文。不保证出版社验收，不声称消除了所有“AI 痕迹”。最终通知列真实正文汉字数、图数、原文章链接与远端提交/部署结果。
