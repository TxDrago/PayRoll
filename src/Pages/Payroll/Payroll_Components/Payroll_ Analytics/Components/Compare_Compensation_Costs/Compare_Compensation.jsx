// CompareCompensationCost.jsx
import React, { useState } from "react";
import { Bank, Calendar, Location, Profile2User } from "iconsax-react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  Box,
  Divider,
} from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { CloseSquare } from "iconsax-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const data = [
  { name: "Green", value: 28756487, color: "#30B20E" },
  { name: "Blue", value: 305000, color: "#19396F" },
  { name: "Yellow", value: 15504, color: "#FFF70B" },
  { name: "Red", value: 2000, color: "#FF5151" },
];

const Compare_Compensation = () => {
  const [financialYear, setFinancialYear] = useState("2025-26");
  const [businessUnit, setBusinessUnit] = useState([]);
  const [viewToggle, setViewToggle] = useState(true);

  //------------------- Add Business Unit ------------------
  const MAX_SELECTION = 3;
  const handleBusinessUnitChange = (event) => {
    const {
      target: { value },
    } = event;

    // Prevent selecting more than 3
    if (value.length > MAX_SELECTION) {
      alert("Can Compare only upto 3 Business");
      return;
    }

    setBusinessUnit(value);
  };

  //------------------------ Remove Business Unit ----------------------
  const onClose = (unitToRemove) => {
    setBusinessUnit((prev) => prev.filter((unit) => unit !== unitToRemove));
  };

  return (
    <div className=" bg-[#f9fafb] min-h-screen flex flex-col gap-11">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <h2 className="text-[18px] font-medium mb-2 font-poppins">
          Compare Compensation Cost
        </h2>

        {/* Drop Down */}
        <div className="flex gap-4">
          <FormControl size="small" className="!min-w-[180px]">
            <Select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              variant="outlined"
              size="small"
              className="bg-white !rounded-3xl"
            >
              <MenuItem value="2024-25">Financial Year 2024-25</MenuItem>
              <MenuItem value="2025-26">Financial Year 2025-26</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Business Unit */}
          <div className="bg-white rounded-xl shadow p-3 border border-[#CCCCCC] min-h-[100px] flex flex-col gap-2.5">
            <div className="flex items-center gap-4">
              <div
                className=" min-w-[30px] h-[30px] flex justify-center items-center"
                style={{ backgroundColor: "#F3E8FF", borderRadius: "50%" }}
              >
                <Bank size="15" color="#701965" />
              </div>
              <p className="font-normal text-sm font-poppins">Business Units</p>
            </div>
            <p className="text-[12px] text-[#818181] font-poppins">
              Use this to compare compensation cost between different business
              units in your organization.
            </p>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-xl shadow p-3 border border-[#CCCCCC] min-h-[100px] flex flex-col gap-2.5">
            <div className="flex items-center gap-4">
              <div
                className=" min-w-[30px] h-[30px] flex justify-center items-center"
                style={{ backgroundColor: "#FEF9C3", borderRadius: "50%" }}
              >
                <Location size="15" color="#FF944B" />
              </div>
              <p className="font-normal text-sm font-poppins">Locations</p>
            </div>
            <p className="text-[12px] text-[#818181] font-poppins">
              Use this to compare compensation cost between different
              geographical locations in your organization.
            </p>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-xl shadow p-3 border border-[#CCCCCC] min-h-[100px] flex flex-col gap-2.5">
            <div className="flex items-center gap-4">
              <div
                className=" min-w-[30px] h-[30px] flex justify-center items-center"
                style={{ backgroundColor: "#DBEAFE", borderRadius: "50%" }}
              >
                <Profile2User size="15" color="#19396F" />
              </div>
              <p className="font-normal text-sm font-poppins">Departments</p>
            </div>
            <p className="text-[12px] text-[#818181] font-poppins">
              Use this to compare compensation cost between different
              departments in your organization.
            </p>
          </div>
        </div>
      </div>

      {/* Below Section */}
      <div className="grid grid-cols-4 gap-4 ">
        {/* Left Section */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* DropDown */}
          <div className="mb-2">
            <FormControl fullWidth size="small">
              <InputLabel>Select Primary Business Unit</InputLabel>
              <Select
                multiple
                value={businessUnit}
                onChange={handleBusinessUnitChange}
                label="Select Primary Business Unit"
                className="bg-white !rounded-3xl"
                renderValue={(selected) => selected.join(", ")} // Optional
              >
                <MenuItem value="Business Development">
                  Business Development
                </MenuItem>
                <MenuItem value="Data & Analytics">Data & Analytics</MenuItem>
                <MenuItem value="Design Services">Design Services</MenuItem>
                <MenuItem value="Digital Transformation Services">
                  Digital Transformation Services
                </MenuItem>
                <MenuItem value="Enterprise Service & Solutions">
                  Enterprise Service & Solutions
                </MenuItem>
                <MenuItem value="Executive Management Services">
                  Executive Management Services
                </MenuItem>
                <MenuItem value="Executive Management Teams">
                  Executive Management Teams
                </MenuItem>
                <MenuItem value="Global Marketing">Global Marketing</MenuItem>
                <MenuItem value="Human Resources">Human Resources</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Headcount */}
          <div className="bg-white p-6 rounded-xl border border-[#CCCCCC]">
            <p className="font-medium mb-2 text-[16px] font-poppins">
              Headcount
            </p>
            {[
              "Male",
              "Female",
              "Non Binary",
              "Transgender",
              "Prefer not to respond",
            ].map((g) => (
              <div key={g} className="mb-1">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2 accent-[#005377]"
                />
                <span>{g}</span>
              </div>
            ))}
          </div>

          {/* Year Data */}
          <div className="bg-white p-6 rounded-xl border border-[#CCCCCC] flex gap-3 items-center">
            <Calendar size="20" color="black" />
            <p className="font-poppins">F.Y. : - {financialYear}</p>
          </div>

          {/* Planned Compensation Cost */}
          <div className="bg-white p-6 rounded-xl border border-[#CCCCCC]">
            <p className="font-medium mb-2 text-[16px] font-poppins">
              Planned Compensation Cost
            </p>
            {[
              { label: "Fixed", color: "bg-red-500" },
              { label: "Contribution", color: "bg-blue-500" },
              { label: "Bonus", color: "bg-yellow-500" },
              { label: "Other", color: "bg-green-500" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 mb-1">
                <div className={`w-3 h-3 ${color} rounded-full`} />
                <span className="font-poppins text-[14px]">{label}</span>
              </div>
            ))}
          </div>

          {/* View Toggle */}
          <div className="bg-white p-6 rounded-xl border border-[#CCCCCC] flex gap-3 justify-between flex-col">
            <p className="font-semibold font-poppins">View</p>
            <div className="flex items-center gap-2 justify-between">
              <span className="text-sm text-gray-500 font-poppins">
                Monthly (Avg.)
              </span>
              <Switch
                checked={viewToggle}
                onChange={() => setViewToggle(!viewToggle)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#005377",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#005377",
                  },
                }}
              />
            </div>
          </div>

          {/* Comparison Type */}
          <div className="bg-white p-6 rounded-xl border border-[#CCCCCC]">
            <div className="!font-normal text-[14px] font-poppins flex flex-col ">
              <span> Planned Cost (YTD) </span>
              <span className="!text-red-600">V/S</span>
              <span> Actual Cost (YTD)</span>
            </div>
          </div>

          {/* Department Collapse */}
          <Accordion
            disableGutters
            className="!bg-white !rounded-xl !border !border-[#CCCCCC] !shadow-none"
            sx={{
              "&::before": {
                display: "none", // removes the top separator line
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="font-semibold text-[#19396F]">
                Department
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="px-6 pt-0 pb-4">
              <ul className="list-disc pl-4 text-sm text-gray-700">
                <li>Engineering</li>
                <li>Sales</li>
                <li>Marketing</li>
                <li>Operations</li>
              </ul>
            </AccordionDetails>
          </Accordion>

          {/* Location Collapse */}
          <Accordion
            disableGutters
            className="!bg-white !rounded-xl !border !border-[#CCCCCC] !shadow-none"
            sx={{
              "&::before": {
                display: "none", // removes the top separator line
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="font-semibold text-[#19396F]">
                Location
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="px-6 pt-0 pb-4">
              <ul className="list-disc pl-4 text-sm text-gray-700">
                <li>Bangalore</li>
                <li>Mumbai</li>
                <li>Indore</li>
                <li>Dubai</li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* Right Side Placeholder */}
        {businessUnit.length === 0 ? (
          <div className="col-span-3">
            <div className=" h-full flex flex-col items-center justify-center text-gray-600 text-center border border-dashed border-gray-300 rounded-xl">
              <p className="text-4xl mb-2">📊</p>
              <p>
                Select a business unit to see employee headcount, department,
                location, compensation cost, etc.
              </p>
              <p>You can select up to 3 business units to compare.</p>
            </div>
          </div>
        ) : (
          <>
            {businessUnit.map((item) => {
              return (
                <>
                  <div key={item} className="col-span-1 h-full ">
                    <Box className="bg-white rounded-xl border border-[#CCCCCC] w-full max-w-md overflow-hidden py-5 pb-10">
                      {/* Header */}

                      <Box className="flex items-center justify-between px-3">
                        <Typography className="!font-medium !text-[16px] text-[#000000] !font-poppins">
                          {item}
                        </Typography>
                        <IconButton onClick={() => onClose(item)}>
                          <CloseSquare size="24" color="#292D32" />
                        </IconButton>
                      </Box>

                      <Box className="flex flex-col w-full gap-8">

                        <Divider />

                        {/* Headcount */}
                        <Box className="px-3 flex justify-between items-center">
                          <Typography className="text-xl font-medium !font-poppins">
                            28
                          </Typography>

                          {/* Gender Stats */}
                          <Box className="flex justify-end gap-5 text-xs text-gray-500">
                            <Box className="flex flex-col items-center justify-center gap-2">
                              <Typography className="!font-poppins !text-black">
                                28
                              </Typography>
                              <MaleIcon
                                fontSize="small"
                                sx={{ color: "#5797CB" }}
                              />
                              <Typography className="!font-poppins !text-black">
                                82.1%
                              </Typography>
                            </Box>
                            <Box className="flex flex-col items-center justify-center gap-2">
                              <Typography className="!font-poppins !text-black">
                                28
                              </Typography>
                              <FemaleIcon
                                fontSize="small"
                                sx={{ color: "#5797CB" }}
                              />
                              <Typography className="!font-poppins !text-black">
                                17.9%
                              </Typography>
                            </Box>
                            <Box className="flex flex-col items-center justify-center gap-2">
                              <Typography className="!font-poppins !text-black">
                                28
                              </Typography>
                              <TransgenderIcon
                                fontSize="small"
                                sx={{ color: "#FFB27D" }}
                              />
                              <Typography className="!font-poppins !text-black">
                                0%
                              </Typography>
                            </Box>
                            <Box className="flex flex-col items-center justify-center gap-2">
                              <Typography className="!font-poppins !text-black">
                                28
                              </Typography>
                              <HelpOutlineIcon
                                fontSize="small"
                                sx={{ color: "#FF8080" }}
                              />
                              <Typography className="!font-poppins !text-black">
                                0%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Divider />

                        {/* Pie Chart Section */}
                        <Box className="px-3 ">
                          <Typography className="text-sm font-medium mb-2 !font-poppins">
                            INR 2,90,78,991
                          </Typography>
                          <Box className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={data}
                                  dataKey="value"
                                  innerRadius={50}
                                  outerRadius={70}
                                >
                                  {data.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </Box>

                          {/* Legends */}
                          <Box className="mt-4 text-xs">
                            {data.map((d, i) => (
                              <Box
                                key={i}
                                className="flex items-center gap-2 mb-1"
                              >
                                <span
                                  className="w-3 h-3 inline-block rounded !font-poppins"
                                  style={{ backgroundColor: d.color }}
                                ></span>
                                <Typography className="text-gray-700 text-sm !font-poppins">
                                  {d.value.toLocaleString()} (
                                  {(
                                    (d.value /
                                      data.reduce(
                                        (acc, val) => acc + val.value,
                                        0
                                      )) *
                                    100
                                  ).toFixed(2)}
                                  %)
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        <Divider />

                        {/* Planned vs Actual */}
                        <Box className="flex justify-between px-3 flex-col gap-5">
                          <Box>
                            <Typography className="text-xs text-gray-500 !font-poppins">
                              Planned
                            </Typography>
                            <Typography className="text-sm font-medium !font-poppins">
                              INR 2,90,78,991
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="text-xs text-gray-500 !font-poppins">
                              Actual
                            </Typography>
                            <Typography className="text-sm font-medium !font-poppins">
                              INR 2,90,78,991
                            </Typography>
                          </Box>
                          <Box className="flex justify-between items-center gap-3">
                            <Box className="flex flex-col items-start gap-2">
                            <Typography className="text-xs text-gray-500 !font-poppins">
                              Variance
                            </Typography>
                              <Typography className="text-sm font-medium !font-poppins">
                                INR 0
                              </Typography>
                            </Box>
                              <ArrowForwardIosIcon
                                fontSize="small"
                                className="text-[#062a2f]"
                              />
                            <Typography className="text-xs text-[#00BCD4] text-right !font-poppins">
                              0.00%
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />

                        {/* Footer */}
                        <Box className="flex justify-between items-center px-3">
                          <Typography className="text-sm text-Black font-medium !font-poppins flex flex-col items-center gap-3">
                            <span>Department</span> <span className="text-red-600 !text-xs">4</span> 
                          </Typography>
                          <Typography className="text-sm text-Black font-medium !font-poppins flex flex-col items-center gap-3">
                            <span>Location</span> <span className="text-red-600 !text-xs">6</span> 
                          </Typography>
                        
                        </Box>
                      </Box>
                    </Box>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Compare_Compensation;
