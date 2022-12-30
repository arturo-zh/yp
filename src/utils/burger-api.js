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

export const sendForgetPassword = (email) => {
  const body = {'email': email}
  return request(`${BURGER_API_URL}/password-reset`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
}

export const sendResetPassword = (password, token) => {
  const body = {'password': password, 'token': token}
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
}

export const sendRegisterUser = (name, email, password) => {
  const body = {'name': name, 'email': email, 'password': password}
  console.log(body);
  return request(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const sendLoginUser = (email, password) => {
  const body = {'email': email, 'password': password}
  console.log(body);
  return request(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const sendLogoutUser = (token) => {
  const body = {'token': token}
  return request(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const sendUpdateToken = (refreshToken) => {
  const body = {'token': refreshToken}
  return request(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const getUserInfo = (token) => {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  })
}

export const updateUserInfo = (token, user) => {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
}