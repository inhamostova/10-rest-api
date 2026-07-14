function createSelectBreedMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createCatInfoMarkup(data) {
  const { url, breeds } = data[0];
  const { name, description, temperament } = breeds[0];
  return `<img src="${url}" alt="${name}" width="300px">
      <h2>${name}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>`;
}

export { createCatInfoMarkup, createSelectBreedMarkup };
