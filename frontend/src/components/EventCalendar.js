import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CalendarToday, Edit, Delete } from "@mui/icons-material";
import { format } from "date-fns";

const EventCalendar = ({ events, editable, onEdit, onDelete }) => {
  const sortedEvents = [...events].sort((a, b) => a.date - b.date);

  return (
    <Box>
      {sortedEvents.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No upcoming events
        </Typography>
      ) : (
        <List>
          {sortedEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                borderLeft: "4px solid",
                borderColor: "primary.main",
                mb: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
              secondaryAction={
                editable && (
                  <>
                    <IconButton onClick={() => onEdit(event)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(event.id)}>
                      <Delete />
                    </IconButton>
                  </>
                )
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="subtitle1" component="span">
                      {event.title}
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="div" variant="body2">
                      {format(event.date, "MMMM d, yyyy h:mm a")}
                    </Typography>
                    <Typography component="div" variant="body2">
                      {event.location}
                    </Typography>
                    {event.description && (
                      <Typography
                        component="div"
                        variant="body2"
                        color="textSecondary"
                      >
                        {event.description}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default EventCalendar;
