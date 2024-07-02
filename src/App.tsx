import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'
import SignUp from './components/SignUp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
      </header>
    </div>
  );
}

export default App;
