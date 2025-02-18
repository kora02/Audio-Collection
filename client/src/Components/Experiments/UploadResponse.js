import React from 'react'
import Button from '@mui/material/Button';
import {useNavigate, useParams} from 'react-router-dom'

const Response = (message) => {
  const navigate = useNavigate();
  const { status } = useParams()
  const isSuccess = status == "success" 
  
  return (
    <div className='missing-container'>
      <div className="missing">
        <h3>{isSuccess ? "Uspješno ste poslali audio snimak!" : "An error occureed!"}</h3>
        <Button variant="outlined" id="dugme" onClick={() => navigate('/user')}>Vrati se nazad!</Button>
      </div>

    </div>
  )
}

export default Response