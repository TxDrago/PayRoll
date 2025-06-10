import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import {
  MenuItem,
  Box,
  Card,
  Typography,
  Menu,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

// Local Import
import CustomPagination from "../../../../../../Components/Pagination";

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
const LeaveAdvance_Settings = () => {
  const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    if (action === "Edit") {
      console.log("Cancel row:", selectedRow);
        setOpen(true);
    } else if (action === "Delete") {
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
      renderCell: (params) => params.row.Name,
    },
    {
      field: "Loan_Amount",
      headerName: "Advance Per Day",
      flex: 1,
      renderCell: (params) => params.row.Loan_Amount,
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Header */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "18px",
                  }}
                >
                  Leave advance policy
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    color: "#818181",
                  }}
                >
                  Here is the list of leave advance policies. Leave advance is
                  an amount received for a period of leave availed by an
                  employee
                </Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => setOpen(true)}
                  sx={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    fontFamily: "Poppins",
                    borderRadius: "8px",
                    backgroundColor: "#003049",
                    color: "#fff",
                    textTransform: "none",
                    fontSize: "0.875rem", // text-sm
                    px: 4,
                    py: 2,
                    "&:hover": {
                      backgroundColor: "#00263b",
                    },
                    cursor: "pointer",
                  }}
                >
                  <span>Add Advance Policy</span>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Table & Actions */}
      <Card
        sx={{
          p: 5,
          bgcolor: "white",
          borderRadius: "12px",
          width: "100%",
          boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            mb: 6,
          }}
        >
          <TextField
            type="text"
            placeholder="Search......"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            sx={{
              width: 375,
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& fieldset": {
                borderColor: "#c9c8c8",
              },
            }}
          />
        </Box>

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

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={() => handleMenuClick("Edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleMenuClick("Edit")}>
            Set as Default
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Delete")}>
            Delete Policy
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
      {/* Add and Edit Modal */}
      <LeaveEncashment_Modal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default LeaveAdvance_Settings;
