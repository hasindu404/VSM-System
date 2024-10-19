import React from 'react';
import './Header.css'; // Import your custom CSS file
import { FaUser } from 'react-icons/fa'; // Import the User icon

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Your Logo</h1>
        <nav>
          <ul>
            <li><a href="/"><FaUser style={{ marginRight: '8px' , fontSize: '25px', verticalAlign: 'middle'}} /> {/* Customer icon here */}</a></li>
            <p>Customer name</p>
            <p>Customer</p>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
