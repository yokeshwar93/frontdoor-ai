import React, {useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import AppContainer from "./containers/AppContainer";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <AppContainer />
    </div>
  );
}

export default App;
