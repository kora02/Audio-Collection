import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AllProjects } from './data'; // Import AllProjects from data.js

function createData(name, wordCount, date, genre, description, users, status) {
  return {
    name,
    wordCount,
    date,
    genre,
    description,
    users,
    status,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  // Define the color based on the status
  let statusColor = '';
  switch (row.status) {
    case 'Urađen':
      statusColor = 'blue';
      break;
    case 'Aktivan':
      statusColor = 'green';
      break;
    case 'Neaktivan':
      statusColor = 'red';
      break;
    default:
      statusColor = '';
  }

  const handleEdit = () => {
    navigate('/admin/form'); // Navigate to /admin/form
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    // Add logic to handle delete action
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.wordCount}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.genre}</TableCell>
        <TableCell align="right" style={{ color: statusColor }}>
          {row.status}
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="edit" size="small" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Opis Projekta
              </Typography>
              <Typography variant="body2" gutterBottom>
                {row.description}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Users
              </Typography>
              <Table size="small" aria-label="users">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Date Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.users.map((user) => (
                    <TableRow key={user.name}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.dateJoined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Table2 = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Word Count</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Status</TableCell> {/* Add status column */}
            <TableCell align="right">Actions</TableCell> {/* Add actions column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {AllProjects.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Table2;
