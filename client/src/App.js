import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Missing from './Components/Missing';
import RequireAuth from './Components/RequireAuth';
import Experiment from './Components/Experiments/Experiment';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin'
import ProfileSetup from './Components/ProfileSetup';
import Response  from './Components/Experiments/UploadResponse';
import Tester from './Components/Tester/Tester';



function App() {
  return (
      <Routes>
        {/* Public Routes */}
         <Route path='/' element={<Landing />} />
         <Route path="/admin/*" element={<Admin />} /> {/* Rute za admina su u ovoj komponenti */}
        
        {/* Protected Routes*/}
        <Route element={<RequireAuth />}>
          
          <Route path="/tester/*" element={<Tester />} /> 

          <Route path="/eksperiment/:id" element={<Experiment />}></Route>
          <Route path="/eksperiment/status/:status" element={<Response />}></Route>

          <Route path="/ProfileSetup" element={<ProfileSetup />}></Route>

          {/* Na ovom mjestu se dodaju rute*/}

          <Route path="/user/*" element={<User />} /> {/* Rute za usera su u ovoj komponenti */}
        </Route>
        {/* 404 Page */}
        <Route path='*' element={<Missing />} />
       </Routes>
  );
}

export default App;
