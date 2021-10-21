const urlApi = 'https://norma.nomoreparties.space/api'
const getData = async (url, params) =>{
  const res = await fetch(url, params);
  if(res.status !== 200){
    throw new Error(res.statusText);
  }
  const json = await res.json();
  if (json.success === true){
    return json;
  } 
  else{
    throw new Error(res.statusText);
  }
}

export const getIngredients = async () => {
  const url = urlApi + '/ingredients'
  const result = await getData(url);
  return result;
}
  
export const getOrder = async (idIngredients, idBun) => {
  const urlOrder = 'https://norma.nomoreparties.space/api/orders'
  const result = await getData(urlOrder, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({
      ingredients: [...idIngredients, idBun]
    })
  });
  return result;
}

export const registration = async (value) => {
  const urlReg = 'https://norma.nomoreparties.space/api/auth/register'
  const result = await getData( urlReg, {
    method: 'POST',
    body: new URLSearchParams({
      'email': value.email, 
      'password': value.password, 
      'name': value.name 
    })
  })
  return result;
}

export const authorization = async (value) => {
  const urlAuth = 'https://norma.nomoreparties.space/api/auth/login'
  const result = await getData( urlAuth, {
    method: 'POST',
    body: new URLSearchParams({
      'email': value.email, 
      'password': value.password,  
    })
  })
  return result;
}

export const logOut = async (token) => {
  const urlOut = 'https://norma.nomoreparties.space/api/auth/logout'
  const result = await getData( urlOut, {
    method: 'POST',
    body: new URLSearchParams({
      "token": token
    })
  })
  return result;
}

export const forgotPassword = async (email) => {
  const urlforgot = 'https://norma.nomoreparties.space/api/password-reset'
  const result = await getData( urlforgot, {
    method: 'POST',
    body: new URLSearchParams({
      "email": email
    })
  })
  return result;
}

export const resetPassword = async (password, token) => {
  const urlReset =  "https://norma.nomoreparties.space/api/password-reset/reset"
  const result = await getData( urlReset, {
    method: 'POST',
    body: new URLSearchParams({
      "password": password,
      "token": token
    })
  })
  return result;
}

export const updateProfile = async (value, token) => {
  const urlReset =  "https://norma.nomoreparties.space/api/auth/user"
  const result = await getData( urlReset, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify(value),
  })
  return result;
}

export const getUser = async (token) => {
  const urlUser = "https://norma.nomoreparties.space/api/auth/user";
  const result = await getData( urlUser, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+token
    }
  })
  return result;
}

export const getNewAccessToken = async (token) => {
  const url =  "https://norma.nomoreparties.space/api/auth/token";
  const result = await getData( url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({token})
  });
  return result;
}
