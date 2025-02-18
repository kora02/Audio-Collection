import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const PromijeniEksperiment = () => {
  const [formData, setFormData] = useState({
    title: '',
    id: 0, // Initialize id as integer
    contents: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'id' ? parseInt(value, 10) : value, // Ensure id is parsed as integer
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    console.log('Submitting data:', formData); // Log the formData for debugging
  
    // Convert id to integer
    const updatedFormData = {
     ...formData,
      id: parseInt(formData.id, 10),
    };
  
    try {
      const response = await axios.put('http://localhost:8000/experiments', updatedFormData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='listContainer'>
        <div className='listTitle'>Promijeni Eksperiment</div>
        <form className='formContainer' onSubmit={handleSubmit}>
        <div className='form-group'>
            <label className='listTitle'>ID</label>
            <input
              type='number'
              id='id'
              name='id'
              value={formData.id}
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
          <button className='button' type='submit'>Osvježi</button>
        </form>
      </div>
    </div>
  );
};

export default PromijeniEksperiment;
