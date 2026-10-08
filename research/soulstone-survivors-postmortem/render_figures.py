"""Render published historical aggregates. Requires matplotlib; no private analytics.
SOULSTONE_FONT may point to a local CJK font. Run from any directory.
"""
import json, os
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager, ticker
ROOT=Path(__file__).resolve().parents[2]
DATA=json.loads((ROOT/'files/soulstone-survivors-postmortem/data.json').read_text())
OUT=ROOT/'images/soulstone-survivors-postmortem'
font=Path(os.environ.get('SOULSTONE_FONT','/Library/Fonts/Arial Unicode.ttf'))
if font.exists():
    font_manager.fontManager.addfont(str(font))
    plt.rcParams['font.family']=font_manager.FontProperties(fname=str(font)).get_name()
plt.rcParams.update({'font.size':14,'axes.unicode_minus':False,'figure.facecolor':'#faf9f5','axes.facecolor':'#faf9f5','text.color':'#182f39','xtick.color':'#52646e','ytick.color':'#52646e','svg.fonttype':'path'})
def clean(ax):
    for s in ax.spines.values(): s.set_visible(False)
    ax.tick_params(length=0,pad=10)
    ax.set_axisbelow(True)
    ax.grid(axis='x',color='#dce2e3')
def save(fig,name):
    fig.savefig(OUT/f'{name}.png',dpi=180)
    plt.close(fig)
fig,ax=plt.subplots(figsize=(12,6))
fig.subplots_adjust(left=.23,right=.90,top=.72,bottom=.23)
fig.text(.06,.91,'新品节之前，免费试玩已出现数千人同时在线',fontsize=22,weight='bold')
fig.text(.06,.835,'SteamDB 记录的三个独立应用历史同时在线峰值',fontsize=14,color='#52646e')
rows=DATA['concurrent_peaks']
vals=[r['players'] for r in rows]
ax.barh([2,1,0],vals,height=.48,color=['#427fa0','#007e78','#244c72'])
ax.set_yticks([2,1,0],[r['label']+'\n'+r['date'] for r in rows])
ax.set_xlim(0,22000);ax.set_xticks([0,5000,10000,15000,20000]);ax.xaxis.set_major_formatter(ticker.StrMethodFormatter('{x:,.0f}'))
clean(ax)
for y,v in zip([2,1,0],vals): ax.text(v+350,y,f'{v:,}',va='center',fontsize=18,weight='bold')
fig.text(.06,.12,'单位：人。分别发生在 2022 年 8 月 2 日、8 月 28 日和 11 月 13 日。',fontsize=12)
fig.text(.06,.065,'来源：SteamDB，各应用 Charts 页。各峰值不能相加，也不是下载量或购买转化率。',fontsize=11,color='#52646e')
save(fig,'03-concurrent-peaks')
fig,ax=plt.subplots(figsize=(12,5.4))
fig.subplots_adjust(left=.25,right=.90,top=.71,bottom=.28)
fig.text(.06,.90,'新品节试玩时长中位数达到 3 小时',fontsize=23,weight='bold')
fig.text(.06,.82,'2022 年 10 月调查｜每款游戏先计算玩家试玩时长中位数，再比较游戏',fontsize=13,color='#52646e')
p=DATA['playtime'];vals=[p['soulstone_median_minutes'],p['median_of_game_medians_minutes']]
ax.barh([1,0],vals,height=.48,color=['#007e78','#9aa9ae'])
ax.set_yticks([1,0],['灵魂石幸存者','调查游戏的中间水平'])
ax.set_xlim(0,210);ax.set_xticks([0,60,120,180]);clean(ax)
for y,v in zip([1,0],vals):ax.text(v+3,y,f'{v} 分钟',va='center',fontsize=18,weight='bold')
fig.text(.06,.16,'来源：How To Market A Game，2022-11-04；整份调查收录 41 款游戏。',fontsize=12)
fig.text(.06,.10,'18 分钟是游戏级中位数的中位数；原文未另报时长题有效样本数。',fontsize=11,color='#52646e')
fig.text(.06,.045,'3 小时是累计试玩时长指标，不是单局长度。',fontsize=11,color='#52646e')
save(fig,'05-demo-playtime')
