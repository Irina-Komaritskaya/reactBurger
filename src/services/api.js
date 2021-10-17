
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
  const urlIngredient = 'https://norma.nomoreparties.space/api/ingredients'
  const result = await getData(urlIngredient);
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