import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Event,
  Announcement,
  Home,
  People,
  Construction,
} from "@mui/icons-material";

const features = [
  {
    title: "Community Events",
    description:
      "View and participate in upcoming community events and activities",
    icon: <Event fontSize="large" />,
    path: "/resident",
  },
  {
    title: "Announcements",
    description: "Stay informed with the latest community news and alerts",
    icon: <Announcement fontSize="large" />,
    path: "/resident",
  },
  {
    title: "Room Booking",
    description: "Reserve common spaces for your private events",
    icon: <Home fontSize="large" />,
    path: "/resident",
  },
  {
    title: "Maintenance",
    description: "Request and track maintenance services for your property",
    icon: <Construction fontSize="large" />,
    path: "/resident",
  },
];

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: "center",
          my: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          py: 8,
          px: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Community Portal
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your one-stop platform for all community activities and services
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/login"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderWidth: 2,
              "&:hover": { borderWidth: 2 },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{ mt: 8, mb: 4 }}
      >
        Community Features
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: theme.palette.primary.light,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  color: "white",
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {feature.description}
              </Typography>
              <Button
                variant="outlined"
                component={Link}
                to={feature.path}
                sx={{ mt: "auto" }}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {!isMobile && (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
            mb: 8,
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            About Our Community
          </Typography>
          <Typography paragraph align="center">
            Our community portal is designed to enhance resident experience by
            providing easy access to all community services and information in
            one place. Whether you need to book a space, request maintenance, or
            stay updated with community news, our platform makes it simple and
            convenient.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
