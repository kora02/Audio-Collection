import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllProjects from './user/AllProjects';
import HomeUser from './user/pages/HomeUser';
import MyProjects from './user/MyProjects';
import PersonalData from './user/PersonalDataUser';
import Info from './user/Info';

function User() {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomeUser />} />
          <Route path='/all-projects' element={<AllProjects />} />
          <Route path='/my-projects' element={<MyProjects />} />
          <Route path='/data' element={ <PersonalData />}/>
          <Route path='info' element={ <Info />} />
        </Routes>
    </>
  );
}

export default User;
