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
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const maintenanceTypes = [
//   "Dumpster Cleaning",
//   "Garage Cleaning",
//   "Fire Alarm Testing",
//   "Elevator Inspection",
//   "HVAC Maintenance",
//   "Landscaping",
//   "Pest Control",
//   "Plumbing Check",
//   "Electrical Inspection",
// ];

// export default function MaintenanceForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     serviceType: "",
//     date: new Date(),
//     description: "",
//     urgent: false,
//     preferredTime: "anytime",
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
//         Request Maintenance Service
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Service Type</InputLabel>
//               <Select
//                 value={formData.serviceType}
//                 label="Service Type"
//                 onChange={(e) => handleChange("serviceType", e.target.value)}
//                 required
//               >
//                 {maintenanceTypes.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Preferred Date"
//                 value={formData.date}
//                 onChange={(newValue) => handleChange("date", newValue)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//                 minDate={new Date()}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Description"
//               multiline
//               rows={4}
//               value={formData.description}
//               onChange={(e) => handleChange("description", e.target.value)}
//               helperText="Please describe the issue or request in detail"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={formData.urgent}
//                   onChange={(e) => handleChange("urgent", e.target.checked)}
//                 />
//               }
//               label="This is an urgent request"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Preferred Time</InputLabel>
//               <Select
//                 value={formData.preferredTime}
//                 label="Preferred Time"
//                 onChange={(e) => handleChange("preferredTime", e.target.value)}
//               >
//                 <MenuItem value="anytime">Anytime</MenuItem>
//                 <MenuItem value="morning">Morning (8am-12pm)</MenuItem>
//                 <MenuItem value="afternoon">Afternoon (12pm-5pm)</MenuItem>
//                 <MenuItem value="evening">Evening (5pm-8pm)</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" fullWidth>
//               Submit Request
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// }
