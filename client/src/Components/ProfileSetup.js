import React, { useEffect, useState } from 'react'
import './ProfileSetup.css'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { BsBorder } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {useCookies} from 'react-cookie'
import Cookies from 'js-cookie';


function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'gold'
                  }
                }}variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

const ProfileSetup = () => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [placeOfResidence, setPlaceOfResidence] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [institutionCity, setInstitutionCity] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Username'])
    const navigate = useNavigate();


    const handleClick = () => {
        if (stage === 0) {
            setStage(1);
            setProgress(50);
        } else {
            setStage(0);
            setProgress(0); 
        }
      };


      const handleProfileSetup = async (e) => {
        e.preventDefault();
        const token = Cookies.get('AuthToken');
        
        try {
        const response = await axios.put("http://localhost:8000/user/new/data", {
          place_of_birth: placeOfBirth,
          place_of_residence: placeOfResidence,
          institution_city: institutionCity,
          institution_name: institutionName,
          first_name: name,
          last_name: lastName
              }, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    
                  }
              });
    
        console.log(response)
        if (response.status === 200){
          navigate('/user');
        }
    
        } catch (error) {
            console.error("Failed:", error);
        }
    
    };

  return (
    <div className='setup-container'>
        <div className="profile-setup">

            <div className="container-title">
                <h1 className="title">
                    Postavljanje profila
                </h1>
                <div className="progress-bar">
                    <LinearProgressWithLabel value={progress} />
                </div>
            </div>
            <div className="container-body">

            {stage === 0 && (
                <div className="first-part-container">
                    <TextField defaultValue={name} onChange={(e) => setName(e.target.value)}   style={{
                                        width: "50%",
                                        marginLeft: "20px",
                                        
                                        placeSelf: "center"
                                        }} id="info-input" label="Ime" variant="standard" />
                    <TextField defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} style={{
                                        width: "50%",
                                        marginLeft: "20px",
                                        placeSelf: "center"
                                        }} id="info-input" label="Prezime" variant="standard" />

                    <FormControl variant="standard" style={{
                                        width: "40%",
                                        marginLeft: "20px",
                                        placeSelf: "center"
                                        }} sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Odaberite Spol</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="info-input"
                        label="Odaberite Spol"
                        defaultValue={gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                        <MenuItem value={true}>Muško</MenuItem>
                        <MenuItem value={false}>Žensko</MenuItem>

                        </Select>
                    </FormControl>

                    <TextField
                      id="datetime-local"
                      label="Datum rođenja"
                      type="datetime-local"
                      defaultValue={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      style={{
                        width: "50%",
                        marginLeft: "20px",
                        placeSelf: "center"
                        }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <Button variant="outlined" id="dugme" onClick={() => handleClick()}>Dalje</Button>
                </div>
)}


            {stage === 1 && (
                <div className="second-part-container"> 
                    <TextField defaultValue={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} style={{
                                        width: "50%",
                                        placeSelf: "center"
                                        }} id="info-input" label="Mjesto Rođenja" variant="standard" />

                    <TextField defaultValue={placeOfResidence} onChange={(e) => setPlaceOfResidence(e.target.value)} style={{
                                        width: "50%",
                                        placeSelf: "center"
                                        }} id="info-input" label="Mjesto Stanovanja" variant="standard" />

                    <TextField defaultValue={institutionName} onChange={(e) => setInstitutionName(e.target.value)} style={{
                                        width: "50%",
                                        placeSelf: "center"
                                        }} id="info-input" label="Naziv Institucije" variant="standard" />

                    <TextField defaultValue={institutionCity} onChange={(e) => setInstitutionCity(e.target.value)} style={{
                                        width: "50%",
                                        placeSelf: "center"
                                        }} id="info-input" label="Mjesto Institucije" variant="standard" />                                        

                    <div className="grupa-dugmadi">
                        <Button variant="outlined" id="dugmeNazad" onClick={() => handleClick()}>Nazad</Button>
                        <Button variant="outlined" id="dugme" onClick={(e) => handleProfileSetup(e)}>Završi Postavljanje Profila</Button>
                    </div>
                    
                </div>

)}
            </div>
            
        </div>
      
    </div>
  )
}

export default ProfileSetup
