import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CalendarView from "./CalendarView";
import NotificationCenter from "./NotificationCenter";

export default function Dashboard({
  events,
  announcements,
  onEventUpdate,
  onAnnouncementCreate,
  role,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Community Calendar
          </Typography>
          <CalendarView
            events={events}
            onEventUpdate={role === "admin" ? onEventUpdate : null}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <NotificationCenter
            announcements={announcements}
            onCreate={role === "admin" ? onAnnouncementCreate : null}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
