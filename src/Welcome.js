import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "./AuthContext"; // Si tu as un contexte pour gérer l'authentification

function Welcome() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext); // Utiliser le contexte d'authentification si existant

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setAuthenticated(false); // Mise à jour de l'état d'authentification
          navigate("/"); // Redirection vers la page de connexion
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la déconnexion :", error),
      );
  };

  return (
    <div>
      <h1>Bienvenue sur votre tableau de bord</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  );
}

export default Welcome;
