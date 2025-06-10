import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
// ------------------- Local Import ------------------------
import Components_Settings from "./Components/Components_Settings/Components_Settings";
import LeaveEncashment_Settings from "./Components/LeaveEncashment_Settings/LeaveEncashment_Settings";
import LeaveAdvance_Settings from "./Components/LeaveAdvance_Settings/LeaveAdvance_Settings";
import NoticePeriodBuyout_Settings from "./Components/NoticePeriodBuyout_Settings/NoticePeriodBuyout_Settings";


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

export default function Settings_Tabs() {
  const [value, setValue] = React.useState(1); // Default: "Run Payroll"

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [ 
    "Components",
    "Leave Encashment",
    "Leave Advance",
    "Notice Period Buyout",
    "Approval Workflow",
  ];

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
                    <Components_Settings />
                  </div>
                );
              case 1:
                return (
                  <div>
                    <LeaveEncashment_Settings />
                  </div>
                );
              case 2:
                return (
                  <div>
                    <LeaveAdvance_Settings />
                  </div>
                );
              case 3:
                return (
                  <div>
                    <NoticePeriodBuyout_Settings />
                  </div>
                );
              case 4:
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
