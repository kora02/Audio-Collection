import React from 'react';
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

function createData(name, wordCount, date, genre, description, users) {
    return {
      name,
      wordCount,
      date,
      genre,
      description,
      users
    };
  }


  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.wordCount}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
          <TableCell align="right">{row.genre}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
      </React.Fragment>
    );
  }
  

const rows = [
    createData(
      'Project A',
      1590,
      '2024-05-21',
      'Science Fiction',
      'This is a description of Project A.',
      [
        { name: 'User 1', dateJoined: '2024-01-10' },
        { name: 'User 2', dateJoined: '2024-02-15' },
      ]
    ),
    createData(
      'Project B',
      2370,
      '2023-11-13',
      'Fantasy',
      'This is a description of Project B.',
      [
        { name: 'User 3', dateJoined: '2023-03-20' },
        { name: 'User 4', dateJoined: '2023-07-25' },
      ]
    ),
    createData(
        'Project C',
        1800,
        '2024-09-15',
        'Mystery',
        'This is a description of Project C.',
        [
          { name: 'User 5', dateJoined: '2024-06-10' },
          { name: 'User 6', dateJoined: '2024-08-20' },
        ]
      ),
      createData(
        'Project D',
        3000,
        '2022-07-05',
        'Adventure',
        'This is a description of Project D.',
        [
          { name: 'User 7', dateJoined: '2022-04-01' },
          { name: 'User 8', dateJoined: '2022-06-15' },
        ]
      ),
  ];
  

  const TableComponent = () => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default TableComponent;

