import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from './CardItem';
import './List.css';

const List1 = () => {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    fetchRandomExperiments();
  }, []);

  const fetchRandomExperiments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/experiments');
      setExperiments(response.data);
    } catch (error) {
      console.error('Error fetching random experiments:', error);
    }
  };

  return (
    <>
      <div className='listTitleWrapper'>
        <div className='listTitle'>Preporučeni projekti</div>
      </div>
      <div className='wrapper'>
        {experiments.map((experiment) => (
          <CardItem
            key={experiment.id}
            text={experiment.title}
            wordCount={experiment.contents.split(' ').length}
            path={`/eksperiment/${experiment.id}`} 
          />
        ))}
      </div>
    </>
  );
}

export default List1;

