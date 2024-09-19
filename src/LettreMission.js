// LettreMission.js

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

function LettreMission() {
  const [selectedMission, setSelectedMission] = useState("");
  const [clientQuestion, setClientQuestion] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientInfo, setClientInfo] = useState(null);
  const [cabinetInfo, setCabinetInfo] = useState(null);
  const [cgvInfo, setCgvInfo] = useState(null);

  // Charger la liste des clients
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clients`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  // Charger les informations du cabinet
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mon-cabinet`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCabinetInfo(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  // Charger les informations des CGV
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mes-cgv`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCgvInfo(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleMissionChange = (event) => {
    setSelectedMission(event.target.value);
  };

  const handleClientQuestionChange = (event) => {
    setClientQuestion(event.target.value);
    if (event.target.value === "non") {
      setSelectedClient("");
      setClientInfo(null); // Réinitialiser si la réponse est non
    }
  };

  const handleClientChange = (event) => {
    const clientId = event.target.value;
    setSelectedClient(clientId);
    const client = clients.find((c) => c.id === clientId);
    setClientInfo(client); // Charger les informations du client sélectionné
  };

  const handleGenerateMission = () => {
    if (selectedMission && clientInfo && cabinetInfo && cgvInfo) {
      const replacements = {
        // Informations du client
        denom_social: clientInfo.denom_social,
        Nom_representantclient: clientInfo.Nom_representantclient,
        forme_client: clientInfo.Forme_client,
        impot_client: clientInfo.Impot_client,
        tva_client: clientInfo.Tva_client,
        siren_client: clientInfo.Siren_client,
        activite_client: clientInfo.Activite_client,
        adresse_etablissementclient: clientInfo.Adresse_etablissementclient,
        code_postaletablissementclient:
          clientInfo.code_postaletablissementclient,
        ville_etablissementclient: clientInfo.ville_etablissementclient,
        date_debutexercice: clientInfo.date_debutexercice,
        date_finexercice: clientInfo.date_finexercice,
        // Informations du cabinet
        denom_socialexpert: cabinetInfo.Denom_socialexpert,
        siret_expert: cabinetInfo.Siret_expert,
        adresse_expert: cabinetInfo.Adresse_expert,
        tel_expert: cabinetInfo.Tel_expert,
        mail_expert: cabinetInfo.Mail_expert,
        site_expert: cabinetInfo.Site_expert,
        region_expert: cabinetInfo.Region_expert,
        // CGV
        delais_resiliation: cgvInfo.delais_resiliation,
        acompte_pourcentage: cgvInfo.Acompte_pourcentage,
        mode_reglement: cgvInfo.Mode_reglement,
      };

      // Envoyer la requête pour générer le document
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate-ldm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replacements }),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.blob(); // Récupérer le fichier en tant que blob
          }
          throw new Error("Erreur lors de la génération du document");
        })
        .then((blob) => {
          // Créer un lien de téléchargement pour le fichier
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Lettre_de_mission.docx"); // Nom du fichier à télécharger
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch((error) => {
          console.error("Erreur:", error);
          alert(
            "Une erreur est survenue lors de la génération de la lettre de mission.",
          );
        });
    } else {
      alert(
        "Veuillez sélectionner une lettre de mission et remplir toutes les informations.",
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Générer une lettre de mission
        </Typography>
        {/* Sélection de la lettre de mission */}
        <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
          <InputLabel id="mission-label">
            Sélectionner une lettre de mission
          </InputLabel>
          <Select
            labelId="mission-label"
            value={selectedMission}
            onChange={handleMissionChange}
            label="Sélectionner une lettre de mission"
          >
            <MenuItem value="Comptabilité">Comptabilité</MenuItem>
            <MenuItem value="Présentation des comptes annuels">
              Présentation des comptes annuels
            </MenuItem>
            <MenuItem value="Examen limité">Examen limité</MenuItem>
          </Select>
        </FormControl>

        {/* Question sur le client existant */}
        {selectedMission && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">
              Générer pour un client existant ?
            </Typography>
            <RadioGroup
              value={clientQuestion}
              onChange={handleClientQuestionChange}
              row
            >
              <FormControlLabel value="oui" control={<Radio />} label="Oui" />
              <FormControlLabel value="non" control={<Radio />} label="Non" />
            </RadioGroup>
          </Box>
        )}

        {/* Sélection du client */}
        {clientQuestion === "oui" && (
          <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
            <InputLabel id="client-label">Sélectionner un client</InputLabel>
            <Select
              labelId="client-label"
              value={selectedClient}
              onChange={handleClientChange}
              label="Sélectionner un client"
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.denom_social}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Section Informations Client */}
        {clientInfo && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Informations du client</Typography>
            <TextField
              label="Dénomination Sociale"
              value={clientInfo.denom_social}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Représentant"
              value={clientInfo.Nom_representantclient}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Forme Juridique"
              value={clientInfo.Forme_client}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="SIREN"
              value={clientInfo.Siren_client}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Adresse de l'Établissement"
              value={clientInfo.Adresse_etablissementclient}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            {/* Ajoute les autres champs clients ici */}
          </Box>
        )}

        {/* Section Informations Cabinet */}
        {cabinetInfo && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Informations du cabinet</Typography>
            <TextField
              label="Dénomination Sociale"
              value={cabinetInfo.Denom_socialexpert}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="SIRET"
              value={cabinetInfo.Siret_expert}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Adresse du cabinet"
              value={cabinetInfo.Adresse_expert}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Téléphone"
              value={cabinetInfo.Tel_expert}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            {/* Ajoute les autres champs cabinet ici */}
          </Box>
        )}

        {/* Section CGV */}
        {cgvInfo && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">
              Conditions Générales de Vente (CGV)
            </Typography>
            <TextField
              label="Délai de résiliation"
              value={cgvInfo.delais_resiliation}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Pourcentage Acompte"
              value={cgvInfo.Acompte_pourcentage}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Mode de règlement"
              value={cgvInfo.Mode_reglement}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            {/* Ajoute les autres champs CGV ici */}
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGenerateMission}
          sx={{ mt: 4 }}
        >
          Générer
        </Button>
      </Box>
    </Container>
  );
}

export default LettreMission;
