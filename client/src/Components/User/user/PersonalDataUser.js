import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Import useHistory from react-router-dom
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const MainContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  margin: 20px;
`;

const ListContainer = styled.div`
  padding: 20px;
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  margin: 20px;
`;

const GridForm = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1.2fr;
  gap: 20px;
  margin: 60px 0;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const RightBox = styled.div`
  padding: 20px;
`;

const NavData = styled.a(({ active }) => ({
  listStyle: 'none',
  padding: '20px',
  color: '#2b2525',
  fontSize: '1.1rem',
  display: 'block',
  transition: 'all .3s ease-in-out',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: '#263043',
    transform: 'scale(1.2)',
  },
  ...(active && {
    color: '#263043',
  }),
}));

const LabelAboveTextField = styled(Typography)`
  margin-bottom: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PersonalData = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', username: '', email: '' }); // Updated state

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
    <MainContainer>
      <Header>
        <Typography variant="h4">Moji Podaci</Typography>
        <Button variant="outlined" color="primary" component={Link} to="/user">Home</Button>
      </Header>
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
    </MainContainer>
  );
}

export default PersonalData;
