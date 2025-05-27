import React, { useState } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Card } from "@mui/material";

// Local Import
import CustomPagination from "../../../../../../../../Components/Pagination";

//--------------- Icon Import -----------------
import { TickSquare, CloseSquare, MessageEdit } from "iconsax-react";

// Sample Data
const initialRows = [
  {
    id: 1,
    employee: "Harsh Kumar",
    empId: "20020070",
    Claim_Number: "1",
    claim_Title: "Transfer to Hogwarts",
    claim_Type: "Undefine",
    Expense_Count: "1",
    Amount: "INR 550",
    Amt_date: "Nov 20, 2024",
    Status: "Approved",
    Payable_Amount: "INR 550",
    Approved_On: "Nov 20, 2024",
    Approved_by: "by Jaya Jain",
    Reason: "Approved",
  },
  {
    id: 2,
    employee: "Harsh Kumar",
    empId: "20020070",
    Claim_Number: "1",
    claim_Type: "Transfer to Hogwarts",
    claim_Title: "Undefine",
    Expense_Count: "1",
    Amount: "INR 550",
    Amt_date: "Nov 20, 2024",
    Status: "Approved",
    Payable_Amount: "INR 550",
    Approved_On: "Nov 20, 2024",
    Approved_by: "by Jaya Jain",
    Reason: "Approved",
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
const SalaryComponentClaim = () => {
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([...initialRows]);

  const handleApprove = (row) => {
  console.log("Approve clicked:", row);
  // Your logic here
};

const handleReject = (row) => {
  console.log("Reject clicked:", row);
  // Your logic here
};

const handleEdit = (row) => {
  console.log("Edit clicked:", row);
  // Your logic here
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
      field: "Claim_Number",
      headerName: "Claim Number",
      flex: 0.7,
      renderCell: (params) => params.row.Claim_Number || "-",
    },
    {
      field: "claim_Title",
      headerName: "claim Title & Type",
      flex: 1,
      renderCell: (params) => {
        const title = params.row.claim_Title || "-";
        const type = params.row.claim_Type || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <span className="text-[#19396F] font-medium">{title}</span>
            <span className="text-xs text-[#818181]">{type}</span>
          </div>
        );
      },
    },
    {
      field: "Expense_Count",
      headerName: "Expense Count",
      flex: 0.7,
      renderCell: (params) => params.row.Expense_Count || "-",
    },
    {
      field: "Amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => {
        const claim = params.row.Amount || "-";
        const date = params.row.Amt_date || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <span className="text-[#19396F] font-medium">{claim}</span>
            <span className="text-xs text-[#818181]">{date}</span>
          </div>
        );
      },
    },

    {
      field: "Status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (params) => params.row.Status || "-",
    },
    {
      field: "Payable_Amount",
      headerName: "Payable Amount",
      flex: 0.7,
      renderCell: (params) => params.row.Payable_Amount || "-",
    },
    {
      field: "Approved_On",
      headerName: "Approved On",
      flex: 1,
      renderCell: (params) => {
        const On = params.row.Approved_On || "-";
        const by = params.row.Approved_by || "-";
        return (
          <div className="flex flex-col leading-tight items-start justify-center h-full">
            <span className="text-[#19396F] font-medium">{On}</span>
            <span className="text-xs text-[#818181]">{by}</span>
          </div>
        );
      },
    },
    {
      field: "Reason",
      headerName: "Reason",
      flex: 0.7,
      renderCell: (params) => params.row.Reason || "-",
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2 h-full">
            <TickSquare
              size="24"
              color="#23B61B"
              className="cursor-pointer"
              onClick={() => handleApprove(params.row)}
            />
            <CloseSquare
              size="24"
              color="#FF5151"
              className="cursor-pointer"
              onClick={() => handleReject(params.row)}
            />
            <MessageEdit
              size="24"
              color="#218ADE"
              className="cursor-pointer"
              onClick={() => handleEdit(params.row)}
            />
          </div>
        );
      },
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
        <p className="text-[16px] font-medium text-black font-[Poppins]">
          Salary Component Claim
        </p>
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-[Poppins]">
          All pending or approved claims (both reimbursable and reimbursement)
          that are supposed to be in this month will be displayed here.
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

export default SalaryComponentClaim;
