import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
  Box,
  Card,
  Modal,
  Fade,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";

// -------------- Icons -----------------
import { CloseSquare } from "iconsax-react";

// Local Import
import CustomPagination from "../../../../../../../Components/Pagination";

// Sample Data
const rows = [
  {
    id: 1,
    employee: "Harsh Kumar",
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
    employee: "Harsh Kumar",
    empId: "20020070",
    date: "Nov 22, 2024",
    daysAgo: "3 days",
    totalDays: 4,
    leaveType: "Unpaid Leave",
    status: "Approved",
    approver: "Attendance Tracking Policy",
  },
];

// ActionMenu Component
const ActionMenu = ({ rowId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //---------------------------- Modal Open Button------------------------------------------------
  const handleDeduct = () => {
    console.log("Approved for row", rowId);
    handleMenuClose();
    setModalOpen(true);
  };

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon className="text-gray-700" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleDeduct}>Deduct Leave</MenuItem>
      </Menu>

      {/* ----------------------------  Modal -------------------------- */}

      <Modal open={modalOpen} onClose={handleClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <div className="absolute left-1/2 top-1/2 w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-6 py-4 focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between rounded-md bg-[#19396F] px-4 py-2 text-white shadow-sm">
              <Typography className="font-semibold">Deduct Leave</Typography>
              <CloseSquare
                color="white"
                className="cursor-pointer"
                onClick={handleClose}
                size="24"
              />
            </div>

            {/* Divider */}
            <div className="w-full border-b border-gray-400 mt-6"></div>

            {/* Body */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Leave Type
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#19396F] focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Leave Type
                  </option>
                  <option value="Comp Offs">
                    Comp Offs - Balance : 0.00 Days
                  </option>
                  <option value="Earned Leaves">
                    Earned Leaves - Balance : 14.00 Days
                  </option>
                  <option value="Sick Leaves">
                    Sick Leaves - Balance : 12.00 Days
                  </option>
                  <option value="Unpaid Leaves">
                    Unpaid Leaves - Balance : Infinite Leaves
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Leaves to be Deducted
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#19396F] focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Number of Leaves
                  </option>
                  <option value="1">1 Leave</option>
                  <option value="2">2 Leaves</option>
                  <option value="3">3 Leaves</option>
                </select>
              </div>
            </div>
            {/* Divider */}
            <div className="w-full border-b border-gray-400 mt-6"></div>
            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-md border border-[#19396F] px-5 py-2 text-sm font-medium text-[#19396F] font-poppins cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-[#19396F] px-5 py-2 text-sm font-medium text-white font-poppins cursor-pointer"
                onClick={() => {
                  // Add confirm logic here
                  handleClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      
    </>
  );
};

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
const NoAttendance = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // --------------------- Table ---------------------
  const columns = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      renderCell: (params) => {
        const employee = params.row.employee || "-";
        const empId = params.row.empId || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <span className="text-[#19396F] font-medium">{employee}</span>
            <span className="text-xs text-[#818181]">{empId}</span>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = params.row.date || "-";
        const daysAgo = params.row.daysAgo || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <div>{date}</div>
            <div className="text-gray-500">{daysAgo}</div>
          </div>
        );
      },
    },
    {
      field: "totalDays",
      headerName: "Total Days",
      flex: 0.7,
      renderCell: (params) => params.row.totalDays || "-",
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
      renderCell: (params) => params.row.leaveType || "-",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => params.row.status || "-",
    },
    {
      field: "approver",
      headerName: "Approver",
      flex: 1.5,
      renderCell: (params) => {
        const approver = params.row.approver || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <div className="text-gray-500">{approver}</div>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => <ActionMenu rowId={params.row.id} />,
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
          No Attendance
        </p>
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-poppins">
          Employees with 'No Attendance' on any day of the month can be seen
          below. Admin can take relevant action for such no attendance days.
        </div>
      </div>

      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!p-5 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2.5">
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "#19396FB2", textTransform: "none" }}
              className="!font-poppins !py-[10px] !px-[16px] !text-white !font-bold !text-[14px] !rounded-lg"
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#F3F8FC", textTransform: "none" }}
              className="!font-poppins !border-0 !py-[10px] !px-[16px] !text-[#807D7E] !font-bold !text-[14px] !rounded-lg"
              style={{ boxShadow: " 0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
            >
              Reject
            </Button>
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

export default NoAttendance;
