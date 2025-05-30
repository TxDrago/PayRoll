import React from "react";
import { Modal, Fade, IconButton } from "@mui/material";
import { CloseSquare } from "iconsax-react";

export default function LoanDetailsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <div className="absolute right-0 top-0 h-[100vh] overflow-y-auto w-[450px] bg-white p-6 focus:outline-none shadow-lg">
         
         <div className="flex flex-col gap-4">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Details</h2>
            <IconButton onClick={onClose}>
              <CloseSquare  />
            </IconButton>
          </div>

           {/* Divider */}
          <div className="w-full border border-gray-300" />

          {/* Chart Section */}
          <div className="border border-gray-300 rounded p-4 ">
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
                  <text
                    x="18"
                    y="20.35"
                    className="text-[6px] fill-black text-center"
                    textAnchor="middle"
                  >
                    INR
                  </text>
                  <text
                    x="18"
                    y="26"
                    className="text-[6px] fill-black text-center"
                    textAnchor="middle"
                  >
                    000000
                  </text>
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

          {/* Terms List */}
          <div>
            <div className="bg-gray-200 text-sm font-semibold px-3 py-2 rounded-t">
              Terms
            </div>
            <ul className="divide-y divide-gray-300 border-b border-gray-300 text-sm">
              {[
                "Total Repayment Amount",
                "Total Principal Amount",
                "Total Interest Amount",
                "Pre-EMI Interest Amount",
                "EMI Interest",
                "EMI",
                "Interest Rate (Per Annum)",
              ].map((term) => (
                <li key={term} className="flex justify-between px-3 py-2">
                  <span>{term}</span>
                  <span>-</span>
                </li>
              ))}
            </ul>
          </div>
         </div>

        </div>
      </Fade>
    </Modal>
  );
}
