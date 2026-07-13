const API_KEY =
  'live_MIPExyK7Qo4CyagZa3ssudtxPCMX2XM9IEbatbiHvgmK0VViPXpzSukESt9y5nUc';
const BASE_URL = 'https://api.thecatapi.com/v1/';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onChange);

function onChange(evt) {
  const breedId = evt.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      const markup = `<img src="${url}" alt="" width="300px">
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p>${breeds[0].temperament}</p>`;

      catInfo.innerHTML = markup;
    })
    .catch(err => console.log(err));
}

const options = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
};

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`, options).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, options).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    }
  );
}

fetchBreeds()
  .then(data => {
    breedSelect.innerHTML = createSelectBreedMarkup(data);
  })
  .catch(err => console.log(err));

function createSelectBreedMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
