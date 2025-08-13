# Movies Catalog

A simple client-side movie catalog that loads data from `movies.json`, renders movie cards, and supports search, filter, sort, and pagination.

## Features

- Fetches movies from `movies.json` using the Fetch API.
- Renders responsive movie cards (image, title, year, rating, genres).
- Search by title (via the search input and button).
- Filter by genre and year via dropdowns.
- Sort globally by year or rating (ascending/descending) via a dropdown.
- Pagination using existing “Previous” and “Next” controls.

## Files

- `index.html` — Markup with controls (search, genre, year, sort), catalog container, and pagination controls.
- `style.css` — Styles for layout, controls, movie cards, and pagination.
- `movies.json` — Static list of movies with `id`, `title`, `year`, `rating`, and `genre` array.
- `script.js` — Client-side logic: fetches data, applies search/filter/sort, and paginates results.

## How it works

1. On load, `script.js` fetches `movies.json` and stores it in memory.
2. UI state is tracked (search term, selected genre, selected year, sort option, current page).
3. On every user interaction (search/genre/year/sort change or page navigation), the code:
   - Filters the full dataset by title, genre, and year.
   - Sorts the filtered dataset according to the selected sort option.
   - Slices the sorted list for the current page and renders those movie cards.
4. The Previous/Next buttons change the current page while keeping filters and sorting applied.

## Notes

- Sorting is global and applied before pagination.
- Search is triggered by the Search button (and Enter key in the input).
- The catalog uses placeholder images for demo purposes.
- No external libraries are used; everything runs client-side.

## Running

Open `index.html` in a web server context (recommended). Some browsers block Fetch from local files.

For example, using a simple Python server:

```bash
python3 -m http.server 8000
```

Then visit: http://localhost:8000/movies_catalog/
