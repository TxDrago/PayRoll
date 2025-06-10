// CompareCompensationCost.jsx
import React, { useState } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material"
import RecurringComponents from "./Components/RecurringComponents";
import AdhocComponents from "./Components/AdhocComponents";
import AccountingCode from "./Components/AccountingCode";


const Components_Settings = () => {
  const [components, setComponents] = useState("Accounting Code");


  return (
   <Box
      sx={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 11,
        py: 3,
      }}
    >
      {/* Top Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Drop Down */}
        <Box >
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={components}
              onChange={(e) => setComponents(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "24px", // Rounded-3xl
              }}
            >
              <MenuItem value="Recurring Components">Recurring Components</MenuItem>
              <MenuItem value="Ad-hoc Components">Ad-hoc Components</MenuItem>
              <MenuItem value="Accounting Code">Accounting Code</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Body */}
        {components === "Recurring Components" ? <RecurringComponents /> : ""}
        {components === "Ad-hoc Components" ? <AdhocComponents /> : ""}
        {components === "Accounting Code" ? <AccountingCode /> : ""}
      </Box>
    </Box>
  );
};

export default Components_Settings;


