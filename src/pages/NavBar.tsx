import React from 'react';
import { Link } from 'react-router-dom';
import { CommentIcon, GhostIcon, MagicIcon } from '../components/Icons/Icons';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const iconStyle = {
    fontSize: '20px', // Adjust the size as needed
    color: '', // Default color
  };

  return (
    <nav className="navbar animated-fade-in">
      <div className="container">
        <div className="nav-item">
          <Link to="/" className="nav-link">
            
            <div  className=' icon purple-icon'><GhostIcon/></div>
            <h3 className="text-primary">Home</h3>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/error" className="nav-link">
            
            <div className='icon green-icon'><MagicIcon /></div>
            <h3 className="text-primary">Error Testing</h3>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/toast" className="nav-link ">
            <div className='icon red-icon'><CommentIcon /></div>
            
            <h3 className="text-primary ">The Toaster Oven</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
