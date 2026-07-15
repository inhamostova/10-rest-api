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

function handleResponse(resp) {
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
}

export { showError, showLoader, hideError, hideLoader, handleResponse };
