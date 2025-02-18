import React from 'react'
import '../Missing.css'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'

const NotAuthorized = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/user');
  };
  
  return (
    <div className='missing-container'>
      <div className="missing">
        <h1>Nemate ovlaštenja testera!</h1>
        <Button variant="outlined" id="dugme" onClick={() => navigateBack()}>Vrati se nazad!</Button>
      </div>

    </div>
  )
}

export default NotAuthorized