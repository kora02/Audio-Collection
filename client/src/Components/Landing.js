import React, { useEffect, useState } from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import "./Landing.css"

const Landing = () => {
    const [displayForm, setDisplayForm] = useState('login');
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Username', 'Role'])
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [mail, setMail] = useState("");
    const navigate = useNavigate();

    const toggleForm = (formName) => {
        setDisplayForm(displayForm === formName ? null : formName);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8000/token", new URLSearchParams({
          username: username,
          password: password,
      }), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      if (response.status === 200){
        setCookie('Username', username, {path : '/'})
        setCookie('AuthToken', response.data.access_token, {path : '/'})
        
        if (username === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }   
      }

      } catch (error) {
          console.error("Login failed:", error);
      }

  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post("http://localhost:8000/register2", {
              e_mail: mail,
              username: username,
              password: password
          }, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });

    console.log(response)
    if (response.status === 200){
      setCookie('Username', username)
      setCookie('AuthToken', response.data.access_token)

      navigate('/ProfileSetup');
    }

    } catch (error) {
        console.error("Register failed:", error);
    }

};


  return (
    <div className='landing-container'>
      <div className="greet-container">
        <h1 className="naslov">Audio Podaci!</h1>
        <h3 className="sub-naslov">Dobrodošli! Prijavite se kako biste pristupili svim funkcijama naše aplikacije.</h3>
        <p className="tekst">Iskoristite prednosti naših naprednih alata za prikupljanje i ocjenjivanje audio podataka. </p>
        <p className="tekst">Registrujte se danas i počnite odmah.</p>
      </div>

      <div className="auth-container">
        <div className="change-mode">
            <button className={`toggle-mode ${displayForm==='login' ? 'active-mode' : ''}`} onClick={() => toggleForm('login')}>Loginaj se</button>
            <button className={`toggle-mode ${displayForm==='register' ? 'active-mode' : ''}`} id='register-mode' onClick={() => toggleForm('register')}>Registruj se</button>
        </div>
        {displayForm === 'login' && (
        <form action="" className="form" id='login'>
            <input type="text" name="" className="input-polje" id="username-polje" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" name="" className="input-polje" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className='submit' onClick={(e) => handleLogin(e)}>Loginaj se</button>
        </form>
        )}
        
        {displayForm === 'register' && (
        <form action="" className="form" id='register'>

            <input type="text" name="" className="input-polje" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required/>
            <input type="email" name="" className="input-polje" placeholder='E-Mail' onChange={(e) => setMail(e.target.value)} required/>
            <input type="password" name="" className="input-polje" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit" className='submit' onClick={(e) => handleRegister(e)}>Registruj se</button>
        </form> 
        )}
      </div>
    </div>
  )
}

export default Landing
