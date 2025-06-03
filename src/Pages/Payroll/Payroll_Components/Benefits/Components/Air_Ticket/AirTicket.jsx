import React, { useState } from "react";

// MUI Imports

import {
  MenuItem,
  Box,
  Card,
  Typography,
  Menu,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
// -------------- Icons -----------------
import { Profile2User } from "iconsax-react";

const AirTicket = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Header */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "18px",
                  }}
                >
                  Air ticket policies
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    color: "#818181",
                  }}
                >
                  View and create policies that hold different eligibility and
                  usage criteria
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Data Section */}
      <Box
        sx={{
          py: 3,
          px: 1,
          my: 2,
          height: 550,
          border: "1px solid #CCCCCC",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
          <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "14px",
            textAlign: "center",
          }}
        >
         No air ticket policies are created
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "14px",
            color: "#818181",
            textAlign: "center",
          }}
        >
         Why not set up an air ticket policy ? Even birds have a flight plan
        </Typography>
         {/* Button Box */}
                   <Box sx={{ mt:3,  display:"flex", justifyContent:"center", alignItems:"center", gap:4}}>
                     <Button variant="contained" sx={{backgroundColor:"#005377"}}>
                                  Set Up Air Ticket Policy
                                </Button>
                   </Box>
      </Box>
    </Box>
  );
};

export default AirTicket;
