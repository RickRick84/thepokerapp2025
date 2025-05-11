import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';
import './MobileFix.css';
import './components/SidebarMenu.css';
import './components/UserMenu.css';


const root = document.getElementById('root');
if (!root) throw new Error("❌ No se encontró el contenedor 'root' en index.html");

createRoot(root).render(<App />);
