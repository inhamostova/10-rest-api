const API_KEY =
  'live_MIPExyK7Qo4CyagZa3ssudtxPCMX2XM9IEbatbiHvgmK0VViPXpzSukESt9y5nUc';
const BASE_URL = 'https://api.thecatapi.com/v1/';

const options = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`, options).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, options).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    }
  );
}
