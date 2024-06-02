import { createContext, useContext } from "react";

const UrlContext = createContext();

export const useUrl = () => {
  return useContext(UrlContext);
};

export const UrlProvider = ({ children }) => {
  const url = "https://employee-backend-ybej.onrender.com";

  return <UrlContext.Provider value={url}>{children}</UrlContext.Provider>;
};
