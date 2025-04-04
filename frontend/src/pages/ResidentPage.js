import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AlertList from "../components/AlertList";
import EventCalendar from "../components/EventCalendar";
import NotificationList from "../components/NotificationList";

const ResidentPage = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Mock data loading
  useEffect(() => {
    // Simulate API call
    const mockEvents = [
      {
        id: 1,
        title: "Community Meeting",
        date: new Date(2023, 5, 15, 18, 0),
        location: "Community Hall",
        description:
          "Monthly community meeting to discuss neighborhood issues.",
      },
      {
        id: 2,
        title: "Yard Sale",
        date: new Date(2023, 5, 17, 8, 0),
        location: "Main Street",
        description: "Annual community yard sale event.",
      },
    ];

    const mockAlerts = [
      {
        id: 1,
        title: "Power Outage",
        message: "Scheduled power maintenance on June 10 from 9 AM to 3 PM.",
        date: new Date(2023, 5, 8),
        priority: "high",
      },
      {
        id: 2,
        title: "Water Shutoff",
        message:
          "Water will be temporarily shut off for repairs on June 12 from 1 PM to 4 PM.",
        date: new Date(2023, 5, 9),
        priority: "medium",
      },
    ];

    const mockNotifications = [
      {
        id: 1,
        message: "New community guidelines have been posted.",
        date: new Date(2023, 5, 5),
        read: false,
      },
      {
        id: 2,
        message: "Your maintenance request has been received.",
        date: new Date(2023, 5, 6),
        read: true,
      },
    ];

    setEvents(mockEvents);
    setAlerts(mockAlerts);
    setNotifications(mockNotifications);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resident Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Welcome back, {user.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <EventCalendar events={events} editable={false} />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Emergency Alerts
            </Typography>
            <AlertList alerts={alerts} />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <NotificationList notifications={notifications} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResidentPage;
