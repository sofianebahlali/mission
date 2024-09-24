// @mui material components
import Icon from "@mui/material/Icon";

// Routes
const routes = [
  {
    name: "Connexion",
    icon: <Icon>login</Icon>, // Icône pour la connexion
    route: "/login", // Route pour la page de connexion
  },
  {
    name: "Inscription",
    icon: <Icon>person_add</Icon>, // Icône pour l'inscription
    route: "/register", // Route pour l'inscription
  },
  {
    name: "Clients",
    icon: <Icon>groups</Icon>, // Icône pour la liste des clients
    route: "/clients", // Route pour la liste des clients
  },
  {
    name: "Générer une lettre de mission",
    icon: <Icon>description</Icon>, // Icône pour la génération de lettres de mission
    route: "/lettre-mission", // Route pour générer une lettre de mission
  },
];

export default routes;
