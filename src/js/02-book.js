const BASE_URL = 'https://openlibrary.org/search.json';

const searchForm = document.querySelector('.search-form');
const bookList = document.querySelector('.books');
const title = document.querySelector('.title');

searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const {
    query: { value: searchQuery },
  } = evt.currentTarget.elements;

  if (!searchQuery.trim()) {
    alert('Enter book name');
    return;
  }

  fetchBook(searchQuery)
    .then(data => {
      renderMarkup(data);
      evt.target.reset();
    })
    .catch(err => console.log(err));
}

function fetchBook(title) {
  return fetch(`${BASE_URL}?q=${title}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function renderMarkup(data) {
  if (!data.docs.length) {
    title.textContent = 'No books found';
    return;
  }
  bookList.innerHTML = createMarkup(data.docs);
}

function createMarkup(arr) {
  return arr
    .map(
      ({ title, author_name, first_publish_year }) => `<li>
        <h2>${title ?? 'Unknown author'}</h2>
        <h3>${author_name}</h3>
<div>
        <p>First published:</p>
        <p>${first_publish_year ?? 'Unknown year'}</p>
</div>
      </li>`
    )
    .join('');
}
