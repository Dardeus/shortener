import React from 'react';
import "./app.scss"
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth";
import Registration from "./pages/Auth/Registration";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/shortener' element={<Home/>}/>
        <Route path='/shortener/login' element={<Login/>}/>
        <Route path='/shortener/registration' element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
