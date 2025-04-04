import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { Warning, Add } from "@mui/icons-material";
import { format } from "date-fns";

const AlertList = ({ alerts, adminMode = false, onAddAlert }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    priority: "medium",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAlert({
      title: "",
      message: "",
      priority: "medium",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert({ ...newAlert, [name]: value });
  };

  const handleSubmitAlert = () => {
    onAddAlert(newAlert);
    handleCloseDialog();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Alerts
        </Typography>
        {adminMode && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            size="small"
          >
            New Alert
          </Button>
        )}
      </Box>

      {alerts.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No active alerts
        </Typography>
      ) : (
        <List>
          {alerts.map((alert) => (
            <ListItem
              key={alert.id}
              sx={{
                borderLeft: "4px solid",
                borderColor: getPriorityColor(alert.priority),
                mb: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Warning
                      sx={{ mr: 1, color: getPriorityColor(alert.priority) }}
                    />
                    <Typography variant="subtitle1" component="span">
                      {alert.title}
                    </Typography>
                    <Chip
                      label={alert.priority}
                      size="small"
                      sx={{ ml: 1 }}
                      color={getPriorityColor(alert.priority)}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="div" variant="body2">
                      {alert.message}
                    </Typography>
                    <Typography
                      component="div"
                      variant="caption"
                      color="textSecondary"
                    >
                      Posted: {format(alert.date, "MMMM d, yyyy h:mm a")}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {adminMode && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Create New Alert</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              fullWidth
              variant="outlined"
              value={newAlert.title}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="message"
              label="Message"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={newAlert.message}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={newAlert.priority}
                label="Priority"
                onChange={handleInputChange}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmitAlert} variant="contained">
              Post Alert
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default AlertList;
