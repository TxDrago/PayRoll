import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Card,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// -------------- Icons -----------------
import { CloseSquare, Refresh2 } from "iconsax-react";

import CustomPagination from "../../../../../../../../Components/Pagination";

// ------------------- Sample Mock Data -------------------
const sampleTableData = {
  columns: [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "Name", headerName: "Tar Name", flex: 1 },
    { field: "Loan_Amount", headerName: "Preeti", flex: 1 },
    { field: "Remark", headerName: "Taxability", flex: 1 },
    { field: "Type", headerName: "Perk Type", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
  ],
  rows: [
    {
      id: 1,
      Name: "Food Allowance",
      Loan_Amount: "INR 3,000",
      Remark: "Taxable",
      Type: "Allowance",
      Status: "Active",
    },
    {
      id: 2,
      Name: "Transport",
      Loan_Amount: "INR 1,500",
      Remark: "Non Taxable",
      Type: "Allowance",
      Status: "Inactive",
    },
    {
      id: 3,
      Name: "Company Car",
      Loan_Amount: "INR 8,000",
      Remark: "Taxable",
      Type: "Asset",
      Status: "Active",
    },
    {
      id: 4,
      Name: "Mobile Bill Reimbursement",
      Loan_Amount: "INR 1,200",
      Remark: "Non Taxable",
      Type: "Reimbursement",
      Status: "Active",
    },
    {
      id: 5,
      Name: "Internet",
      Loan_Amount: "INR 800",
      Remark: "Non Taxable",
      Type: "Reimbursement",
      Status: "Inactive",
    },
  ],
};

const sampleDropdowns = [
  {
    placeholder: "Taxability",
    options: ["Taxable", "Non Taxable"],
    field: "Remark",
  },
  {
    placeholder: "Perk Name",
    options: [
      "Food Allowance",
      "Transport",
      "Company Car",
      "Mobile Bill Reimbursement",
      "Internet",
    ],
    field: "Name",
  },
  {
    placeholder: "Perk Type",
    options: ["Allowance", "Asset", "Reimbursement"],
    field: "Type",
  },
  {
    placeholder: "Status",
    options: ["Active", "Inactive"],
    field: "Status",
  },
];

// Customizing the Select icon color
const CustomSelect = styled(Select)({
  "& .MuiSelect-icon": {
    color: "#19396F", // Arrow color
  },
  "& fieldset": {
    borderColor: "#19396F", // Border color
    borderRadius: "12px", // Rounded border (xl)
  },
  "&:hover fieldset": {
    borderColor: "#19396F",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#19396F",
  },
});

// ------------------- Multi Select Dropdown -------------------
const MultiSelectDropdown = ({ placeholder, options, selected, onChange }) => (
  <FormControl size="small" sx={{ minWidth: 160 }}>
    <CustomSelect
      multiple
      displayEmpty
      value={selected}
      onChange={onChange}
      input={<OutlinedInput />}
      renderValue={(selected) =>
        selected.length === 0 ? (
          <span className="text-[#19396F]">{placeholder}</span>
        ) : (
          <span className="text-[#19396F]">{selected.join(", ")}</span>
        )
      }
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={selected.indexOf(option) > -1} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </CustomSelect>
  </FormControl>
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  height: "90vh",
  width: "90vw",
  overflowY: "auto",

  outline: "none",

  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
};

// -------------------------- Styled Table -----------------------------
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

// ------------------- Main Component -------------------
export default function ReportModal({ open, onClose, report }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate API fetch
    setColumns(sampleTableData.columns);
    setRows(sampleTableData.rows);
    setFilteredRows(sampleTableData.rows);

    setDropdowns(sampleDropdowns);
    const initialFilters = {};
    sampleDropdowns.forEach((item) => {
      initialFilters[item.placeholder] = [];
    });
    setFilters(initialFilters);
  }, []);

  useEffect(() => {
    let data = [...rows];

    dropdowns.forEach((dropdown) => {
      const selected = filters[dropdown.placeholder] || [];
      if (selected.length > 0) {
        data = data.filter((row) => selected.includes(row[dropdown.field]));
      }
    });

    if (search) {
      data = data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFilteredRows(data);
  }, [filters, search, rows]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center" 
          mb={2}
        >
          <Box>
            <Typography variant="h6" mb={1}>
              {report?.title || "No Report Selected"}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#8D8E8F" }}>
              {report?.description || "No Report Selected"}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseSquare color="#19396F" size="24" />
          </IconButton>
        </Box>

        <Divider />

        {/* Main Body */}
        <Box py={4}>
<Box  display={"flex"} justifyContent={"space-between"} gap={"8px"} alignItems={"center"}>

          {/* Drop Down */}
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            {dropdowns.map((dropdown) => (
              <MultiSelectDropdown
                key={dropdown.placeholder}
                placeholder={dropdown.placeholder}
                options={dropdown.options}
                selected={filters[dropdown.placeholder] || []}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    [dropdown.placeholder]: e.target.value,
                  })
                }
              />
            ))}
          </Box>
          {/* Button */}
          <Stack direction="row" spacing={2} justifyContent="start" mb={2}>
            {/* Calendar Button */}
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{
                borderColor: "#19396F",
                color: "#19396F",
                "&:hover": {
                  borderColor: "#152e5e",
                  backgroundColor: "#f1f5ff",
                },
                  "& .MuiButton-startIcon": {
      marginRight: "0px",
      marginLeft: "0px",
    },
              }}
              onClick={() => {
                // TODO: open calendar picker modal
                alert("Open calendar picker here");
              }}
            />

            {/* Download Button */}
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: "#19396F",
                color: "#19396F",
                "&:hover": {
                  borderColor: "#152e5e",
                  backgroundColor: "#f1f5ff",
                },
                  "& .MuiButton-startIcon": {
      marginRight: "0px",
      marginLeft: "0px",
    },
              }}
              onClick={() => {
                // Basic CSV export
                const headers = columns.map((col) => col.headerName).join(",");
                const csv = filteredRows
                  .map((row) =>
                    columns.map((col) => `"${row[col.field] ?? ""}"`).join(",")
                  )
                  .join("\n");

                const blob = new Blob([headers + "\n" + csv], {
                  type: "text/csv;charset=utf-8;",
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "report.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            />

            {/* Reset Button */}
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              color="secondary"
              onClick={() => {
                const resetFilters = {};
                dropdowns.forEach((d) => (resetFilters[d.placeholder] = []));
                setFilters(resetFilters);
                setSearch("");
              }}
                sx={{
    "& .MuiButton-startIcon": {
      marginRight: "0px",
      marginLeft: "0px",
    },
  }}
           />

            {/* Apply Button */}
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              sx={{
                backgroundColor: "#19396F",
                "&:hover": {
                  backgroundColor: "#152e5e",
                },
              }}
              onClick={() => {
                let data = [...rows];
                dropdowns.forEach((dropdown) => {
                  const selected = filters[dropdown.placeholder] || [];
                  if (selected.length > 0) {
                    data = data.filter((row) =>
                      selected.includes(row[dropdown.field])
                    );
                  }
                });
                if (search) {
                  data = data.filter((row) =>
                    Object.values(row).some((val) =>
                      String(val).toLowerCase().includes(search.toLowerCase())
                    )
                  );
                }
                setFilteredRows(data);
              }}
            >
              Apply
            </Button>
          </Stack>
</Box>

          <Card>
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
        </Box>
      </Box>
    </Modal>
  );
}
