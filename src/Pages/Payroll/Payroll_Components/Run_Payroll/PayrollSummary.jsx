import React from "react";
// --------------- React Hooks ----------------

// -------------- Icons -----------------
import {
  User,
  TickCircle,
  Calendar,
  Money,
  Bank,
  Minus,
  Activity,
  Timer1,
  ArrowRight,
} from "iconsax-react";

// --------------------- Sample Data --------------------

const summaryCards = [
  {
    title: "Total Employees",
    label: "",
    value: "52",
    subtitle: "+3 from last month",
    icon: <User size="15" color="#19396F" />,
    color: "#DBEAFE",
  },
  {
    title: "Payroll Processed",
    label: "",
    value: "0/0",
    subtitle: "Not started yet",
    icon: <TickCircle size="15" color="#30B20E" />,
    color: "#DCFADC",
  },
  {
    title: "Calendar Days",
    label: "",
    value: "30",
    subtitle: "Working days: 22",
    icon: <Calendar size="15" color="#7C04FF" />,
    color: "#F3E8FF",
  },
  {
    title: "Total Payroll Cost",
    label: "INR",
    value: "0",
    subtitle: "Pending Calculation",
    icon: <Money size="15" color="#FF5151" />,
    color: "#FEF9C3",
  },
  {
    title: "Employee Deposit",
    label: "INR",
    value: "0",
    subtitle: "Pending Calculation",
    icon: <Bank size="15" color="#9333EA" />,
    color: "#F9DFFF",
  },
  {
    title: "Total Deductions",
    label: "INR",
    value: "0",
    subtitle: "Pending Calculation",
    icon: <Minus size="15" color="#FF5858" />,
    color: "#FEE2E2",
  },
  {
    title: "Total Contributions",
    label: "INR",
    value: "0",
    subtitle: "Pending Calculation",
    icon: <Activity size="15" color="#19396F" />,
    color: "#CCFBF1",
  },
  {
    title: "Payroll Status",
    label: "INR",
    value: "0",
    subtitle: "Due by May 30, 2025",
    icon: <Timer1 size="15" color="#FF5151" />,
    color: "#FFEDD5",
  },
];

// ------------- Function Start --------------
export default function PayrollSummary({ selectedMonthLabel }) {
  return (
    <div className="flex flex-col gap-6">
      {/* ----------------------------- Heading ----------------------------------- */}
      <div className="flex gap-3 justify-between items-center flex-wrap">
        <p className="font-poppins text-[18px] font-medium whitespace-nowrap">
          Payroll Summary ( {selectedMonthLabel} )
        </p>
        {/* forward backward button */}
        <div className="flex gap-3 items-center">
          <p className="font-poppins text-base font-medium text-[#005377] whitespace-nowrap">
            View Details
          </p>
          <ArrowRight size="24" color="#005377" />
        </div>
      </div>
      {/* --------------------------- Payroll Summary Body ------------------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-4 rounded-xl border border-gray-100 shadow-sm bg-[#FAFAFA] hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 justify-between">
              <span className="font-poppins text-[14px] text-[#818181] font-normal">
                {card.title}
              </span>
              <div
                className="w-[30px] h-[30px] flex justify-center items-center"
                style={{ backgroundColor: card.color, borderRadius: "50%" }}
              >
                {card.icon}
              </div>
            </div>
            <p className="text-[20px] font-semibold font-poppins text-black flex gap-1">
              <span>{card.label}</span>
              <span>{card.value}</span>
            </p>
            <p className="text-sm font-poppins text-gray-500 font-light">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
