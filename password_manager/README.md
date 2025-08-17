## Password Manager

Lightweight client-side password manager built with HTML, CSS, and vanilla JavaScript. It stores entries in the browser's localStorage, displays them in a table, masks passwords in the UI, and lets you copy any cell value with one click.

## Features

- Add entries with website, username, and password
- Prevent duplicate website entries
- Persist data in localStorage (`key: "passwords"`)
- Display a table of saved passwords
- Mask passwords visually while keeping the real value for copy
- Click any cell (website, username, or password) to copy its real value to clipboard
- Quick “Copied!” tooltip feedback
- Remove an entry via the × button on each row

## How it works

- Form submit handler (`#password-form`) prevents page reload and validates inputs
- Entries are stored as an array of objects: `{ website, username, password }`
- On load and after changes, `displayPasswords()` renders rows
	- Each row gets `data-index` to map to the corresponding localStorage item
	- Each cell gets `data-field` (website|username|password)
	- Password cells are rendered masked using `hidePassword()`, but copy uses the original value
- Copy behavior: `copyCell(cell)` reads the row index and field, fetches the true value from localStorage, and writes it to the clipboard, then shows a tooltip
- Deleting: the × button calls `deleteRow(tr)` to remove the matching entry from localStorage and re-render

## Files

- `index.html` — Markup for the form and table
- `style.css` — Layout, table styling, cursor hints, tooltip, and delete button styles
- `script.js` — Form handling, localStorage CRUD, render, copy-to-clipboard, masking

## Usage

1. Open `index.html` in a modern browser
2. Add a website, username, and password, then click “Add Password”
3. Click any cell to copy its value; a tooltip confirms the action
4. Click the × on a row to remove that entry

## Notes and limitations

- Educational demo only: passwords are stored in plaintext in localStorage
- Clipboard access requires a secure context in some browsers; run via a local server if copying is blocked
- Duplicate detection is by website name only

## Accessibility

- Click targets are clear and provide visual feedback
- Consider adding keyboard shortcuts/ARIA labels if you extend the project

