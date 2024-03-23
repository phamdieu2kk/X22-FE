
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";
import AuthContext from "./context/AuthContext";
import AppRouter from "./routers/Approuter";
import { ConfigProvider } from "antd";
import Header from "./Components/Header";

function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <BrowserRouter>
      <ConfigProvider>

        <AuthContext.Provider value={{
          currentUser, setCurrentUser
        }}>
          <Header />
          <AppRouter />
        </AuthContext.Provider>

      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
