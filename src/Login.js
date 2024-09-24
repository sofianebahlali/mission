import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Import du Material Kit UI et MUI
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Import des composants Material Kit
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Import des icônes
import TwitterIcon from "@mui/icons-material/Twitter"; // Icône Twitter (X)
import LinkedInIcon from "@mui/icons-material/LinkedIn"; // Icône LinkedIn
import GitHubIcon from "@mui/icons-material/GitHub"; // Icône GitHub

// Import de l'AuthContext et autres éléments nécessaires
import { AuthContext } from "./AuthContext";
import { Alert, CircularProgress, Box, Container } from "@mui/material";

// Import de l'image de fond
import bgImage from "assets/images/bg-sign-in-basic.jpeg"; // Assure-toi que le chemin est correct

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true); // État de chargement
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  // Rediriger automatiquement vers /welcome si l'utilisateur est déjà connecté
  useEffect(() => {
    if (authenticated) {
      navigate("/welcome");
    } else {
      setLoadingAuth(false); // Fin du chargement une fois l'authentification déterminée
    }
  }, [authenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // Pour inclure les cookies de session
    })
      .then(async (response) => {
        const result = await response.json();
        if (response.ok) {
          setAuthenticated(true); // Mettre à jour l'état d'authentification
          navigate("/welcome");
        } else {
          setMessage(result.error || "Une erreur est survenue.");
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setMessage("Une erreur est survenue.");
      });
  };

  // Affichage d'un loader pendant la vérification de l'authentification
  if (loadingAuth) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Retour du design combiné avec la logique d'authentification
  return (
    <MKBox
      px={1}
      width="100%"
      height="100vh"
      mx="auto"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: `url(${bgImage})`, // Image de fond
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
          <Card>
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MKTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Connexion
              </MKTypography>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{ mt: 1, mb: 2 }}
              >
                <Grid item xs={2}>
                  <MKTypography
                    component={MuiLink}
                    href="https://x.com/KameHouss" // Lien vers Twitter (X)
                    variant="body1"
                    color="white"
                    target="_blank" // Ouvrir dans un nouvel onglet
                    rel="noopener noreferrer" // Pour des raisons de sécurité
                  >
                    <TwitterIcon color="inherit" />
                  </MKTypography>
                </Grid>
                <Grid item xs={2}>
                  <MKTypography
                    component={MuiLink}
                    href="https://fr.linkedin.com/in/hosni-saidi-b30b09154" // Lien vers LinkedIn
                    variant="body1"
                    color="white"
                    target="_blank" // Ouvrir dans un nouvel onglet
                    rel="noopener noreferrer" // Pour des raisons de sécurité
                  >
                    <LinkedInIcon color="inherit" />
                  </MKTypography>
                </Grid>
                <Grid item xs={2}>
                  <MKTypography
                    component={MuiLink}
                    href="https://github.com/sofianebahlali" // Lien vers GitHub
                    variant="body1"
                    color="white"
                    target="_blank" // Ouvrir dans un nouvel onglet
                    rel="noopener noreferrer" // Pour des raisons de sécurité
                  >
                    <GitHubIcon color="inherit" />
                  </MKTypography>
                </Grid>
              </Grid>
            </MKBox>
            <MKBox pt={4} pb={3} px={3}>
              <MKBox component="form" role="form" onSubmit={handleSubmit}>
                <MKBox mb={2}>
                  <MKInput
                    type="text"
                    label="Nom d'utilisateur"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="password"
                    label="Mot de passe"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </MKBox>
                <MKBox mt={4} mb={1}>
                  <MKButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Se connecter
                  </MKButton>
                </MKBox>
              </MKBox>
              {message && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {message}
                </Alert>
              )}
              <MKBox mt={3} mb={1} textAlign="center">
                <MKTypography variant="button" color="text">
                  Pas encore de compte ?{" "}
                  <MKTypography
                    component={Link}
                    to="/register"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    display="inline"
                  >
                    S'inscrire
                  </MKTypography>
                </MKTypography>
                <MKBox mt={2}>
                  <MKTypography variant="button" color="text">
                    <MKTypography
                      component={Link}
                      to="/forgot-password"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      display="inline"
                    >
                      Mot de passe oublié ?
                    </MKTypography>
                  </MKTypography>
                </MKBox>
              </MKBox>
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default Login;
