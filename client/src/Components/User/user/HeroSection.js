import React from "react";
import { Link } from 'react-router-dom';
import '../../../App';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const HeroSection = () => {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('/images/img-1.jpg')`, // Update the image path
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
        marginTop: '20px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xs={10} md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              textAlign: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{
                fontSize: '70px',
                marginTop: '-150px',
                '@media screen and (max-width: 768px)': {
                  fontSize: '50px',
                  marginTop: '-100px',
                },
              }}
            >
              Tone Tracker
            </Typography>
            <div className='hero-btns'>
              <Link to='/user/all-projects' className='btn-mobile' sx={{ mr: 2 }}>
                <button className='btn btn--outline btn--large'>
                  PRONAĐI NOVE PROJEKTE
                </button>
              </Link>
              <Link to='/user/my-projects' className='btn-mobile'>
                <button className='btn btn--outline btn--large'>
                  MOJI PROJEKTI
                </button>
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HeroSection;
