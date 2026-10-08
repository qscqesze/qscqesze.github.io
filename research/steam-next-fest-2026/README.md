# Steam Next Fest research, checked 2026-10-08

Article: `_posts/2026-10-08-steam-next-fest-research-and-practice.md`.

## Reproduce

Published aggregates and source URLs are in `files/steam-next-fest-research-2026/data.json` (also downloadable from the article). This is a manual transcription, not respondent-level data. No original copyrighted article text or graphics are redistributed.

Install matplotlib in an isolated Python environment, then run:

```sh
python research/steam-next-fest-2026/render_figures.py
```

On macOS the script uses `/Library/Fonts/Arial Unicode.ttf`. Elsewhere set `NEXTFEST_FONT` to a CJK font. PNG and SVG figures are saved in `images/steam-next-fest-research-2026/`. All numeric figures are plotted from the JSON; no generative image tools are involved.

## Audit decisions

- The HTMAG benchmark URL carries a 2025 date, but its retrieved body explicitly refers to February 2026. Initial responses: 182; four wishlist groups sum to 174; separate momentum follow-up: 81. Do not interchange those sample sizes.
- The July 13 companion article reports 119 June responses. July 14's four contingency cells sum to 119 (47+1+37+34). Per-coefficient complete-case n is unspecified; do not claim it is necessarily 119.
- June contingency thresholds are transcribed literally as `<2000` and `>2000`; the published table does not state handling of exactly 2000. The low-base/high-momentum cell is 1/1, not evidence of a reliable 100% success probability.
- Figure 2's intervals are P30–P70, the middle 40% of the sample distribution. They are neither confidence intervals nor prediction intervals. The x-axis is logarithmic and labelled as such.
- Figure 3 reproduces published coefficients, not re-estimated coefficients. No confidence intervals or significance claims are added. No causal interpretation or inferred Steam algorithm weights.
- GameDiscoverCo demo counts and follower counts are distinct measures. Year-to-year rank positions do not track the same game. `(4382/2645-1)*100 = 65.671%`; `(121/163-1)*100 = -25.767%`, rounded to one decimal in the article. The source itself uses approximate percentages.
- Parcel Simulator's milestone figures are used only as reported milestones. The source's average daily additions and duration are not multiplied into an inferred festival or demo treatment effect.
- October 2026 date-specific official document takes precedence over general examples and earlier posts. Sep 14 / Sep 28 are submission dates, not guaranteed approval dates. Dates without time-of-day are not converted to invented precise Beijing deadlines.
- Operational timelines, testing priorities and reporting suggestions are the author's synthesis, not statistically established optimums.

## Source links

The article's 11 endnotes link to primary official documents or the original analysts' publications. They distinguish platform rules, self-selected survey results, monitored public indicators and retrospective case studies. Full game-level survey data were not obtained; this work cannot reproduce regressions, correct selection bias, or test paired differences in correlations.
