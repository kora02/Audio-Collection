import React from "react";
import { useState } from "react";
import axios from "axios";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
  } from '@mui/material';



function Red({recording}) {
    const [audioSnimak, setAudio] = useState(false);
    const [isReported, setReported] = useState(false);


    const getAudioFile = () => {
        setAudio(true);
    };

    const reportRecording = async (user_id, id) => {
        const response = await fetch(`http://localhost:8000/record/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: user_id,
              is_reported: true
            }),
          });

        setReported(true)
    };
    return (
        <TableRow>
        <TableCell>{recording.username}</TableCell>
        <TableCell>{recording.title}</TableCell>
        <TableCell>
                {audioSnimak ? (
                    <audio controls>
                        <source src={`http://localhost:8000/audio/${recording.path}`} />
                        Your browser does not support the audio element.
                    </audio>
                ) : (
                    <Button color='primary' onClick={getAudioFile}>Poslušaj snimak</Button>
                )}
            </TableCell>
            <TableCell>
                {isReported ? "You already reported this recording!" : (
                    <Button color="secondary" onClick={() => reportRecording(recording.user_id, recording.id)}>Prijavi snimak</Button>
                )}
            </TableCell>
      </TableRow>
    );
  }
  
  export default Red;