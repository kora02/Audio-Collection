import React from 'react';
import { Link } from 'react-router-dom';
import CardItem from './CardItem';
import './List.css';

const List3 = () => {

  const lista = [
    { id: 1, name: 'Text about a life', genre: 'Science', wordCount: 1200 },
    { id: 2, name: 'Text about homeless people', genre: 'Social', wordCount: 1500 },
    { id: 3, name: 'Text about religion', genre: 'Religion', wordCount: 1800 },
    { id: 4, name: 'Text about technology', genre: 'Science', wordCount: 2000 },
    { id: 5, name: 'Text about space', genre: 'Science Fiction', wordCount: 2200 },
    { id: 6, name: 'Text about love', genre: 'Novel', wordCount: 1400 },
    { id: 7, name: 'Text about history', genre: 'History', wordCount: 2300 },
    { id: 8, name: 'Text about adventure', genre: 'Fiction', wordCount: 1600 },
    { id: 9, name: 'Text about fantasy', genre: 'Fantasy', wordCount: 1900 },
    { id: 10, name: 'Text about health', genre: 'Health', wordCount: 2100 },
    { id: 11, name: 'Text about science', genre: 'Science', wordCount: 2400 },
    { id: 12, name: 'Text about politics', genre: 'Politics', wordCount: 1700 },
    { id: 13, name: 'Text about economy', genre: 'Economics', wordCount: 2600 },
    { id: 14, name: 'Text about education', genre: 'Education', wordCount: 2800 },
    { id: 15, name: 'Text about philosophy', genre: 'Philosophy', wordCount: 3000 },
  ];

  return (
    <>
      <div className='listTitleWrapper'>
        <div className='listTitle'>
          Moji projekti
        </div>
        <Link to="/user/my-projects" className='viewAllLink'>View All</Link>
      </div>
      <div className='wrapper'>
          {lista.map((item) => (
            <CardItem 
              key={item.id}
              text={item.name}
              genre={item.genre}
              wordCount={item.wordCount}
              path='/user/info'
            />
          ))}
      </div>
    </>
  );
}

export default List3;
