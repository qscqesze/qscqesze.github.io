"""Reproduce the post's figures from published aggregates; requires matplotlib.

Run from any directory. PNG/SVG output is committed for static Jekyll hosting.
Font override: NEXTFEST_FONT=/path/to/CJK-font.ttf python render_figures.py
"""
import json
import os
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager, ticker

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "files/steam-next-fest-research-2026/data.json").read_text())
OUT = ROOT / "images/steam-next-fest-research-2026"
OUT.mkdir(parents=True, exist_ok=True)
font = Path(os.environ.get("NEXTFEST_FONT", "/Library/Fonts/Arial Unicode.ttf"))
if font.exists():
    font_manager.fontManager.addfont(str(font))
    plt.rcParams["font.family"] = font_manager.FontProperties(fname=str(font)).get_name()
plt.rcParams.update({
    "font.size": 13, "axes.unicode_minus": False, "figure.facecolor": "#faf9f5",
    "axes.facecolor": "#faf9f5", "text.color": "#172d39", "axes.labelcolor": "#172d39",
    "xtick.color": "#52646e", "ytick.color": "#52646e", "svg.fonttype": "path",
})
BLUE, TEAL, GRID = "#244c72", "#007c78", "#dce2e3"


def clean(ax):
    for side in ("top", "right", "left"):
        ax.spines[side].set_visible(False)
    ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0, pad=10)
    ax.set_axisbelow(True)


def save(fig, name):
    for ext in ("png", "svg"):
        path = OUT / f"{name}.{ext}"
        fig.savefig(path, dpi=180, facecolor=fig.get_facecolor())
        if ext == "svg":
            path.write_text("\n".join(line.rstrip() for line in path.read_text().splitlines()) + "\n")
    plt.close(fig)


# Two distinct zero-based axes: demo counts and followers must not share units.
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
fig.subplots_adjust(left=.08, right=.97, top=.73, bottom=.23, wspace=.40)
fig.text(.06, .92, "参展作品增加，同一排名位置的关注者增长下降", fontsize=21, weight="bold")
fig.text(.06, .85, "2025 年 6 月与 2026 年 6 月｜两项指标独立作图", fontsize=13, color="#52646e")
for ax, vals, title, unit in zip(axes,
        [DATA["supply"]["demo_count"], DATA["supply"]["follower_gain_at_top_10_percent_position"]],
        ["参展 Demo 数量", "前 10% 位置的新增关注者"], ["个", "人"]):
    clean(ax)
    ax.bar([0, 1], vals, width=.48, color=[BLUE, TEAL])
    ax.set_xticks([0, 1], ["2025.06", "2026.06"])
    ax.set_ylim(0, max(vals) * 1.25)
    ax.set_ylabel(unit, rotation=0, labelpad=15)
    ax.set_title(title, loc="left", fontsize=15, pad=15)
    ax.yaxis.set_major_formatter(ticker.StrMethodFormatter("{x:,.0f}"))
    ax.grid(axis="y", color=GRID)
    for x, v in enumerate(vals):
        ax.text(x, v + max(vals)*.04, f"{v:,}", ha="center", fontsize=17, weight="bold")
fig.text(.06, .10, "来源：GameDiscoverCo，2026-06-23。左右分别统计 Demo 数与各届排名位置的新增关注者。", fontsize=11)
fig.text(.06, .055, "按公布数值计算：Demo 数 +65.7%；该排名位置的关注者增量 −25.8%。", fontsize=11)
save(fig, "01-competition")

groups = DATA["february_2026_benchmark"]["groups"]
assert sum(g["n"] for g in groups) == 174
assert all(g["minimum"] <= g["p30"] <= g["median"] <= g["p70"] <= g["maximum"] for g in groups)
fig, ax = plt.subplots(figsize=(12, 6.6))
fig.subplots_adjust(left=.27, right=.93, top=.76, bottom=.24)
fig.text(.06, .92, "参展基础与活动新增愿望单", fontsize=22, weight="bold")
fig.text(.06, .85, "2026 年 2 月调查｜圆点为中位数，横线为 P30—P70", color="#52646e")
clean(ax)
for i, g in enumerate(groups):
    color = BLUE if g["n"] > 10 else "#8f6b4c"
    ax.plot([g["p30"], g["p70"]], [i, i], lw=9, solid_capstyle="round", color=color, alpha=.27)
    ax.scatter(g["median"], i, s=95, color=color, zorder=3)
    ax.annotate(f'{g["median"]:,}', (g["median"], i), xytext=(0, 14), textcoords="offset points", ha="center", fontsize=15, weight="bold")
ax.set_yticks(range(4), [f'{g["base"]}\n(n={g["n"]})' for g in groups])
ax.set_ylim(3.55, -.65)
ax.set_xscale("log")
ax.set_xlim(100, 40000)
ax.set_xticks([100, 300, 1000, 3000, 10000, 30000], ["100", "300", "1,000", "3,000", "10,000", "30,000"])
ax.xaxis.set_minor_locator(ticker.NullLocator())
ax.grid(axis="x", color=GRID)
ax.set_xlabel("活动期间新增愿望单（对数刻度）", labelpad=13)
fig.text(.06, .70, "参展前愿望单", fontsize=12)
fig.text(.06, .095, "来源：How To Market A Game 基准表，n=174。P30—P70 覆盖样本中间约 40% 的分布。", fontsize=11)
fig.text(.06, .045, "开发者自愿填报；最高一组 7 款游戏。图中数值按公开表格绘制。", fontsize=11)
save(fig, "02-wishlist-benchmark")

rows = DATA["june_2026_correlations"]["rows"]
fig, ax = plt.subplots(figsize=(12, 6.1))
fig.subplots_adjust(left=.25, right=.94, top=.73, bottom=.24)
fig.text(.06, .92, "活动前两周新增与新品节成绩的相关性略高", fontsize=21, weight="bold")
fig.text(.06, .85, "2026 年 6 月｜与新品节期间新增愿望单的相关系数", color="#52646e")
clean(ax)
for i, row in enumerate(rows):
    for offset, key, color in [(-.17, "base", BLUE), (.17, "momentum", TEAL)]:
        v = row[key]
        ax.barh(i + offset, v, height=.27, color=color)
        ax.text(v + .015, i + offset, f"{v:.2f}", va="center", fontsize=14)
ax.set_yticks(range(3), ["Pearson r\n原始值", "Spearman ρ\n秩相关", "Pearson r\n双对数"])
ax.set_ylim(2.65, -.65)
ax.set_xlim(0, 1)
ax.grid(axis="x", color=GRID)
ax.set_xlabel("相关系数（0—1）", labelpad=10)
fig.text(.29, .775, "■ 参展前总量", color=BLUE, fontsize=12)
fig.text(.53, .775, "■ 活动前两周新增", color=TEAL, fontsize=12)
fig.text(.06, .09, "来源：How To Market A Game，2026-07-14。图中数值为原文公布的相关系数。", fontsize=11)
fig.text(.06, .04, "近期增长窗口：2026 年 6 月 1—14 日。三行依次使用原始值、排序及双对数数据。", fontsize=11)
save(fig, "03-momentum")

print(f"Wrote 3 figures in PNG and SVG to {OUT}")
