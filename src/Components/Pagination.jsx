import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const CustomPagination = ({
  page,
  totalPages,
  rowsPerPage,
  rowsCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePreviousPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Showing {(page - 1) * rowsPerPage + 1}-
        {Math.min(page * rowsPerPage, rowsCount)} of {rowsCount}
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <FormControl sx={{ minWidth: 70, padding: 0, height: 30 }}>
          <Select
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            sx={{
              height: 30,
              // Adjust padding to vertically center the text
              padding: "0 10px",
              // Remove minHeight if set by default
              minHeight: "unset",
              // For the select input element inside Select
              "& .MuiSelect-select": {
                height: 30,
                display: "flex",
                alignItems: "center",
                padding: 0,
              },
            }}
          >
            {[5, 10, 15].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={handlePreviousPage}
            disabled={page === 1}
            sx={{
              border: "0.6px solid rgba(213, 213, 213, 1)",
              bgcolor: "rgba(250, 251, 253, 1)",
              borderRadius: "5px",
              width: "30px",
              height: "30px",
            }}
          >
            <ArrowLeft2 size={20} color="black" />
          </IconButton>

          <Typography variant="body2" className="!text-[14px] !font-bold">
            {page}
          </Typography>

          <IconButton
            onClick={handleNextPage}
            disabled={page === totalPages}
            sx={{
              border: "0.6px solid rgba(213, 213, 213, 1)",
              bgcolor: "rgba(250, 251, 253, 1)",
              borderRadius: "5px",
              width: "30px",
              height: "30px",
            }}
          >
            <ArrowRight2 size={20} color="black" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomPagination;
