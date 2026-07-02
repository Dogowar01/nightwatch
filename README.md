# Nightwatch

A quiet night-sky companion for Tasmania. It answers one question well: **is tonight worth going outside?**

Aurora chance tonight as a single verdict — Low / Possible / Good / Go now — with one plain-language line explaining why. Underneath, for those who want it: Kp trend, solar wind, cloud cover, moon and darkness times, a personal sightings log, Milky Way and meteor shower notes, and a short list of genuinely dark places to stand.

A [Signal9](https://github.com/Dogowar01) app. Single HTML file, no build step, no backend, no account. Installable as a PWA.

## How it works

- **Verdict** — derived from the planetary Kp index, cloud cover during the astronomical darkness window, and solar wind conditions (speed + Bz as a one-step modifier). "Go now" only appears when it is actually dark and not clouded over right now.
- **Astronomy** — sun and moon positions, twilight times, moonrise/set and illumination are computed locally on the device (Meeus-style low-precision formulas). No API involved.
- **Sightings log** — stored in IndexedDB on the device, photos included (downscaled, base64). Nothing is uploaded anywhere.
- **Dark sky spots** — a starter list of ~22 real Tasmanian locations, sorted by distance from you. Pins are approximate and notes are drafts, pending local correction.

## Data sources

| Data | Source |
|---|---|
| Planetary Kp index | [NOAA SWPC](https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json) |
| Solar wind speed / Bz | NOAA SWPC real-time plasma + mag feeds |
| Cloud cover | [Open-Meteo](https://open-meteo.com/) (free, no key) |
| Sun / moon / twilight | Computed locally, no API |

All fetched client-side; responses are cached in localStorage so the app degrades quietly when offline.

**v1 note:** uses global Kp from NOAA only. The BOM Space Weather API (Australian-region K index) is a planned v1.1 refinement, pending confirmation of its current access terms.

## Out of scope for v1

Community sightings map, bioluminescence tracking, and push notifications — deliberately deferred. See the build brief.

## Running locally

It's a static site. Any file server works:

```
python -m http.server 8080
```

Then open http://localhost:8080.

## Deployment

GitHub Pages, straight from the `main` branch root. No build step.
