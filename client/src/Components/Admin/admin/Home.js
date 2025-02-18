

import React, { useState, useEffect } from 'react'
import { BsCCircleFill, BsFillArchiveFill } from 'react-icons/bs'

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import MyBarGraph from './BarGraph';
import axios from 'axios';




function Home() {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/data", {
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = response.data;
      setProjects(jsonData); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setProjects([]); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const [MFData, setMFData] = useState([]);

  const fetchMFData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/data-m-f", {
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = response.data;
      setMFData(jsonData); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setMFData([]); 
    }
  };

  useEffect(() => {
    fetchMFData(); 
  }, []);


  const [RData, setRData] = useState([]);

  const fetchRData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/data-uloge", {
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = response.data;
      setRData(jsonData); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setRData([]); 
    }
  };

  useEffect(() => {
    fetchRData(); 
  }, []);

    const data = [
        { year: 2019, active: 200, inactive: 50 },
        { year: 2020, active: 210, inactive: 60 },
        { year: 2021, active: 250, inactive: 70 },
        { year: 2022, active: 282, inactive: 80 },
        { year: 2023, active: 181, inactive: 90 },
        { year: 2024, active: 220, inactive: 85 },
      ];

      const data2 = [
        { year: 2019, completed: 150, notCompleted: 260 },
        { year: 2020, completed: 200, notCompleted: 270 },
        { year: 2021, completed: 300, notCompleted: 300 },
        { year: 2022, completed: 350, notCompleted: 362 }, 
        { year: 2023, completed: 420, notCompleted: 271 }, 
        { year: 2024, completed: 456, notCompleted: 305 }, 
      ];


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>
      <div className='main-cards'>
        <div className='card'>
        <div className='card-inner'>
            <h3>BROJ EKSPERIMENATA</h3>
            <BsFillArchiveFill  className='card_icon'/>
        </div>
        <h1>{projects.eksperimenti}</h1>
        </div>
        <div className='card'>
        <div className='card-inner'>
            <h3>BROJ USERA</h3>
            <BsCCircleFill  className='card_icon'/>
        </div>
        <h1>{projects.useri}</h1>
        </div>
        <div className='card'>
        <div className='card-inner'>
            <h3>BROJ TESTERA</h3>
            <BsCCircleFill  className='card_icon'/>
        </div>
        <h1>{projects.testeri}</h1>
        </div>
        <div className='card'>
        <div className='card-inner'>
            <h3>BROJ ADMINA</h3>
            <BsCCircleFill  className='card_icon'/>
        </div>
        <h1>{projects.admini}</h1>
        </div>

        </div>
        <div className="App">
      <h1>Bar Graph Example</h1>
      <div class='grafovi'>
        <div class='graf'>
          <MyBarGraph values={[MFData[0], MFData[1]]} />
        </div>
        <div class='graf'>
          <MyBarGraph values={[RData[0], RData[1]]} />
        </div>
      </div>
      
    </div>

        {/*<div className='charts'>
        <div className='chart1'>
        <h3>Odnos aktivnih i neaktivnih projekata</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInactive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" domain={[2019, 2024]} />
            <YAxis domain={[0, 300]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="active" stroke="#8884d8" fillOpacity={1} fill="url(#colorActive)" name="Aktivni Projekti" />
            <Area type="monotone" dataKey="inactive" stroke="#82ca9d" fillOpacity={1} fill="url(#colorInactive)" name="Neaktivni Projekti" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
        <div className='chart2'>
        <h3>Odnos urađenih i neuradjenih projekata</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data2} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNotCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="completed" stroke="#8884d8" fillOpacity={1} fill="url(#colorCompleted)" name="Urađeni Projekti" />
            <Area type="monotone" dataKey="notCompleted" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNotCompleted)" name="Neuradjeni Projekti" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
        
      </div>

      <div className='listContainer'>
        <div className='listTitle'>Zadnji projekti</div>
        <Table />
      </div>*/}

    </main>
  )
}

export default Home
