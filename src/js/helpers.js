const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function handleResponse(resp) {
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
}

export { showLoader, hideLoader, handleResponse };
