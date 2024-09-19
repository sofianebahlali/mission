// MonCabinet.js

import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

function MesCGV() {
  const [CGVInfo, setCGVInfo] = useState({
    delais_resiliation: "",
    delais_interruption: "",
    Acompte_pourcentage: "",
    Pourcentage_indemnite: "",
    Mode_reglement: "",
    Duree_contestationfacture: "",
    Ville_tribunal: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mes-cgv`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCGVInfo(data);
        }
        setIsLoaded(true);
      })
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const handleChange = (e) => {
    setCGVInfo({ ...CGVInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mes-cgv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(CGVInfo),
    })
      .then((response) => {
        if (response.ok) {
          alert("Informations des CGV enregistrées avec succès.");
        } else {
          alert("Une erreur est survenue.");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour :", error),
      );
  };

  if (!isLoaded) {
    return <Typography>Chargement des informations des CGV...</Typography>;
  }

  return (
    <Container maxWidth="md">
      {" "}
      {/* Limite la largeur du conteneur pour le rendre plus épuré */}
      <Box sx={{ mt: 5, mb: 4 }}>
        {" "}
        {/* Ajout d'un margin-top plus large pour espacer le contenu */}
        <Typography variant="h4" gutterBottom>
          Mes CGV
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
          label="Délai de résiliation (en mois)"
          name="delais_resiliation"
          type="number"
          value={CGVInfo.delais_resiliation}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Délai d'interruption de mission (en mois)"
          name="delais_interruption"
          type="number"
          value={CGVInfo.delais_interruption}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Pourcentage de l'acompte (%)"
          name="Acompte_pourcentage"
          type="number"
          value={CGVInfo.Acompte_pourcentage}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Pourcentage d'indemnité en cas d'interruption (%)"
          name="Pourcentage_indemnite"
          type="number"
          value={CGVInfo.Pourcentage_indemnite}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Mode de règlement (prélèvement, virement, chèque, etc.)"
          name="Mode_reglement"
          value={CGVInfo.Mode_reglement}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Délai de contestation de facture (en jours)"
          name="Duree_contestationfacture"
          type="number"
          value={CGVInfo.Duree_contestationfacture}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Ville du tribunal compétent"
          name="Ville_tribunal"
          value={CGVInfo.Ville_tribunal}
          onChange={handleChange}
          fullWidth
          required
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

export default MesCGV;
