import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import Header from '../UserHeader';
import Footer from './Footer';

const Ranking = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user_ranking`);
      const data = await response.json();
      console.log(data)
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
        <Header />
          <main style={{height: "100vh"}}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </main>
          <Footer />
    </Container>
  );


};
export default Ranking;