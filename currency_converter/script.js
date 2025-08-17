// Populating the base currencies option for the user
fetch('base_currencies.json')
    .then(response => response.json())
    .then(data => {
        const baseCurrencySelect = document.getElementById('from-currency');
        data.forEach(({ Currency, Code }) => {
            const option = document.createElement('option');
            option.value = Code;
            option.textContent = `${Currency} (${Code})`;
            baseCurrencySelect.appendChild(option);
        });
    })
    .catch(() => {
        // Silently fail in UI, but you could add a message area to report this
        console.error('Failed to load base currencies list');
    });

// Handle form submit: request rates, calculate and render results
document.getElementById('currency-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const baseCurrency = document.getElementById('from-currency').value;
    const amountInput = document.getElementById('amount').value;
    const amount = parseFloat(amountInput);

    // Basic validation
    if (!baseCurrency) {
        alert('Please select a base currency.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than 0.');
        return;
    }

    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_8p3r88gtu6Xmi8BeLPkLVqPmob0NvMCrJU9qEYtV&base_currency=${encodeURIComponent(baseCurrency)}`;

    // Clear previous results
    const tbody = document.querySelector('#result tbody');
    tbody.innerHTML = '';

        fetch(url)
        .then((response) => response.json())
        .then((exchange) => {
            if (!exchange || !exchange.data) {
                throw new Error('Invalid response from currency API');
            }
                for (const [code, rate] of Object.entries(exchange.data)) {
                    const numericRate = typeof rate === 'number' ? rate : Number(rate && rate.value);
                    if (!isFinite(numericRate)) continue; // skip malformed entries
                    const convertedAmount = (amount * numericRate).toFixed(2);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${baseCurrency}</td>
                    <td>${code}</td>
                    <td>${amount.toFixed ? amount.toFixed(2) : amount}</td>
                    <td>${convertedAmount}</td>
                `;
                tbody.appendChild(row);
            }
            document.getElementById('search').style.display = 'block';
        })
        .catch((err) => {
            console.error(err);
            alert('Failed to fetch exchange rates. Please try again later.');
        });
});

// Writing the searching logic
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#result tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = match ? '' : 'none';
    });
});
