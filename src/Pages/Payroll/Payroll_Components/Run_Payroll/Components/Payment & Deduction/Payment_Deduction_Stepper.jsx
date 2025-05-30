import React from "react";
import { Stepper, Step, StepLabel, StepConnector, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// --------------- Local Import -----------------
import Claim from "./Steps/Claim";
import Expenses from "./Steps/Expenses";
import AdhocPayments from "./Steps/AdhocPayments";
import AdhocDeduction from "./Steps/AdhocDeduction";

// Connector styling
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  top: 12,
  left: "calc(-50% + 20px)",
  right: "calc(50% + 20px)",
  "& .MuiStepConnector-line": {
    borderTopWidth: 2,
    borderColor: "#ccc", // default line color
  },
  "&.Mui-active .MuiStepConnector-line": {
    borderColor: "#004C74", // active step line color
  },
  "&.Mui-completed .MuiStepConnector-line": {
    borderColor: "#004C74", // completed step line color
  },
}));

// Step icon styling
const StepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: ownerState.active
    ? "#004C74"
    : ownerState.completed
    ? "#06689c"
    : "#fff",
  color: ownerState.active || ownerState.completed ? "#fff" : "#004C74",
  border: "2px solid #004C74",
  zIndex: 1,
  width: 32,
  height: 32,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
}));

function CustomStepIcon(props) {
  const { active, completed, icon } = props;
  return <StepIconRoot ownerState={{ active, completed }}>{icon}</StepIconRoot>;
}

// Step labels
const steps = [
  "Salary Component Claim",
  "Expenses",
  "Adhoc Payments",
  "Adhoc Deduction",
];

export default function Payment_Deduction_Stepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Claim />;
      case 1:
        return <Expenses />;
      case 2:
        return <AdhocPayments />;
      case 3:
        return <AdhocDeduction />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white py-10">
      {/* Header */}
      <div className="px-8 mb-5">
        <h2 className="text-lg font-medium text-black font-poppins">
          Reimbursement, Adhoc Payment & Deduction
        </h2>
      </div>

      {/* Stepper */}
      <div className="border-t-2 !border-gray-300 py-7 shadow-xl">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  "& .MuiStepLabel-label": {
                    color: "#555",
                  },
                  "&.Mui-active .MuiStepLabel-label": {
                    color: "#004C74",
                    fontWeight: "bold",
                  },
                  "&.Mui-completed .MuiStepLabel-label": {
                    color: "#004C74",
                  },
                }}
              >
                <span className="text-sm text-gray-800 font-medium">
                  {label}
                </span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      {/* Step Content */}
      <Box className="py-10 px-8">{getStepContent(activeStep)}</Box>

      {/* Navigation Buttons */}
      <div className="flex justify-end py-10 px-8 gap-4">
        {activeStep > 0 && (
          <button
            className="text-[14px] font-bold text-[#005377] font-poppins py-3 px-6 bg-white rounded-sm border border-[#005377] cursor-pointer"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className="text-[14px] font-bold text-white font-poppins py-3 px-6 bg-[#005377] rounded-sm cursor-pointer"
          onClick={handleNext}
        >
          {activeStep === 3 ? "Save & Finished" : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
