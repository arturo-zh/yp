export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const request = (url: string, options?: {}) => {
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

export const sendOrderRequest = (items: string[]) => {
  const body = {'ingredients': items}
  return request(`${BURGER_API_URL}/orders`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
};

export const sendForgetPassword = (email: string) => {
  const body = {'email': email}
  return request(`${BURGER_API_URL}/password-reset`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
}

export const sendResetPassword = (password: string, token: string) => {
  const body = {'password': password, 'token': token}
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(body)
  })
}

export const sendRegisterUser = (name: string, email: string, password: string) => {
  const body = {'name': name, 'email': email, 'password': password}
  return request(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const sendLoginUser = (email: string, password: string) => {
  const body = {'email': email, 'password': password}
  return request(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const sendLogoutUser = (token: string) => {
  const body = {'token': token}
  return request(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const sendUpdateToken = (refreshToken: string) => {
  const body = {'token': refreshToken}
  return request(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body)
  })
}

export const getUserInfo = (token: string) => {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  })
}

export const updateUserInfo = (token: string, user: string) => {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
}