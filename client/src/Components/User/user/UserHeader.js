import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { useCookies } from "react-cookie";

const UserHeader = () => {
  const sections = [
    { title: 'Home', url: '/user' },
    { title: 'About', url: '/user/about' },
    { title: 'Ranking', url: '/user/ranking' },
    { title: 'My data', url: '/user/data' },
    {title: 'Tester', url: '/tester'}
  ];
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Username']);

  const signOut = () => {
    removeCookie("Username", { path: '/' });
    removeCookie("AuthToken", { path: '/' });
    window.location.href  = '/';
  };
  return (
    <React.Fragment>
      {/* First Toolbar for search input */}
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#2196f3', // Darker blue background color
          color: 'white', // White text color
        }}
      >
        <IconButton sx={{ color: 'inherit' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          sx={{ ml: 1, width: '300px' }} // Adjust the width here
        />
        <div style={{ flexGrow: 1 }} /> {/* Spacer */}
        
        <Button color="inherit" onClick={signOut}>
          Sign Out
        </Button>
      </Toolbar>

      {/* Navigation links */}
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0, color: 'black' }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

export default UserHeader;
