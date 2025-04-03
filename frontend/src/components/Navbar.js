import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Community Portal
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {!user && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {user && role === "resident" && (
            <Button color="inherit" component={Link} to="/resident">
              Resident Dashboard
            </Button>
          )}
          {user && role === "admin" && (
            <Button color="inherit" component={Link} to="/admin">
              Admin Dashboard
            </Button>
          )}
          {user && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
