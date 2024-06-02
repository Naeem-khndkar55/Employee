import { createContext, useContext } from "react";

const UrlContext = createContext();

export const useUrl = () => {
  return useContext(UrlContext);
};

export const UrlProvider = ({ children }) => {
  const url = "http://localhost:3002";

  return <UrlContext.Provider value={url}>{children}</UrlContext.Provider>;
};
