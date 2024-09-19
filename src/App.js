// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import du contexte
// import NavBar from "./NavBar";
import Login from "./Login";
import Registration from "./Registration";
import Welcome from "./Welcome";
import ClientList from "./ClientList";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import MonCabinet from "./MonCabinet"; // Page Mon Cabinet
import Parametres from "./Parametres"; // Page Paramètres
import MesCGV from "./MesCGV"; // Page Mes CGV
import LettreMission from "./LettreMission"; // Page Lettre de mission
import theme from "./assets/theme"; // Import du fichier theme.js

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          {/* <NavBar /> */}
          <Routes>
            {/* Route pour la page de connexion */}
            <Route path="/" element={<Login />} />

            {/* Route pour la page d'inscription */}
            <Route path="/register" element={<Registration />} />

            {/* Route pour la page de mot de passe oublié */}
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Route pour la page de réinitialisation de mot de passe */}
            <Route path="/reset_password/:token" element={<ResetPassword />} />

            {/* Route protégée pour la page de bienvenue après connexion */}
            <Route
              path="/welcome"
              element={<ProtectedRoute element={<Welcome />} />}
            />

            {/* Route protégée pour la liste des clients */}
            <Route
              path="/clients"
              element={<ProtectedRoute element={<ClientList />} />}
            />

            {/* Route protégée pour la page des paramètres */}
            <Route
              path="/parametres"
              element={<ProtectedRoute element={<Parametres />} />}
            />

            {/* Route protégée pour la page Mon Cabinet */}
            <Route
              path="/mon-cabinet"
              element={<ProtectedRoute element={<MonCabinet />} />}
            />

            {/* Route protégée pour la page Mes CGV */}
            <Route
              path="/mes-cgv"
              element={<ProtectedRoute element={<MesCGV />} />}
            />

            {/* Route protégée pour la page Lettre de mission */}
            <Route
              path="/lettre-mission"
              element={<ProtectedRoute element={<LettreMission />} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
