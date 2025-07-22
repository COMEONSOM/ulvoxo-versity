// src/components/Navbar.js
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
//import brochure1 from '../assets/brochure1.pdf';
//import brochure2 from '../assets/brochure2.pdf';
//import brochure3 from '../assets/brochure3.pdf';
import '../styles/Navbar.css';

function Navbar() {
  const [showServices, setShowServices] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const dropdownRef = useRef(null);

  const handleOurServicesClick = () => {
    setShowServices(prev => !prev);
    setShowMenu(false);
    setShowBrochure(false);
  };

  const handleAvailableCoursesClick = () => {
    const section = document.getElementById('available-courses');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setShowServices(false);
  };

  const handleSoftwareSolutionsClick = () => {
    alert("Coming soon");
    setShowServices(false);
  };

  const handleMenuClick = () => {
    setShowMenu(prev => !prev);
    setShowServices(false);
    setShowBrochure(false);
  };

  const handleBrochureClick = () => {
    setShowBrochure(prev => !prev);
    setShowMenu(false);
    setShowServices(false);
  };

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServices(false);
        setShowMenu(false);
        setShowBrochure(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <nav className="nav-buttons" ref={dropdownRef}>

        {/* Menu Dropdown */}
        <button className="nav-button" onClick={handleMenuClick}>
          Menu
        </button>

        {showMenu && (
          <div className="menu-dropdown">
            <button className="dropdown-option" onClick={() => window.location.href = '/'}>
              Home
            </button>
            <Link to="https://www.xfactorial.online/Other-files/about.html" className="dropdown-option">
              About Company
            </Link>
            <button className="dropdown-option" onClick={handleBrochureClick}>
               Course Brochure
            </button>
          </div>
        )}

        {/* Brochure Dropdown 
        {showBrochure && (
          <div className="menu-dropdown">
            <a href={brochure1} className="dropdown-option" target="_blank" rel="noopener noreferrer">
              Brochure 1
            </a>
            <a href={brochure2} className="dropdown-option" target="_blank" rel="noopener noreferrer">
              Brochure 2
            </a>
            <a href={brochure3} className="dropdown-option" target="_blank" rel="noopener noreferrer">
              Brochure 3
            </a>
          </div>
        )}  */}

        {/* Services Dropdown */}
        <button className="nav-button" onClick={handleOurServicesClick}>
          Our Services
        </button>

        {showServices && (
          <div className="services-dropdown">
            <button className="dropdown-option" onClick={handleAvailableCoursesClick}>
              Available Courses
            </button>
            <button className="dropdown-option" onClick={handleSoftwareSolutionsClick}>
              Software Solutions
            </button>
          </div>
        )}

        {/* Visit X! FINANCE */}
        <a
          href="https://www.xfactorial.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button"
        >
          Visit X! FINANCE
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
