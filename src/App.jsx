import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import AppRouter from "./routers/Approuter";
import { ConfigProvider, notification } from "antd";
import Header from "./Components/Header";
import useNotification from "antd/es/notification/useNotification";
import FooterList from "./Components/FooterList";
import api from "./api";
import { Axios } from "axios";
import { getAccessToken } from "./api/core";
function App() {
  const [currentUser, setCurrentUser] = useState();
  const [notify, notifyContextHolder] = useNotification();

  useEffect(() => {
    (async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        return;
      }

      api.auth.invoke({}).then((res) => {
        console.log(res);
        setCurrentUser(res.data);
      });
    })();
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider>
        <AuthContext.Provider
          value={{
            currentUser,
            setCurrentUser,
          }}
        >
          {notifyContextHolder}
          <Header />
          <AppRouter />
        </AuthContext.Provider>
      </ConfigProvider>
      <FooterList />
    </BrowserRouter>
  );
}

export default App;
