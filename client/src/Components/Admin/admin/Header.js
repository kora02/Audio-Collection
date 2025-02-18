import React from 'react';
import { BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  return (
    <div className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
        <input className='search-input' type='search' placeholder='Pretraži...' />
      </div>
    </div>
  );
}

export default Header;
