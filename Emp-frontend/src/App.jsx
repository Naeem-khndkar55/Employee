import { AppRoutes } from "./routes/AppRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
import "react-toastify/ReactToastify.css";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState();
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
