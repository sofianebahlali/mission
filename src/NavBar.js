// NavBar.js

import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import du contexte
import { Settings as SettingsIcon } from "@mui/icons-material"; // Import de l'icône Paramètres

function NavBar() {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext); // Accès au contexte

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setAuthenticated(false); // Mettre à jour l'état d'authentification
        navigate("/");
      })
      .catch((error) => console.error("Erreur :", error));
  };

  const handleRedirect = () => {
    if (authenticated) {
      navigate("/welcome"); // Redirige vers Welcome si connecté
    } else {
      navigate("/"); // Redirige vers la page de connexion si non connecté
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          onClick={handleRedirect} // Appelle handleRedirect lors du clic
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Lettres de Mission
        </Typography>

        {authenticated ? (
          <>
            <Button color="inherit" component={Link} to="/clients">
              Clients
            </Button>
            <Button color="inherit" component={Link} to="/lettre-mission">
              Lettre de mission
            </Button>
            <Button color="inherit" component={Link} to="/parametres">
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              Paramètres
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/">
            Connexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
