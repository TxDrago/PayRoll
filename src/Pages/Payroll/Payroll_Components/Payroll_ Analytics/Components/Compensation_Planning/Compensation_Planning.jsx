import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Local Import
import CustomPagination from "../../../../../../Components/Pagination";

// Sample Data
const rows = [
  {
    id: 1,
    Upcoming_Month: "June 2025",
    Estimated_Employee_Cost: "20",
    Compensation_Cost: "INR 47,96,393",
    Fix_Pay: "INR 47,96,393",
    Bonus: "INR 20,000",
    Others: "INR 17,220",
    Final_Cost: "INR 47,96,393",
    Remark: "No Change",
  },
  {
    id: 2,
  Upcoming_Month: "June 2025",
    Estimated_Employee_Cost: "20",
    Compensation_Cost: "INR 47,96,393",
    Fix_Pay: "INR 47,96,393",
    Bonus: "INR 20,000",
    Others: "INR 17,220",
    Final_Cost: "INR 47,96,393",
    Remark: "No Change",
  },
];

// Styled Table
const StyledDataGrid = styled(DataGrid)(() => ({
  border: "1px solid #e5e7eb",
  borderRadius: "0.75rem 0.75rem 0 0",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "transparent !important",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f3f8fc  !important",
    fontWeight: 700,
    color: "#000000",
    fontSize: "13px",
  },
  "& .MuiDataGrid-cell": {
    color: "black",
    fontWeight: 500,
    fontSize: "13px",
  },
  "& .MuiDataGrid-row": {
    borderBottom: "1px solid #e5e7eb",
  },
  "& .MuiPagination-root": {
    display: "none", // hides MUI's default pagination
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none", // hides footer including pagination section
  },
  "& .MuiDataGrid-container--top [role='row'], & .MuiDataGrid-container--bottom [role='row']":
    {
      backgroundColor: "transparent",
    },
}));

// ----------------------- Drop Down Code ------------------------

// Customizing the Select icon color
const CustomSelect = styled(Select)({
  "& .MuiSelect-icon": {
    color: "#19396F", // Arrow color
  },
  "& fieldset": {
    borderColor: "#19396F", // Border color
    borderRadius: "12px", // Rounded border (xl)
  },
  "&:hover fieldset": {
    borderColor: "#19396F",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#19396F",
  },
});

const MultiSelectDropdown = ({ placeholder, options, selectedOptions, onChange }) => {
  return (
    <FormControl className="!min-w-[160px]" size="small">
      <CustomSelect
        multiple
        displayEmpty
        value={selectedOptions}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) =>
          selected.length === 0 ? (
            <span className="text-[#19396F]">{placeholder}</span>
          ) : (
            <span className="text-[#19396F]">{placeholder}</span> // show placeholder even when selected
          )
        }
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};
// Main Component
const Compensation_Planning = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //--------------------- Drop DOwn state -----------------

  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const [salary, setSalary] = useState([]);

  //------------------ Drop Down Sample Data ------------------

  const departmentOptions = [
    "Engineering",
    "Product",
    "Sales",
    "Marketing",
    "Operations",
  ];
  const locationOptions = ["Bangalore", "Mumbai", "Indore", "Delhi", "Dubai"];
  const jobRoleOptions = ["Manager", "Developer", "Designer", "Analyst", "HR"];
  const salaryOptions = ["< 5L", "5L - 10L", "10L - 20L", "> 20L"];

  // ---------------------- Table -------------------
  const columns = [
   
    {
      field: "Upcoming_Month",
      headerName: "Upcoming Month",
      flex: 1,
      renderCell: (params) => params.row.Upcoming_Month || "-",
    },
     {
      field: "Estimated_Employee_Cost",
      headerName: "Estimated Employee Cost",
      flex: 1,
      renderCell: (params) => params.row.Estimated_Employee_Cost || "-",
    },
     {
      field: "Compensation_Cost",
      headerName: "Compensation Cost",
      flex: 1,
      renderCell: (params) => params.row.Compensation_Cost || "-",
    },
     {
      field: "Fix_Pay",
      headerName: "Fix Pay",
      flex: 1,
      renderCell: (params) => params.row.Fix_Pay || "-",
    },
     {
      field: "Bonus",
      headerName: "Bonus",
      flex: 1,
      renderCell: (params) => params.row.Bonus || "-",
    },
{
      field: "Others",
      headerName: "Others",
      flex: 1,
      renderCell: (params) => params.row.Others || "-",
    },
     {
      field: "Final_Cost",
      headerName: "Final Cost",
      flex: 1,
      renderCell: (params) => {
        const Cost = params.row.Final_Cost || "-";
        const mark = params.row.Remark || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <span className="text-[#19396F] font-medium">{Cost}</span>
            <span className="text-xs text-[#818181]">{mark}</span>
          </div>
        );
      },
    },
  ];

  const filteredRows = rows.filter((row) =>
    `${row.employee} ${row.empId}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Slice rows for current page
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle pagination changes
  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset to first page
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <p className="text-[16px] font-medium text-black font-poppins">
          Compensation Planning
        </p>
      </div>

      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!p-5 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            <MultiSelectDropdown
              placeholder="Department"
              options={departmentOptions}
              selectedOptions={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <MultiSelectDropdown
              placeholder="Location"
              options={locationOptions}
              selectedOptions={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MultiSelectDropdown
              placeholder="Job Role"
              options={jobRoleOptions}
              selectedOptions={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
            <MultiSelectDropdown
              placeholder="Salary"
              options={salaryOptions}
              selectedOptions={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Search by Emp/no name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[375px] rounded-lg shadow-[0px_0px_12px_0px_rgba(0,0,0,0.16)] px-4 py-2 focus:outline-none border border-[#c9c8c8]"
          />
        </div>

        {/* Table */}
        <Box sx={{ width: "100%" }}>
          <StyledDataGrid
            rows={paginatedRows}
            columns={columns}
            autoHeight
            pageSize={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            disableSelectionOnClick
            disableColumnMenu
            pagination={false}
            hideFooterPagination
          />
        </Box>
        {/* Custom Pagination */}
        <CustomPagination
          page={page}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          rowsCount={filteredRows.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </div>
  );
};

export default Compensation_Planning;
