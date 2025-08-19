## Expense Tracker

Client-side expense tracker built with HTML, CSS, and vanilla JavaScript. It stores expenses in the browser’s localStorage, shows a running list, summarizes totals per category, and visualizes those totals with a bar chart using Chart.js (via CDN).

### Features

- Add an expense with date, category, amount (PKR), and an optional note
- Category suggestions via datalist (Groceries, Utilities, Transport, Rent, Entertainment, Health, Education, Dining, Travel, Other)
- Persistent storage in localStorage (`expenses` key)
- Expense list table (Date, Category, Amount, Note)
- Per-category totals table
- Bar chart of totals by category powered by Chart.js
- Responsive layout (two columns on desktop, single column on small screens)

### How it works

- Data model: each expense is an object
	- `{ date: string, category: string, amount: number, description: string }`
- Storage: all expenses are kept under `localStorage["expenses"]` as a JSON array
- Rendering:
	- On page load and after any change, `reloadExpenses()` reads storage, populates the expense list, aggregates totals per category, updates the totals table, and redraws the chart
	- The chart is kept as a single Chart.js instance and is destroyed/recreated when data changes
	- Amounts are stored and displayed as numbers (no currency formatting)

### Files

- `index.html` – Markup for the form, two tables (expense list and category totals), and a `<canvas>` for the bar chart. Loads Chart.js from a CDN and `script.js`.
- `styles.css` – Layout and styles for the header, form, tables, and responsive grid.
- `script.js` – App logic: input handling, localStorage, table rendering, and Chart.js integration.

### Getting started

1. Open `index.html` in a modern browser.
2. Internet access is required for the bar chart (Chart.js is loaded from a CDN). If offline, the app still works but the chart won’t render.

### Usage

1. Fill Date, Category, and Amount (required). Optionally add a short note.
2. Click “Add Expense”. The entry is saved to localStorage and appears in the table; totals and the chart update.
3. Click “Clear Expenses” to remove all saved entries. This clears localStorage and resets the form.

Notes:
- Amount input uses integer steps (min 1, step 1).
- Category grouping is case-sensitive (e.g., "Food" and "food" would be separate).

### Known limitations

- No per-item edit or delete actions; clearing removes all expenses.
- Grand total row is not displayed (only per-category totals are shown).
- Currency is fixed to PKR in the UI labels; no multi-currency support.
- Values are not formatted as currency (no thousands separators/decimals).
- Chart depends on the Chart.js CDN; if the CDN is blocked or offline, the chart won’t display.

### Accessibility and UX

- Labels are associated with inputs via `for`/`id`.
- Focus outlines are visible for interactive elements.
- The expense list area is scrollable to keep the layout compact.

### Tech

- HTML, CSS (responsive grid), JavaScript (ES6+)
- Browser localStorage
- Chart.js (via CDN)

### Ideas for enhancement

- Edit/delete individual rows; confirm before delete
- Grand total row in the summary table
- Currency formatting and configurable currency
- Case-insensitive category aggregation and predefined category picker
- Export/import (JSON/CSV)
- Offline Chart.js bundling (local file) to remove CDN dependency

### License

See the repository’s root `LICENSE` file.

