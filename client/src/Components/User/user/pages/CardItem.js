import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardItem = ({ text, genre, wordCount, path }) => {
  return (
    <li style={{ // Add inline style for the list item
      display: 'flex',
      flex: '1 1 calc(50% - 2rem)', // Make each card 50% of the container width with some margin
      margin: '0 1rem',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 6px 20px rgba(56, 125, 255, 0.17)',
      overflow: 'hidden',
      textDecoration: 'none',
      marginBottom: '2rem', // Added margin bottom for spacing
      minWidth: '300px', // Set a minimum width for the cards
    }}>
      <Link style={{ // Add inline style for the Link
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        textDecoration: 'none',
      }} to={path}>
        <Card sx={{ // Use MUI's sx prop for Card styling
          display: 'flex',
          height: '100%',
        }}>
          <CardContent sx={{ // Use MUI's sx prop for CardContent styling
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
            color: '#252e48',
          }}>
            <Typography component="h2" variant="h5" sx={{ // Use MUI's sx prop for Typography styling
              fontSize: '18px',
              lineHeight: '24px',
              marginBottom: '10px',
            }}>
              {text}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ // Use MUI's sx prop for Typography styling
              fontSize: '14px',
              marginTop: '5px',
            }}>
              Genre: {genre}
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ // Use MUI's sx prop for Typography styling
              fontSize: '14px',
              marginTop: '5px',
            }}>
              Word Count: {wordCount}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};

export default CardItem;
