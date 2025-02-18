import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import './Experiment.css';
import UserHeader from '../User/user/UserHeader';
import Footer from '../User/user/pages/Footer';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SendIcon from '@mui/icons-material/Send';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const ActionButton = styled(Button)({
  margin: '10px',
});

const Experiment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [cookies, setCookie] = useCookies(['AuthToken']);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/experiments/${id}`)
      .then(response => {
        setExperiment(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the experiment!", error);
      });
  }, [id]);

  const startRecording = async () => {
    console.log(cookies.AuthToken);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      setAudioBlob(event.data);
      setAudioURL(URL.createObjectURL(event.data));
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleAudioUpload = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    
    try {
      const response = await axios.post(`http://localhost:8000/upload-audio/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies.AuthToken}`
        }
      });
    
      handleDatabaseUpload(response.data["data"]);
    
    } catch (error) {
      console.error("There was an error uploading the audio!", error);
      navigate('/eksperiment/status/error')
    }
  };
    
  const handleDatabaseUpload = async (result) => {
    try {
      await axios.post(`http://localhost:8000/recordings`, result);

      navigate('/eksperiment/status/success')
      
    } catch (error) {
      console.error("There was an error uploading to the database!", error);
      navigate('/eksperiment/status/error')
    }
  };

  return (
    <div>
      <UserHeader />
      <main className='m-container'>
      <Grid container alignItems="flex-start" justifyContent="space-between" spacing={2}>
      <Grid item xs={9}>
      <section className='title'>{experiment.title}</section>
      </Grid>
      <Grid item xs={3}  style={{ textAlign: 'right' }}>
      <ActionButton variant='contained' color={isRecording ? 'secondary' : 'primary'} startIcon={isRecording ? <StopIcon /> : <MicIcon />}
  onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </ActionButton>
      <ActionButton variant='contained' color='primary' startIcon={<SendIcon />} disabled={!audioURL} onClick={handleAudioUpload}>Send Recording</ActionButton>
      </Grid>
      </Grid>
      <section className='text-container'>
        <div className='text'>{experiment.contents} </div>
      </section>
    </main>
    <Footer />
    </div>
  );
};

export default Experiment;


