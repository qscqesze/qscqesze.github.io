---
title: "Graffiti.pc 第 387 号猜想的证明：补图、多项式与线性相关"
date: 2026-07-24 16:31:00 +0800
permalink: /posts/graffiti-pc-387-proof/
excerpt: "完整证明任意有限简单图的 2-控制数不超过顶点数减去度序列上中位数再加一；证明通过补图转化和多项式的线性相关性完成关键构造。"
categories:
  - 科学与健康
tags:
  - 图论
  - Graffiti
  - 2-控制数
  - 数学证明
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/graffiti-pc-387/2-domination-example.png
---

> **阅读提示：**本文集中给出 Graffiti.pc 第 387 号猜想的一般性证明。关于 Graffiti、2-控制数、度序列上中位数和既有研究进展，可先阅读[背景文章](/posts/graffiti-pc-conjecture-387/)。

**作者：QingJun（卿俊）· MiniMax**　｜　**AI 协助整理**

**PDF 版：**[查看或下载英文证明（3 页，181 KB）](/files/Graffiti_387_Proof_QingJun.pdf)

## 摘要

设 $G$ 是有 $n$ 个顶点的有限简单图，$m$ 是其度序列的上中位数，$\gamma_2(G)$ 是 2-控制数。本文证明

$$
\boxed{\gamma_2(G)\le n-m+1}.
$$

证明先转到补图 $F=\bar G$，把“至少有两个邻点属于 $D$”改写为“在 $D$ 中至多有 $t$ 个补图邻点”。随后把一批补图邻域编码成次数为 $t$ 的多项式。有限维多项式空间中的一个极小线性相关族会强迫这些邻域满足特殊的交叠性质，而这一性质恰好足以构造所需的 2-控制集。

证明没有使用连通性，因此结论比原猜想更强：它对所有有限简单图成立。

<nav class="article-toc" markdown="1">
**目录**

* 目录
{:toc}
</nav>

## 一、定理与记号

设 $G=(V,E)$ 是有限简单图。若 $D\subseteq V$ 满足

$$
\forall v\in V\setminus D,
\qquad
|N_G(v)\cap D|\ge2,
$$

则称 $D$ 为 $G$ 的一个 **2-控制集**。最小 2-控制集的大小记作 $\gamma_2(G)$。

把 $G$ 的度数按非递减顺序排列为

$$
d_1\le d_2\le\cdots\le d_n,
$$

并令

$$
m=d_{\lfloor n/2\rfloor+1}.
$$

这里 $m$ 是度序列的上中位数。

**定理.**　对任意有限简单图 $G$，

$$
\gamma_2(G)\le n-m+1.
$$

为了简化记号，对图 $F$、顶点 $v$ 和顶点集 $S$，记

$$
d_F(v,S)=|N_F(v)\cap S|.
$$

## 二、证明思路

整份证明可以压缩成四步：

1. 在补图中重述 2-控制条件；
2. 把顶点分成低补度部分 $H$ 和高补度部分 $B$；
3. 用多项式编码 $H$ 中顶点在 $B$ 内的补图邻域；
4. 从一个极小线性相关族中提取集合 $C\subseteq H$，再补上 $Y\subseteq B$，构造 $D=C\cup Y$。

多项式并不是用来计算图不变量的。它的作用是把“顶点 $z$ 是否属于集合 $A_x$”变成“$a_z$ 是否为多项式 $p_x$ 的根”。一旦若干多项式存在线性关系，代入这些根就能限制集合之间的交叠方式。

## 三、转到补图

如果 $m=0$，取 $D=V(G)$ 即有

$$
\gamma_2(G)\le n<n+1=n-m+1,
$$

结论显然成立。以下设 $m\ge1$。

令

$$
F=\bar G,
\qquad
t=n-1-m,
\qquad
q=t+2=n-m+1.
$$

我们的目标是构造一个大小为 $q$ 的 2-控制集 $D$。对任意 $v\notin D$，顶点 $v$ 与 $D$ 中每个顶点在 $G$ 和 $F$ 里恰好相邻一次，因此

$$
d_G(v,D)+d_F(v,D)=|D|=q.
$$

所以只要保证

$$
d_F(v,D)\le t,
$$

就有

$$
d_G(v,D)\ge q-t=2.
$$

原问题由此变成：在补图 $F$ 中寻找一个 $q$ 元集合 $D$，使每个 $D$ 外顶点在 $D$ 中至多有 $t$ 个邻点。

定义

$$
H=\{x\in V(G):d_F(x)\le t\},
\qquad
B=V(G)\setminus H,
$$

并记

$$
h=|H|,
\qquad
k=|B|.
$$

由上中位数的定义，至少有 $\lceil n/2\rceil$ 个顶点在 $G$ 中的度不小于 $m$。这些顶点在 $F$ 中的度不大于 $n-1-m=t$，所以

$$
h\ge\left\lceil\frac n2\right\rceil,
\qquad
k\le\left\lfloor\frac n2\right\rfloor,
\qquad
h\ge k.
$$

最后一个不等式是后续线性相关论证的数量基础。

## 四、容易的情形

先设

$$
k\le t+1.
$$

选择任意一个包含 $B$ 的 $q$ 元集合 $D$。这是可行的：$m\ge1$ 保证 $q=n-m+1\le n$，而 $k<q$。

每个 $v\notin D$ 都属于 $H$，于是

$$
d_F(v,D)\le d_F(v)\le t.
$$

因此每个 $D$ 外顶点在 $G$ 中都至少有两个邻点属于 $D$，定理在这一情形下成立。

以下只考虑

$$
k\ge t+2.
$$

## 五、用多项式编码邻域

对每个 $x\in H$，因为 $d_F(x)\le t$，可以把它在 $B$ 中的补图邻域扩充成一个 $t$ 元集合：

$$
N_F(x)\cap B\subseteq A_x\subseteq B,
\qquad
|A_x|=t.
$$

当前情形中 $k\ge t+2$，所以这样的扩充总能完成。

为每个 $z\in B$ 选择彼此不同的实数 $a_z$，并对每个 $x\in H$ 定义

$$
p_x(X)=\prod_{z\in A_x}(X-a_z).
$$

当 $t=0$ 时，空乘积按惯例等于 1。这些多项式的次数都是 $t$，而次数不超过 $t$ 的实系数多项式构成一个 $t+1$ 维向量空间。

由于

$$
h\ge k\ge t+2,
$$

多项式族 $\{p_x:x\in H\}$ 必然线性相关。从中选择一个按包含关系极小的线性相关子族，用 $C\subseteq H$ 表示其下标集，并令

$$
r=|C|.
$$

于是

$$
2\le r\le t+2,
$$

而且存在非平凡关系

$$
\sum_{x\in C}c_xp_x=0.
$$

极小性保证每个 $c_x$ 都非零，并且任意 $r-1$ 个 $p_x$ 都线性无关。

## 六、“几乎公共”必然“全部公共”

取任意 $z\in B$。假设它恰好属于 $r-1$ 个集合 $A_x$。在上述线性关系中代入 $X=a_z$：包含 $z$ 的那 $r-1$ 个多项式全部变成零，唯一不包含 $z$ 的多项式却不为零。它的系数也不为零，因此等式不可能成立。

所以，一个元素如果出现在至少 $r-1$ 个 $A_x$ 中，就必定出现在全部 $r$ 个集合中。

令

$$
P=\bigcap_{x\in C}A_x,
\qquad
s=|P|.
$$

由刚才的结论，$P$ 恰好是那些至少出现 $r-1$ 次的元素组成的集合。

从每个 $p_x$ 中提出公共因子

$$
g(X)=\prod_{z\in P}(X-a_z).
$$

所得的 $r$ 个商多项式仍是极小线性相关族，每个商的次数为 $t-s$。所以任意 $r-1$ 个商多项式都线性无关。

但次数不超过 $t-s$ 的多项式空间只有 $t-s+1$ 维，因此

$$
r-1\le t-s+1.
$$

整理得到

$$
s\le t+2-r.
$$

这条不等式说明公共部分 $P$ 足够小，可以完整放入下一步要选择的集合 $Y$。

## 七、构造 2-控制集

在 $B$ 中选择集合 $Y$，满足

$$
P\subseteq Y,
\qquad
|Y|=t+2-r.
$$

这样的 $Y$ 一定存在：已经知道 $s\le t+2-r$；同时 $r\ge2$ 和 $k\ge t+2$ 保证 $Y$ 所需的大小不超过 $B$ 的大小。

令

$$
D=C\cup Y.
$$

因为 $C\subseteq H$、$Y\subseteq B$，所以 $C$ 与 $Y$ 不相交，从而

$$
|D|=r+(t+2-r)=t+2=q=n-m+1.
$$

只需验证每个 $D$ 外顶点在补图中与 $D$ 内至多 $t$ 个顶点相邻。

若 $v\in H\setminus D$，则

$$
d_F(v,D)\le d_F(v)\le t.
$$

若 $v\in B\setminus D$，因为 $P\subseteq Y\subseteq D$，所以 $v\notin P$。根据上一节的结论，$v$ 至多属于 $r-2$ 个集合 $A_x$。又因为

$$
N_F(x)\cap B\subseteq A_x,
$$

所以

$$
d_F(v,C)\le r-2.
$$

加上 $Y$ 中至多 $\lvert Y\rvert$ 个补图邻点，得到

$$
\begin{aligned}
d_F(v,D)
&\le (r-2)+|Y|\\
&=(r-2)+(t+2-r)\\
&=t.
\end{aligned}
$$

两类顶点都满足 $d_F(v,D)\le t$。由于 $\lvert D\rvert=t+2$，每个 $v\notin D$ 在原图 $G$ 中至少与 $D$ 中的两个顶点相邻。因此 $D$ 是一个大小为 $n-m+1$ 的 2-控制集，定理得证。$\square$

## 八、结论

证明中唯一来自上中位数的信息是

$$
|H|\ge|B|.
$$

我们没有使用 $G$ 的连通性，也没有对二部性、正则性或禁圈结构作任何假设。因此 Graffiti.pc 第 387 号猜想对任意有限简单图成立。

上界还是紧的。对 $n\ge2$ 的完全图 $K_n$，

$$
m=n-1,
\qquad
\gamma_2(K_n)=2,
$$

所以

$$
\gamma_2(K_n)=n-m+1.
$$

多项式方法在这里建立了一座桥：集合成员关系被编码为多项式的根，邻域的重叠限制则由线性相关性强制产生。正是这个代数约束补上了“度中位数只提供数量信息、2-控制却依赖邻接位置”之间的缺口。
