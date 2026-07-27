---
title: "Graffiti.pc 第 141 号猜想：把一颗诱导星沿最短路拉长"
date: 2026-07-27 17:30:00 +0800
permalink: /posts/graffiti-pc-conjecture-141-proof/
excerpt: "从诱导树、围长和邻域独立数讲起，用广度优先树与测地路解释 Graffiti.pc 第 141 号猜想的构造性证明，并介绍 Lean 4 机器检验。"
categories:
  - 科学与健康
tags:
  - 图论
  - Graffiti
  - 诱导树
  - 围长
  - Lean 4
  - 数学证明
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/graffiti-pc-141/induced-star-geodesic-hero.jpg
---

**作者：QingJun（卿俊）**　｜　**AI 协助整理**

**论文 PDF：**[中文版（169 KB）](/files/graffiti141_Jun_Qing_zh.pdf) · [English version（174 KB）](/files/graffiti141_Jun_Qing_en.pdf)

**证明与形式化：**[GitHub 仓库](https://github.com/qscqesze/graffiti-pc-conjecture-141) · [Zenodo v1.0.0](https://doi.org/10.5281/zenodo.21621181)

<figure>
  <img src="/images/graffiti-pc-141/induced-star-geodesic-hero.jpg" alt="一颗诱导星的一条星枝向外延长成测地路的概念插画" loading="eager">
  <figcaption>图 1｜整个证明的画面感很强：先保留星心周围的全部叶子，再沿其中一条星枝向外走一段最短路。难点是证明这组顶点之间不会偷偷多出别的边。</figcaption>
</figure>

## 摘要

设 $G$ 是有限连通简单图。记 $g(G)$ 为图中最短圈的长度；如果没有圈，按原猜想的约定令 $g(G)=0$。在每个顶点 $v$ 的邻点中，尽量多地挑出一批两两不相邻的顶点，其最大数量记作

$$
\ell(v)=\alpha(G[N(v)]),
$$

再对所有星心取最大值：

$$
\lambda(G)=\max_{v\in V(G)}\ell(v).
$$

最后，令 $\mathrm{tree}(G)$ 表示 $G$ 中最大诱导树的顶点数。Graffiti.pc 第 141 号猜想断言

$$
\boxed{\mathrm{tree}(G)\ge
\left\lfloor\frac{g(G)}2\right\rfloor-1+\lambda(G).}
$$

这个式子把三种看似无关的信息加在了一起：

- $\mathrm{tree}(G)$ 是整张图里的**全局最大结构**；
- $\lambda(G)$ 只观察一个顶点周围，是**局部信息**；
- $g(G)$ 控制最短圈，是图的**距离与环结构**。

证明的关键构造非常直接：找一颗最大的诱导星，保留它的所有叶子，再把其中一条星枝沿测地路——也就是最短路——延长
$\lfloor g(G)/2\rfloor-1$ 步。广度优先生成树保证路能走得足够远，围长则排除候选顶点之间的所有“多余边”。最后数一数顶点，恰好得到猜想要求的下界。

<nav class="article-toc" markdown="1">
**目录**

* 目录
{:toc}
</nav>

## 一、这道题到底在问什么

可以把图想成一张关系网络：

- 顶点是人、城市或机器；
- 边表示朋友关系、道路或通信链路；
- “简单图”表示没有自己连自己的边，也没有两点之间的重复边；
- “连通”表示任意两个顶点之间都能沿边走到。

一棵**树**是连通而且没有圈的图。家谱、文件目录和没有冗余回路的网络都具有树状结构。

但猜想问的不是“图里能不能找出一棵树”，而是更严格的**诱导树**。

### 诱导树为什么更难

从原图中选出一个顶点集合 $U$ 后，诱导子图 $G[U]$ 必须保留原图中这些顶点之间的**全部**边。我们只能选顶点，不能为了让结果看起来像树，再随手删掉一条碍事的边。

例如，三个顶点在原图中组成三角形。虽然删掉一条边就能得到一条三顶点路径，但这条被删掉的边在原图中真实存在，所以这三个顶点诱导出的仍是三角形，不是诱导树。

<figure>
  <img src="/images/graffiti-pc-141/induced-tree-basics.svg" alt="诱导树与任意选择边形成普通子图的区别">
  <figcaption>图 2｜诱导子图由顶点集合唯一决定。左边的红边不能假装不存在；右边所选顶点之间的全部原有边恰好连通且无圈，才得到一棵诱导树。</figcaption>
</figure>

因此，$\mathrm{tree}(G)$ 的意思是：

> 最多能选多少个顶点，使这些顶点在原图中自动带出的全部边，恰好组成一棵树？

这比寻找普通子图中的大树苛刻得多。普通生成树可以主动舍弃边；诱导树没有这个自由。

## 二、公式里的三个量

### 1. 围长 $g(G)$：最短的圈有多长

图中若有圈，最短圈的边数叫作**围长**。例如：

- 三角形的围长是 $3$；
- 正方形圈 $C_4$ 的围长是 $4$；
- 五边形圈 $C_5$ 的围长是 $5$。

围长越大，意味着局部越“像树”：你从某个点向外走很多步，才可能绕一圈回到原处。

有些教材把无圈图的围长记为无穷大；第 141 号猜想采用另一种约定：无圈时 $g(G)=0$。读公式时必须保留这个约定。

### 2. 邻域独立数 $\ell(v)$：星心周围最多能留多少片互不相连的叶子

$N(v)$ 表示与 $v$ 直接相邻的所有顶点，也叫 $v$ 的开邻域。$G[N(v)]$ 是只看这些邻点以及它们彼此之间连边得到的诱导子图。

$\alpha(H)$ 表示图 $H$ 的独立数，即最多能挑出多少个两两不相邻的顶点。因此

$$
\ell(v)=\alpha(G[N(v)])
$$

就是：在 $v$ 的邻点中，最多挑多少个彼此不连边的顶点。

把 $v$ 与这些顶点放在一起，就得到一颗诱导星：中心是 $v$，其余全是叶子。对所有 $v$ 取最大值，就得到

$$
\lambda(G)=\max_v \ell(v).
$$

这里有一个极重要的简化。若 $g(G)\ge4$，图中没有三角形。假如 $v$ 的两个邻点 $a,b$ 彼此相连，那么 $v,a,b$ 就构成三角形，矛盾。所以此时 $N(v)$ 本身就是独立集：

$$
\ell(v)=\deg(v),\qquad \lambda(G)=\Delta(G).
$$

也就是说，在真正困难的 $g\ge4$ 情形中，神秘的 $\lambda(G)$ 就是熟悉的最大度 $\Delta(G)$。

### 3. $\mathrm{tree}(G)$：最大诱导树有多大

它统计的不是边数，而是顶点数。猜想的口语化版本是：

> 一张最短圈很长、并且某个顶点周围有很多互不连接邻点的网络，必然包含一棵相当大的诱导树。

其中“很多邻点”贡献 $\lambda(G)$，“最短圈很长”额外贡献大约一半的围长。

## 三、先看三个例子

| 图 | 围长 $g$ | $\lambda$ | 最大诱导树 | 猜想保证的下界 |
|---|---:|---:|---:|---:|
| 完全图 $K_n$（$n\ge3$） | $3$ | $1$ | $2$ | $1$ |
| 圈 $C_n$（$n\ge4$） | $n$ | $2$ | $n-1$ | $\lfloor n/2\rfloor+1$ |
| 连通无圈图 | $0$ | 依图而定 | 全图都是树 | $\lambda-1$ |

完全图中任何三个顶点都会形成三角形，所以诱导树至多只有两个顶点。圈 $C_n$ 只要删去任意一个顶点，就剩下一条含 $n-1$ 个顶点的诱导路径。连通无圈图本来就是树，当然可以把整张图留下。

这些例子也提醒我们：猜想给的是统一的**保底值**，不一定总是精确答案。它真正值得解释的地方，是为什么局部的星与全局的围长可以直接相加。

## 四、整份证明的路线图

围长 $0$ 和 $3$ 的情形很容易，先把它们放到后面。现在专注于 $g=g(G)\ge4$。

此时 $\lambda(G)=\Delta(G)$。取一个最大度顶点 $v$，定义

$$
r=\left\lfloor\frac g2\right\rfloor-1.
$$

证明只做三件事：

1. **保留诱导星。** 因为 $N(v)$ 是独立集，$\{v\}\cup N(v)$ 诱导一颗有 $1+\Delta(G)$ 个顶点的星。
2. **找到长测地路。** 证明存在某个顶点离 $v$ 至少 $r$ 步，于是能截取一条长度为 $r$ 的最短路
   $$
   v=x_0,x_1,\ldots,x_r.
   $$
3. **合并并排除多余边。** 保留整颗星，再加入 $x_2,\ldots,x_r$。围长保证新路径不会与其他星叶发生额外连接。

为什么不只取一条长路径？因为那样只能得到距离项，浪费了 $v$ 周围的大量叶子。为什么不把每条星枝都向外延长？因为不同分支之间很容易产生难以控制的额外边。这个构造的聪明之处是：**整颗星都保留，但只延长一条分支。**

## 五、第一道关：为什么一定有足够远的顶点

我们要证明：从任意根 $v$ 出发，总能找到某个 $w$ 满足

$$
d_G(v,w)\ge r.
$$

这里 $d_G(v,w)$ 是从 $v$ 到 $w$ 的最短路长度。

反设所有顶点都离 $v$ 很近：

$$
d_G(v,w)\le r-1\qquad(\forall w).
$$

以 $v$ 为根做广度优先搜索，得到一棵广度优先生成树 $T$。它有一个关键性质：从根到任何顶点的树距离，等于原图中的最短距离。

因为 $G$ 含圈，而 $T$ 是树，所以 $G$ 至少有一条没有被 $T$ 收进去的边，记作 $xy$。树中 $x$ 到 $y$ 有唯一一条路；把非树边 $xy$ 加回去，就闭合出一个圈。

<figure>
  <img src="/images/graffiti-pc-141/bfs-short-cycle.svg" alt="广度优先生成树中的非树边与树路径闭合出一个短圈">
  <figcaption>图 3｜如果所有顶点都在根 $v$ 的 $r-1$ 步以内，任意非树边 $xy$ 都会和树中的唯一路径组成一个过短的圈。</figcaption>
</figure>

这个圈的长度至多是

$$
\begin{aligned}
d_T(x,v)+d_T(v,y)+1
&=d_G(x,v)+d_G(v,y)+1\\
&\le 2(r-1)+1\\
&=2r-1\\
&<g.
\end{aligned}
$$

最后一个不等式来自 $r=\lfloor g/2\rfloor-1$。但 $g$ 明明是全图最短圈的长度，我们却造出了一个长度小于 $g$ 的圈，矛盾。

因此反设不成立，必有顶点离 $v$ 至少 $r$ 步。取通往它的一条最短路，再截取前 $r$ 条边，就得到需要的测地路

$$
v=x_0,x_1,\ldots,x_r.
$$

这一步把“围长很大”翻译成了“从任意根出发，都有足够长的最短路可以走”。

## 六、第二道关：星与路径合并后，为什么仍是诱导树

考虑顶点集合

$$
U=\{v\}\cup N(v)\cup\{x_2,\ldots,x_r\}.
$$

之所以从 $x_2$ 开始加，是因为 $x_1$ 已经属于 $N(v)$。这组顶点看起来像一颗星，其中经过 $x_1$ 的那条星枝继续延长到 $x_r$。

<figure>
  <img src="/images/graffiti-pc-141/star-geodesic-construction.svg" alt="保留最大度顶点的全部邻点并沿一条测地路延长星枝">
  <figcaption>图 4｜候选诱导树。金色是整颗星，蓝色是延长的测地路。红色虚线代表最危险的额外边；围长条件恰好排除了它。</figcaption>
</figure>

要证明 $G[U]$ 真的是树，必须逐类检查可能出现的多余边。

### 1. 路径内部不会有弦

若 $x_i$ 和 $x_j$ 在路径上相隔至少两个位置却直接相连，那么可以跳过中间一段，造出一条从 $v$ 到后面顶点的更短路线。这与原路径是测地路矛盾。

所以测地路自身诱导的是一条真正的路径。

### 2. 不同星叶之间不会相连

我们正处在 $g\ge4$ 的情形，图中没有三角形。两个 $v$ 的邻点如果相连，就会与 $v$ 构成三角形。

所以 $N(v)$ 是独立集，整颗星确实是诱导星。

### 3. 其他星叶不会接到路径深处

这是最关键的一类。设 $y\in N(v)\setminus\{x_1\}$，并假设它与某个 $x_i$（$2\le i\le r$）相连。于是出现一个圈：

$$
v,y,x_i,x_{i-1},\ldots,x_1,v.
$$

它的长度为 $i+2$，而

$$
i+2\le r+2
=\left\lfloor\frac g2\right\rfloor+1
<g.
$$

这又造出了比最短圈还短的圈，矛盾。因此图 4 中的红色虚线边不可能存在。

三类额外边全部被排除后，$G[U]$ 既连通又无圈，而且包含所选顶点之间的全部原有边，所以它是一棵诱导树。

## 七、最后一步：顶点数为什么刚好对上公式

先数诱导星：

$$
|\{v\}\cup N(v)|=1+\deg(v).
$$

测地性还保证 $x_2,\ldots,x_r$ 都不在 $N(v)$ 中：若 $v$ 与某个 $x_i$（$i\ge2$）直接相邻，就能一步跳到 $x_i$，原来的路径便不是最短路。因此下面加入的确实都是新顶点。

再加入路径上的 $x_2,\ldots,x_r$，一共增加 $r-1$ 个新顶点。因此

$$
\begin{aligned}
|U|
&=1+\deg(v)+(r-1)\\
&=\Delta(G)+r\\
&=\lambda(G)+\left\lfloor\frac g2\right\rfloor-1.
\end{aligned}
$$

既然 $G[U]$ 是诱导树，最大诱导树当然不会比它更小：

$$
\mathrm{tree}(G)\ge |U|
=\left\lfloor\frac{g(G)}2\right\rfloor-1+\lambda(G).
$$

这就是猜想的结论。

还有一个小边界值得注意：当 $g=4$ 或 $5$ 时，$r=1$，需要新增的 $x_2,\ldots,x_r$ 是空的，诱导星本身已经达到下界。真正的“沿路径延长”从 $g\ge6$ 才开始。

## 八、围长为 0 或 3 时怎么办

前面的核心构造使用了 $g\ge4$。剩下两种情形都可以用最基本的诱导星解决。

选一个顶点 $v$，再从 $N(v)$ 中选出大小为 $\ell(v)$ 的独立集 $S$。那么

$$
G[\{v\}\cup S]
$$

是一颗有 $1+\ell(v)$ 个顶点的诱导星。选择使 $\ell(v)=\lambda(G)$ 的 $v$，便有

$$
\mathrm{tree}(G)\ge1+\lambda(G).
$$

- 若 $g=0$，猜想右边是 $-1+\lambda(G)$，显然更小。事实上连通无圈图本身就是树，结论还要强得多。
- 若 $g=3$，猜想右边是
  $$
  \left\lfloor\frac32\right\rfloor-1+\lambda(G)=\lambda(G),
  $$
  仍小于已有的 $1+\lambda(G)$。

因此所有情形都处理完毕。

## 九、这个证明真正解释了什么

这个不等式右边是两个来源完全不同的量之和：

$$
\underbrace{\lambda(G)}_{\text{局部的星}}
\;+\;
\underbrace{\left\lfloor\frac{g(G)}2\right\rfloor-1}_{\text{全局的距离}}.
$$

证明不是分别找一颗星和一条路，然后希望它们碰巧互不干扰。它让二者共享第一条边 $vx_1$，并用围长同时完成两件事：

1. 迫使图中存在足够长的测地路；
2. 禁止其他星叶接到测地路深处。

所以围长既提供“长度”，又提供“纯净度”。这正是构造能够把两个下界直接相加的原因。

从算法角度看，这个证明也是构造性的。给定有限连通图，可以：

1. 计算各顶点度数，找到最大度顶点 $v$；
2. 从 $v$ 做广度优先搜索；
3. 找到距离至少 $r$ 的顶点并回溯一条最短路；
4. 输出 $N(v)$ 与该路径的并集。

证明保证输出的一定是一棵达到目标大小的诱导树，而不只是证明“某处应该存在”。

## 十、Lean 4 怎样检查这份证明

配套仓库不仅有纸面证明，还给出了 Lean 4 与 mathlib 的完整形式化。最终定理名为：

~~~lean
Graffiti141.conjecture141
~~~

形式化固定在 Lean 4.27.0 与 mathlib v4.27.0，并对应 [Formal Conjectures 中的原始整数陈述](https://google-deepmind.github.io/formal-conjectures/doc/FormalConjectures/WrittenOnTheWallII/GraphConjecture141.html)。

| 文件 | 对应的数学工作 |
|---|---|
| [Definitions.lean](https://github.com/qscqesze/graffiti-pc-conjecture-141/blob/main/Graffiti141/Definitions.lean) | 定义最大诱导树、邻域独立数，并建立诱导星与加叶子的通用引理 |
| [RootedTree.lean](https://github.com/qscqesze/graffiti-pc-conjecture-141/blob/main/Graffiti141/RootedTree.lean) | 构造广度优先生成树，证明它保持根距离，再导出“存在远顶点” |
| [Main.lean](https://github.com/qscqesze/graffiti-pc-conjecture-141/blob/main/Graffiti141/Main.lean) | 排除额外边、证明候选诱导子图是树，并完成顶点计数 |
| [Verification.lean](https://github.com/qscqesze/graffiti-pc-conjecture-141/blob/main/Graffiti141/Verification.lean) | 打印最终定理及其基础依赖 |

仓库中的 Lean 源码没有使用 <code>sorry</code>、<code>admit</code> 或自定义公理声明。验证模块对最终定理执行 <code>#print axioms</code>；固定工具链上只报告 mathlib 常见的 <code>propext</code>、<code>Classical.choice</code> 与 <code>Quot.sound</code>。

本地复现命令是：

~~~bash
lake exe cache get
lake build
~~~

机器检验的意义不是“程序在很多小图上试过，所以大概没错”，而是纸面证明中的每个逻辑步骤都被翻译成形式化对象，由类型检查器逐项核验。当然，它核验的是给定定义与基础逻辑之上的形式化定理；定义是否准确对应原问题，仍需要人来审阅。这个仓库同时保留中英文论文、证明到代码的对照说明和固定版本工具链，就是为了让这层对应关系可以检查。

## 十一、与已有形式化工作的关系

[Formal Conjectures PR #4454](https://github.com/google-deepmind/formal-conjectures/pull/4454) 中，GitHub 用户 AlperTheKing 更早给出了第 141 与 143 号猜想的独立 Lean 证明。那条路线从一棵包含闭邻域的最大诱导树出发，通过扩张论证得到更强的界。

本文讲解的路线不同：它明确构造“最大度诱导星 + 一条测地路”，让围长在图上可视化地排除额外边。配套仓库不主张最早完成形式化证明的优先权；其中“给诱导树添加唯一邻接叶子”和“独立邻点集形成诱导星”等通用引理，依 Apache-2.0 从在先工作调整而来，并在 [NOTICE](https://github.com/qscqesze/graffiti-pc-conjecture-141/blob/main/NOTICE) 中注明。广度优先树、距离—围长引理、测地路延长和最终主证明实现的是本文所述构造。

## 十二、总结

如果只记住一个画面，可以记住图 4：

1. 在最大度顶点 $v$ 周围保留整颗诱导星；
2. 让其中一条星枝沿最短路继续生长；
3. 任何可能破坏“树”的额外边，都会制造一个长度小于围长的圈；
4. 因此这些边全部不存在；
5. 最后得到
   $$
   \lambda(G)+\left\lfloor\frac{g(G)}2\right\rfloor-1
   $$
   个顶点。

Graffiti.pc 做的是从计算数据中提出一个简短不等式；证明做的则是解释这个不等式为什么成立。第 141 号猜想背后的解释可以浓缩成一句话：

> **大围长让局部像树，也让一颗大星能够安全地沿最短路向外生长。**

## 资料与链接

1. Jun Qing，[证明、论文与 Lean 4 形式化仓库](https://github.com/qscqesze/graffiti-pc-conjecture-141)。
2. Jun Qing，*Extending an Induced Star Along a Geodesic: A Proof of Graffiti.pc Conjecture 141*，[Zenodo v1.0.0](https://doi.org/10.5281/zenodo.21621181)，2026。
3. E. DeLaVina，[Written on the Wall II: Conjectures of Graffiti.pc](http://cms.dt.uh.edu/faculty/delavinae/research/wowII/)，Conjecture 141。
4. Google DeepMind，[Formal Conjectures: GraphConjecture141](https://google-deepmind.github.io/formal-conjectures/doc/FormalConjectures/WrittenOnTheWallII/GraphConjecture141.html)。
5. AlperTheKing，[Formal Conjectures PR #4454](https://github.com/google-deepmind/formal-conjectures/pull/4454)，2026。
