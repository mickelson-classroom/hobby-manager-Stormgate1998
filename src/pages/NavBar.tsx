import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <div className="container">
          <div className="nav-item">
            <Link to="/" className="nav-link">
              <h3 className='text-primary'>Home</h3>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/error" className="nav-link">
              <h3 className='text-primary'>Error Testing</h3>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/toast" className="nav-link">
              <h3 className='text-primary'>The Toaster Oven</h3>
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;