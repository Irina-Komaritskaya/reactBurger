import React from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';
import data from './utils/data'

function App() {
  return (
    <div className="App">
      <Header />
      <Main data={data}/>
    </div>
  );
}

export default App;
