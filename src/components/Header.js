import { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import logo from '../assets/logo.webp';

function Header() {
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error('Sign-in error:', error.message);
      alert(`Sign-in failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <header className="header">
      <div className="company-info">
        <img src={logo} alt="Company Logo" className="company-logo" />
        <div>
          <div className="CompanyName">X! DIGITAL INSTITUTE</div>
          <div className="CompanySlogan">LEARN THE NEW WAY</div>
        </div>
      </div>

      <nav className="nav-buttons" ref={dropdownRef}>
        {user ? (
          <div className="profile-container">
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-image"
              onClick={() => setShowProfileDropdown(prev => !prev)}
            />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <p><strong>{user.displayName}</strong></p>
                <p>{user.email}</p>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="nav-button login-button" onClick={handleLogin}>
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
