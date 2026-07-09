const BASE_URL = 'https://openlibrary.org/search.json';

const searchForm = document.querySelector('.search-form');
const bookList = document.querySelector('.books');
const titleEL = document.querySelector('.title');

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
    .catch(err => console.error(err));
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
    titleEL.textContent = 'No books found';
    bookList.innerHTML = '';
    return;
  }
  titleEL.textContent = '';
  bookList.innerHTML = createMarkup(data.docs);
}

function createMarkup(arr) {
  return arr
    .map(
      ({ title, author_name, first_publish_year }) => `<li>
        <h2>${title ?? 'Unknown title'}</h2>
        <h3>${author_name?.join(', ') ?? 'Unknown author'}</h3>
<div>
        <p>First published:</p>
        <p>${first_publish_year ?? 'Unknown year'}</p>
</div>
      </li>`
    )
    .join('');
}
