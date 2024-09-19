// ClientList.js

import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Container,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formValues, setFormValues] = useState({
    denom_social: "",
    Nom_representantclient: "",
    Forme_client: "",
    Impot_client: "",
    Tva_client: "",
    Siren_client: "",
    Activite_client: "",
    Adresse_etablissementclient: "",
    code_postaletablissementclient: "",
    ville_etablissementclient: "",
    date_debutexercice: "",
    date_finexercice: "",
    Nom_expertdossier: "",
  });

  // Charger la liste des clients au montage du composant
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clients`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  // Ouvrir le dialogue pour ajouter ou modifier un client
  const handleOpenDialog = (client = null) => {
    setEditingClient(client);
    setFormValues({
      denom_social: client?.denom_social || "",
      Nom_representantclient: client?.Nom_representantclient || "",
      Forme_client: client?.Forme_client || "",
      Impot_client: client?.Impot_client || "",
      Tva_client: client?.Tva_client || "",
      Siren_client: client?.Siren_client || "",
      Activite_client: client?.Activite_client || "",
      Adresse_etablissementclient: client?.Adresse_etablissementclient || "",
      code_postaletablissementclient:
        client?.code_postaletablissementclient || "",
      ville_etablissementclient: client?.ville_etablissementclient || "",
      date_debutexercice: client?.date_debutexercice || "",
      date_finexercice: client?.date_finexercice || "",
      Nom_expertdossier: client?.Nom_expertdossier || "",
    });
    setOpenDialog(true);
  };

  // Fermer le dialogue
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClient(null);
    setFormValues({
      denom_social: "",
      Nom_representantclient: "",
      Forme_client: "",
      Impot_client: "",
      Tva_client: "",
      Siren_client: "",
      Activite_client: "",
      Adresse_etablissementclient: "",
      code_postaletablissementclient: "",
      ville_etablissementclient: "",
      date_debutexercice: "",
      date_finexercice: "",
      Nom_expertdossier: "",
    });
  };

  // Gérer la soumission du formulaire (ajout ou modification)
  const handleSubmit = () => {
    const method = editingClient ? "PUT" : "POST";
    const url = editingClient
      ? `${process.env.REACT_APP_BACKEND_URL}/api/clients/${editingClient.id}`
      : `${process.env.REACT_APP_BACKEND_URL}/api/clients`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
          data = await response.json();
        } else {
          data = await response.text();
          throw new Error(`Erreur serveur : ${data}`);
        }

        if (response.ok) {
          if (editingClient) {
            setClients((prevClients) =>
              prevClients.map((client) =>
                client.id === data.id ? data : client,
              ),
            );
          } else {
            setClients((prevClients) => [...prevClients, data]);
          }
          handleCloseDialog();
        } else {
          alert(
            data.error || "Une erreur est survenue lors de l'ajout du client.",
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
        alert(
          `Une erreur est survenue lors de la communication avec le serveur : ${error.message}`,
        );
      });
  };

  // Supprimer un client
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clients/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then(() => {
          setClients((prevClients) =>
            prevClients.filter((client) => client.id !== id),
          );
        })
        .catch((error) => console.error("Erreur :", error));
    }
  };

  // Colonnes pour le DataGrid
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            position: "sticky",
            right: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <Tooltip title="Modifier">
            <IconButton
              color="primary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    { field: "denom_social", headerName: "Dénomination Sociale", width: 200 },
    {
      field: "Nom_representantclient",
      headerName: "Représentant(s)",
      width: 250,
    },
    { field: "Forme_client", headerName: "Forme Juridique", width: 150 },
    { field: "Impot_client", headerName: "Type d'Impôt", width: 150 },
    {
      field: "Tva_client",
      headerName: "Assujetti TVA",
      width: 150,
      valueGetter: (params) => (params.value ? "Oui" : "Non"),
    },
    { field: "Siren_client", headerName: "SIREN", width: 150 },
    { field: "Activite_client", headerName: "Activité", width: 200 },
    {
      field: "Adresse_etablissementclient",
      headerName: "Adresse de l'Établissement",
      width: 250,
    },
    {
      field: "code_postaletablissementclient",
      headerName: "Code Postal",
      width: 120,
    },
    { field: "ville_etablissementclient", headerName: "Ville", width: 150 },
    { field: "date_debutexercice", headerName: "Début Exercice", width: 150 },
    { field: "date_finexercice", headerName: "Fin Exercice", width: 150 },
    { field: "Nom_expertdossier", headerName: "Expert-Comptable", width: 200 },
  ];

  // Définition du CustomToolbar
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
      >
        Ajouter un client
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Vos Clients
        </Typography>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={clients}
            columns={columns}
            pageSize={10}
            components={{
              Toolbar: CustomToolbar,
            }}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>

        {/* Dialogue pour ajouter/modifier un client */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingClient ? "Modifier le client" : "Ajouter un client"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Dénomination Sociale"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.denom_social}
              onChange={(e) =>
                setFormValues({ ...formValues, denom_social: e.target.value })
              }
              required
            />
            <TextField
              label="Représentant"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.Nom_representantclient}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  Nom_representantclient: e.target.value,
                })
              }
            />
            <TextField
              label="Forme Juridique"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.Forme_client}
              onChange={(e) =>
                setFormValues({ ...formValues, Forme_client: e.target.value })
              }
            />
            <TextField
              label="Impôt du client"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.Impot_client}
              onChange={(e) =>
                setFormValues({ ...formValues, Impot_client: e.target.value })
              }
            />
            <TextField
              label="Assujetti TVA"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.Tva_client}
              onChange={(e) =>
                setFormValues({ ...formValues, Tva_client: e.target.value })
              }
            />
            {/* Ajoute ici d'autres champs du formulaire selon tes besoins */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSubmit} color="primary">
              {editingClient ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default ClientList;
