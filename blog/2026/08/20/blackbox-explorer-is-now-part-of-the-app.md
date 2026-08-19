---
title: Blackbox Explorer Is Now Part of the App
date: 2026-08-20
authors: ['blckmn']
---

Blackbox Explorer now lives inside the Betaflight App. Open the **Blackbox Viewer** tab, load a log, and analyse it without leaving the app you just tuned in.

<!--truncate-->

## One app, one place

For years, reviewing a log meant leaving the Betaflight App and heading to a separate site. That split is gone. Since the **2026.6** release, the log viewer is a tab in the app itself, at [app.betaflight.com](https://app.betaflight.com) and in the desktop and mobile builds.

Nothing was cut down to fit. The graph view, the legend, workspaces, graph setup, the craft and stick overlays, the CSV and GPX exports, and every keyboard shortcut came across intact.

![The Blackbox Viewer tab in the Betaflight App](/img/blackbox/app-blackbox-tab.png)

## Analysis tools, still one keypress away

Press **A** and the spectrum analyser opens over the graph, with your configured filter cutoffs drawn on top so you can see exactly where each one sits against the noise you actually recorded.

![The spectrum analyser with filter cutoffs overlaid](/img/blackbox/app-blackbox-analyser.png)

Because the viewer is part of the app, it also reads the log header alongside the rest of your configuration, so the settings that produced a trace are never more than a tab away.

## Coming in 2026.12

In the next release, a loaded log stays loaded. Switch to PID Tuning to check a value, come back, and your log, playhead position and zoom are exactly where you left them.

## The old Blackbox Explorer

The standalone [blackbox-log-viewer](https://github.com/betaflight/blackbox-log-viewer) repository is now **feature frozen**. All new work happens in the Betaflight App, so please raise bugs and feature requests against [betaflight-configurator](https://github.com/betaflight/betaflight-configurator/issues) from here on.

The repository will be **archived on 1 December 2026**. [blackbox.betaflight.com](https://blackbox.betaflight.com) will stay online after that as a frozen, unmaintained build of the last standalone release, so nothing you have bookmarked disappears. It simply will not receive fixes or new features.

If you are still using the standalone viewer, now is a good time to move across.
