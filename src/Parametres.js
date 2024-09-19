// Parametres.js

import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

function Parametres() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Paramètres
      </Typography>
      <List>
        <ListItem button component={Link} to="/mon-cabinet">
          <ListItemText primary="Mon cabinet" />
        </ListItem>
        <ListItem button component={Link} to="/mes-cgv">
          <ListItemText primary="Mes CGV" />
        </ListItem>
        <ListItem button disabled>
          <ListItemText primary="Nous contacter" />
        </ListItem>
      </List>
    </Container>
  );
}

export default Parametres;
