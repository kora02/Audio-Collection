import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeUser from './user/pages/HomeUser';

import UserMyProjects from './user/UserMyProjects';
import UserAllProjects from './user/UserAllProjects';
import PersonalData from './user/PersonalDataUser';
import Info from './user/Info';
import Ranking from './user/pages/Rankings';
import About from './user/About';

function User() {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomeUser />} />
          <Route path='/all-projects' element={<UserAllProjects />} />
          <Route path='/my-projects' element={<UserMyProjects />} />
          <Route path='/data' element={ <PersonalData />}/>
          <Route path='info' element={ <Info />} />
          <Route path='/ranking' element={ <Ranking></Ranking>} />
          <Route path='/about' element = { <About />} />
        </Routes>
    </>
  );
}

export default User;
