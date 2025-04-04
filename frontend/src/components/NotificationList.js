import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { Notifications, NotificationsActive } from "@mui/icons-material";
import { format } from "date-fns";

const NotificationList = ({ notifications }) => {
  return (
    <Box>
      {notifications.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No notifications
        </Typography>
      ) : (
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                mb: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                opacity: notification.read ? 0.8 : 1,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {notification.read ? (
                      <Notifications sx={{ mr: 1, color: "action.active" }} />
                    ) : (
                      <NotificationsActive
                        sx={{ mr: 1, color: "primary.main" }}
                      />
                    )}
                    <Typography variant="subtitle1" component="span">
                      {notification.message}
                    </Typography>
                    {!notification.read && (
                      <Chip
                        label="New"
                        size="small"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {format(notification.date, "MMMM d, yyyy h:mm a")}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotificationList;
