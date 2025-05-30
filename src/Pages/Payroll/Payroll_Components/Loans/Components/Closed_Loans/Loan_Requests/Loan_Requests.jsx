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
  Typography,
  Menu,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { FaCloudDownloadAlt } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

// Local Import
import CustomPagination from "../../../../../../Components/Pagination";
import Edit_Loan_Modal from "./EditLoanModal/Edit_Loan_Modal";

// Sample Data
const rows = [
  {
    id: 1,
    Name: "Raj Gurjar",
    Loan_Amount: "INR 3,00,000",
    Loan_Type: "Home Loan",
    Outstanding_Amount: "INR 3,00,000",
    Disbursal_Mode: "Igniculuss Payroll",
    Disbursal_Date: "May, 2025",
    EMI_Amount: "INR 1,01,250",
    Remaining_EMI: 3,
    Total_EMI: 3,
    EMI_Start: "Jan 01, 2025",
    Remark: "In Progress", // used as status
  },
  {
    id: 2,
    Name: "Raj Gurjar",
    Loan_Amount: "INR 3,00,000",
    Loan_Type: "Home Loan",
    Outstanding_Amount: "INR 3,00,000",
    Disbursal_Mode: "Igniculuss Payroll",
    Disbursal_Date: "May, 2025",
    EMI_Amount: "INR 1,01,250",
    Remaining_EMI: 3,
    Total_EMI: 3,
    EMI_Start: "Jan 01, 2025",
    Remark: "Not Started",
  },
  {
    id: 3,
    Name: "Raj Gurjar",
    Loan_Amount: "INR 3,00,000",
    Loan_Type: "Home Loan",
    Outstanding_Amount: "INR 3,00,000",
    Disbursal_Mode: "Igniculuss Payroll",
    Disbursal_Date: "May, 2025",
    EMI_Amount: "INR 1,01,250",
    Remaining_EMI: 3,
    Total_EMI: 3,
    EMI_Start: "Jan 01, 2025",
    Remark: "Not Started",
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

// --------------------- Drop Down ---------------
const MultiSelectDropdown = ({
  placeholder,
  options,
  selectedOptions,
  onChange,
}) => {
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
const Loan_Requests = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //--------------------- Drop DOwn state -----------------

  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);

  //------------------ Drop Down Sample Data ------------------

  const departmentOptions = [
    "Engineering",
    "Product",
    "Sales",
    "Marketing",
    "Operations",
  ];
  const locationOptions = ["Bangalore", "Mumbai", "Indore", "Delhi", "Dubai"];
  const CategoriesOptions = [
    "Manager",
    "Developer",
    "Designer",
    "Analyst",
    "HR",
  ];
  const StatusOptions = ["In Progress", "Not Started"];

  // ---------------------- Table option Drop Down Fuction --------------------

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleMenuClick = (action) => {
    if (action === "Approve") {
      setOpen(true);
    } else if (action === "Reject") {
      console.log("Cancel row:", selectedRow);
    }
    handleMenuClose();
  };

  // ---------------------- Table -------------------
  const columns = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col leading-tight items-center">
          <span className="text-sm font-medium text-black">
            {params.row.Name}
          </span>
          <span className="text-xs text-[#888]">#LN-7839</span>
        </div>
      ),
    },
    {
      field: "Loan_Amount",
      headerName: "Loan Amount",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col leading-tight items-center">
          <span>{params.row.Loan_Amount}</span>
          <span className="text-xs text-[#888]">{params.row.Loan_Type}</span>
        </div>
      ),
    },
    {
      field: "Outstanding_Amount",
      headerName: "Outstanding Amount",
      flex: 1,
      renderCell: (params) => params.row.Outstanding_Amount,
    },
    {
      field: "Disbursal_Mode",
      headerName: "Disbursal Mode",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col leading-tight items-center">
          <span>{params.row.Disbursal_Mode}</span>
          <span className="text-xs text-[#818181]">
            {params.row.Disbursal_Date}
          </span>
        </div>
      ),
    },
    {
      field: "EMI_Amount",
      headerName: "EMI Amount",
      flex: 1,
      renderCell: (params) => params.row.EMI_Amount,
    },
    {
      field: "Remaining_EMI",
      headerName: "Remaining EMI Terms",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span>{params.row.Remaining_EMI}</span>
          <span className="text-xs text-[#888]">
            Out of {params.row.Total_EMI}
          </span>
        </div>
      ),
    },
    {
      field: "EMI_Start",
      headerName: "EMI Deduction Start",
      flex: 1,
      renderCell: (params) => params.row.EMI_Start,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.Remark;
        const color =
          status === "In Progress"
            ? "bg-[#C7F6CD] text-[#28A745]"
            : "bg-[#FFE3E3] text-[#D32F2F]";
        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${color}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
          <PiDotsThreeOutlineVerticalLight size={24} />
        </IconButton>
      ),
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
      {/* ---------------------------------- Edit Modal ---------------------------- */}
      <Edit_Loan_Modal open={open} onClose={() => setOpen(false)} />
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <Box className="flex justify-between items-center  gap-3">
          <Box className="flex flex-col gap-1.5">
            <Typography className="!font-poppins !font-semibold !text-lg">
              Loan Requests
            </Typography>
            <Typography className="font-poppins !text-[16px] text-[#818181]">
              These are the Loan Requests
            </Typography>
          </Box>
          <Box>
            <button className="flex gap-2 items-center !font-poppins !rounded-lg !bg-[#003049] !text-white !text-sm !normal-case hover:bg-[#00263b] px-6 py-3 cursor-pointer">
              <FaCloudDownloadAlt color="white" />
              <span>Download</span>
            </button>
          </Box>
        </Box>
      </div>

      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!p-5 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            <MultiSelectDropdown
              placeholder="Categories"
              options={CategoriesOptions}
              selectedOptions={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
            <MultiSelectDropdown
              placeholder="Location"
              options={locationOptions}
              selectedOptions={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MultiSelectDropdown
              placeholder="Department"
              options={departmentOptions}
              selectedOptions={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <MultiSelectDropdown
              placeholder="Status"
              options={StatusOptions}
              selectedOptions={status}
              onChange={(e) => setStatus(e.target.value)}
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
        {/* Table Menu Component */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            className: "!rounded-2xl !p-0",
            sx: {
              overflow: "visible",
              borderRadius: "1.5rem",
            },
          }}
        >
          <MenuItem
            onClick={() => handleMenuClick("Approve")}
            className="!text-black hover:!bg-[#005377] hover:!text-white !rounded-2xl "
          >
            Approve
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("cancel")}
            className="!text-black hover:!bg-[#005377] hover:!text-white !rounded-2xl"
          >
            Reject
          </MenuItem>
        </Menu>

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

export default Loan_Requests;
