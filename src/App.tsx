import React from 'react';
import "./app.scss"
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth";
import Registration from "./pages/Auth/Registration";
import Home from "./pages/Home";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";


type ProtectedRouteProps = {
  isAuthenticated: boolean;
  outlet: JSX.Element;
};

function App() {
  const { logIn } = useSelector((state: RootState) => state.auth)

  const ProtectedRoute = ({isAuthenticated, outlet}: ProtectedRouteProps) => {
    if(isAuthenticated) {
      return outlet;
    } else {
      return <Navigate to='/shortener/login'/>;
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/shortener' element={<ProtectedRoute isAuthenticated = {logIn} outlet={<Home/>} />} />
        <Route path='/shortener/login' element={<Login/>}/>
        <Route path='/shortener/registration' element={<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
