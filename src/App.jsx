import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ChatPage from './components/ChatPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? element : <Navigate to="login" replace />;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <Routes>
  <Route path="/" element={user ? <Navigate to="/chat" replace /> : <LoginPage />} />
  <Route path="/login" element={user ? <Navigate to="/chat" replace /> : <LoginPage />} />
  <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
