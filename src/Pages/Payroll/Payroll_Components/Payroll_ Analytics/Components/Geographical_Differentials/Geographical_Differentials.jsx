// CompareCompensationCost.jsx
import React, { useState } from "react";

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { Location } from "iconsax-react";

const Geographical_Differentials = () => {
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("");

  return (
    <div className=" bg-[#f9fafb] min-h-screen flex flex-col gap-11">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <h2 className="text-[18px] font-medium mb-2 font-poppins">
          Geographical Differentials
        </h2>

        <Box className="flex gap-6 w-1/2">
          {/* Location Dropdown */}
          <FormControl fullWidth size="small">
            <InputLabel id="location-label">Select Location</InputLabel>
            <Select
              labelId="location-label"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Select Location"
              className="rounded-2xl"
              sx={{ borderRadius: "1rem" }} // MUI override
            >
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
            </Select>
          </FormControl>

          {/* Indian Rupee Dropdown */}
          <FormControl fullWidth size="small">
            <InputLabel id="currency-label">Indian Rupee</InputLabel>
            <Select
              labelId="currency-label"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              label="Indian Rupee"
              className="rounded-2xl"
              sx={{ borderRadius: "1rem" }} // MUI override
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className=" h-[500px] flex flex-col items-center justify-center text-gray-600 text-center border border-dashed border-gray-800 rounded-xl">
          <div className=" min-w-[50px] h-[50px] flex justify-center items-center rounded-full bg-gray-300">
            <Location size="24" color="#292D32" />
          </div>
          <p>Select a location to see Geographical differentials like</p>
          <p> salary, experience, etc. for that location.</p>
        </div>
      </div>
    </div>
  );
};

export default Geographical_Differentials;
