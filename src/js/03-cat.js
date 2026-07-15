import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { showError, showLoader, hideError, hideLoader } from './helpers';
import { createCatInfoMarkup, createSelectBreedMarkup } from './createMarkup';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onChange);

init();

function onChange(evt) {
  const breedId = evt.target.value;
  hideError();
  showLoader();
  catInfo.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(data => {
      hideError();
      catInfo.innerHTML = createCatInfoMarkup(data);
    })
    .catch(err => {
      console.error(err);
      showError();
    })
    .finally(() => hideLoader());
}

function init() {
  showLoader();
  fetchBreeds()
    .then(data => {
      hideError();
      breedSelect.hidden = false;

      breedSelect.innerHTML = createSelectBreedMarkup(data);
    })
    .catch(err => {
      console.error(err);
      showError();
    })
    .finally(() => hideLoader());
}
