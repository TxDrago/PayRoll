import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Switch,
  Divider,
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

  const radioSx = {
    color: '#005377',           // color when unchecked
    '&.Mui-checked': {
      color: '#005377',         // color when checked
    },
  };


export default function AddPerkModal({ open, onClose }) {
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
          <Typography variant="h6">Add Perquisite</Typography>
          <IconButton onClick={onClose}>
            <CloseSquare color="#19396F" size="24" />
          </IconButton>
        </Box>

        <Divider />

        {/* Form */}
        <Box component="form" noValidate autoComplete="off">
          {/* Perk Name */}
          <TextField
            fullWidth
            label="Name a Perquisite"
            placeholder="Name a Perquisite"
            variant="outlined"
            margin="normal"
          />

          {/* Description */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            placeholder="Write a Description..."
            variant="outlined"
            margin="normal"
          />

          {/* Ad Hoc Checkbox */}
          <FormControlLabel
            control={<Checkbox />}
            label="This is an ad hoc perk and is given out to employee, as and when required."
            sx={{ mt: 1 }}
          />

          {/* Category Dropdown */}
          <TextField
            select
            fullWidth
            label="Perquisite Category"
            placeholder="Select Perquisite Categories"
            margin="normal"
          >
            <MenuItem value="">Select Perquisite Categories</MenuItem>
            {/* Add options dynamically here */}
          </TextField>

          <Divider sx={{ my: 2 }} />

          {/* Taxable */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              Is this a taxable perquisite as per income tax rules?
            </FormLabel>
            <RadioGroup row defaultValue="yes">
              <FormControlLabel value="yes" control={<Radio  sx={radioSx} />} label="Yes" />
              <FormControlLabel value="no" control={<Radio  sx={radioSx} />} label="No" />
            </RadioGroup>
          </FormControl>

          {/* Monetary display */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              Do you want to show monetary value of perquisite to the employee?
            </FormLabel>
            <RadioGroup row defaultValue="yes">
              <FormControlLabel value="yes" control={<Radio  sx={radioSx} />} label="Yes" />
              <FormControlLabel value="no" control={<Radio  sx={radioSx} />} label="No" />
            </RadioGroup>
          </FormControl>

          {/* Value Calculation */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              How is perquisite value calculated?
            </FormLabel>
            <RadioGroup defaultValue="different">
              <FormControlLabel
                value="fixed"
                control={<Radio  sx={radioSx} />}
                label="Perquisite value is a fixed amount, for all employees"
              />
              <FormControlLabel
                value="formula"
                control={<Radio  sx={radioSx} />}
                label={
                  <>
                    Perquisite value is formula based value, for all
                    employees&nbsp;
                    <a href="#" style={{ color: "#1976d2" }}>
                      View examples
                    </a>
                  </>
                }
              />
              <FormControlLabel
                value="different"
                control={<Radio  sx={radioSx} />}
                label={
                  <>
                    Perquisite value is different for each employee, and is
                    defined at each employee level.&nbsp;
                    <a href="#" style={{ color: "#1976d2" }}>
                      View examples
                    </a>
                  </>
                }
              />
            </RadioGroup>
          </FormControl>

          {/* Prorate and Info */}
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">
              Prorate this perk as per actual payable days in a month&nbsp;
              <a href="#" style={{ color: "#1976d2" }}>
                View examples
              </a>
            </Typography>
            <Switch 
            
             sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#19396F",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#19396F",
                },
              }}
              />
          </Box>

          <Typography variant="caption" color="text.secondary" mt={1}>
            Perk value is impacted by Loss of Pay (LOP) due to employees'
            attendance or unpaid leaves
          </Typography>

          {/* Buttons */}
          <Box mt={4} textAlign="center">
            <Button variant="contained" sx={{backgroundColor:"#005377"}}>
              Save & Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
