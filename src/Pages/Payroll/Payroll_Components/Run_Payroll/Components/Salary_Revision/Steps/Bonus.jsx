import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Card, TextField,Button } from "@mui/material";
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
    pay_date: "12-Jul2024",
    bonus_type: "3 days",
    amount: "INR 1.00,706",
    pay_action: "",
    comment: "",
  },
  {
    id: 2,
    employee: "Harsh Kumar",
    empId: "20020070",
    doj: "12-Jul2024",
    total_working_days: "3 days",
    salary: "INR 1.00,706",
    pay_action: "",
    comment: "",
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
const Bonus = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([...initialRows]);

  const handleChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
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
      field: "pay_date",
      headerName: "Payout Date",
      flex: 0.7,
      renderCell: (params) => params.row.pay_date || "-",
    },
    {
      field: "bonus_type",
      headerName: "Bonus Type",
      flex: 0.7,
      renderCell: (params) => params.row.bonus_type || "-",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.7,
      renderCell: (params) => params.row.amount || "-",
    },
    {
      field: "pay_action",
      headerName: "Pay Action",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full flex justify-center items-center w-full">
          <Select
            size="small"
            fullWidth
            value={params.row.pay_action || ""} // Show current value or fallback to empty
            onChange={(e) =>
              handleChange(params.row.id, "pay_action", e.target.value)
            }
            displayEmpty // Enables showing "Select" for empty values
            renderValue={(selected) => {
              if (!selected) {
                return "Select"; // Show placeholder
              }
              return selected;
            }}
          >
            <MenuItem disabled value="">
              Select
            </MenuItem>
            <MenuItem value="On Hold">On Hold</MenuItem>
            <MenuItem value="Pay">Pay</MenuItem>
            <MenuItem value="Void">Void (Never Pay)</MenuItem>
            <MenuItem value="Paid Outside">
              Paid Outside Igniculuss Payroll
            </MenuItem>
            <MenuItem value="Partially Pay">Partially Pay</MenuItem>
          </Select>
        </div>
      ),
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1.5,
      renderCell: (params) => (
        <div className="h-full flex justify-center items-center">
          <TextField
            size="small"
            variant="outlined"
            defaultValue={params.value}
          />
        </div>
      ),
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
          Bonus
        </p>
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-poppins">
          All pending bonuses to be paid (including any past unpaid bonuses)
          will be shown here. New Bonuses can also be added using ‘ Import
          Bonuses’.
        </div>
      </div>

      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!p-5 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-between mb-6 ">
          <div className="flex gap-3 items-center justify-between">
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "white", textTransform: "none" }}
              className="!font-poppins !border !border-[#19396F] !py-[10px] !px-[16px] !text-[#19396F] !font-bold !text-[14px] !rounded-lg !gap-2"
            >
              Import Bonuses
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "white", textTransform: "none" }}
              className="!font-poppins !border !border-[#19396F] !py-[10px] !px-[16px] !text-[#19396F] !font-bold !text-[14px] !rounded-lg !gap-2"
            >
              Import Bonus with Action
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

export default Bonus;
