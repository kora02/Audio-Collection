import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeTester from './HomeTester';
import NotAuthorized from './NotAuthorized';




function Tester() {
    return (
      <>
          <Routes>
            <Route path='/' element={<HomeTester />} />
            <Route path='/authorization' element={<NotAuthorized></NotAuthorized>}> </Route>
          </Routes>
      </>
    );
  }
  
  export default Tester;