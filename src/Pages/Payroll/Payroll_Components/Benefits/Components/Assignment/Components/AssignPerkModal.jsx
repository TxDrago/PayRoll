import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Divider,Button
} from "@mui/material";

// -------------- Icons -----------------
import { CloseSquare,Profile2User } from "iconsax-react";

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
  color: "#005377", // color when unchecked
  "&.Mui-checked": {
    color: "#005377", // color when checked
  },
};

export default function AssignPerkModal({ open, onClose }) {
  const [searchText, setSearchText] = useState("");
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add Perquisite</Typography>
          <IconButton onClick={onClose}>
            <CloseSquare color="#19396F" size="24" />
          </IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Search Box */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >
            Assign perk to employee
          </Typography>
          <TextField
            type="text"
            placeholder="Search......"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            sx={{
              width: "100%",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& fieldset": {
                borderColor: "#c9c8c8",
              },
            }}
          />
        </Box>
        {/* Result Box */}
        <Box sx={{py:3, px:1, my:2, height:180, border:"1px solid #CCCCCC", borderRadius:"12px", display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", gap:4}}>
           <Profile2User
 size="32"
 color="#818181"
/>
           <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "14px",
              color:"#818181",
              textAlign:"center"
            }}
          >
            Search an employee to assign a new perk and to view the <br/>
details of perks that are already assigned (if any).
          </Typography>
        </Box>
        {/* Button Box */}
           <Box sx={{ mt:3,  display:"flex", justifyContent:"center", alignItems:"center", gap:4}}>
            <Button variant="contained" sx={{backgroundColor:"white", color:"#005377", border:"1px solid #005377", }}>
                          Cancel
                        </Button>
             <Button variant="contained" sx={{backgroundColor:"#005377"}}>
                          Assign
                        </Button>
           </Box>
      </Box>
    </Modal>
  );
}
