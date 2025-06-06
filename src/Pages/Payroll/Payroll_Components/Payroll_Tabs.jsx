import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import PayrollGroup from "./Run_Payroll/PayrollGroup";
import Payroll_Analytics_Tabs from "./Payroll_ Analytics/Payroll_Analytics_Tabs";
import Loans from "./Loans/Loans";
import Benefits_Tabs from "./Benefits/Benefits_Tabs";
import Reports_Tabs from "./Reports/Reports_Tabs";

// Styled MUI Tab
const CustomTab = styled(Tab)(() => ({
  minHeight: "auto",
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  border: "1px solid #d1d5db",
 
}));

// TabPanel component
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box className="py-8">{children}</Box>}
    </div>
  );
}

export default function PayrollTabs() {
  const [value, setValue] = React.useState(6); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    "Payroll Analytics",
    "Run Payroll",
    "Payroll Admin",
    "Approvals",
    "Loans",
    "Benefits",
    "Reports",
    "Settings",
  ];

  return (
    <div className="w-full ">
      {/* Tabs */}
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        // className="mb-4"
        // TabIndicatorProps={{ style: { display: "" } }}
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "1rem", // Change to your desired spacing
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
                ? "!bg-[#004C74] !text-white !border-[#004C74]"
                : "!bg-white text-gray-700 hover:bg-gray-100"
            )}
          />
        ))}
      </Tabs>

      {/* TabPanels */}
      {tabs.map((label, index) => (
        <TabPanel key={index} value={value} index={index}>
          {(() => {
            switch (index) {
              case 0:
                return (
                  <div>
                    <Payroll_Analytics_Tabs />
                  </div>
                );
              case 1:
                return (
                  <div>
                    <PayrollGroup />
                  </div>
                );
              case 2:
                return (
                  <div className="text-gray-700">👤 Payroll Admin Controls</div>
                );
              case 3:
                return (
                  <div className="text-gray-700">
                    ✅ Approvals List or Workflow
                  </div>
                );
              case 4:
                return (
                  <div><Loans /></div>
                );
              case 5:
                return (
                  <div>
                    <Benefits_Tabs />
                  </div>
                );
              case 6:
                return (
                  <div >
                    📄 <Reports_Tabs />
                  </div>
                );
              case 7:
                return <div className="text-gray-700">⚙️ Settings Panel</div>;
              default:
                return null;
            }
          })()}
        </TabPanel>
      ))}
    </div>
  );
}
