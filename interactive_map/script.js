var map = L.map('map').setView([30, 70], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            var marker = L.marker([city.coordinates.latitude, city.coordinates.longitude]).addTo(map);

            // format numbers for readability
            var population = (city.population || 0).toLocaleString();
            var populationMillions = ((city.population || 0) / 1e6).toFixed(2);
            var area = city.area ? city.area.toLocaleString() + ' km²' : 'N/A';
            var gdp = city.gdp ? city.gdp.toLocaleString() : null;
            var gdpDisplay = gdp ? ('PKR ' + gdp) : 'N/A';
            var language = city.language || 'N/A';
            var coords = city.coordinates ? city.coordinates.latitude + ', ' + city.coordinates.longitude : 'N/A';

            // full template showing all city data
            var template = `
                <div class="city-popup">
                    <h3 style="margin:0 0 6px 0">${city.city}</h3>
                    <p style="margin:0 0 8px 0">${city.description}</p>
                    <ul style="padding-left:18px;margin:0;">
                        <li><strong>Population:</strong> ${population} (${populationMillions} Million)</li>
                        <li><strong>Area:</strong> ${area}</li>
                        <li><strong>GDP:</strong> ${gdpDisplay}</li>
                        <li><strong>Language:</strong> ${language}</li>
                        <li><strong>Coordinates:</strong> ${coords}</li>
                    </ul>
                </div>
            `;

            marker.bindPopup(template);
        });
    })
    .catch(err => console.error('Failed to load city data:', err));