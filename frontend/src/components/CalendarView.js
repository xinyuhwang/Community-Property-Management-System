// import React, { useState } from "react";
// import Typography from "@mui/material/Typography";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import {
//   Alert,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Paper
// } from "@mui/material";
// import { add, format } from "date-fns";

// export default function CalendarView({ events, onEventUpdate }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//     setEditMode(false);
//     setOpenDialog(true);
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//     setSelectedEvent(null);
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleUpdate = () => {
//     // Call the update function from props
//     onEventUpdate(selectedEvent);
//     setEditMode(false);
//     setOpenDialog(false);
//   };

//   const handleCancel = () => {
//     setSelectedEvent(events.find((e) => e.id === selectedEvent.id));
//     setEditMode(false);
//   };

//   const handleDelete = () => {
//     // Call the update function with a "cancelled" status
//     onEventUpdate({ ...selectedEvent, status: "cancelled" });
//     setOpenDialog(false);
//   };

//   const handleFieldChange = (field, value) => {
//     setSelectedEvent((prev) => ({ ...prev, [field]: value }));
//   };

//   const dayEvents = events.filter(
//     (event) =>
//       format(new Date(event.date), "yyyy-MM-dd") ===
//       format(selectedDate, "yyyy-MM-dd")
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div>
//         <DateCalendar
//           value={selectedDate}
//           onChange={handleDateChange}
//           slots={{
//             day: (props) => {
//               const hasEvents = events.some(
//                 (event) =>
//                   format(new Date(event.date), "yyyy-MM-dd") ===
//                   format(props.day, "yyyy-MM-dd")
//               );
//               return (
//                 <div
//                   {...props}
//                   style={{
//                     ...props.style,
//                     backgroundColor: hasEvents
//                       ? "rgba(63, 81, 181, 0.1)"
//                       : "inherit",
//                     borderRadius: "50%",
//                   }}
//                 />
//               );
//             },
//           }}
//         />

//         <div style={{ marginTop: "20px" }}>
//           <Typography variant="h6" gutterBottom>
//             Events on {format(selectedDate, "MMMM do, yyyy")}
//           </Typography>
//           {dayEvents.length === 0 ? (
//             <Typography>No events scheduled</Typography>
//           ) : (
//             dayEvents.map((event) => (
//               <Paper
//                 key={event.id}
//                 sx={{ p: 2, mb: 2, cursor: "pointer" }}
//                 onClick={() => handleEventClick(event)}
//               >
//                 <Typography variant="subtitle1">{event.title}</Typography>
//                 <Typography variant="body2">{event.description}</Typography>
//                 <Typography variant="caption">
//                   {format(new Date(event.startTime), "h:mm a")} -{" "}
//                   {format(new Date(event.endTime), "h:mm a")}
//                 </Typography>
//                 {event.status === "cancelled" && (
//                   <Alert severity="warning" sx={{ mt: 1 }}>
//                     This event has been cancelled
//                   </Alert>
//                 )}
//               </Paper>
//             ))
//           )}
//         </div>

//         <Dialog open={openDialog} onClose={handleClose}>
//           <DialogTitle>
//             {editMode ? "Edit Event" : selectedEvent?.title}
//             {selectedEvent?.status === "cancelled" && (
//               <Alert severity="warning" sx={{ mt: 1 }}>
//                 Cancelled
//               </Alert>
//             )}
//           </DialogTitle>
//           <DialogContent>
//             {editMode ? (
//               <>
//                 <TextField
//                   margin="dense"
//                   label="Title"
//                   fullWidth
//                   value={selectedEvent?.title || ""}
//                   onChange={(e) => handleFieldChange("title", e.target.value)}
//                 />
//                 <TextField
//                   margin="dense"
//                   label="Description"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={selectedEvent?.description || ""}
//                   onChange={(e) =>
//                     handleFieldChange("description", e.target.value)
//                   }
//                 />
//                 <TextField
//                   margin="dense"
//                   label="Start Time"
//                   type="time"
//                   fullWidth
//                   value={selectedEvent?.startTime || ""}
//                   onChange={(e) =>
//                     handleFieldChange("startTime", e.target.value)
//                   }
//                 />
//                 <TextField
//                   margin="dense"
//                   label="End Time"
//                   type="time"
//                   fullWidth
//                   value={selectedEvent?.endTime || ""}
//                   onChange={(e) => handleFieldChange("endTime", e.target.value)}
//                 />
//               </>
//             ) : (
//               <>
//                 <Typography>{selectedEvent?.description}</Typography>
//                 <Typography sx={{ mt: 2 }}>
//                   <strong>Time:</strong>{" "}
//                   {format(new Date(selectedEvent?.startTime), "h:mm a")} -{" "}
//                   {format(new Date(selectedEvent?.endTime), "h:mm a")}
//                 </Typography>
//                 <Typography>
//                   <strong>Location:</strong>{" "}
//                   {selectedEvent?.location || "Not specified"}
//                 </Typography>
//               </>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {onEventUpdate && !editMode && (
//               <>
//                 <Button onClick={handleEdit}>Edit</Button>
//                 <Button onClick={handleDelete} color="error">
//                   Cancel Event
//                 </Button>
//               </>
//             )}
//             {editMode && (
//               <>
//                 <Button onClick={handleCancel}>Cancel</Button>
//                 <Button onClick={handleUpdate}>Save</Button>
//               </>
//             )}
//             <Button onClick={handleClose}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </LocalizationProvider>
//   );
// }
