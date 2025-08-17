## Currency Converter (currencyapi)

A simple client‑side currency converter. It loads a list of base currencies from a local JSON file, lets the user enter an amount, and then fetches latest rates from currencyapi to display conversions in a scrollable table.

### Features
- Base currency selector populated from `base_currencies.json` (20 currencies, including PKR and INR)
- Amount input with basic validation
- Fetches latest rates using the selected base currency
- Renders a results table with fixed height and internal scrolling; sticky header for readability

### Project structure
- `index.html` — Markup for the converter UI (form + results table)
- `style.css` — Styling, including theme tokens and a fixed, scrollable results area
- `script.js` — Logic for populating the selector, fetching rates, validating input, and rendering results
- `base_currencies.json` — List of selectable base currencies (`Currency`, `Code`)

### How it works
1. On load, the app fetches `base_currencies.json` and inserts options into the “From Currency” `<select>`.
2. On form submit, it prevents page reload, validates the amount and currency, and builds a request to currencyapi using the selected base currency.
3. It clears any prior rows, then iterates over the response and appends rows: From, To, Amount, Converted Amount.

### Running locally
This project performs `fetch()` requests for a local JSON file. To avoid browser restrictions on `file://` fetches, open the folder with a local HTTP server (for example, using a static server or an editor add‑on like Live Server) and then navigate to `index.html`.

### API key
`script.js` requests data from currencyapi. Replace the API key in the request URL with your own key. Keep keys private and rotate them if leaked.

### Troubleshooting
- “Base currencies not loading”: Ensure `base_currencies.json` exists in the same directory and the page is served over HTTP.
- “Failed to fetch exchange rates”: Verify your API key, network access, and that the currencyapi endpoint is reachable.
- “Layout overflows on many rows”: The results area is fixed‑height and scrollable by design; use the scrollbar to view more rows.
