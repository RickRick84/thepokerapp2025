import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function AdminControls({ onReset }) {
  const { user } = useAuth();

  if (user?.email !== 'rickybarba@hotmail.com') return null;

  return (
    <div className="admin-controls">
      <button onClick={onReset}>
        🔄 Resetear preguntas (admin)
      </button>
    </div>
  );
}

export default AdminControls;
