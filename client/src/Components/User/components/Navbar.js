import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { useCookies } from "react-cookie";
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const location = useLocation(); // Get the current location
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Username']);

  const signOut = () => {
    removeCookie("Username", { path: '/' });
    removeCookie("AuthToken", { path: '/' });
    window.location.href = '/';
  };
  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  // Determine the base path
  const basePath = location.pathname.startsWith('/admin') ? '/admin' : '/user';

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={`${basePath}`} className="navbar-logo" onClick={closeMobileMenu}>
            Tone Tracker <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to={`${basePath}`} className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={`${basePath}/data`} className='nav-links' onClick={closeMobileMenu}>
                Moji podaci
              </Link>
            </li>
            {/*<li className='nav-item'>
              <Link to={`${basePath}/projekti`} className='nav-links' onClick={closeMobileMenu}>
                Postavke
              </Link>
            </li>*/}
          </ul>
          {button && <Button buttonStyle={'btn--outline'} onClick={signOut}>Sign Out</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
