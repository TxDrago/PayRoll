import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Card,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  boxShaodowAll,
  CustomThemeButton,
  formTextFieldSelectStyle,
  tableVerticalStyle,
} from '../ComponentStyle';
import { IoEye } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import EditIco from '../../images/EditIco.png';
import deleteIco from '../../images/deleteIco.png';
import AddAnnoucment from './AddAnnoucment'
import { useDeleteAnnouncementMutation, useGetAnnouncementListQuery } from '../../Redux/Features/AnnouncementApis/AnnouncementApis';
import DeleteConfirmationDialog from '../Dialog/DeleteConfirmationDialog';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import { useSelector } from 'react-redux';
import TableError from '../Skeleton/TableError';
 
 
const Announcement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
 
  const [deleteId, setDeleteId] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [open, setOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([])
  const [isEdit, setEdit] = useState('')
  const [columnWidths, setColumnWidths] = useState({
    employee: 150,
    date: 150,
    totalDadddys: 100,
    leaveType: 150,
    status: 100,
    approver: 150,
    actions: 150,
  });
 
  const resizingColumn = useRef(null);
  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value ? dayjs(value).format('YYYY-MM-DD') : null, // Convert to formatted date
    }));
  };
 
  const { data: annoucmentRes, isSuccess: annoucmentSuccess, isError: annoucmentError, refetch } = useGetAnnouncementListQuery(`${page * 11}`)
  const [deleteData, { data: deleteRes, isSuccess: deleteSuccess, error }] = useDeleteAnnouncementMutation();
 
 
  //--------------------------------Retrieve the users array from Redux----------------------------------//
  const rolePerm = useSelector((state) => state?.roleandpermission?.data);
  const announcementPermissions = rolePerm?.data?.permission_modules['Announcement'] || [];
 
  const viewAnnouncementPermission = announcementPermissions.includes('view');
  const deleteAnnouncementPermission = announcementPermissions.includes('delete')
  const editAnnouncementPermission = announcementPermissions.includes('edit')
  const createAnnouncementPermission = announcementPermissions.includes('create')
 
 
  useEffect(() => {
    if (annoucmentSuccess && annoucmentRes) {
      setRows(annoucmentRes?.data?.data)
    }
  }, [annoucmentSuccess, annoucmentRes])
 
  const filteredRows = rows?.filter((row) => {
    const matchesFromDate = dateRange?.from
      ? moment(row?.event_date).format('YYYY-MM-DD') >= dateRange?.from
      : true;
    const matchesToDate = dateRange?.to
      ? moment(row?.event_date).format('YYYY-MM-DD') <= dateRange?.to
      : true;
    return matchesFromDate && matchesToDate;
  }
  );
 
  const totalPages = Math.ceil(filteredRows?.length / rowsPerPage);
  const paginatedRows = filteredRows?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
 
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
 
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };
 
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset to the first page
  };
 
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev?.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
 
  const handleResizeStart = (event, field) => {
    resizingColumn.current = {
      field,
      startX: event.clientX,
      startWidth: columnWidths[field],
    };
    window.addEventListener('mousemove', handleResizing);
    window.addEventListener('mouseup', handleResizeEnd);
  };
 
  const handleResizing = (event) => {
    if (!resizingColumn.current) return;
    const { field, startX, startWidth } = resizingColumn.current;
    const newWidth = startWidth + (event.clientX - startX);
    setColumnWidths((prev) => ({
      ...prev,
      [field]: Math.max(newWidth, 50), // Minimum column width
    }));
  };
 
  const handleResizeEnd = () => {
    resizingColumn.current = null;
    window.removeEventListener('mousemove', handleResizing);
    window.removeEventListener('mouseup', handleResizeEnd);
  };
 
  return (
    <>
 
 
      {/* Header */}
      <AddAnnoucment open={open} setEdit={setEdit} isEdit={isEdit} refetch={refetch} onClose={() => setOpen(false)} />
      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        onConfirm={() => {
          setDialogOpen(false);
          deleteData(deleteId);
        }}
        title="Are you sure you want to delete?"
        description="You will not be able to recover the deleted record!"
      />
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6" sx={{ fontSize: '25px', fontWeight: 600 }}>
          Announcements
        </Typography>
      </Box>
      <Card sx={[boxShaodowAll, { p: 2, mt: 3 }]}>
        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                value={dateRange?.event_date ? dayjs(dateRange?.event_date) : null}
                onChange={(date) => handleDateChange('from', date)}
                sx={{
                  '& .MuiInputBase-root': {
                    height: 40,
                    width: '165px',
                    borderRadius: '10px',
                  },
                }}
              />
              <DatePicker
                value={dateRange?.event_date ? dayjs(dateRange?.event_date) : null}
                onChange={(date) => handleDateChange('to', date)}
                sx={{
                  '& .MuiInputBase-root': {
                    height: 40,
                    width: '165px', ml: 1,
                    borderRadius: '10px',
                  },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Box>
          {createAnnouncementPermission &&
            <CustomThemeButton startIcon={<AddIcon />} onClick={() => setOpen(true)} children={"Add Announcement"} />
          }
        </Box>
 
        {/* Custom Table */}
        <TableContainer
          component={Paper}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            maxHeight: '600px',
            backgroundColor: 'rgba(243, 248, 252, 1)',
            overflowY: 'auto', // Enables vertical scrolling
          }}
        >
          <Table stickyHeader>
            <TableHead
              sx={{
                '& th': {
                  backgroundColor: 'rgba(243, 248, 252, 1)', // Set background color to red
                },
              }}
            >
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows?.length === paginatedRows?.length}
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell
                  style={{
                    width: columnWidths.approver,
 
                    whiteSpace: 'nowrap',
                    fontWeight: '700',
                  }}
                >
                  Title
                  <div
                    style={tableVerticalStyle}
                    onMouseDown={(event) =>
                      handleResizeStart(event, 'employee')
                    }
                  />
                </TableCell>
                <TableCell
                  style={{
                    width: columnWidths.approver,
                    whiteSpace: 'nowrap',
                    fontWeight: '700',
                  }}
                >
                  Event Date
                  <div
                    style={tableVerticalStyle}
                    onMouseDown={(event) =>
                      handleResizeStart(event, 'totalDays')
                    }
                  />
                </TableCell>
                <TableCell
                  style={{
                    width: columnWidths.approver,
                    whiteSpace: 'nowrap',
                    fontWeight: '700',
                  }}
                >
                  Status
                  <div
                    style={tableVerticalStyle}
                    onMouseDown={(event) =>
                      handleResizeStart(event, 'totalDays')
                    }
                  />
                </TableCell>
                <TableCell
                  style={{
                    width: columnWidths.approver,
                    whiteSpace: 'nowrap',
                    fontWeight: '700',
                  }}
                >
                  Created By
                  <div
                    style={tableVerticalStyle}
                    onMouseDown={(event) =>
                      handleResizeStart(event, 'totalDays')
                    }
                  />
                </TableCell>
                <TableCell
                  style={{
                    width: columnWidths.approver,
                    whiteSpace: 'nowrap',
                    fontWeight: '700',
                  }}
                >
                  Actions
                  <div
                    style={tableVerticalStyle}
                    onMouseDown={(event) =>
                      handleResizeStart(event, 'totalDays')
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            {
              paginatedRows?.length === 0 ? (
                <TableError />
              ) : (
                <TableBody>
                  {paginatedRows.map((row) => (
                    <TableRow key={row.id} sx={{ bgcolor: 'white' }}>
                      {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                    />
                  </TableCell> */}
                      <TableCell style={{ width: columnWidths.employee }}>
                        {row?.title}
                      </TableCell>
                      <TableCell style={{ width: columnWidths.employee }}>
                        {/* {row?.event_date ?? "--"} */}
                        {moment(row?.event_date).format("MMM DD YYYY")}
                      </TableCell>
                      <TableCell
                        style={{
                          width: columnWidths.employee,
                          textTransform: "capitalize",
                          color:
                            row?.status === "published"
                              ? "green"
                              : row?.status === "draft"
                                ? "orange"
                                : row?.status === "archived"
                                  ? "black"
                                  : row?.status === "closed"
                                    ? "red"
                                    : "inherit"
                        }}
                      >
                        {row?.status}
                      </TableCell>
 
                      <TableCell style={{ width: columnWidths.employee }}>
                        {row?.created_by?.first_name} {row?.created_by?.last_name}
                      </TableCell>
 
 
                      <TableCell>
                        <Box display={"flex"} >
                          {editAnnouncementPermission && <IconButton
                            color="primary"
                            title="Edit"
                            onClick={() => {
                              setOpen(true);
                              setEdit(row)
                            }}
                          >
                            <img
                              src={EditIco}
                              height={20}
                              alt="Edit Icon"
                            />
                          </IconButton>}
 
 
                          {deleteAnnouncementPermission && <IconButton
                            color="error"
                            title="Delete"
                            onClick={() => {
                              setDialogOpen(true);
                              setDeleteId(row?.id);
                            }}
                          >
                            <img
                              src={deleteIco}
                              height={20}
                              alt="Delete Icon"
                            />{' '}
                          </IconButton>}
 
                          <IconButton
                            title="View"
                            color="error"
                            onClick={() =>
                              navigate(`../view-announcement`, {
                                state: row,
                              })
                            }
                          >
                            <IoEye />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
          </Table>
        </TableContainer>
 
        {/* Custom Pagination */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Showing {(page - 1) * rowsPerPage + 1}-
            {Math.min(page * rowsPerPage, filteredRows?.length)} of{' '}
            {filteredRows?.length}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FormControl sx={[formTextFieldSelectStyle]}>
                <Select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  size="small"
                >
                  {[5, 10, 15].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                size="small"
                sx={{
                  border: '0.6px solid rgba(213, 213, 213, 1)',
                  bgcolor: 'rgba(250, 251, 253, 1)',
                  borderRadius: '5px',
                }}
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                <ArrowBackIos
                  sx={{ fontSize: '12px', color: 'rgba(32, 34, 36, 1)' }}
                />
              </IconButton>
              <Typography variant="body2">{page}</Typography>
              <IconButton
                sx={{
                  border: '0.6px solid rgba(213, 213, 213, 1)',
                  bgcolor: 'rgba(250, 251, 253, 1)',
                  borderRadius: '5px',
                }}
                size="small"
                variant="outlined"
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                <ArrowForwardIos
                  sx={{ fontSize: '12px', color: 'rgba(32, 34, 36, 1)' }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};
 
export default Announcement;
 