import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import AlertList from "../components/AlertList";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";

const AdminPage = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

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

    setEvents(mockEvents);
    setAlerts(mockAlerts);
  }, []);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleSaveEvent = (event) => {
    if (event.id) {
      // Update existing event
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    } else {
      // Add new event
      const newId = Math.max(...events.map((e) => e.id), 0) + 1;
      setEvents([...events, { ...event, id: newId }]);
    }
    setShowEventForm(false);
  };

  const handleCancelEvent = () => {
    setShowEventForm(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const handleAddAlert = (alert) => {
    const newId = Math.max(...alerts.map((a) => a.id), 0) + 1;
    setAlerts([...alerts, { ...alert, id: newId, date: new Date() }]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Administrator Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Welcome, {user.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Community Events
              </Typography>
              <Button variant="contained" onClick={handleAddEvent}>
                Add Event
              </Button>
            </Box>

            {showEventForm ? (
              <EventForm
                event={editingEvent}
                onSave={handleSaveEvent}
                onCancel={handleCancelEvent}
              />
            ) : (
              <EventCalendar
                events={events}
                editable={true}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Emergency Alerts
            </Typography>
            <AlertList
              alerts={alerts}
              adminMode={true}
              onAddAlert={handleAddAlert}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPage;
