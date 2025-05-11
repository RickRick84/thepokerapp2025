import React from 'react';
import '../components/SidebarMenu.css';

const PokerBetLogo = '/pb_logo.png';

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo-container">
          <img src={PokerBetLogo} alt="PokerBet" className="sidebar-logo" />
        </div>
        <button className="sidebar-link" onClick={toggleSidebar}>MERCHANDISING</button>
        <button className="sidebar-link" onClick={toggleSidebar}>SORTEO SEMANAL</button>
        <button className="sidebar-link" onClick={toggleSidebar}>SORTEO MENSUAL</button>
        <button className="sidebar-link" onClick={toggleSidebar}>CALENDARIO</button>
        <button className="sidebar-link" onClick={toggleSidebar}>NOTICIAS</button>
      </div>
    </>
  );
};

export default SidebarMenu;
