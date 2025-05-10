import React from 'react';
import './SidebarMenu.css';

// Asegura el path con prefijo base correcto si estás sirviendo desde /PokerApp/
const PokerBetLogo = '/pb_logo.png';  

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-container">
        <div className="sidebar-logo-box">
          <img src={PokerBetLogo} alt="PokerBet" className="sidebar-logo" />
        </div>
      </div>
      <button className="sidebar-link" onClick={toggleSidebar}>🧢 <span>MERCHANDISING</span></button>
      <button className="sidebar-link" onClick={toggleSidebar}>🎟️ <span>SORTEO SEMANAL</span></button>
      <button className="sidebar-link" onClick={toggleSidebar}>🎰 <span>SORTEO MENSUAL</span></button>
      <button className="sidebar-link" onClick={toggleSidebar}>📆 <span>CALENDARIO</span></button>
      <button className="sidebar-link" onClick={toggleSidebar}>📰 <span>NEWS</span></button>
    </div>
  );
};

export default SidebarMenu;
