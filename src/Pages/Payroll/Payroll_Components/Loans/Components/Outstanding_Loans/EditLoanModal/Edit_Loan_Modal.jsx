import React, { useState } from "react";
import {
  Modal,
  Fade,
  Box,
  TextField,
  MenuItem,
  IconButton,
  Switch,
} from "@mui/material";
import { CloseSquare } from "iconsax-react";
import LoanDetailsModal from "./LoanDetailsModal";

export default function Edit_Loan_Modal({ open, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);


  //--------------------------- Handle Modal Open ---------------------------
const handleOpenDetailModal=()=>{
  setModalOpen(true);
  onClose();
}


  return (
    <>
    <LoanDetailsModal  open={modalOpen} onClose={() => setModalOpen(false)} />
    <Modal open={open} onClose={onClose} closeAfterTransition>

      <Fade in={open}>
        <Box className="absolute left-1/2 top-1/2 max-h-[90vh] w-[60vw] overflow-y-auto max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 focus:outline-none font-poppins space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold font-poppins">
              Edit Loan
            </span>
            <IconButton onClick={onClose}>
              <CloseSquare size="24" color="black" />
            </IconButton>
          </div>

          {/* Divider */}
          <div className="w-full border border-gray-300" />

          {/* Top Info Section */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-1 flex gap-2 items-center">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold">Daiwk</div>
                <div className="text-sm text-gray-500">UI UX Designer</div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-1 items-center">
              <div className="text-[18 px] font-poppins font-medium">
                Salary
              </div>
              <div className="text-[16px] font-poppins">INR 8,00,000</div>
            </div>
            <div className="col-span-1 flex flex-col gap-1 items-center">
              <div className="text-[18 px] font-poppins font-medium whitespace-nowrap">
                In Progress | Rapid Loans
              </div>
              <div className="text-[16px] font-poppins">0 / 0</div>
            </div>
            <div className="col-span-1 flex flex-col gap-1 items-center">
              <div className="text-[18 px] font-poppins font-medium">
                Employee Since
              </div>
              <div className="text-[16px] font-poppins">Nov 11, 2022</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border border-gray-300" />

          {/* Switch */}
          <div className="flex items-center gap-3">
            <Switch
              defaultChecked
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#19396F",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#19396F",
                },
              }}
            />

            <span className="text-[16px] font-medium text-black">
              This is an ongoing/existing loan
            </span>
          </div>

          {/* Loan Details Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Disbursal */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-700">
                Loan Disbursal Details
              </div>
              <div className="space-y-3">
              <div className="!space-y-2">
                <label className="font-poppins font-normal text-sm leading-[100%] text-black">
                  Loan Amount
                </label>
                <TextField
                  sx={{
                    height: 44,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(244, 244, 244, 1)",
                      borderRadius: "8px",
                      padding: "0 10px",
                      "& fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      height: "44px",
                      boxSizing: "border-box",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  fullWidth
                  size="small"
                />
              </div>
              <div className="!space-y-2">
                <label className="font-poppins font-normal text-sm leading-[100%] text-black">
                  Interest Rate (per annum)
                </label>
                <TextField
                  sx={{
                    height: 44,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(244, 244, 244, 1)",
                      borderRadius: "8px",
                      padding: "0 10px",
                      "& fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      height: "44px",
                      boxSizing: "border-box",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  fullWidth
                  size="small"
                />
              </div>
              <div className="!space-y-2">
                <label className="font-poppins font-normal text-sm leading-[100%] text-black">
                  Type of Interest
                </label>
                <TextField
                  sx={{
                    height: 44,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(244, 244, 244, 1)",
                      borderRadius: "8px",
                      padding: "0 10px",
                      "& fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      height: "44px",
                      boxSizing: "border-box",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  fullWidth
                  size="small"
                />
              </div>
              <div className="!space-y-2">
                <label className="font-poppins font-normal text-sm leading-[100%] text-black">
                  Disbursal Mode
                </label>
                <TextField
                  sx={{
                    height: 44,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(244, 244, 244, 1)",
                      borderRadius: "8px",
                      padding: "0 10px",
                      "& fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      height: "44px",
                      boxSizing: "border-box",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  fullWidth
                  size="small"
                  value="Igniculuss Payroll"
                />
              </div>
              <div className="!space-y-2">
                <label className="font-poppins font-normal text-sm leading-[100%] text-black">
                  EMI Deducts From
                </label>
                <TextField
                  sx={{
                    height: 44,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(244, 244, 244, 1)",
                      borderRadius: "8px",
                      padding: "0 10px",
                      "& fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(204, 204, 204, 1)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      height: "44px",
                      boxSizing: "border-box",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  fullWidth
                  size="small"
                  select
                >
                  <MenuItem value="January">January</MenuItem>
                  <MenuItem value="February">February</MenuItem>
                </TextField>
              </div>
              </div>
            </div>

            {/* Repayment */}
            <div className="space-y-7">
              <div className="text-sm font-medium text-gray-700">
                Repayment Details
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="text-xs text-gray-500">
                    Total Repayment Amount
                  </div>
                  <div className="font-medium">-</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="text-xs text-gray-500">EMI</div>
                  <div className="font-medium">-</div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="text-sm font-medium text-gray-700">
                  Upcoming Deduction
                </div>
                <div className="flex justify-between text-sm mt-1 flex-col gap-3">
                  <span>Amount -</span>
                  <span>Deducts On -</span>
                </div>
              </div>
              <div 
              onClick={handleOpenDetailModal}
              className="text-blue-600 text-sm cursor-pointer">
                View Details
              </div>
            </div>

            {/* Note */}
            <div className="!space-y-7">
              <div className="text-sm font-medium text-gray-700">
                Note (Optional)
              </div>
              <TextField
                fullWidth
                multiline
                rows={12}
                placeholder="Provide Your Notes"
                variant="outlined"
              />
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
    </>
  );
}
