
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