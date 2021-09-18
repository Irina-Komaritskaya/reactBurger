import React from 'react';
import style from './app.module.css';
import Header from '../header/header';
import Main from '../main/main';
import data from '../../utils/data'

function App() {
	return (
		<div className={style.app}>
			<Header />
			<Main data={data}/>
		</div>
	);
}

export default App;
