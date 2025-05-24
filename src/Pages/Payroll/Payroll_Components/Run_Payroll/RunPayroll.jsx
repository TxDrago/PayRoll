// Required imports
import React from "react";
import { useState } from "react";

// -------------- Icons -----------------
import { ArrowRight } from "iconsax-react";

const steps = [
  {
    title: "Leave, Attendance & Payable Units",
    updatedAt: "May 14, 2025, (12:21 pm)",
    updatedBy: "jaya gogwai",
    status: true,
  },
  {
    title: "New Joinees & Exits",
    updatedAt: "May 14, 2025, (12:21 pm)",
    updatedBy: "jaya gogwai",
    status: true,
  },
  {
    title: "Bonus, Salary Revisions & Overtime",
    updatedAt: "May 14, 2025, (12:21 pm)",
    updatedBy: "jaya gogwai",
    status: true,
  },
  {
    title: "Reimbursement, Adhoc Payment, Deduction",
    updatedAt: "May 14, 2025, (12:21 pm)",
    updatedBy: "jaya gogwai",
    status: true,
  },
  {
    title: "Salaries on Hold & Arrears",
    updatedAt: "May 14, 2025, (12:21 pm)",
    updatedBy: "jaya gogwai",
    status: false,
  },
  {
    title: "Override (PT, ESI, TDS, LWF)",
    updatedAt: "May 14, 2025, (12:21 pm)",
    updatedBy: "jaya gogwai",
    status: false,
  },
];

export default function RunPayroll({ selectedMonthLabel }) {
  const totalSteps = 6;
  const completedSteps = 3;
  const percentage = (completedSteps / totalSteps) * 100;
  //   const navigate = useNavigate();

  const handleNavigate = (stepIndex) => {
    console.log("Index", stepIndex);
    if (stepIndex === 0) {
      console.log("Attendance");
    }
  };

  return (
    <div className="max-w-full p-5 border border-gray-300 shadow-md rounded-xl flex flex-col gap-4">
      {/* Heading */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-[16px] font-medium font-poppins">
          Run Payroll ( {selectedMonthLabel} )
        </h2>
        {/* Progress Bar */}
        <div className="w-[280px]">
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#005377] transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-medium font-poppins text-[10px]">
              <span
                className={completedSteps >= 2 ? "text-white" : "text-black"}
              >
                {" "}
                {completedSteps}&nbsp;
              </span>
              <span
                className={completedSteps >= 3 ? "text-white" : "text-black"}
              >
                of&nbsp;{totalSteps}&nbsp;steps&nbsp;
              </span>
              <span
                className={completedSteps >= 4 ? "text-white" : "text-black"}
              >
                complete
              </span>
              <span
                className={completedSteps >= 5 ? "text-white" : "text-black"}
              >
                d
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-3 justify-between items-center bg-[#F5F8FF] border border-gray-400 rounded-lg p-[18px] hover:shadow cursor-pointer"
            onClick={() => handleNavigate(index)}
          >
            <div className="flex-wrap flex gap-4 justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 min-w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-black text-base font-poppins">
                {index + 1}
              </div>
              <div className="flex flex-col gap-[3px]">
                <p className="font-medium text-black text-[12px] font-poppins">
                  {step.title}
                </p>
                <p className=" text-[#818181] font-normal text-[10px] font-poppins">
                  Last Changes on {step.updatedAt} By {step.updatedBy}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {step.status === true ? (
                <span className="text-xs whitespace-nowrap text-[#30B20E] bg-[#DCFADC] rounded-full px-3 py-1 font-medium font-poppins">
                  Action Taken
                </span>
              ) : (
                <span className="text-xs whitespace-nowrap text-[#818181] bg-[#E6E9EF] rounded-full px-3 py-1 font-medium font-poppins">
                  No Action Taken
                </span>
              )}
            </div>
            </div>
              <ArrowRight size="20" color="#292D32" />
          </div>
        ))}
      </div>

      <div className="flex justify-start items-center mt-2 gap-4 flex-wrap">
        <button className="!w-fit h-fit !whitespace-nowrap rounded-lg !p-[10px] !font-poppins !bg-[#005377] !text-white text-[14px] cursor-pointer">
          Process Payroll
        </button>
        <button className="!w-fit h-fit !whitespace-nowrap rounded-lg !p-[10px] !font-poppins border border-[#005377] !bg-white !text-[#005377] text-[14px] cursor-pointer">
          Review all Employee
        </button>
        <button className="!w-fit h-fit !whitespace-nowrap rounded-lg !p-[10px] !font-poppins border border-[#005377] !bg-white !text-[#005377] text-[14px] cursor-pointer">
          Lock Payroll
        </button>
      </div>
    </div>
  );
}
