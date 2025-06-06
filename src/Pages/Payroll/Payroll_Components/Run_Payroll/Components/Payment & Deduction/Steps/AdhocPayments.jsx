import React, { useState, useEffect } from "react";

// MUI Imports
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import {
  Button,
  Box,
  Card,
  TextField,
  Paper,
  List,
  ListItem,
  Modal,
  Fade,
  Typography,
} from "@mui/material";

import axios from "axios";

// -------------- Icons -----------------
import { Add, CloseSquare, Trash } from "iconsax-react";

// Local Import
import CustomPagination from "../../../../../../../Components/Pagination";
import Modal_Table from "./Adhoc_Modal_Table/Modal_Table";

// Sample Data
const initialRows = [
  {
    id: 1,
    employee: "Harsh Kumar",
    empId: "20020070",
    Adhoc_Pay_Type: "",
    Amount: "",
    comment: "",
  },
  {
    id: 2,
    employee: "Harsh Kumar",
    empId: "20020070",
    Adhoc_Pay_Type: "",
    Amount: "",
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
const AdhocPayments = () => {
  const [addEmp, setAddEmp] = useState(false);
  const [searchText, setSearchText] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([...initialRows]);

  const [modalOpen, setModalOpen] = useState(false);

  //---------------------------- Modal Open Button------------------------------------------------
  const handleModal = () => {
    setModalOpen(true);
  };

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setModalOpen(false);

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

  //----------------------- Table Action Icon Functions -----------------------

  const handleReject = (row) => {
    console.log("Reject clicked:", row);
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
      field: "Adhoc_Pay_Type",
      headerName: "Adhoc Payment Type",
      flex: 1,
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
    {
      field: "Amount",
      headerName: "Amount",
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
    {
      field: "Action",
      headerName: "Action",
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center gap-2 h-full">
            <Trash
              size="24"
              color="#FF5151"
              className="cursor-pointer"
              onClick={() => handleReject(params.row)}
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

  // -------------------------------------------- Sample for search drop down -----------------------------------------------

  const SearchDropdownContainer = ({ setAddEmp }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (query.trim()) {
          const fetchResults = async () => {
            try {
              const response = await axios.get(
                `https://jsonplaceholder.typicode.com/users`
              );
              const filtered = response.data.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase())
              );
              setResults(filtered);
              setShowDropdown(true);
            } catch (error) {
              console.error("Error fetching users:", error);
              setResults([]);
              setShowDropdown(false);
            }
          };

          fetchResults();
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      }, 300);

      return () => clearTimeout(delayDebounce);
    }, [query]);

    // Onclick function to set query to selected item name and close dropdown
    const handleSelect = (name) => {
      setQuery(name);
      setShowDropdown(false);
    };

    return (
      <div
        style={{ position: "relative", width: 400 }}
        className="bg-[#CCCCCC] rounded-sm !border-0 flex justify-between items-center gap-2 px-2"
      >
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          placeholder="Type to search & choose employee"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CloseSquare
          onClick={() => setAddEmp(false)}
          className="cursor-pointer"
          size="26"
          color="#989797"
        />
        {showDropdown && results.length > 0 && (
          <Paper
            elevation={3}
            style={{
              position: "absolute",
              top: "100%",
              width: "100%",
              zIndex: 10,
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            <List dense>
              {results.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSelect(item.name)}
                >
                  {item?.name ||
                    item?.title ||
                    item?.label ||
                    JSON.stringify(item)}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <p className="text-[16px] font-medium text-black font-poppins">
          Adhoc Payments
        </p>
        <div className="w-full bg-[#EBF1FF] border-2 border-[#005377] text-[#19396F] font-normal text-[16px] rounded-xl py-2 px-3 font-poppins">
          Adhoc payments that are supposed to be paid to the employees in this
          month, can be managed below.
        </div>
      </div>

      {/* Table & Actions */}
      <Card
        style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)" }}
        className="!p-5 !bg-white !rounded-lg !w-full "
      >
        <div className="flex items-center justify-between mb-6 ">
          <div className="flex gap-3 items-center justify-between">
            {addEmp === true ? (
              <SearchDropdownContainer setAddEmp={setAddEmp} />
            ) : (
              <Button
                onClick={() => setAddEmp(true)}
                variant="contained"
                size="small"
                sx={{ bgcolor: "white", textTransform: "none" }}
                className="!font-poppins !border !border-[#19396F] !py-[10px] !px-[16px] !text-[#19396F] !font-bold !text-[14px] !rounded-lg !gap-2"
              >
                <Add size="18" color="#19396F" />
                Add Employee
              </Button>
            )}
            <p className="font-poppins">OR</p>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "white", textTransform: "none" }}
              className="!font-poppins !border !border-[#19396F] !py-[10px] !px-[16px] !text-[#19396F] !font-bold !text-[14px] !rounded-lg !gap-2"
              onClick={() => setModalOpen(true)}
            >
              Import Data From Previous Month
            </Button>
            <p className="font-poppins">OR</p>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "white", textTransform: "none" }}
              className="!font-poppins !border !border-[#19396F] !py-[10px] !px-[16px] !text-[#19396F] !font-bold !text-[14px] !rounded-lg !gap-2"
            >
              Import Adhoc Payments
            </Button>
            <Button
              onClick={handleModal}
              variant="contained"
              size="small"
              sx={{ bgcolor: "white", textTransform: "none" }}
              className="!font-poppins !border !border-gray-200 !py-[10px] !px-[16px] !text-[#B44839] !font-bold !text-[14px] !rounded-lg !gap-2"
            >
              <Trash size="18" color="#B44839" variant="Bold" />
              Delete
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

      {/* ----------------------------  Modal -------------------------- */}

      <Modal open={modalOpen} onClose={handleClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <div className="absolute left-1/2 top-1/2 max-h-[90vh] overflow-y-auto w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-6 py-4 focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between rounded-md bg-white py-2 text-[#000000]">
              <Typography className="font-medium !text-[16px]">
                Import Previous Adhoc Payments
              </Typography>
              <CloseSquare
                color="#19396F"
                className="cursor-pointer"
                onClick={handleClose}
                size="24"
              />
            </div>

            {/* Body */}
            <div className="py-2">
              <Modal_Table />
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-md border border-[#005377] px-6 py-3 text-sm font-medium text-[#19396F] font-poppins cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-[#005377] px-6 py-3 text-sm font-medium text-white font-poppins cursor-pointer"
                onClick={() => {
                  // Add confirm logic here
                  handleClose();
                }}
              >
                Import
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdhocPayments;
