import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FaSignOutAlt, FaCogs, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../components/UserMenu.css';

function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = {
    account: 'Account',
    settings: 'Settings',
    signOut: 'Sign out',
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <img
        src={user?.photoURL || '/default-avatar.png'}
        alt="Profile"
        className="user-avatar"
        onClick={toggleMenu}
      />
      {open && (
        <div className="dropdown-menu left-align">
          <button onClick={() => alert('Account')}><FaUser /> {t.account}</button>
          <button onClick={() => alert('Settings')}><FaCogs /> {t.settings}</button>
          <button onClick={handleLogout}><FaSignOutAlt /> {t.signOut}</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
