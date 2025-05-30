import React, { useState, useEffect } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Card } from "@mui/material";

// Local Import
import CustomPagination from "../../../../../../Components/Pagination";

// Sample Data
const initialRows = [
  {
    id: 1,
    employee: "Harsh Kumar",
    empId: "20020070",
    Type: "Pay",
    Amount: "1,000",
    salary: "₹50,000",
    inProgress: 1,
    repaidLoans: 2,
    employeeSince: "2021-06-01",
    inProbation: "Yes",
    inNoticePeriod: "No",
  },
  {
    id: 2,
    employee: "Aarav Singh",
    empId: "20020110",
    Type: "Pay",
    Amount: "900",
    salary: "₹48,000",
    inProgress: 0,
    repaidLoans: 1,
    employeeSince: "2022-01-15",
    inProbation: "No",
    inNoticePeriod: "No",
  },
  {
    id: 3,
    employee: "Meera Sharma",
    empId: "20020300",
    Type: "Pay",
    Amount: "1,100",
    salary: "₹55,000",
    inProgress: 2,
    repaidLoans: 0,
    employeeSince: "2023-09-20",
    inProbation: "Yes",
    inNoticePeriod: "No",
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
const Loan_Modal_Table = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([...initialRows]);

  // ---------------------- Table -------------------
  const columns = [
 
  {
    field: "salary",
    headerName: "Salary",
    flex: 1,
    renderCell: (params) => params.row.salary || "-",
  },
  {
    field: "loanStatus",
    headerName: "In Progress | RePaid Loans",
    flex: 1.2,
    renderCell: (params) => {
      const inProgress = params.row.inProgress ?? "-";
      const repaid = params.row.repaidLoans ?? "-";
      return (
        <span>
          {inProgress} | {repaid}
        </span>
      );
    },
  },
  {
    field: "employeeSince",
    headerName: "Employee Since",
    flex: 1,
    renderCell: (params) => {
      const date = params.row.employeeSince;
      return date ? new Date(date).toLocaleDateString("en-IN") : "-";
    },
  },
  {
    field: "inProbation",
    headerName: "In Probation",
    flex: 1,
    renderCell: (params) => params.row.inProbation || "-",
  },
  {
    field: "inNoticePeriod",
    headerName: "In Notice Period",
    flex: 1,
    renderCell: (params) => params.row.inNoticePeriod || "-",
  },
];


  // ------------------ Search Bar --------------
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
      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!py-3 px-1 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-end mb-6 ">
          <input
            type="text"
            placeholder="Search by Emp/no name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[375px] rounded-lg shadow-[0px_0px_12px_0px_rgba(0,0,0,0.16)] px-4 py-2 focus:outline-none border border-[#c9c8c8]"
          />
        </div>

        {/* Table */}
        <Box sx={{ width: "100%", height: 180, overflow: "auto" }}>
          <StyledDataGrid
            rows={paginatedRows}
            columns={columns}
            pageSize={rowsPerPage}
            hideFooterPagination
            disableSelectionOnClick
            disableColumnMenu
            autoHeight={false} // Important: disable autoHeight to allow scrolling
            rowHeight={32} // Optional: adjust row height for compact display
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

export default Loan_Modal_Table;
