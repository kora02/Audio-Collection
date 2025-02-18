import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../User/components/Navbar';
import Header from './admin/Header';
import Sidebar from './admin/Sidebar';
import AllProjects from './admin/AllProjects';
import NoviEksperiment from './admin/NoviEksperiment';
import InactiveProjects from './admin/InactiveProjects';
import PersonalData from './admin/PersonalData';
import Home from './admin/Home';
import Testers from './admin/Testers';
import Users from './admin/Users';
import Eksperimenti from './admin/Eksperimenti';
import PromijeniEksperiment from './admin/PromijeniEksperiment'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'



function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Username']);
  const username = cookies.Username;
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    if (username != 'Admin'){
      navigate('/user');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className='grid-container'>
        
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={toggleSidebar} />
        <Routes>
          <Route path='/' element={<Home />} />
          {/*<Route path='svi' element={<AllProjects />} />*/}
          <Route path='novi-eksperiment' element={<NoviEksperiment />} />
          <Route path='promijeni-eksperiment' element={<PromijeniEksperiment />} />
          <Route path='eksperimenti' element={<Eksperimenti />} />
          <Route path='/data' element={<PersonalData />} />
          <Route path='/testers' element={<Testers />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
    </>
  );
}

export default Admin;
