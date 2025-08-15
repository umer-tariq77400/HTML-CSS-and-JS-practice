# md-to-html

Lightweight in-browser Markdown -> HTML demo and editor.

This small project provides a simple, modern two-pane editor that uses the
[marked](https://github.com/markedjs/marked) library (via CDN) to convert
Markdown to HTML in the browser. It ships with a set of sample Markdown files
you can load with the demo buttons and preview immediately.

## Quick overview

- The UI is defined in `index.html`.
- Styles are in `style.css` for a modern, responsive two-pane layout.
- Behavior is implemented in `script.js` and relies on the `marked` UMD build
	loaded from jsDelivr.
- Sample Markdown files live in `sample-markdowns/` and are loaded with the
	demo buttons.

## Features

- Live Markdown preview using marked.
- Five demo files you can load into the editor and preview.
- Sticky editor controls (Clear / Run).
- Markdown-friendly output styling (headings, code blocks, tables, images).
- Light and dark theme support via CSS prefers-color-scheme.

## Files

- `index.html` — main UI. Contains:
	- `.readme` panel (intended for documentation rendered from README.md)
	- `.demos` row with demo buttons (loads files from `sample-markdowns/`)
	- `.converter` two-column area with `.editor` (left) and `.output` (right)
- `style.css` — UI styling (panels, controls, markdown typography)
- `script.js` — wiring for demo buttons and the Run / Clear behavior
	- sets `marked.setOptions({ breaks: true })` to treat single newlines as
		hard breaks
	- normalizes escaped newline sequences (converts literal `\\n` into a
		real newline) before parsing
- `sample-markdowns/` — demo markdown files (`intro.md`, `lists-and-quotes.md`,
	`table-and-images.md`, `demo-blog-post.md`, `advanced-syntax.md`)

## How to use

1. Open `index.html` in a browser. For best results serve the folder with a
	 local web server (e.g. `python -m http.server`) so `fetch()` can load the
	 markdown demo files without cross-origin/file restrictions.
2. Click any demo button to load its markdown into the editor.
3. Edit the Markdown in the left pane if needed.
4. Click the Run button to parse and render the HTML in the right pane.
5. Click Clear to clear both editor and preview.

Note: `index.html` includes a commented placeholder in the `.readme` panel; you
can populate that area with the contents of this `README.md` (or any other
markdown) by calling `marked.parse()` and inserting the output into
`.readme` from your own JavaScript.

## Implementation details & gotchas

- marked options
	- The project calls `marked.setOptions({ breaks: true })`. This makes
		single newlines render as hard line breaks. Without this option,
		single newlines are treated as soft line breaks (no `<br>`).

- Escaped newline sequences
	- If a textarea contains the two-character sequence `\\n` (for example,
		text pasted from a JSON or a JS string literal), `marked` will not see
		it as a newline. `script.js` normalizes such escaped sequences to real
		newline characters before calling `marked.parse()` so paragraph and
		break behavior works as expected.

- Serving files
	- The demo buttons use `fetch()` to load files from `sample-markdowns/`.
		Opening `index.html` via `file://` may prevent those fetches in some
		browsers. Use a local HTTP server to avoid that problem.

## Security

This project renders Markdown into HTML and inserts it using
`element.innerHTML`. If you accept Markdown from untrusted users, you must
sanitize the generated HTML to avoid XSS. A common approach is to run the
output through a sanitizer such as DOMPurify before inserting it into the
document.

## Extending

- Add more demos by placing `.md` files in `sample-markdowns/`. The demo
	buttons load files using the demo button's inner text (e.g.
	`sample-markdowns/intro.md`). If you rename a demo file, update the button
	label or the fetch path in `script.js` accordingly.
- Populate the `.readme` panel by fetching and rendering `README.md` with
	`marked.parse()` in `script.js` (or a separate initializer).

## Troubleshooting

- If the preview is empty when you click Run:
	- Open the browser devtools console to check for errors.
	- Confirm `marked` is loaded from the CDN (check network tab).
	- If fetching demo files fails, serve the folder over HTTP instead of
		opening it with `file://`.
- If newlines appear as literal `\\n` in the preview, the input likely
	contains escaped sequences; the code already normalizes these, but you can
	detect them by checking `input.value.includes('\\n')` in the console.

## License & attribution

This folder is part of a practice repository. The project uses the
[`marked`](https://github.com/markedjs/marked) library (loaded via CDN) for
parsing Markdown.
