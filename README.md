# Miami Vibes 🌴

A Miami-themed single-page site with a sunset sky, palm trees, a tropical ocean, and an interactive weather button that summons a full-blown thunderstorm.

## Run it

No build step needed. Just open `index.html` in a browser:

```bash
open index.html
```

Or serve it locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## What's inside

- `index.html` — markup + scene layers (sky, sun, ocean, palm trees)
- `styles.css` — Miami palette (hot pink / teal / peach), art deco typography, all animations
- `script.js` — rain engine: 220 raindrops, ripple splashes, lightning flashes, day/night transition

## The weather button

Click **Make it rain** to:

- Transition the sunset sky to a stormy night
- Hide the sun, reveal stars
- Drop rain across the whole viewport
- Ripple splashes along the shoreline
- Random lightning flashes every 6–14 seconds

Click again to restore sunshine.

## Tech

Vanilla HTML, CSS, and JS. No dependencies. Respects `prefers-reduced-motion`.
