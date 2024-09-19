import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    // Appeler l'API pour vérifier si l'utilisateur est authentifié au démarrage de l'application
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/check-auth`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
      })
      .finally(() => setLoadingAuth(false)); // Fin du chargement
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
