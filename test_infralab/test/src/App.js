import React from 'react';
import './App.css';
// import { Provider } from 'react-redux';// import store from './store';
import Header from './components/Header/header';
import Dashboard from './components/Dashboard/dashboard';
function App() {
   return ( 
    <div className="App"> 
      <Header /> 
      <Dashboard /> 
    </div> 
    );
  }
export default App;