import React from "react";
import { Tabs, Tab, Box, } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

// ------------------- Local Import ------------------------
import SalaryReports_Tabs from "./Components/SalaryReports/SalaryReports_Tabs";


// Styled MUI Tab
const CustomTab = styled(Tab)(() => ({
  // minHeight: "auto",
  padding: "10px",
  // textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
}));

// TabPanel component
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box className="py-8">{children}</Box>}
    </div>
  );
}

export default function Reports_Tabs() {
  const [value, setValue] = React.useState(0); // Default: "Run Payroll"

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["Salary Reports", "Compliance Reports"];

  return (
    <div className="w-full ">
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
          // className="mb-4"
          // TabIndicatorProps={{ style: { display: "" } }}
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "1rem",
            },
          }}
        >
          {tabs.map((label, index) => (
            <CustomTab
              key={label}
              label={label}
              value={index}
              className={clsx(
                "transition-colors duration-200 ",
                index === value
                  ? " !text-[#005377] "
                  : " text-gray-700 hover:bg-gray-400"
              )}
            />
          ))}
        </Tabs>
      </Box>

      {/* TabPanels */}
      {tabs.map((label, index) => (
        <TabPanel key={index} value={value} index={index}>
          {(() => {
            switch (index) {
              case 0:
                return (
                  <div>
                  <SalaryReports_Tabs />
                  </div>
                );
              case 1:
                return (
                  <div>
                    {/* <Assignment /> */}
                  </div>
                );
          

              default:
                return null;
            }
          })()}
        </TabPanel>
      ))}
    </div>
  );
}
