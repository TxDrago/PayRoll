import React, { useState, useEffect } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Card } from "@mui/material";

// Local Import
import CustomPagination from "../../../../../../../../Components/Pagination";

// Sample Data
const initialRows = [
  {
    id: 1,
    employee: "Harsh Kumar",
    empId: "20020070",
    Type: "Pay",
    Amount: "1,000",
  },
  {
    id: 2,
    employee: "Harsh Kumar",
    empId: "20020070",
    Type: "Pay",
    Amount: "1,000",
  },
  {
    id: 3,
    employee: "Harsh Kumar",
    empId: "20020070",
    Type: "Pay",
    Amount: "1,000",
  },
  {
    id: 4,
    employee: "Harsh Kumar",
    empId: "20020070",
    Type: "Pay",
    Amount: "1,000",
  },
  {
    id: 5,
    employee: "Harsh Kumar",
    empId: "20020070",
    Type: "Pay",
    Amount: "1,000",
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
const Modal_Table = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([...initialRows]);

  // ---------------------- Table -------------------
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
      field: "Type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => params.row.Type || "-",
    },
    {
      field: "Amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => params.row.Amount || "-",
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
        className="!p-5 !bg-white !rounded-lg !w-full "
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

export default Modal_Table;
