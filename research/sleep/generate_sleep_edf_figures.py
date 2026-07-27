#!/usr/bin/env python3
"""Render reproducible figures from the PhysioNet Sleep-EDF record SC4001E0.

Data source:
https://physionet.org/content/sleep-edfx/1.0.0/sleep-cassette/

The database is distributed under the Open Data Commons Attribution License
v1.0. The original sleep-stage labels use the Rechtschaffen & Kales scheme;
stages 3 and 4 are combined as N3 in the figures.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pyedflib
from matplotlib import font_manager
from scipy.signal import welch


COLORS = {
    "W": "#ef8354",
    "N1": "#8ecae6",
    "N2": "#457b9d",
    "N3": "#16324f",
    "REM": "#c77dff",
}


def configure_plotting() -> None:
    font_path = Path("/System/Library/Fonts/PingFang.ttc")
    if font_path.exists():
        font_manager.fontManager.addfont(str(font_path))
        plt.rcParams["font.family"] = font_manager.FontProperties(fname=font_path).get_name()
    plt.rcParams.update(
        {
            "axes.spines.top": False,
            "axes.spines.right": False,
            "axes.titleweight": "bold",
            "figure.facecolor": "white",
            "axes.facecolor": "#fbfcfe",
            "axes.grid": True,
            "grid.alpha": 0.16,
            "grid.linewidth": 0.7,
            "savefig.facecolor": "white",
        }
    )


def short_stage(label: str) -> str | None:
    return {
        "Sleep stage W": "W",
        "Sleep stage 1": "N1",
        "Sleep stage 2": "N2",
        "Sleep stage 3": "N3",
        "Sleep stage 4": "N3",
        "Sleep stage R": "REM",
    }.get(label)


def read_record(psg_path: Path, hypnogram_path: Path):
    psg = pyedflib.EdfReader(str(psg_path))
    labels = psg.getSignalLabels()
    signals = {label: psg.readSignal(i) for i, label in enumerate(labels)}
    rates = {label: float(psg.getSampleFrequency(i)) for i, label in enumerate(labels)}
    psg.close()

    hyp = pyedflib.EdfReader(str(hypnogram_path))
    onsets, durations, annotations = hyp.readAnnotations()
    hyp.close()
    events = [
        (float(onset), float(duration), stage)
        for onset, duration, annotation in zip(onsets, durations, annotations)
        if (stage := short_stage(str(annotation))) is not None
    ]
    return signals, rates, events


def stage_at(events, second: float) -> str | None:
    for onset, duration, stage in events:
        if onset <= second < onset + duration:
            return stage
    return None


def signal_slice(signal: np.ndarray, rate: float, onset: float, duration: float):
    lo = round(onset * rate)
    hi = round((onset + duration) * rate)
    time = np.arange(hi - lo) / rate
    return time, signal[lo:hi]


def plot_hypnogram(signals, rates, events, output: Path) -> None:
    start, end = 30300.0, 52800.0
    epoch = 30.0
    times = np.arange(start, end, epoch)
    levels = {"N3": 0, "N2": 1, "N1": 2, "REM": 3, "W": 4}
    stages = [stage_at(events, t + epoch / 2) or "W" for t in times]
    values = np.array([levels[stage] for stage in stages])

    eeg = signals["EEG Fpz-Cz"]
    rate = rates["EEG Fpz-Cz"]
    slow_wave_power = []
    for onset in times:
        _, segment = signal_slice(eeg, rate, onset, epoch)
        freq, power = welch(segment, fs=rate, nperseg=int(rate * 4), noverlap=int(rate * 2))
        mask = (freq >= 0.5) & (freq <= 4.0)
        slow_wave_power.append(np.trapezoid(power[mask], freq[mask]))
    slow_wave_power = np.asarray(slow_wave_power)

    fig, (ax, power_ax) = plt.subplots(
        2, 1, figsize=(14, 7.5), sharex=True, gridspec_kw={"height_ratios": [2, 1]}
    )
    for onset, duration, stage in events:
        lo, hi = max(onset, start), min(onset + duration, end)
        if hi > lo:
            ax.axvspan((lo - start) / 3600, (hi - start) / 3600, color=COLORS[stage], alpha=0.11, lw=0)
    hours = (times - start) / 3600
    ax.step(hours, values, where="post", color="#102a43", lw=1.35)
    ax.set_yticks(list(levels.values()), list(levels.keys()))
    ax.set_ylim(-0.35, 4.35)
    ax.set_ylabel("睡眠阶段")
    ax.set_title("一名受试者的整夜睡眠结构：睡眠不是均匀的“关机”")
    ax.text(
        0.01,
        0.05,
        "前半夜 N3 较集中，后半夜 REM 与短暂觉醒增多",
        transform=ax.transAxes,
        fontsize=10,
        color="#52616b",
    )

    power_ax.plot(hours, slow_wave_power, color="#c1121f", lw=1.0)
    power_ax.fill_between(hours, slow_wave_power, color="#c1121f", alpha=0.15)
    power_ax.set_yscale("log")
    power_ax.set_ylabel("EEG 0.5–4 Hz\n功率（µV²）")
    power_ax.set_xlabel("相对记录窗口起点的时间（小时）")
    power_ax.set_xlim(0, (end - start) / 3600)
    fig.text(
        0.5,
        0.005,
        "真实数据：Sleep-EDF SC4001E0；人工分期 SC4001EC；30 秒 epoch。R&K Stage 3/4 在此合并为 N3。",
        ha="center",
        fontsize=9,
        color="#68737d",
    )
    fig.tight_layout(rect=(0, 0.035, 1, 1))
    fig.savefig(output, dpi=180)
    plt.close(fig)


def plot_stage_epochs(signals, rates, output: Path) -> None:
    examples = {
        "W": 45840.0,
        "N1": 36900.0,
        "N2": 37800.0,
        "N3": 34140.0,
        "REM": 40740.0,
    }
    channels = ["EEG Fpz-Cz", "EOG horizontal", "EMG submental"]
    titles = ["EEG：皮层场电位", "EOG：水平眼动", "EMG：颏下肌张力"]
    limits = [(-180, 180), (-300, 300), (-20, 20)]

    fig, axes = plt.subplots(5, 3, figsize=(14, 10), sharex=True)
    for row, (stage, onset) in enumerate(examples.items()):
        for col, (channel, title, ylim) in enumerate(zip(channels, titles, limits)):
            time, signal = signal_slice(signals[channel], rates[channel], onset, 30.0)
            ax = axes[row, col]
            ax.plot(time, signal, color=COLORS[stage], lw=0.65)
            ax.set_ylim(*ylim)
            if row == 0:
                ax.set_title(title)
            if col == 0:
                ax.set_ylabel(f"{stage}\nµV", rotation=0, labelpad=27, va="center", fontweight="bold")
            elif col > 0:
                ax.set_ylabel("µV")
            if row == 4:
                ax.set_xlabel("秒")
            ax.set_xlim(0, 30)
    fig.suptitle("五种状态的 30 秒真实多导睡眠片段", fontsize=17, fontweight="bold", y=0.995)
    fig.text(
        0.5,
        0.012,
        "Sleep-EDF SC4001E0。每一行取自专家标注阶段内部；显示的是原始幅值，不是示意波形。",
        ha="center",
        fontsize=9,
        color="#68737d",
    )
    fig.tight_layout(rect=(0.02, 0.035, 1, 0.975))
    fig.savefig(output, dpi=180)
    plt.close(fig)


def stage_epochs(eeg, rate, events, start=30300.0, end=52800.0):
    collected = {stage: [] for stage in COLORS}
    for onset, duration, stage in events:
        lo, hi = max(onset, start), min(onset + duration, end)
        current = lo
        while current + 30 <= hi:
            _, segment = signal_slice(eeg, rate, current, 30)
            if len(segment) == int(rate * 30) and np.ptp(segment) < 1200:
                collected[stage].append(segment)
            current += 30
    return collected


def plot_spectra(signals, rates, events, output: Path) -> None:
    eeg = signals["EEG Fpz-Cz"]
    rate = rates["EEG Fpz-Cz"]
    grouped = stage_epochs(eeg, rate, events)
    fig, ax = plt.subplots(figsize=(12.5, 7.2))
    order = ["W", "N1", "N2", "N3", "REM"]
    for stage in order:
        spectra = []
        for segment in grouped[stage]:
            freq, power = welch(segment, fs=rate, nperseg=int(rate * 4), noverlap=int(rate * 2))
            spectra.append(power)
        spectra = np.asarray(spectra)
        median = np.median(spectra, axis=0)
        q25, q75 = np.percentile(spectra, [25, 75], axis=0)
        mask = (freq >= 0.5) & (freq <= 30)
        ax.plot(freq[mask], median[mask], color=COLORS[stage], lw=2, label=f"{stage}（n={len(spectra)}）")
        ax.fill_between(freq[mask], q25[mask], q75[mask], color=COLORS[stage], alpha=0.12, lw=0)
    for left, right, label in [(0.5, 4, "δ"), (4, 8, "θ"), (8, 12, "α"), (12, 16, "σ/纺锤"), (16, 30, "β")]:
        ax.axvspan(left, right, color="#829ab1", alpha=0.035)
        ax.text((left + right) / 2, 0.975, label, transform=ax.get_xaxis_transform(), ha="center", va="top", color="#52616b")
    ax.set_yscale("log")
    ax.set_xlim(0.5, 30)
    ax.set_xlabel("频率（Hz）")
    ax.set_ylabel("功率谱密度（µV²/Hz，对数轴）")
    ax.set_title("不同睡眠阶段的真实 EEG 功率谱并不相同")
    ax.legend(ncol=3, frameon=False)
    fig.text(
        0.5,
        0.015,
        "Sleep-EDF SC4001E0，Fpz–Cz；曲线为各 30 秒 epoch 的中位数，阴影为四分位距。",
        ha="center",
        fontsize=9,
        color="#68737d",
    )
    fig.tight_layout(rect=(0, 0.04, 1, 1))
    fig.savefig(output, dpi=180)
    plt.close(fig)


def plot_rem_transition(signals, rates, events, output: Path) -> None:
    start, duration = 40200.0, 420.0
    channels = ["EEG Fpz-Cz", "EOG horizontal", "EMG submental"]
    titles = ["EEG Fpz–Cz", "EOG 水平眼动", "EMG 颏下肌电"]
    limits = [(-180, 180), (-300, 300), (-20, 20)]
    fig, axes = plt.subplots(3, 1, figsize=(14, 8.2), sharex=True)
    for ax, channel, title, ylim in zip(axes, channels, titles, limits):
        time, signal = signal_slice(signals[channel], rates[channel], start, duration)
        ax.plot(time / 60, signal, color="#243b53", lw=0.48)
        ax.set_ylim(*ylim)
        ax.set_ylabel(f"{title}\n（µV）")
        for onset, span, stage in events:
            lo, hi = max(onset, start), min(onset + span, start + duration)
            if hi > lo:
                ax.axvspan((lo - start) / 60, (hi - start) / 60, color=COLORS[stage], alpha=0.12, lw=0)
    for onset, span, stage in events:
        lo, hi = max(onset, start), min(onset + span, start + duration)
        if hi > lo:
            axes[0].text(
                ((lo + hi) / 2 - start) / 60,
                0.94,
                stage,
                transform=axes[0].get_xaxis_transform(),
                ha="center",
                va="top",
                fontsize=9,
                color=COLORS[stage],
                fontweight="bold",
            )
    axes[0].set_title("从浅 NREM 到 REM：状态转换有边界，但并非瞬时“开关”")
    axes[-1].set_xlabel("分钟")
    axes[-1].set_xlim(0, duration / 60)
    fig.text(
        0.5,
        0.012,
        "Sleep-EDF SC4001E0；彩色背景为人工分期。REM 中可见成簇眼动及较低的颏下肌张力。",
        ha="center",
        fontsize=9,
        color="#68737d",
    )
    fig.tight_layout(rect=(0, 0.035, 1, 1))
    fig.savefig(output, dpi=180)
    plt.close(fig)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--psg", type=Path, required=True)
    parser.add_argument("--hypnogram", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    configure_plotting()
    signals, rates, events = read_record(args.psg, args.hypnogram)
    plot_hypnogram(signals, rates, events, args.output / "03-real-night-hypnogram.png")
    plot_stage_epochs(signals, rates, args.output / "04-real-stage-epochs.png")
    plot_spectra(signals, rates, events, args.output / "05-real-eeg-spectra.png")
    plot_rem_transition(signals, rates, events, args.output / "06-real-rem-transition.png")


if __name__ == "__main__":
    main()
