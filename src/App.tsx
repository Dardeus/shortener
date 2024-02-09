import React from 'react';
import "./app.scss"
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth";
import Registration from "./pages/Registration";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
