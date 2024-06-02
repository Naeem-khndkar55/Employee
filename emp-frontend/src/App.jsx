import { AppRoutes } from "./routes/AppRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import Axios from "axios";
import "react-toastify/ReactToastify.css";
import { useUrl } from "./auth/UrlContext";
export const userContext = createContext();

function App() {
  const [user, setUser] = useState();

  const url = useUrl();
  useEffect(() => {
    Axios.get(` ${url}/auth/verify`, {
      headers: {
        Authorization: `Berear ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <userContext.Provider value={[user, setUser]}>
        <AppRoutes />
      </userContext.Provider>
    </>
  );
}

export default App;
