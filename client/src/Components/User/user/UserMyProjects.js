import React from 'react';
import { Link } from 'react-router-dom';
import CardItem from './pages/CardItem'; // Correct import
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMui from '@mui/material/Link';

const UserMyProjects = () => {
  const lista = [
    { id: 1, name: 'Text about a life', genre: 'Science', wordCount: 1200 },
    { id: 2, name: 'Text about homeless people', genre: 'Social', wordCount: 1500 },
    { id: 3, name: 'Text about religion', genre: 'Religion', wordCount: 1800 },
    { id: 4, name: 'Text about technology', genre: 'Science', wordCount: 2000 },
    { id: 5, name: 'Text about space', genre: 'Science Fiction', wordCount: 2200 },
    { id: 6, name: 'Text about love', genre: 'Novel', wordCount: 1400 },
    { id: 7, name: 'Text about history', genre: 'History', wordCount: 2300 },
    { id: 8, name: 'Text about adventure', genre: 'Fiction', wordCount: 1600 },
    { id: 9, name: 'Text about fantasy', genre: 'Fantasy', wordCount: 1900 },
    { id: 10, name: 'Text about health', genre: 'Health', wordCount: 2100 },
    { id: 11, name: 'Text about science', genre: 'Science', wordCount: 2400 },
    { id: 12, name: 'Text about politics', genre: 'Politics', wordCount: 1700 },
    { id: 13, name: 'Text about economy', genre: 'Economics', wordCount: 2600 },
    { id: 14, name: 'Text about education', genre: 'Education', wordCount: 2800 },
    { id: 15, name: 'Text about philosophy', genre: 'Philosophy', wordCount: 3000 },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Moji projekti
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {lista.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} sx={{ mb: 3 }}>
              {/* Add margin-bottom of 3 (24px) on all screens */}
              <CardItem
                text={item.name}
                genre={item.genre}
                wordCount={item.wordCount}
                path='/user/info'
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default UserMyProjects;
