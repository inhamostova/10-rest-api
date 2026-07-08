const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = '9d14047e46094293a1f155227260807';

const cityTitle = document.querySelector('.city');
const container = document.querySelector('.container');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(evt) {
  evt.preventDefault();

  const {
    city: { value: cityValue },
    days: { value: daysValue },
  } = evt.currentTarget.elements;

  if (!cityValue) {
    alert('Enter city');
    return;
  }

  fetchWeather(cityValue, daysValue)
    .then(renderMarkup)
    .catch(err => console.error(err.message || 'something went wrong'));

  evt.currentTarget.reset();
}

function renderMarkup(data) {
  cityTitle.textContent = `City: ${data.location.name}`;
  container.innerHTML = createMarkup(data.forecast.forecastday);
}

function createMarkup(arr) {
  return arr
    .map(
      item => `<li>
            <h3>${item.date}</h3>
            <img src="${item.day.condition.icon}" alt="${item.day.condition.text}">
            <p>Temperature: ${item.day.avgtemp_c}&deg;C</p>
            <p>${item.day.condition.text}</p>
        </li>`
    )
    .join('');
}

function fetchWeather(city, days) {
  return fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
