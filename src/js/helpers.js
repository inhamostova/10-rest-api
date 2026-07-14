const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function showLoader() {
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
}

function showError() {
  error.hidden = false;
}

function hideError() {
  error.hidden = true;
}

export { showError, showLoader, hideError, hideLoader };
