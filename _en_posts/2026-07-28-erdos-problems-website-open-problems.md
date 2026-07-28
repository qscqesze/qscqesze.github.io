---
title: "Erdős Problems: A Living Archive of Mathematical Questions, with a Complete List of Problems Still Without Proofs"
date: 2026-07-28 19:00:00 +0800
permalink: /en/posts/erdos-problems-website-open-problems/
lang: en
translation_key: erdos-problems-website-open-problems
translation_url: /posts/erdos-problems-website-open-problems/
source: _posts/2026-07-28-erdos-problems-website-open-problems.md
source_hash: 5283b20f4cadddcadb7cffcca1916bc2b8252f1d5215132fea78ffe99e000b9c
translation_model: editorial
excerpt: "An introduction to Thomas Bloom's Erdős Problems website, the distinctions among open, solved, proved, disproved, and Lean-formalized problems, and a complete snapshot of the Erdős problems that remained entirely unresolved as of July 28, 2026."
comments: true
share: false
related: false
read_time: true
math: true
header:
  teaser: /images/erdos-problems/hero.jpg
---

<figure class="technical-figure">
  <img src="/images/erdos-problems/hero.jpg" alt="A deep-green archive filled with cards for mathematical problems, with a sprouting acorn in the foreground" loading="eager">
  <figcaption>The header image is a conceptual illustration: some problems are “marshmallows,” quickly consumed; others are acorns from which whole forests of new mathematics may grow.</figcaption>
</figure>

Few mathematicians in history were as devoted to posing problems as Paul Erdős (1913–1996). He scattered them through papers, problem collections, and private correspondence, often attaching rewards of USD 10, USD 100, or even USD 10,000. To Erdős, a good problem was not merely a task waiting to be checked off. It could expose the real obstruction in a field or force mathematicians to invent methods that had not existed before.

[Erdős Problems](https://www.erdosproblems.com/) is an attempt to gather questions dispersed across decades and a vast literature into one place. It is both a catalogue and a continuously updated research map. Each entry has a consistent number, a concise statement, original sources, notes on progress, references, subject tags, and a discussion area; the collection can also be searched by status, reward, reference, or keyword.

As of **July 28, 2026**, the site’s homepage reported **1,217 problems: 565 solved and 652 still marked open**. But “open” and “without a proof” are less straightforward than they appear. There are at least three different ways to interpret them. This article introduces the site, separates those meanings, and ends with a complete, reproducible list of problem numbers.

> **The short answer:** if “entirely unsolved, with no recorded formal solution” is defined strictly as `informal_status: open` together with `formal_status: unformalized` in the community database, there are currently **607 problems**. Another **53 problems** remain undecided in the ordinary sense but have been placed in more refined categories such as finitely decidable, falsifiable, verifiable, or independent of ZFC. The website’s own binary label counts **652 OPEN problems**. The two datasets differ slightly in classification and update timing, so their figures are not interchangeable.

<nav class="article-toc" markdown="1">
**Contents**

* Contents
{:toc}
</nav>

## 1. Where the Website Came From

The site was created by the British mathematician [Thomas Bloom](https://www.thomasbloom.org/). In a retrospective, Bloom wrote that he began building it in late March 2023 and launched it publicly on May 28, 2023, with only a little over 200 problems. His motivation was a practical frustration familiar to researchers: after encountering a problem in an old Erdős paper, it was difficult to determine quickly whether the question was still open, had already been settled in an obscure publication, or had evolved into a famous theorem in another field.[^1]

This was never a project that could be “finished” in one pass. Erdős published more than 1,500 papers, and many further problems survive in letters and joint work. The site’s FAQ is explicit that it is **not a complete collection of every question Erdős ever asked**. Its scope also reflects curatorial judgment: it prioritizes problems that can be stated independently, are sufficiently interesting, appear in dedicated problem lists, or have a recorded monetary reward. A small number of entries were not originated by Erdős at all; they were problems he liked and repeatedly publicized, and the pages try to credit their original authors.[^2]

At the time of writing, the “Problem Lists” page contained 147 source lists of Erdős problems, only 65 of which had been marked as fully checked. In other words, **1,217 is not the total number of problems Erdős posed during his lifetime. It is the number currently incorporated into this project**.[^3]

## 2. More Than a List of Unsolved Problems

Open any entry—for example, [Problem 3](https://www.erdosproblems.com/3)—and several layers of information appear:

- **A concise mathematical statement.** Bloom sometimes rewrites the original wording to make it easier to parse, while preserving links to the source literature below;
- **An OPEN or SOLVED status,** together with finite computability information for certain problems;
- **A historical reward.** This records the value Erdős once assigned to the problem; it is not a promise of payment by the website;
- **Remarks and references.** These are often more valuable than a bare answer because they chart known upper and lower bounds, special cases, and decades of incremental progress;
- **Tags and search.** Number theory, graph theory, Ramsey theory, distance problems, primes, hypergraphs, and other subjects can be browsed in combination;
- **A forum and status history.** Researchers can add references, discuss ideas, say they are working on a problem, and see when a page changed from OPEN to SOLVED;
- **Random problems and numbered ranges.** These support casual exploration as well as opening many related entries at once.

In 2025, Bloom and Terence Tao also created a public [Erdős problem database](https://github.com/teorth/erdosproblems). A YAML file tracks each problem’s detailed status, Lean formalization, and OEIS links, while an automatically generated table provides filtering. The repository is not merely a mirror of the main site; it is a community-maintained data layer. Tao described it as a “citizen mathematics” project: even without proving a conjecture, contributors can compute relevant integer sequences, look for OEIS matches, improve references, or formalize statements.[^4]

## 3. What Do OPEN, Solved, and Proof Actually Mean?

This is where the site is easiest to misread.

### 3.1 Solved Does Not Mean “The Conjecture Was Proved True”

The public database separates completed problems into three categories:

- `proved`: the statement was proved true;
- `disproved`: a counterexample was found or the statement was proved false;
- `solved`: the problem was satisfactorily resolved in some other way—for example, because it was not a simple yes-or-no question, or because a multipart problem received a mixed answer.

A counterexample therefore counts as a solution. Some problems also resist a simple proof/no-proof division because the original wording is ambiguous, the answer depends on the chosen axiomatic system, or the question has been reduced to a finite computation.

### 3.2 A Formalized Statement Is Not a Formalized Solution

The database records two similarly named but fundamentally different properties:

- **statement formalized**: the problem itself has been translated precisely into Lean, so a proof assistant knows what is to be proved;
- **solution formalized**: a solution proof exists that Lean can check.

At present, **509 problem statements** have entered the Lean Formal Conjectures Repository, but only **206 solutions** are recorded as formalized in Lean. An entry may even be `open (Lean)`: a machine-checked solution exists, but human mathematicians have not yet finished digesting and confirming it, so the informal status remains open. The public database’s [field documentation](https://github.com/teorth/erdosproblems/blob/2e7e7a630f9814f3df562bc1b207d9ad41451a55/CONTRIBUTING.md) explains this case explicitly.[^5]

### 3.3 OPEN Means “Open According to the Information Currently Available”

Every open problem on the main site carries a warning: its status represents the maintainer’s current judgment, and relevant literature may not yet have been found or entered. The FAQ states the point even more directly—the database is not guaranteed to be completely current, and anyone planning to invest serious time in a problem should conduct an independent literature search first.[^2]

The “OPEN → SOLVED” date on the homepage is likewise only the date when the website changed its label, not necessarily the date when the mathematics was done. A proof may have appeared decades earlier and only recently been rediscovered by the database.

## 4. Status Totals on July 28, 2026

The following figures come from public-database commit `2e7e7a6`, recorded at 07:39 UTC that day, and were cross-checked against the main site’s complete OPEN range.[^6]

| Measure | Count | Meaning |
|---|---:|---|
| Main-site SOLVED | 565 | The website’s current binary label is solved |
| Main-site OPEN | 652 | The website’s current binary label is open |
| Community database `proved` | 330 | The statement was proved |
| Community database `disproved` | 132 | The statement was refuted |
| Community database `solved` | 94 | The problem was resolved in another way |
| Community database `open` | 608 | Not assigned a special finite or axiomatic status |
| Special unresolved statuses | 53 | 27 falsifiable, 7 verifiable, 9 decidable, 3 not provable, 4 not disprovable, and 3 independent |
| Lean solutions | 206 | The solution, rather than merely the statement, has been formalized |
| Lean statements | 509 | The problem has been expressed in machine-readable form |

Why does 330 + 132 + 94 equal 556 rather than the main site’s 565? Why do the community data contain 608 + 53 = 661 “open or specially unresolved” entries rather than 652? The two sources differ in both timing and semantics. A problem-by-problem comparison shows that:

- the community database assigns special statuses to seven finitely decidable problems and three ZFC-independent problems that the main site already counts as SOLVED;
- [Problem 469](https://www.erdosproblems.com/469) is `proved (Lean)` in the community data but still appears as OPEN on the main site;
- one further boundary case does not change those totals but matters for the phrase “has a proof”: [Problem 1112](https://www.erdosproblems.com/1112) is `open (Lean)`, with a formalized solution that has not yet been fully absorbed into the human-facing status.

The first two bullets account for 11 cross-source discrepancies, exactly explaining the offset in the totals. Problem 1112 shows that even when both sources say open, “no human proof accepted by the community” and “no machine-checked proof exists at all” can be different claims. **If you want to choose a problem to work on, do not rely on a one-time download of problem numbers. Open the problem page, read the newest discussion, and then conduct an independent literature search.**

## 5. Which Problems Are Entirely Unsolved and Have No Proof?

To make that question answerable, I use a strict definition that can be checked mechanically:

```text
informal_status = open
and
formal_status = unformalized
```

This means that the community database has not classified the problem as proved, disproved, or otherwise solved, and it records no Lean solution. It also excludes questions known to be decidable by finite search and questions concerning the boundary of provability in ZFC. The result is **607 problems**, about **49.9%** of all 1,217 entries.

Of these 607 problems, 307 already have a **formalized Lean statement**. Again, this means only that the problem has been entered precisely, not that a proof exists.

### Subject Distribution

Tags overlap: a single entry may belong simultaneously to number theory, additive combinatorics, and arithmetic progressions. By frequency, the most common tags among the 607 strictly open problems are:

| Tag | Problems |
|---|---:|
| Number theory | 316 |
| Graph theory | 122 |
| Ramsey theory | 60 |
| Geometry | 55 |
| Additive combinatorics | 48 |
| Primes | 43 |
| Distance problems | 33 |
| Analysis | 27 |
| Chromatic number | 27 |
| Set theory | 21 |

Among them, **53 problems still carry a recorded reward**. The largest is attached to [Problem 142](https://www.erdosproblems.com/142), which asks for an asymptotic formula for the largest size $r_k(N)$ of a set containing no $k$-term arithmetic progression; the page records a USD 10,000 prize. Next is [Problem 3](https://www.erdosproblems.com/3), with USD 5,000. The website records rewards but does not pay them. Erdős prizes are now administered by the Combinatorics Foundation, which generally requires a solution to appear in a reputable journal and documentary evidence that Erdős promised the stated amount.[^2]

### Ten Representative Starting Points

These are neither the “ten easiest” problems nor a difficulty ranking. They simply show how different the 607 questions can be.

| No. | Outline | Listed reward |
|---|---|---:|
| [#1](https://www.erdosproblems.com/1) | Must a set with distinct subset sums satisfy $N\gg 2^n$? Erdős called this “perhaps my first serious problem.” | USD 500 |
| [#3](https://www.erdosproblems.com/3) | Must every set of integers with a divergent reciprocal sum contain arbitrarily long arithmetic progressions? | USD 5,000 |
| [#20](https://www.erdosproblems.com/20) | The sunflower conjecture: for fixed $k$, can the threshold for an $n$-uniform family be reduced to $c_k^n$? | USD 1,000 |
| [#28](https://www.erdosproblems.com/28) | The Erdős–Turán additive basis conjecture: can the binary representation function remain bounded? | USD 500 |
| [#52](https://www.erdosproblems.com/52) | For a set of integers, must either its sumset or product set have nearly quadratic size? | USD 250 |
| [#61](https://www.erdosproblems.com/61) | The Erdős–Hajnal conjecture: after forbidding a fixed induced subgraph, must there be a polynomial-sized homogeneous set? | None |
| [#77](https://www.erdosproblems.com/77) | Does the exponential growth-rate limit of the diagonal Ramsey number $R(k)$ exist, and what is it? | USD 250[^7] |
| [#89](https://www.erdosproblems.com/89) | Must $n$ points in the plane always determine $\gg n/\sqrt{\log n}$ distinct distances? | USD 500 |
| [#120](https://www.erdosproblems.com/120) | For every infinite set of reals, is there a positive-measure set avoiding all of its affine copies? | USD 100 |
| [#571](https://www.erdosproblems.com/571) / [#713](https://www.erdosproblems.com/713) | Which growth exponents can occur for bipartite Turán numbers, and must those exponents be rational? | None / USD 500 |

The table also illustrates that a problem listed on Erdős Problems need not have originated with Erdős. [Problem 1135](https://www.erdosproblems.com/1135), for example, is the Collatz conjecture. Its page explicitly says Erdős did not pose it; it is included because he discussed and commented on it.

## 6. The 607 Strictly Open Problems with No Recorded Lean Solution

The following is a static snapshot of commit `2e7e7a6`. Runs of three or more consecutive numbers are compressed with an en dash: “9–12,” for example, means that 9, 10, 11, and 12 are all included. Append any number `n` to `https://www.erdosproblems.com/n` to open its page. For a version that changes with the database, use the [live filtered table](https://teorth.github.io/erdosproblems/?status=open&formal=unformalized). For all 652 entries carrying the main site’s own OPEN label, use the [main-site OPEN range](https://www.erdosproblems.com/range/1-end/open).

<details markdown="1">
<summary><strong>Expand the complete snapshot of 607 problem numbers</strong></summary>

- **1–100:** 1, 3, 5, 9–12, 14, 15, 17, 18, 20, 25, 28, 30, 32, 33, 36, 39–41, 44, 50–52, 60–62, 65, 66, 68, 70, 74, 75, 77, 78, 80–82, 84–87, 89, 91, 96, 98–100
- **101–200:** 101–104, 108, 111, 112, 117, 120, 122, 124, 126, 129–132, 137, 138, 141–143, 145, 146, 148, 149, 151, 153, 155, 156, 158–162, 165, 168–170, 172–174, 176, 177, 180, 181, 183, 184, 187, 188, 193, 195–197, 200
- **201–300:** 201, 203, 208, 212, 213, 217, 218, 222, 233, 234, 236, 238, 241, 243, 244, 247, 249, 251, 252, 254, 256, 257, 260, 261, 263–265, 267, 269, 271–274, 276, 278, 279, 282, 288, 289, 291, 293, 295
- **301–400:** 301, 302, 304, 306, 311–313, 317, 319, 322–327, 329, 332, 334–336, 338, 340–342, 345, 346, 348, 349, 352, 354, 357, 359, 361, 365, 367, 368, 371, 373, 374, 376, 377, 382, 383, 385, 386, 388–390, 393, 394, 396, 400
- **401–500:** 404, 406, 408–417, 420–425, 428, 430–432, 436, 445, 450–452, 454–456, 460–463, 467, 468, 470, 472, 477–479, 483, 486, 489, 495, 500
- **501–600:** 501, 503, 507–510, 513, 514, 517, 520–522, 524, 528–531, 535, 536, 538, 539, 544, 545, 550, 552, 554, 555, 557, 558, 560–564, 566–569, 571–573, 575, 576, 579, 584, 585, 588, 589, 592, 593, 595–598, 600
- **601–700:** 601, 602, 604, 609, 611, 612, 614, 616, 620, 623–627, 629, 634, 635, 638, 640, 642–644, 653–655, 657, 660–663, 665, 667–671, 675–677, 679–681, 683–689, 691, 693, 695, 700
- **701–800:** 701, 704, 706, 708–714, 719, 724–727, 730, 731, 734, 738, 740, 749, 757, 761, 766, 768–770, 773, 774, 776, 778, 782, 786–792, 796
- **801–900:** 802, 805, 809–813, 817, 819–821, 824, 826–831, 836–840, 849, 850, 852–857, 859, 860, 864, 866, 870, 872, 873, 875, 876, 878, 879, 881, 883, 885–887, 889–893
- **901–1000:** 901, 902, 906, 911–913, 917–919, 928–936, 938–940, 942–945, 949–956, 959, 961–963, 968–973, 975, 976, 978, 979, 983, 985, 995, 996
- **1001–1100:** 1002–1005, 1011, 1013, 1016, 1017, 1029, 1030, 1032, 1033, 1035, 1038–1040, 1045, 1049, 1052–1057, 1059–1063, 1065, 1066, 1068, 1070, 1072–1075, 1083–1088, 1093–1095, 1097, 1100
- **1101–1200:** 1101, 1103, 1104, 1106–1111, 1113, 1117, 1120, 1122, 1131–1133, 1135, 1137, 1139, 1142–1146, 1150–1152, 1155–1160, 1162, 1163, 1167, 1168, 1170–1173, 1175, 1177, 1178, 1181–1184, 1186, 1188, 1189, 1191, 1192, 1194, 1199, 1200
- **1201–1217:** 1201, 1203, 1204, 1206–1210, 1212

</details>

## 7. Another 53 Problems: Unfinished, but Not Best Described as “Entirely Open”

The following problems are not classified as proved, disproved, or solved in the community database, and none has a recorded Lean solution. They do, however, have more specific logical or computational structure than an ordinary open problem.

| Status | Count | Meaning | Problem numbers |
|---|---:|---|---|
| `falsifiable` | 27 | If false, the statement can be refuted by a finite counterexample | 23, 64, 97, 106, 107, 114, 128, 167, 242, 287, 375, 398, 458, 488, 548, 583, 617, 628, 699, 723, 743, 779, 982, 993, 1020, 1041, 1082 |
| `verifiable` | 7 | If true, the statement can be verified by a finite witness | 7, 307, 364, 366, 647, 672, 835 |
| `decidable` | 9 | Reduced to a finite computation that can in principle determine truth or falsity | 19, 475, 506, 547, 551, 556, 580, 742, 848 |
| `not provable` | 3 | There is a model of ZFC in which the statement is false, so it cannot be proved from ZFC | 474, 736, 739 |
| `not disprovable` | 4 | There is a model of ZFC in which the statement is true, so it cannot be refuted from ZFC | 1154, 1169, 1174, 1176 |
| `independent` | 3 | Known to be independent of ZFC | 1119, 1123, 1127 |

This table also explains why “without a proof” is not a sufficiently precise database field. A proof of independence is itself a profound proof; it simply does not prove that the original statement is true or false, but instead that the usual axiomatic system cannot decide it.

## 8. How to Use This List Responsibly

First, **read the remarks before reading the original sources**. The site compresses or rewrites problems for readability. Serious research requires returning to Erdős’s original text and the later papers listed at the bottom of each page.

Second, **treat OPEN as a starting point for searching, not an authoritative certification**. Search MathSciNet, zbMATH, Google Scholar, arXiv, and the problem’s discussion thread. Some purported “new proofs” turn out to rediscover older results; conversely, the database may not yet know about very recent progress.

Third, **distinguish solving the original question from improving a bound**. Many pages already contain remarkably strong partial results. Failure to reach Erdős’s exact target does not mean decades of research proved nothing. Problem 89 on distinct distances is a classic example: Guth and Katz advanced the lower bound to $\gg n/\log n$, while the page’s requested $\gg n/\sqrt{\log n}$ remains out of reach.

Fourth, **reward values are not a linear measure of difficulty**. Erdős was not always consistent in the prices he quoted, and the site records the highest amount it can document when sources disagree. Some low-reward problems are extremely difficult; some high rewards reflect the prospect that a solution would open an entire family of new methods.

Fifth, **send updates back to the community**. The main site accepts comments and corrections by email, while the public database accepts pull requests. The project’s deepest value lies not in a statistic frozen on one day but in the continuing process by which mathematicians, formalization researchers, and computational experimenters correct and improve the record.

## 9. What This Archive Is Really Recording

On the surface, Erdős Problems tracks the status of 1,217 questions. At a deeper level, it records how mathematical knowledge changes. A conjecture may first be proved in a special case, then receive sharper constants, then be refuted by a counterexample, and finally be checked in Lean. Another may have been solved long ago, with its answer buried in a paper no one noticed. Every status change in the database carries a story of literature discovery, peer verification, or clarification of definitions.

The 652 OPEN labels are therefore not 652 declarations of human failure, and the 607 entirely open problems are not a leaderboard ready to be fed directly into a model. They are 607 entrances to places where a key idea is still missing. Erdős liked to distinguish quickly consumed “marshmallows” from “acorns” capable of growing into new theories. Before an answer appears, the hard part is that no one can know for certain which one they are holding.

---

[^1]: Thomas Bloom, [*A new blog and a site retrospective*](https://www.erdosproblems.com/forum/thread/blog:1), January 19, 2026. The post states that the site launched publicly on May 28, 2023, and recounts its motivation and the development of its forum.
[^2]: Erdős Problems, [FAQ](https://www.erdosproblems.com/faq), accessed July 28, 2026. The FAQ also explains that the database is not guaranteed to be current or exhaustive and describes how rewards are recorded and claimed.
[^3]: Erdős Problems, [Problem Lists](https://www.erdosproblems.com/lists), accessed July 28, 2026.
[^4]: Terence Tao, [*A crowdsourced project to link up erdosproblems.com to the OEIS*](https://terrytao.wordpress.com/2025/08/31/a-crowdsourced-project-to-link-up-erdosproblems-com-to-the-oeis/), August 31, 2025.
[^5]: `teorth/erdosproblems`, [CONTRIBUTING.md: status-field definitions](https://github.com/teorth/erdosproblems/blob/2e7e7a630f9814f3df562bc1b207d9ad41451a55/CONTRIBUTING.md), snapshot commit `2e7e7a6`.
[^6]: `teorth/erdosproblems`, [README statistics and complete table](https://github.com/teorth/erdosproblems/blob/2e7e7a630f9814f3df562bc1b207d9ad41451a55/README.md), together with [`data/problems.yaml`](https://github.com/teorth/erdosproblems/blob/2e7e7a630f9814f3df562bc1b207d9ad41451a55/data/problems.yaml), the source of truth for the data. The commit was recorded at 07:39 UTC on July 28, 2026.
[^7]: The page for Problem 77 also records that Erdős once offered USD 10,000 for a proof that the limit does not exist, but called the offer a joke because he was convinced that it does. The page header currently lists the ordinary reward as USD 250.
