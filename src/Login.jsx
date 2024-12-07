import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Asegúrate de tener este archivo CSS para el estilo

const Login = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = (e) => {
    e.preventDefault();

    // Verificar usuario y contraseña
    if (user === 'admin' && password === '12345678') {
      setIsAuthenticated(true); // Cambiar el estado de autenticación
      navigate('/'); // Redirigir a la página principal
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleCreateAccount = () => {
    // Lógica para redirigir a la página de creación de cuenta (si se implementa)
    console.log('Redirigiendo a crear cuenta...');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión con tu cuenta docente</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>

        <div className="form-group text-center">
          <button
            type="button"
            onClick={handleCreateAccount}
            className="btn btn-secondary"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
