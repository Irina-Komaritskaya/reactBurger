import {useEffect, useState} from 'react';
import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import Main from '../main/main';

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients'

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(()=>{
    const getData = async () => {
      try{
        setState({...state, hasError: false, isLoading: true})
        const res = await fetch(url);
        const json = await res.json();
        setState({...state, data: json.data, isLoading: false});
      }
      catch(e){
        setState({...state, hasError: true, isLoading: false})
      }
    } 
    getData();
  }, []);
  
  const { data, isLoading, hasError } = state;

	return (
		<div className={style.app}>
			<AppHeader />
			<Main data={data} isLoading={isLoading} hasError={hasError}/>
		</div>
	);
}

export default App;
