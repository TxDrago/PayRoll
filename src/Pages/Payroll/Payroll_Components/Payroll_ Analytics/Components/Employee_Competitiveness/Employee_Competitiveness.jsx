// CompareCompensationCost.jsx
import React, { useState } from "react";

import { Box } from "@mui/material";

import { TableDocument } from "iconsax-react";

const Employee_Competitiveness = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className=" bg-[#f9fafb] min-h-screen flex flex-col gap-11">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <h2 className="text-[18px] font-medium mb-2 font-poppins">
          Employee Competitiveness
        </h2>
        <Box className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[375px] rounded-lg shadow-[0px_0px_12px_0px_rgba(0,0,0,0.16)] px-4 py-2 focus:outline-none border border-[#c9c8c8]"
          />
          {/* Reset Button */}
          <button
            className="font-poppins text-white  tex-[14px] px-6 py-3 !bg-[#005377] rounded-2xl"
            onClick={() => setSearchTerm("")}
          >
            Reset
          </button>
        </Box>

        <div className=" h-[500px] flex flex-col items-center justify-center text-gray-600 text-center border border-dashed border-gray-800 rounded-xl">
          <div className=" min-w-[50px] h-[50px] flex justify-center items-center rounded-full bg-gray-300">
            <TableDocument size="24" color="#292D32" />
          </div>
          <p>
            View employee competitiveness and compare with other employees by
            searching
          </p>
          <p> for an employee above.</p>
        </div>
      </div>
    </div>
  );
};

export default Employee_Competitiveness;
