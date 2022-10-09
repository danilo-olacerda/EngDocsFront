import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

export default function App() {

  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <UserContext.Provider value={{token, setToken}}>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}