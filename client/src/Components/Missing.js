import React from 'react'
import './Missing.css'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Missing = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Username']);
  const username = cookies.Username;

  const navigateBack = () => {
    if (username != 'Admin'){
      navigate('/user');
    } else{
      navigate('/admin');
    };
  };
  
  return (
    <div className='missing-container'>
      <div className="missing">
        <h1>Stranica ne postoji!</h1>
        <h3>Trenutna stranica je u izradi ili ne postoji.</h3>
        <Button variant="outlined" id="dugme" onClick={() => navigateBack()}>Home Page!</Button>
      </div>

    </div>
  )
}

export default Missing
