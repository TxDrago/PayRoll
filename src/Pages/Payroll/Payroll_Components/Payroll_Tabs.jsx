import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import PayrollGroup from "./Run_Payroll/PayrollGroup";

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
  const [value, setValue] = React.useState(1); // Default: "Run Payroll"

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
                  <div className="text-gray-700">
                    📊 Payroll Analytics Component Here
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
                  <div className="text-gray-700">💰 Loans Management UI</div>
                );
              case 5:
                return (
                  <div className="text-gray-700">
                    🎁 Employee Benefits Overview
                  </div>
                );
              case 6:
                return (
                  <div className="text-gray-700">
                    📄 Payroll Reports Section
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
