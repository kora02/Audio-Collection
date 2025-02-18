import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardItem from './Carditem'; 

const UserAllProjects = () => {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/experiments");
      setExperiments(response.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Svi projekti
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Pretraži..."
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary">
              Pretraži
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {experiments.map((experiment) => (
            <Grid key={experiment.id} item xs={12} sx={{ mb: 3 }}>
              <CardItem
                text={experiment.title}
                wordCount={experiment.contents.split(' ').length}
                path={`/eksperiment/${experiment.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default UserAllProjects;

