import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
  Box,
  Modal,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// -------------- Icons -----------------
import { CloseSquare } from "iconsax-react";

// --------------- Local Import -----------------
import LeaveApplied from "./Steps/LeaveApplied";
import NoAttendance from "./Steps/NoAttendance";
import LopSummary from "./Steps/LopSummary";
import LopReversal from "./Steps/LopReversal";

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
const steps = ["Leave Applied", "No Attendance", "Lop Summary", "Lop Reversal"];

export default function LeaveStepper() {
  const [activeStep, setActiveStep] = React.useState(3);
  const [modalOpen, setModalOpen] = useState(false);

  //---------------------------- Modal Open Button------------------------------------------------
  const handleModal = () => {
    setModalOpen(true);
  };

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setModalOpen(false);

  //---------------------------- Modal Next Step -------------------------------

  const handleNextStep =()=>{
    setModalOpen(false);
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  }

  const handleNext = () => {
    if (activeStep != 1) {
      if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    } else {
      handleModal();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <LeaveApplied />;
      case 1:
        return <NoAttendance />;
      case 2:
        return <LopSummary />;
      case 3:
        return <LopReversal />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white py-10">
      {/* Header */}
      <div className="px-8 mb-5">
        <h2 className="text-lg font-medium text-black font-[Poppins]">
          Leave, Attendance & Payable Units: APR-2025
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
            className="text-[14px] font-bold text-[#005377] font-[Poppins] py-3 px-6 bg-white rounded-sm border border-[#005377] cursor-pointer"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className="text-[14px] font-bold text-white font-[Poppins] py-3 px-6 bg-[#005377] rounded-sm cursor-pointer"
          onClick={handleNext}
        >
          {activeStep===3?"Save & Finished":"Save & Continue"}
          
        </button>
      </div>

      {/* ----------------------------  Modal -------------------------- */}

      <Modal open={modalOpen} onClose={handleClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <div className="absolute left-1/2 top-1/2 w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-6 py-4 focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between rounded-md bg-white py-2 text-[#19396F]">
              <Typography className="font-semibold">
                Warnings: Days with No Attendance Logs
              </Typography>
              <CloseSquare
                color="#19396F"
                className="cursor-pointer"
                onClick={handleClose}
                size="24"
              />
            </div>

            {/* Divider */}
            <div className="w-full border-b border-gray-400 mt-6"></div>

            {/* Body */}
            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold text-black font-[Poppins]">
                There are 1031 days with no attendance logs.
              </p>
              <p className="text-sm font-normal text-black font-[Poppins]">
                If you skip this steps, and manually override LOP, there might
                be a mismatch between the actual leave/LOP days and LOP days
                processed using payroll. It is recommended to take action
                against all the days with ‘no attendance log’ to calculate
                leave/LOP days count.
              </p>
            </div>
            {/* Divider */}
            <div className="w-full border-b border-gray-400 mt-6"></div>
            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-md border border-[#19396F] px-5 py-2 text-sm font-medium text-[#19396F] font-[Poppins] cursor-pointer"
                onClick={handleNextStep}
              >
                Skip this step
              </button>
              <button
                className="rounded-md bg-[#19396F] px-5 py-2 text-sm font-medium text-white font-[Poppins] cursor-pointer"
                onClick={() => {
                  // Add confirm logic here
                  handleClose();
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
