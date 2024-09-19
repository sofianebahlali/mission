// MonCabinet.js

import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

function MonCabinet() {
  const [cabinetInfo, setCabinetInfo] = useState({
    logo_expertcomptable: "",
    adresse_client: "",
    Denom_socialexpert: "",
    Adresse_expert: "",
    Tel_expert: "",
    Mail_expert: "",
    Site_expert: "",
    Region_expert: "",
    Siret_expert: "",
    Intracom_expert: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mon-cabinet`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCabinetInfo(data);
        }
        setIsLoaded(true);
      })
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleChange = (e) => {
    setCabinetInfo({ ...cabinetInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mon-cabinet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(cabinetInfo),
    })
      .then((response) => {
        if (response.ok) {
          alert("Informations du cabinet enregistrées avec succès.");
        } else {
          alert("Une erreur est survenue.");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour :", error),
      );
  };

  if (!isLoaded) {
    return <Typography>Chargement des informations du cabinet...</Typography>;
  }

  return (
    <Container maxWidth="md">
      {" "}
      {/* Limite la largeur du conteneur pour le rendre plus épuré */}
      <Box sx={{ mt: 5, mb: 4 }}>
        {" "}
        {/* Ajout d'un margin-top plus large pour espacer le contenu */}
        <Typography variant="h4" gutterBottom>
          Mon cabinet
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3, // Espace entre les champs du formulaire pour rendre le tout plus aéré
          mb: 4,
        }}
      >
        <TextField
          label="Logo du cabinet (URL)"
          name="logo_expertcomptable"
          value={cabinetInfo.logo_expertcomptable}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Adresse du siège social"
          name="adresse_client"
          value={cabinetInfo.adresse_client}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dénomination sociale"
          name="Denom_socialexpert"
          value={cabinetInfo.Denom_socialexpert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Adresse du cabinet"
          name="Adresse_expert"
          value={cabinetInfo.Adresse_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Téléphone"
          name="Tel_expert"
          value={cabinetInfo.Tel_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="Mail_expert"
          value={cabinetInfo.Mail_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Site web"
          name="Site_expert"
          value={cabinetInfo.Site_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Région de l'Ordre"
          name="Region_expert"
          value={cabinetInfo.Region_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="SIRET"
          name="Siret_expert"
          value={cabinetInfo.Siret_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="N° TVA intracommunautaire"
          name="Intracom_expert"
          value={cabinetInfo.Intracom_expert}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            Sauvegarder
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MonCabinet;
