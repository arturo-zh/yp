export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const request = (url, options = {}) => {
  return fetch(url, options)
  .then(checkResponse)
  .then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
}

export const getIngredientsRequest = () => {
  return request(`${BURGER_API_URL}/ingredients`)
};

export const sendOrderRequest = (items) => {
  const body = {'ingredients': items}
  return request(`${BURGER_API_URL}/orders`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
};