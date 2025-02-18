import React, { useEffect, useState } from "react";
import UserHeader from "../User/user/UserHeader";
import Footer from "../User/user/pages/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Red from "./Red";

import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
  } from '@mui/material';


const HomeTester = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['Username']);
    const navigate = useNavigate();
    const [recordings, setRecordings] = useState([]);
    const [audioSnimak, setAudio] = useState(false);
    const [isReported, setReported] = useState(false);


    useEffect(  () => {
        console.log(cookies.Username)
        axios.get(`http://localhost:8000/users/${cookies.Username}`)
          .then(response => {
            if(response.data.role != 'tester' && response.data.role != 'admin')
                navigate('/tester/authorization')

            console.log(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user!", error);
            navigate('/tester/authorization')
          });
      }, [cookies.Username]);


      const fetchRecordings = async () => {
        try {
            const response = await fetch(`http://localhost:8000/recordings_display`);
            const data = await response.json();
            console.log(data)
            setRecordings(data);
          } catch (error) {
            console.error('Error fetching recordings:', error);
          }
      };

      useEffect(() => {fetchRecordings()}, []);




    return (
        <Container>
        <UserHeader />
          <main style={{height: "100vh"}}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Naslov eksperimenta</TableCell>
                  <TableCell>Audio snimak</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordings.map((recording) => (
                  <Red recording={recording}></Red>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </main>
          <Footer />
    </Container>
    );
  };
  
  export default HomeTester;