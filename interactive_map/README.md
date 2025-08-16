# Interactive Map - Pakistan

Small interactive Leaflet map showing 15 major Pakistani cities. Clicking a marker opens a popup with city details (population, area, GDP, language, coordinates).

Files
- `index.html` — main page. Includes Leaflet CSS and JS, and `script.js`.
- `style.css` — layout + responsive rules (map fills full mobile screen).
- `script.js` — loads `data.json`, creates markers and popups.
- `data.json` — city dataset (array of objects with fields: `city`, `population`, `area`, `gdp`, `language`, `description`, `coordinates`).
- `Pakistan.png` — decorative image used on larger screens.

How it works
1. Open `index.html` in a browser. For local testing run a static server (see below).
2. The page loads `data.json` and places markers using Leaflet.
3. Click a marker to see the city popup with formatted values.

Data format (example entry)
```json
{
  "city": "Karachi",
  "population": 18868021,
  "area": 591,
  "gdp": 164000000,
  "language": "Urdu",
  "description": "Karachi is the largest city...",
  "coordinates": { "latitude": 24.8607, "longitude": 67.0011 }
}
```

Local testing (recommended)

If you open `index.html` directly the browser may block `fetch` for local files. Start a quick local server from the project root:

```bash
# Python 3
python3 -m http.server 8000

# or Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000/interactive_map/` in your browser.

Notes & next steps
- GDP values are shown with `PKR` prefix. If you want formatted currency (commas + currency symbol), I can adjust.
- I can add a legend, search, or filter by province if you'd like.
