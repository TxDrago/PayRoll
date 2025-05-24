// Required imports
import React from "react";

// -------------- Icons -----------------
import { DocumentText1 } from "iconsax-react";

//---------------- Sample Data ---------------
const steps = [
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
  {
    img: "",
    name: "Jaya Gogwani",
    time: "May 15, ( 2:50 PM )",
    text: "Reimbursement, Adhoc Payment, Deduction Viewed / Updated Reimbursement, Adhoc Payment, Deduction",
  },
];

export default function ActivityFeed() {
  return (
    <div className="max-w-full px-4 py-5 h-full overflow-y-scroll border border-gray-300 shadow-md rounded-xl flex flex-col gap-6">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-medium font-poppins">Activity Feed</h2>
      </div>

      {/* Body */}
      {/* Body */}
      {steps.length != 0 ? (
        <div className="space-y-5 w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col gap-4 w-full">
              {/* Top Heading */}
              <div className="flex items-center gap-2 w-ful">
                <div className="w-8 h-8 min-w-8 rounded-full bg-gray-200 inline-block "></div>
                <div className="flex gap-2 justify-between items-center w-full">
                  <p className="font-medium text-black text-[16px] font-poppins">
                    {step.name}
                  </p>
                  <p className="font-normal text-[#979797] text-[12px] font-poppins">
                    {step.time}
                  </p>
                </div>
              </div>
              {/* Text Part */}
              <div className="pr-2">
                <p className="font-normal text-[#818181] text-[10px] font-poppins">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-ful h-full flex justify-center items-center">
          <div className="border border-dashed border-[#818181] w-full rounded-xl py-16 px-13 flex flex-col gap-2.5">
            <div className="flex justify-center">
              <div className="w-10 max-w-10 h-10 bg-[#D9D9D9] flex justify-center items-center rounded-full">
                <DocumentText1 size="20" color="#292D32" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-[16px] font-medium font-poppins text-[#000000] text-center">
                No Activity
              </p>
              <p className="text-[16px] font-medium font-poppins text-[#818181] text-center ">
                Recent payroll activities will appear here
              </p>
            </div>
            <div className="flex justify-center">
              <button className="cursor-pointer text-[14px] font-medium font-poppins text-[#19396F] p-2.5 border border-[#005377] rounded-lg">
                Start Processing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
