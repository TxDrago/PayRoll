import React, { useState } from "react";
import {
   Box,
  Typography,
  TextField,
  FormControl,
  Select,IconButton ,Button,Divider,
  MenuItem,Modal,Checkbox, FormControlLabel,
} from "@mui/material";

// -------------- Icons -----------------
import { CloseSquare } from "iconsax-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",

  outline: "none",

  
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
};


export default function LeaveEncashment_Modal({ open, onClose }) {
     const [legalEntity, setLegalEntity] = useState("");
  const [payGroupName, setPayGroupName] = useState("");
  const [description, setDescription] = useState("");
const [isTaxExempted, setIsTaxExempted] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Add/Edit Encashment Policy</Typography>
          <IconButton onClick={onClose}>
            <CloseSquare color="#19396F" size="24" />
          </IconButton>
        </Box>

        <Divider />

        {/* Form */}
       <Box
      sx={{
        // maxWidth: 500,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        py: 2,
      }}
    >
{/* Component Name*/}
      <Box>
        <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 500 }}>
         Name of the Policy
        </Typography>
        <TextField
          placeholder="Name of the Policy"
          fullWidth
          size="small"
          value={payGroupName}
          onChange={(e) => setPayGroupName(e.target.value)}
        />
      </Box>

      {/* Earning Section */}
      <Box>
        <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 500 }}>
         Salary Component
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={legalEntity}
            onChange={(e) => setLegalEntity(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select Salary Entity</em>
            </MenuItem>
            <MenuItem value="Entity1">Entity 1</MenuItem>
            <MenuItem value="Entity2">Entity 2</MenuItem>
          </Select>
        </FormControl>
      </Box>

      

      {/* Description */}
      <Box>
        <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 500 }}>
        Calculation expression (per day)
        </Typography>
        <TextField
          placeholder="Tip: Use the available components to input the component here....."
          fullWidth
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>



        {/* Buttons */}
          <Box mt={4} textAlign="center">
            <Button variant="contained" sx={{backgroundColor:"#005377"}}>
              Save
            </Button>
          </Box>
    </Box>
      </Box>
    </Modal>
  );
}
