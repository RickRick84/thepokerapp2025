import { useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../../firebaseConfig';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/chat/');
    }
  }, [user, loading, navigate]);

  const loginWithGoogle = async () => {
    setError(null);
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError('Error al iniciar sesión con Google.');
      console.error(err.message);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoadingForm(true);

    if (isRegistering && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoadingForm(false);
      return;
    }

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setError('No pudimos verificar tus datos. Revisá el email y la contraseña.');
      console.error(err.message);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return <p className="loading-text">Cargando sesión...</p>;
  }

  return (
    <div className="auth-form-container">
      {user ? (
        <div className="user-logged-in">
          <p className="welcome-text">
            Bienvenido, {user.displayName || user.email}
          </p>
          <button className="logout-button" onClick={handleLogout}>
            Salir
          </button>
        </div>
      ) : (
        <div className="auth-forms">
          <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>

          {error && <p className="auth-error">{error}</p>}

          <button
            onClick={loginWithGoogle}
            className="google-button"
            disabled={loadingGoogle}
          >
            {loadingGoogle ? 'Conectando...' : 'Entrar con Google'}
          </button>

          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegistering && (
              <small className="password-hint">
                Se recomienda incluir una mayúscula y un número.
              </small>
            )}
            <button type="submit" disabled={loadingForm}>
              {loadingForm
                ? isRegistering
                  ? 'Registrando...'
                  : 'Entrando...'
                : isRegistering
                ? 'Registrarse'
                : 'Entrar'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="toggle-button-form"
          >
            {isRegistering
              ? '¿Ya tenés cuenta? Iniciá sesión'
              : '¿No tenés cuenta? Registrate'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
