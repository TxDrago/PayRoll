import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import {
  Select,
  MenuItem,
  Box,
  Card,
  Typography,
  Menu,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

// Local Import
import CustomPagination from "../../../../../../Components/Pagination";
import AddPerkModal from "./Components/AddPerkModal";

// Sample Data
const rows = [
  {
    id: 1,
    Name: "Food",
    Loan_Amount: "INR 3,00,000",
    Loan_Type: "Home Loan",
    Outstanding_Amount: "INR 3,00,000",
    Disbursal_Mode: "Igniculuss Payroll",
    Disbursal_Date: "May, 2025",
    EMI_Amount: "1",
    Remaining_EMI: 3,
    Total_EMI: 3,
    EMI_Start: "Jan 01, 2025",
    Remark: "Taxable", // used as status
  },
  {
    id: 2,
    Name: "Food",
    Loan_Amount: "INR 3,00,000",
    Loan_Type: "Home Loan",
    Outstanding_Amount: "INR 3,00,000",
    Disbursal_Mode: "Igniculuss Payroll",
    Disbursal_Date: "May, 2025",
    EMI_Amount: "2",
    Remaining_EMI: 3,
    Total_EMI: 3,
    EMI_Start: "Jan 01, 2025",
    Remark: "Non Taxable",
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



// Main Component
const Perks = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [open, setOpen] = useState(true);



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
      console.log("Approve");
      
    } else if (action === "Reject") {
      console.log("Cancel row:", selectedRow);
    }
    handleMenuClose();
  };

  // ---------------------- Table -------------------
  const columns = [
    {
      field: "Name",
      headerName: "Perk Name",
      flex: 1,
      renderCell: (params) => params.row.Name
    },
    {
      field: "Loan_Amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => params.row.Loan_Amount
    },
   
    {
      field: "EMI_Amount",
      headerName: "EMI Amount",
      flex: 1,
      renderCell: (params) => params.row.EMI_Amount,
    },
    {
      field: "Remaining_EMI",
      headerName: "Taxable mount",
      flex: 1,
      renderCell: (params) => params.row.Total_EMI
    },
     {
      field: "Status",
      headerName: "Taxability",
      flex: 1,
      renderCell: (params) =>  params.row.Remark
    },
     {
      field: "EMI_Amount",
      headerName: "Employees Assigned",
      flex: 1,
      renderCell: (params) => params.row.EMI_Amount,
    },
    {
      field: "EMI_Start",
      headerName: "EMI Deduction Start",
      flex: 1,
      renderCell: (params) => params.row.EMI_Start,
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
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <Box className="flex justify-between items-start flex-col  gap-6">
          <Typography className="!font-poppins !font-semibold !text-lg">
            Perks & Employee Assignment
          </Typography>
          <Box className="flex w-full justify-between items-center gap-6">
            <Box className="flex flex-col gap-1.5">
              <Typography className="!font-poppins !font-medium !text-[16px]">
                Perks
              </Typography>
              <Typography className="font-poppins !text-[16px] text-[#818181]">
                Perquisites are non-wage compensation/benefit provided to
                employees in addition to their normal wages or salaries
              </Typography>
            </Box>
            <Box>
              <button
              onClick={()=>setOpen(true)}
              className="flex gap-2 items-center !font-poppins !rounded-lg !bg-[#003049] !text-white !text-sm !normal-case hover:bg-[#00263b] px-6 py-3 cursor-pointer">
                <span>Add Perks</span>
              </button>
            </Box>
          </Box>
        </Box>
      </div>

      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!p-5 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-end mb-6">
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
      {/* -------------------------------------- Modal -------------------------------------------- */}
      <AddPerkModal open={open} onClose={() => setOpen(false)} />;
    </div>
  );
};

export default Perks;
