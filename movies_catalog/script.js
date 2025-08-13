let catalog = document.querySelector(".catalog");

// Fetch movies.json and log to console
fetch("movies.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then((movies) => {
    // Central state and element refs
    const moviesData = movies;
    const state = {
      searchTerm: '',
      genre: 'all',
      year: 'all',
      sort: '',
      page: 1,
      perPage: 5,
    };

    const els = {
      searchInput: document.querySelector('.search input'),
      searchBtn: document.querySelector('.searchBtn'),
      genreSelect: document.querySelector('.genreSelect'),
      yearSelect: document.querySelector('.yearSelect'),
      sortSelect: document.querySelector('.sortSelect'),
      prevBtn: document.querySelector('.pagination .previous'),
      nextBtn: document.querySelector('.pagination .next'),
    };

    function getFilteredData() {
      return moviesData.filter((m) => {
        const titleOk = state.searchTerm
          ? m.title.toLowerCase().includes(state.searchTerm)
          : true;
        const genreOk = state.genre === 'all'
          ? true
          : m.genre.some((g) => g.toLowerCase() === state.genre);
        const yearOk = state.year === 'all' ? true : String(m.year) === state.year;
        return titleOk && genreOk && yearOk;
      });
    }

    function getSortedData(data) {
      const arr = data.slice();
      switch (state.sort) {
        case 'year-asc':
          arr.sort((a, b) => a.year - b.year);
          break;
        case 'year-desc':
          arr.sort((a, b) => b.year - a.year);
          break;
        case 'rating-asc':
          arr.sort((a, b) => a.rating - b.rating);
          break;
        case 'rating-desc':
          arr.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // no sort
          break;
      }
      return arr;
    }

    function render() {
      const filtered = getFilteredData();
      const sorted = getSortedData(filtered);
      const totalPages = Math.max(1, Math.ceil(sorted.length / state.perPage));
      if (state.page > totalPages) state.page = totalPages;

      const startIndex = (state.page - 1) * state.perPage;
      const pageItems = sorted.slice(startIndex, startIndex + state.perPage);

      catalog.innerHTML = pageItems
        .map(
          (movie) => `
        <div class="movieCard">
          <div class="img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WQH_ACkLn9jGvN_7RbI8yR-LYiweJT_10A&s" alt="${movie.title}">
            <span class="rating">${movie.rating}/10</span>
          </div>
          <div class="details">
            <h2 class="title">${movie.title}</h2>
            <span class="year">${movie.year}</span>
            <div class="genres">
              <div class="genre">${movie.genre[0]}</div>
              <div class="genre">${movie.genre[1]}</div>
              <div class="genre">${movie.genre[2]}</div>
            </div>
          </div>
        </div>`
        )
        .join('');

      // Update pager state
      if (els.prevBtn) {
        els.prevBtn.classList.toggle('disabled', state.page <= 1);
      }
      if (els.nextBtn) {
        els.nextBtn.classList.toggle(
          'disabled',
          state.page >= totalPages || sorted.length === 0
        );
      }
    }

    // Bind events to update state and re-render
    if (els.searchBtn && els.searchInput) {
      els.searchBtn.onclick = () => {
        state.searchTerm = (els.searchInput.value || '').trim().toLowerCase();
        state.page = 1;
        render();
      };
      els.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') els.searchBtn.click();
      });
    }

    if (els.genreSelect) {
      els.genreSelect.onchange = () => {
        state.genre = els.genreSelect.value;
        state.page = 1;
        render();
      };
    }

    if (els.yearSelect) {
      els.yearSelect.onchange = () => {
        state.year = els.yearSelect.value;
        state.page = 1;
        render();
      };
    }

    if (els.sortSelect) {
      els.sortSelect.onchange = () => {
        state.sort = els.sortSelect.value;
        state.page = 1;
        render();
      };
    }

    if (els.prevBtn) {
      els.prevBtn.onclick = () => {
        if (state.page > 1) {
          state.page -= 1;
          render();
        }
      };
    }
    if (els.nextBtn) {
      els.nextBtn.onclick = () => {
        const totalPages = Math.max(
          1,
          Math.ceil(getSortedData(getFilteredData()).length / state.perPage)
        );
        if (state.page < totalPages) {
          state.page += 1;
          render();
        }
      };
    }

    // Initial render
    render();
  })
  .catch((error) => console.error("Error fetching movies:", error));
