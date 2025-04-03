// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
// } from "@mui/material";
// import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// export default function BookingForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     room: "",
//     purpose: "",
//     startTime: new Date(),
//     endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
//     attendees: 1,
//     specialRequirements: "",
//   });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Paper sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Book Common Room
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Room</InputLabel>
//               <Select
//                 value={formData.room}
//                 label="Room"
//                 onChange={(e) => handleChange("room", e.target.value)}
//                 required
//               >
//                 <MenuItem value="lounge">Main Lounge</MenuItem>
//                 <MenuItem value="party">Party Room</MenuItem>
//                 <MenuItem value="meeting">Meeting Room</MenuItem>
//                 <MenuItem value="gym">Gym</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Purpose"
//               value={formData.purpose}
//               onChange={(e) => handleChange("purpose", e.target.value)}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DateTimePicker
//                 label="Start Time"
//                 value={formData.startTime}
//                 onChange={(newValue) => handleChange("startTime", newValue)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//                 minDateTime={new Date()}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DateTimePicker
//                 label="End Time"
//                 value={formData.endTime}
//                 onChange={(newValue) => handleChange("endTime", newValue)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//                 minDateTime={formData.startTime}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Number of Attendees"
//               type="number"
//               value={formData.attendees}
//               onChange={(e) =>
//                 handleChange("attendees", parseInt(e.target.value))
//               }
//               inputProps={{ min: 1 }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Special Requirements"
//               multiline
//               rows={4}
//               value={formData.specialRequirements}
//               onChange={(e) =>
//                 handleChange("specialRequirements", e.target.value)
//               }
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" fullWidth>
//               Submit Booking
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// }
