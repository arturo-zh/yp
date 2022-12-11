export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse)
  .then(data => {
    if (data?.success) return data.data;
    return Promise.reject(data)
  });
};


export const sendOrder = (items) => {
  const body = {'ingredients': items}
  return fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
  .then(checkResponse)
  .then(data => {
    if (data?.success) return data.order;
    return Promise.reject(data)
  });
};