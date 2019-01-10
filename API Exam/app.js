// Get UI elements
const cards = document.getElementById('cards');
const titles = document.getElementById('titles');


// Event Listener All Countries
document.getElementById('all-countries').addEventListener('click', function () {
    $.ajax({
        url: "countries.json",
        method: 'GET'
    }).done(function (countries) {

        // Clear cards
        cards.innerHTML = '';

        // Clear title
        titles.innerHTML = '';

        // Create title
        addTitle('All Countries', 'text-dark mx-auto');

        for (let i = 0; i < countries.length; i++) {
            cards.innerHTML += `
            <div id="display-all-countries" class="mx-auto text-center mr-4 mb-2">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${countries[i].flag}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Name:</h5>
                        <p class="card-text">${countries[i].name}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Top Level Domain: ${countries[i].topLevelDomain}</li>
                        <li class="list-group-item">Capital: ${countries[i].capital}</li>
                        <li class="list-group-item">Currencies: ${currencies(countries[i].currencies)}</li>
                    </ul>
                </div>
            </div>
            `;
        }
    });
});

// Event Listener Filter
document.getElementById('filter-country').addEventListener('submit', function (e) {
    // Get the UI Input
    const countryName = document.getElementById('country-name');

    $.ajax({
        url: `http://restcountries.eu/rest/v2/name/${countryName.value}`,
        method: 'GET'
    }).done(function (country) {

        // Clear cards
        cards.innerHTML = '';

        // Clear title
        titles.innerHTML = '';

        addTitle(`Countries with ${countryName.value}`, 'text-dark mx-auto');

        for (i = 0; i < country.length; i++) {
            cards.innerHTML += `
            <div id="display-all-country" class="mx-auto text-center mr-4 mb-2">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${country[i].flag}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Name:</h5>
                        <p class="card-text">${country[i].name}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Top Level Domain: ${country[i].topLevelDomain}</li>
                        <li class="list-group-item">Capital: ${country[i].capital}</li>
                        <li class="list-group-item">Currencies: ${currencies(country[i].currencies)}</li>
                    </ul>
                </div>
            </div>
            `;
        }
    })
    e.preventDefault();
})

// Check for currencies arrays of countries
function currencies(_currencies) {
    var textCurrencies = '';
    for (let i = 0; i < _currencies.length; i++) {
        textCurrencies += JSON.stringify(_currencies[i]);
    }
    return textCurrencies;
}

// Add title
function addTitle(name, className) {
    let h3 = '';

    // Build the title of All cards
    h3 = document.createElement('h3');

    // Give class to the title
    h3.className = className;

    // Text to the title
    h3.textContent = name;

    // Append to the parent
    titles.appendChild(h3);
}