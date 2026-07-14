import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.addEventListener('change', onChange);

loader.hidden = false;

function onChange(evt) {
  const breedId = evt.target.value;

  loader.hidden = false;
  catInfo.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(data => {
      error.hidden = true;
      loader.hidden = true;
      catInfo.innerHTML = createCatInfoMarkup(data);
    })
    .catch(err => {
      loader.hidden = true;
      error.hidden = false;
    });
}

function createCatInfoMarkup(data) {
  const { url, breeds } = data[0];
  const { name, description, temperament } = breeds[0];
  return `<img src="${url}" alt="" width="300px">
      <h2>${name}</h2>
      <p>${description}</p>
      <p>${temperament}</p>`;
}

fetchBreeds()
  .then(data => {
    error.hidden = true;
    loader.hidden = true;
    breedSelect.hidden = false;

    breedSelect.innerHTML = createSelectBreedMarkup(data);
  })
  .catch(err => {
    loader.hidden = true;
    error.hidden = false;
  });

function createSelectBreedMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
