import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const DebugAuth = () => {
  const { user, loading } = useAuth();

  return (
    <div style={{ padding: '2rem', color: 'white', backgroundColor: '#111', fontSize: '1.2rem' }}>
      <p>Estado loading: {loading ? 'true' : 'false'}</p>
      <p>Usuario: {user ? user.email : 'null'}</p>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DebugAuth />
    </AuthProvider>
  );
}

export default App;
