import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const obrisi = async (id, onDeletionComplete) => {
  try {
    const response = await axios.delete("http://localhost:8000/deleteUser", {
      params: { del_id: id },
      headers: { 'Content-Type': 'application/json' }
    });

    
    onDeletionComplete();
  } catch (error) {
    console.error('Error during deletion:', error);
  }
};

const demovisi = async(id, onDemotionComplete) => {
  try {
    const response = await axios.put(`http://localhost:8000/demoteUser?dem_id=${id}`, null, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.data);

    onDemotionComplete();
  } catch (error) {
    console.error('Error during demotion:', error);
  }
};

const Row = ({ row, onDeleteProject }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async () => {
    await demovisi(row.id, onDeleteProject);
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    await obrisi(row.id, onDeleteProject);
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{row.username}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="edit" size="small" onClick={handleEdit}>
            Snizi na User-a
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Da li ste sigurni?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Da li ste sigurni da želite obrisati korisnika?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ne
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const Testers = () => {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getTesters", {
        params: { skip: 0, limit: 20 },
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = response.data;
      setProjects(jsonData); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setProjects([]); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleDeleteProject = async () => {
    await fetchData(); 
  };

  return (
    <div className='main-container'>
      <div className='listContainer'>
        <div className='listTitle'>Testeri</div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Broj Strike-ova</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row) => (
                <Row key={row.id} row={row} onDeleteProject={handleDeleteProject} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Testers;
