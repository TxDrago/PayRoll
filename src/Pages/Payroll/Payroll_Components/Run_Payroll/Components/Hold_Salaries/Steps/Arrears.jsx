import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Card, TextField, Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Local Import
import CustomPagination from "../../../../../../../Components/Pagination";

// Sample Data
const initialRows = [
  {
    id: 1,
    employee: "Harsh Kumar",
    empId: "20020070",
    doj: "10 Nov 2024",
    Amount: "",
    reason: "...............",
  },
  {
    id: 2,
    employee: "Harsh Kumar",
    empId: "20020070",
    doj: "10 Nov 2024",
    Amount: "",
    reason: "...............",
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
const Arrears = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([...initialRows]);

  //---------------------------- Handle Change ---------------------
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) || value === "") {
      setInputValues((prev) => ({
        ...prev,
        [id]: value === "" ? "" : parsedValue,
      }));
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      const value = inputValues[id] ?? "";
      const updatedRows = rows.map((row) =>
        row.id === id
          ? {
              ...row,
              Amount: value,
            }
          : row
      );
      setRows(updatedRows);

      // Optional: clear input buffer for that cell
      setInputValues((prev) => ({ ...prev, [id]: value }));
    }
  };
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
      field: "doj",
      headerName: "Date Joined",
      flex: 0.7,
      renderCell: (params) => params.row.doj || "-",
    },
    {
      field: "Amount",
      headerName: "Total Arrear Amount",
      flex: 1,
      renderCell: (params) => {
        const id = params.row.id;
        const tempValue =
          inputValues[id] !== undefined ? inputValues[id] : params.row.Amount;

        return (
          <div className="flex items-center w-full">
            <span className="mr-1">INR</span>
            <TextField
              size="small"
              variant="outlined"
              value={tempValue}
              onChange={(e) => handleInputChange(id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, id)}
              fullWidth
            />
          </div>
        );
      },
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 0.7,
      renderCell: (params) => params.row.reason || "-",
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
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <p className="text-[16px] font-medium text-black font-poppins">
          Arrears
        </p>
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-poppins">
          Employee's arrears either due to past dated revisions, salary on
          holds, LOP reversal or due to arrear LOP Recovery will be displayed
          here
        </div>
      </div>

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
        <Box sx={{ width: "100%" }}>
          <StyledDataGrid
            key={JSON.stringify(rows)}
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

export default Arrears;
