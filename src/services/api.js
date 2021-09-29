const urlIngridient = 'https://norma.nomoreparties.space/api/ingredients'

export const getIngridients = async () => {
  const res = await fetch(urlIngridient);
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
  
const urlOrder = 'https://norma.nomoreparties.space/api/orders'

export const getOrder = async (idIngridients, idBun) => {
  const res = await fetch(urlOrder, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({
      ingridients: [...idIngridients, idBun]
    })
  });
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