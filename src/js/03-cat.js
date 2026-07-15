import SlimSelect from 'slim-select';
import '../../node_modules/slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { showLoader, hideLoader } from './helpers';
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
      catInfo.innerHTML = createCatInfoMarkup(data);
    })
    .catch(err => {
      console.error(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => hideLoader());
}

function init() {
  showLoader();
  fetchBreeds()
    .then(data => {
      breedSelect.hidden = false;

      breedSelect.insertAdjacentHTML(
        'beforeend',
        createSelectBreedMarkup(data)
      );
      new SlimSelect({
        select: '.breed-select',
        settings: {
          modal: 'off',
        },
      });
    })
    .catch(err => {
      console.error(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => hideLoader());
}
