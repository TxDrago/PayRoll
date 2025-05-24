import React from "react";
import { useState } from 'react';


// ----------------- MUI Imports --------------
import { DataGrid } from "@mui/x-data-grid";
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
  TextField,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ---------------- Sample Data -----------------
const sampleRows = [
  {
    id: 1,
    employeeName: "Harsh Kumar",
    empId: "20020070",
    date: "Nov 22, 2024",
    daysAgo: "3 days",
    totalDays: 4,
    leaveType: "Unpaid Leave",
    status: "Approved",
    approver: "Attendance Tracking Policy",
  },
  {
    id: 2,
    employeeName: "Harsh Kumar",
    empId: "20020070",
    date: "Nov 22, 2024",
    daysAgo: "3 days",
    totalDays: 4,
    leaveType: "Unpaid Leave",
    status: "Approved",
    approver: "Attendance Tracking Policy",
  },
];

const LeaveApplied = () => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  // -------------------- Menu Funtionality ------------------

  // Menu Open -->
  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };
  // Menu Close -->
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  // ------------------ Search Bar Filter -------------------
  const filteredRows = sampleRows.filter((row) =>
    `${row.employeeName} ${row.empId}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // ----------------------- Table --------------------------
  const columns = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1.2,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="text-blue-600 font-medium">
            {params.row.employeeName}
          </span>
          <span className="text-xs text-gray-600">{params.row.empId}</span>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col">
          <span>{params.row.date}</span>
          <span className="text-xs text-gray-500">{params.row.daysAgo}</span>
        </div>
      ),
    },
    {
      field: "totalDays",
      headerName: "Total Days",
      flex: 0.7,
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "approver",
      headerName: "Approver",
      flex: 1.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.id)}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          {menuRowId === params.id && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>Approve</MenuItem>
              <MenuItem onClick={handleMenuClose}>Reject</MenuItem>
            </Menu>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <div className="w-full flex flex-col gap-6">
        <p className="text-[16px] font-medium text-black font-[Poppins]">
          Leave Applied
        </p>
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-[Poppins]">
          All leave (approved or pending) that falls under this payroll cycle
          month will be displayed here.
        </div>
      </div>
      {/* Body and Table Section */}
      <div className="p-6 bg-white rounded-md w-full" >
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "#004C74" }}
            >
              Approve
            </Button>
            <Button variant="outlined" size="small">
              Reject
            </Button>
          </div>
          <TextField
            size="small"
            placeholder="Search by Emp/no name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              sx: { borderRadius: "8px", backgroundColor: "#f9f9f9" },
            }}
          />
        </div>

        {/* Table */}
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
            pagination
          />
        </Box>
      </div>
    </div>
  );
};

export default LeaveApplied;
