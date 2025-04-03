import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
import Dashboard from "../components/Dashboard";
import AnnouncementForm from "../components/AnnouncementForm";
import { AuthContext } from "../contexts/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminPage() {
  const [value, setValue] = useState(0);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // In a real app, these would be API calls
    const mockEvents = [
      {
        id: 1,
        title: "Community BBQ",
        description: "Annual neighborhood barbecue in the common area",
        date: new Date(Date.now() + 86400000 * 3).toISOString(),
        startTime: new Date(Date.now() + 86400000 * 3).setHours(12, 0, 0, 0),
        endTime: new Date(Date.now() + 86400000 * 3).setHours(16, 0, 0, 0),
        location: "Common Area",
        organizer: "Community Board",
      },
      {
        id: 2,
        title: "Yoga Class",
        description: "Weekly yoga session in the gym",
        date: new Date(Date.now() + 86400000 * 5).toISOString(),
        startTime: new Date(Date.now() + 86400000 * 5).setHours(9, 0, 0, 0),
        endTime: new Date(Date.now() + 86400000 * 5).setHours(10, 0, 0, 0),
        location: "Gym",
        organizer: "Fitness Committee",
      },
    ];

    const mockAnnouncements = [
      {
        id: 1,
        title: "Parking Lot Cleaning",
        message:
          "The parking lot will be cleaned on Friday. Please move your vehicles by 7am.",
        date: new Date(Date.now() - 86400000).toISOString(),
        priority: "high",
      },
      {
        id: 2,
        title: "Welcome New Residents",
        message:
          "Please welcome the Smith family moving into unit 4B this weekend!",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        priority: "normal",
      },
    ];

    setEvents(mockEvents);
    setAnnouncements(mockAnnouncements);
  }, []);

  const handleEventUpdate = (updatedEvent) => {
    // In a real app, this would be an API call
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleAnnouncementCreate = (newAnnouncement) => {
    // In a real app, this would be an API call
    setAnnouncements([
      {
        id: announcements.length + 1,
        ...newAnnouncement,
      },
      ...announcements,
    ]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Post Announcement" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Dashboard
          events={events}
          announcements={announcements}
          onEventUpdate={handleEventUpdate}
          onAnnouncementCreate={handleAnnouncementCreate}
          role="admin"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AnnouncementForm onSubmit={handleAnnouncementCreate} />
      </TabPanel>
    </Container>
  );
}
