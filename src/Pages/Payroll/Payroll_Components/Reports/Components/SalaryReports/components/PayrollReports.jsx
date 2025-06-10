import React, { useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportModal from "./Report_Modal/ReportModal";

const initialReports = [
  {
    id: 1,
    title: "ESI Monthly Statement",
    description: "View ESI Monthly Statement for the selected month.",
    favorite: true,
  },
  {
    id: 2,
    title: "PT Monthly Statement",
    description: "View PT Monthly Statement for the selected month.",
    favorite: false,
  },
  {
    id: 3,
    title: "Current CTC",
    description:
      "View current CTC breakup with all Salary Components, Bonuses...",
    favorite: false,
  },
  {
    id: 4,
    title: "Air Ticket History",
    description:
      "This report shows all air ticket booking requests along with their...",
    favorite: false,
  },
];

const PayrollReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [reports, setReports] = useState(initialReports);
  const [open, setOpen] = useState(true);

  const toggleFavorite = (id) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, favorite: !report.favorite } : report
      )
    );
  };

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Box flex={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
          Payroll Reports
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search in all reports"
            size="small"
            sx={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>


        {/* Contain */}
        <Box sx={{ width: "100%" }}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
            }}
            gap={2}
            width="100%"
          >
            {filteredReports.map((report) => (
              <Box
                key={report.id}
                sx={{
                  p: 2,
                  width: "100%",
                  minHeight: 100,
                  display: "flex",
                  // flexDirection: "column",
                  justifyContent: "space-between",
                  // flexWrap: "wrap",
                  border: "1px solid #CCCCCC",
                  borderRadius: "8px",
                  alignItems: "start",
                  gap: 1,
                  cursor:"pointer"
                }}
                onClick={() => {
                  setSelectedReport(report);
                  setOpen(true);
                }}
              >
                <Box>
                  <Typography fontWeight={600}>{report.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {report.description}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <IconButton
                    onClick={() => toggleFavorite(report.id)}
                    sx={{ p: 0 }}
                  >
                    {report.favorite ? (
                      <StarIcon sx={{ color: "#f9c314" }} />
                    ) : (
                      ""
                    )}
                  </IconButton>
                  <IconButton sx={{ p: 0 }}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {/* Report Modal */}
      <ReportModal open={open} onClose={() => setOpen(false)} report={selectedReport} />
    </>
  );
};

export default PayrollReports;
