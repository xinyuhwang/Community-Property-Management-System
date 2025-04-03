import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { format } from "date-fns";

export default function NotificationCenter({ announcements, onCreate }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    priority: "normal", // 'low', 'normal', 'high', 'emergency'
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAnnouncement({
      title: "",
      message: "",
      priority: "normal",
    });
  };

  const handleSubmit = () => {
    onCreate({
      ...newAnnouncement,
      date: new Date().toISOString(),
    });
    handleCloseDialog();
  };

  const handleChange = (field, value) => {
    setNewAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "emergency":
        return "error";
      case "high":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Announcements & Alerts
      </Typography>

      {onCreate && (
        <Button variant="contained" onClick={handleOpenDialog} sx={{ mb: 2 }}>
          New Announcement
        </Button>
      )}

      <List>
        {announcements.length === 0 ? (
          <ListItem>
            <ListItemText primary="No announcements" />
          </ListItem>
        ) : (
          announcements.map((announcement, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <Alert
                  severity={getPriorityColor(announcement.priority)}
                  sx={{ width: "100%" }}
                >
                  <Typography variant="subtitle2">
                    {announcement.title}
                  </Typography>
                  <Typography variant="body2">
                    {announcement.message}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {format(
                      new Date(announcement.date),
                      "MMMM do, yyyy - h:mm a"
                    )}
                  </Typography>
                </Alert>
              </ListItem>
              {index < announcements.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newAnnouncement.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={newAnnouncement.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Priority"
            select
            fullWidth
            SelectProps={{
              native: true,
            }}
            value={newAnnouncement.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="emergency">Emergency</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
