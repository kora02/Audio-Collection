import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CardItem from './CardItem';
import './List.css';

const List2 = () => {
  const [experiments, setExperiments] = useState([]);



  const fetchExperiments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/experiments');
      setExperiments(response.data.slice(0, 20)); 
    } catch (error) {
      console.error('Error fetching experiments:', error);
    }
  };
  useEffect(() => {
    fetchExperiments();
  }, []);

  return (
    <>
      <div className='listTitleWrapper'>
        <div className='listTitle'>Svi projekti</div>
        <Link to="/user/all-projects" className='viewAllLink'>View All</Link>
      </div>
      <div className='wrapper'>
        {experiments.map((experiment) => (
          <CardItem
            text={experiment.title} 
            wordCount={experiment.contents.split(' ').length} 
            path={`/eksperiment/${experiment.id}`} 
          />
        ))}
      </div>
    </>
  );
}

export default List2;
