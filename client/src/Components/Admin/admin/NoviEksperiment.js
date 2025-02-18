import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const NoviEksperiment = () => {
  const [formData, setFormData] = useState({
    title: '',
    contents: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    try {
      const response = await axios.post('http://localhost:8000/experiments', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='listContainer'>
        <div className='listTitle'>Novi Eksperiment</div>
        <form className='formContainer' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='listTitle'>Naslov</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label className='listTitle'>Tekst</label>
            <input
              type='text'
              id='contents'
              name='contents'
              value={formData.contents}
              onChange={handleChange}
            />
          </div>
          <button className='button' type='submit'>Dodaj</button>
        </form>
      </div>
    </div>
  );
};

export default NoviEksperiment;
