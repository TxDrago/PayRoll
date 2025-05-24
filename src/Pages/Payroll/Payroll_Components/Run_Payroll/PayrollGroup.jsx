import React from "react";
// --------------- React Hooks ----------------
import { useState, useEffect } from "react";

// -------------- Icons -----------------
import { ArrowSquareLeft, ArrowSquareRight } from "iconsax-react";

// ------------- Local Imports -------------
import PayrollSummary from "./PayrollSummary";
import RunPayroll from "./RunPayroll";
import ActivityFeed from "./ActivityFeed";

// -------------- Sample Data --------------

const fetchMonths = async () => {
  return [
    { label: "Jan 2025", status: "Completed", month: "January" },
    { label: "Feb 2025", status: "Completed", month: "February" },
    { label: "March 2025", status: "Completed", month: "March" },
    { label: "Apr 2025", status: "Completed", month: "April" },
    { label: "May 2025", status: "Current", month: "May" },
    { label: "Jun 2025", status: "Upcoming", month: "June" },
    { label: "Jul 2025", status: "Upcoming", month: "July" },
    { label: "Aug 2025", status: "Upcoming", month: "August" },
    { label: "Sep 2025", status: "Upcoming", month: "September" },
    { label: "Oct 2025", status: "Upcoming", month: "October" },
    { label: "Nov 2025", status: "Upcoming", month: "November" },
    { label: "Dec 2025", status: "Upcoming", month: "December" },
  ];
};

//------------------- Set Color According to the Status --------------------
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Current":
      return "bg-blue-100 text-blue-600";
    case "Upcoming":
    default:
      return "bg-gray-100 text-gray-500";
  }
};

// ------------- Function Start --------------
export default function PayrollGroup() {
  // --------------- All States --------------
  const [months, setMonths] = useState([]);
  const [selectedMonthLabel, setSelectedMonthLabel] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // Get current month label (e.g., "May 2025")
  const getCurrentMonthLabel = () => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "short" });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  // Handle screen width and set page size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) setPageSize(10);
      else if (window.innerWidth > 768) setPageSize(7);
      else setPageSize(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch months and set current month as selected
  useEffect(() => {
    const loadMonths = async () => {
      const data = await fetchMonths();
      setMonths(data);

      const currentMonthLabel = getCurrentMonthLabel();
      setSelectedMonthLabel(currentMonthLabel);
      console.log("Current Month : ", currentMonthLabel);

      const index = data.findIndex((m) => m.label === currentMonthLabel);
      if (index !== -1) {
        const pageIndex = Math.floor(index / pageSize);
        setCurrentPage(pageIndex);
      }
    };

    loadMonths();
  }, [pageSize]);

  const paginatedMonths = months.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div className="flex flex-col gap-10">
      {/* ----------------------------- Heading ----------------------------------- */}
      <div className="flex flex-col gap-3">
        <p className="font-[Poppins] font-semibold text-[20px]">
          Payroll Group
        </p>
        <p className="font-poppins text-base font-normal">
          Manage and process your company's payroll efficiently
        </p>
      </div>

      {/* --------------------------- Calendar Months ------------------------------ */}
      <div className="border !bg-white border-gray-300 rounded-xl p-5 flex flex-col gap-4">
        {/* Heading and forward backward button*/}
        <div className="flex gap-3 justify-between items-center">
          <p className="font-poppins text-base font-medium">Payroll Period</p>
          {/* forward backward button */}
          <div className="flex gap-2 items-center">
            <ArrowSquareLeft
              size="24"
              color="black"
              className="cursor-pointer"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            />
            <ArrowSquareRight
              size="24"
              color="black"
              className="cursor-pointer"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(Math.ceil(months.length / pageSize) - 1, prev + 1)
                )
              }
            />
          </div>
        </div>
        {/* All Months of calendar with Status */}
        <div className="">
          <div className="flex gap-3 overflow-x-auto">
            {paginatedMonths.map((month) => {
              const isSelected = month.label === selectedMonthLabel;
              return (
                <div
                  key={month.label}
                  onClick={() => setSelectedMonthLabel(month.label)}
                  className={`min-w-[116px] max-w-[160px] w-full min-h-[65px] p-2.5 rounded-xl border cursor-pointer flex flex-col items-start gap-2 ${
                    isSelected
                      ? "bg-[#004E75] text-white border-transparent"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  <span className="font-semibold text-sm">{month.label}</span>
                  <span
                    className={`text-xs px-2.5 py-[2px] rounded-full font-medium ${
                      isSelected
                        ? getStatusColor(month.status)
                        : getStatusColor(month.status)
                    }`}
                  >
                    {month.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------------------- Payroll Summary ---------------------------- */}
      <PayrollSummary selectedMonthLabel={selectedMonthLabel} />

      {/* ------------------------- Run Payroll and Activity Feed ------------------ */}

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5 ">
          {/* Run Payroll Part */}
          <div className="w-full lg:max-h-[694px] lg:h-[694px]">
            <RunPayroll selectedMonthLabel={selectedMonthLabel} />
          </div>

          {/* Activity Feed Part */}
          <div className="w-full max-h-[694px]">
           <ActivityFeed />      
          </div>
        </div>
      </div>
    </div>
  );
}
