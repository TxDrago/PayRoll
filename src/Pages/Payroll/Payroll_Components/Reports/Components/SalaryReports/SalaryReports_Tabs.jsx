// File: src/pages/SalaryReports_Tabs.jsx
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import Drawer from "@mui/material/Drawer";

import MenuIcon from "@mui/icons-material/Menu";

// Importing right side components
import ReportsHome from "./components/ReportsHome";
import PayrollReports from "./components/PayrollReports";
import PayrollRunReports from "./components/PayrollRunReports";
import ComponentClaimReports from "./components/ComponentClaimReports";
import YTDReports from "./components/YTDReports";
import AuditReports from "./components/AuditReports";
import IncomeTaxReports from "./components/IncomeTaxReports";
import PFStatutoryForms from "./components/PFStatutoryForms";
import ESIStatutoryForms from "./components/ESIStatutoryForms";
import ProfessionalTaxReports from "./components/ProfessionalTaxReports";
import LWFStatutoryForms from "./components/LWFStatutoryForms";
import SocialInsuranceReports from "./components/SocialInsuranceReports";
import LoanReports from "./components/LoanReports";
import FullFinalSettlementReports from "./components/FullFinalSettlementReports";

const categoryComponentMap = {
  "Reports Home": ReportsHome,
  "Payroll Reports": PayrollReports,
  "Payroll Run Reports": PayrollRunReports,
  "Component Claim Reports": ComponentClaimReports,
  "YTD Reports": YTDReports,
  "Audit Reports": AuditReports,
  "Income Tax Reports": IncomeTaxReports,
  "PF Statutory Forms": PFStatutoryForms,
  "ESI Statutory Forms": ESIStatutoryForms,
  "Professional Tax Reports": ProfessionalTaxReports,
  "LWF Statutory Forms": LWFStatutoryForms,
  "Social Insurance Reports": SocialInsuranceReports,
  "Loan Reports": LoanReports,
  "Full and Final Settlement Reports": FullFinalSettlementReports,
};

const categories = Object.keys(categoryComponentMap);

const SalaryReports_Tabs = () => {
  const [selectedCategory, setSelectedCategory] = useState("Payroll Reports");
  const SelectedComponent =
    categoryComponentMap[selectedCategory] || (() => <div>Not Found</div>);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        width={260}
        bgcolor="#f9f9f9"
        p={2}
        borderRight="1px solid #e0e0e0"
        sx={{
          display: {
            xs: "none", // hidden on xs
            sm: "none", // hidden on sm
            md: "none", // hidden on md
            lg: "block", // visible from lg and up
          },
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={16}
          mb={4}
          fontFamily={"Poppins"}
        >
          Categories
        </Typography>
        <List disablePadding>
          {categories.map((cat, index) => (
            <React.Fragment key={cat}>
              <ListItemButton
                selected={cat === selectedCategory}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor:
                    cat === selectedCategory
                      ? "#005377 !important"
                      : "transparent",
                  color: cat === selectedCategory ? "white" : "inherit",
                  "&:hover": {
                    bgcolor: cat === selectedCategory ? "#004362" : "#f0f0f0",
                  },
                }}
              >
                <ListItemText
                  primary={cat}
                  fontFamily={"Poppins"}
                  primaryTypographyProps={{ fontSize: 16 }}
                />
              </ListItemButton>
              {cat === "Reports Home" && <Divider sx={{ my: 1, mt: 2 }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Right Side Component */}
      <Box flex={1} p={2} overflow="auto">
        <Box
          width={260}
          bgcolor="#f9f9f9"
          py={2}
          sx={{
            display: {
              xs: "flex",
              lg: "none", // visible from lg and up
            },
            gap: 2,
          }}
        >
          <MenuIcon onClick={toggleDrawer(true)} />
          <Typography
            fontWeight={600}
            fontSize={18}
            mb={4}
            fontFamily={"Poppins"}
          >
            Categories
          </Typography>
        </Box>
        <SelectedComponent />
      </Box>

      {/* Drawer for Categories */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box p={2}>
          <List disablePadding>
            {categories.map((cat, index) => (
              <React.Fragment key={cat}>
                <ListItemButton
                  selected={cat === selectedCategory}
                  onClick={() => {
                    setSelectedCategory(cat);
                    toggleDrawer(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor:
                      cat === selectedCategory
                        ? "#005377 !important"
                        : "transparent",
                    color: cat === selectedCategory ? "white" : "inherit",
                    "&:hover": {
                      bgcolor: cat === selectedCategory ? "#004362" : "#f0f0f0",
                    },
                  }}
                >
                  <ListItemText
                    primary={cat}
                    fontFamily={"Poppins"}
                    primaryTypographyProps={{ fontSize: 16 }}
                  />
                </ListItemButton>
                {cat === "Reports Home" && <Divider sx={{ my: 1, mt: 2 }} />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SalaryReports_Tabs;
