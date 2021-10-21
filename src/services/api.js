const urlApi = 'https://norma.nomoreparties.space/api/';
const getData = async (url, params) => {
  const res = await fetch(url, params);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  const json = await res.json();
  if (json.success === true) {
    return json;
  } else {
    throw new Error(res.statusText);
  }
};

export const getIngredients = async () => {
  const url = urlApi + 'ingredients';
  const result = await getData(url);
  return result;
};

export const getOrder = async (idIngredients, idBun) => {
  const url = urlApi + '/orders';
  const result = await getData(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      ingredients: [...idIngredients, idBun],
    }),
  });
  return result;
};

export const registration = async (value) => {
  const url = urlApi + 'auth/register';
  const result = await getData(url, {
    method: 'POST',
    body: new URLSearchParams({
      email: value.email,
      password: value.password,
      name: value.name,
    }),
  });
  return result;
};

export const authorization = async (value) => {
  const url = urlApi + 'auth/login';
  const result = await getData(url, {
    method: 'POST',
    body: new URLSearchParams({
      email: value.email,
      password: value.password,
    }),
  });
  return result;
};

export const logOut = async (token) => {
  const url = urlApi + 'auth/logout';
  const result = await getData(url, {
    method: 'POST',
    body: new URLSearchParams({
      token: token,
    }),
  });
  return result;
};

export const forgotPassword = async (email) => {
  const url = urlApi + 'password-reset';
  const result = await getData(url, {
    method: 'POST',
    body: new URLSearchParams({
      email: email,
    }),
  });
  return result;
};

export const resetPassword = async (password, token) => {
  const url = urlApi + 'password-reset/reset';
  const result = await getData(url, {
    method: 'POST',
    body: new URLSearchParams({
      password: password,
      token: token,
    }),
  });
  return result;
};

export const updateProfile = async (value, token) => {
  const url = urlApi + 'auth/user';
  const result = await getData(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(value),
  });
  return result;
};

export const getUser = async (token) => {
  const url = urlApi + 'auth/user';
  const result = await getData(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return result;
};

export const getNewAccessToken = async (token) => {
  const url = urlApi + 'auth/token';
  const result = await getData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token }),
  });
  return result;
};
