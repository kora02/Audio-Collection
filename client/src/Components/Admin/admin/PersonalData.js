import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../App.css';

const PersonalData = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', username: '', email: '' });

  const tabs = (panelIndex) => {
    setActiveTab(panelIndex);
  };

  const fetchData = async () => {
    try {
      const token = Cookies.get('AuthToken');
      if (!token) {
        throw new Error("No token found, please login.");
      }

      const response = await axios.get("http://localhost:8000/user/data", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const jsonData = response.data;
      if (jsonData && jsonData.length > 0) {
        const { first_name, last_name, gender, username, e_mail, password, date_of_birth, place_of_birth, place_of_residence, institution_name, role_name} = jsonData[0].data;
        
        const initialDate = new Date(date_of_birth);
        const displayFormattedDate = initialDate.toLocaleDateString('en-GB');
        setUserData({ firstName: first_name, lastName: last_name, gender, username, email: e_mail, password,
          date_of_birth: displayFormattedDate, place_of_birth, place_of_residence, institution_name, role_name });
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className='main-container'>
      <div className='listContainer'>
        <div className='gridForm'>
          <div className='leftbox'>
            <nav>
              <a  onClick={() => tabs(0)} className={`tab navData ${activeTab === 0 ? 'active' : ''}`}><i className='fa fa-user'> Lični Podaci</i></a>
              <a  onClick={() => tabs(1)} className={`tab navData ${activeTab === 1 ? 'active' : ''}`}><i className='fa fa-user'></i>Ostali Podaci</a>
            </nav>
          </div>
          <div className='rightbox'>
            <div className='profile tabShow' style={{ display: activeTab === 0 ? 'block' : 'none' }}>
              <div className='listTitle'>Lični Podaci</div>
              <div className="listTitle">Ime</div>
      <input type="text" className='input' value={userData.firstName} readOnly />
              <div className="listTitle">Prezime</div>
              <input type="text" className='input' value={userData.lastName} readOnly />
              <div className="listTitle">Spol</div>
              <input type="text" className='input' value={userData.gender} readOnly />
              <div className="listTitle">Username</div>
              <input type="text" className='input' value={userData.username} readOnly />
              <div className="listTitle">Email</div>
              <input type="text" className='input' value={userData.email} readOnly />
              {/*<div className="listTitle">Password</div>
              {<input type="password" className='input' value={userData.password} readOnly />
              <div className='btn'>Update</div>*/}
            </div>
            <div className='profile tabShow' style={{ display: activeTab === 1 ? 'block' : 'none' }}>
              <div className='listTitle'>Ostali Podaci</div>
              <div className="listTitle">Datum Rođenja</div>
              <input type="text" className='input' value={userData.date_of_birth} readOnly />
              <div className="listTitle">Mjesto Rođenja</div>
              <input type="text" className='input' value={userData.place_of_birth} readOnly />
              <div className="listTitle">Mjesto Prebivališta</div>
              <input type="text" className='input' value={userData.place_of_residence} readOnly />
              <div className="listTitle">Institucija</div>
              <input type="text" className='input' value={userData.institution_name} readOnly />
              <div className="listTitle">Uloga</div>
              <input type="text" className='input' value={userData.role_name} readOnly />
              {/*<div className="listTitle">Recordings</div>
              <input type="text" className='input' value="bla bla bla" readOnly />
              <div className='btn'>Update</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalData;
