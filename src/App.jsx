import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import UserContext from "./contexts/UserContext.jsx";
import { useState } from "react";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import DailyPart from "./pages/DailyPart/DailyPart.jsx";
import BuildDailyPart from "./pages/BuildDailyPart/BuildDailyPart.jsx";
import NewBuildDailyPart from "./pages/NewBuildDailyPart/NewBuildDailyPart.jsx";
import NewDailyPart from "./pages/NewDailyPart/NewDailyPart.jsx";
import { mantineTheme } from "./theme/mantineTheme.jsx";

export default function App() {

  const [token, setToken] = useState("");

  return (
    <MantineProvider theme={mantineTheme}>
      <BrowserRouter>
        <UserContext.Provider value={{ token, setToken }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dailyPart" element={<DailyPart />} />
            <Route path="/buildDailyPart" element={<BuildDailyPart />} />
            <Route path="/dailyPart/new" element={<NewDailyPart />} />
            <Route path="/buildDailyPart/new" element={<NewBuildDailyPart />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </MantineProvider>
  );
}
