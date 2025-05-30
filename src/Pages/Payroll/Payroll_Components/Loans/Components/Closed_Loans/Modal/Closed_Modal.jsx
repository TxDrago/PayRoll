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
import { CloseSquare,Money } from "iconsax-react";

export default function Closed_Modal({ open, onClose }) {


  //--------------------------- Handle Modal Open ---------------------------



  return (
    <>
    <Modal open={open} onClose={onClose} closeAfterTransition>

      <Fade in={open}>
        <Box className="absolute left-1/2 top-1/2 max-h-[90vh] w-[60vw] overflow-y-auto max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 focus:outline-none font-poppins space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold font-poppins">
              View Loan
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

          {/* Loan */}
          <div className="flex items-center gap-3">
           <div className="flex justify-between items-center gap-6 w-full">
            <div>
                <div className=" flex gap-2 items-center">
                    <div className="min-h-10 min-w-10 flex justify-center items-center bg-[#FEC2C2] rounded-full">

             <Money
 size="24"
 color="#FF8A65"
/>
                    </div>
              <div>
                <div className="font-semibold">Daiwk</div>
                <div className="text-sm text-gray-500">UI UX Designer</div>
              </div>
            </div>
            </div>
            <div className="py-1 px-3 text-white bg-[#30B20E] rounded-xl"> <span>Cleared</span> </div>
           </div>
          </div>

          
          {/* Divider */}
          <div className="w-full border border-gray-300" />


        
         {/* Chart Section */}
          <div className=" p-2 ">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                {/* Replace this with real donut chart */}
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    className="text-[#1976D2]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                    strokeDasharray="80, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#F44336]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-80"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                
                </svg>
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1976D2]" />
                  <span>Total Principal Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F44336]" />
                  <span>Total Interest Amount</span>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
    </>
  );
}
