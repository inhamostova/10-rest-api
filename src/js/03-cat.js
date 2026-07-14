import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { showError, showLoader, hideError, hideLoader } from './helpers';
import { createCatInfoMarkup, createSelectBreedMarkup } from './createMarkup';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onChange);

init();

function onChange(evt) {
  const breedId = evt.target.value;

  showLoader();
  catInfo.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(data => {
      hideError();
      hideLoader();
      catInfo.innerHTML = createCatInfoMarkup(data);
    })
    .catch(err => {
      console.error(err);
      hideLoader();
      showError();
    });
}

function init() {
  showLoader();
  fetchBreeds()
    .then(data => {
      hideError();
      hideLoader();
      breedSelect.hidden = false;

      breedSelect.innerHTML = createSelectBreedMarkup(data);
    })
    .catch(err => {
      console.error(err);
      hideLoader();
      showError();
    });
}
