import { useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Login.css';
import { AuthContext } from '../../context/AuthContext';

const NewAccount = () => {
  const [form, setForm] = useState({ name: '', surname: '', image: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    window.location.href = '/';
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    window.location.href = '/Login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.password2) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      console.log(form);
      await axios.post(`${process.env.REACT_APP_API_URL}/user`, form);
      window.location.href = '/login';
    } catch (err) {
      if (err.response) {
        setError(err.response.data || 'Error');
      } else {
        setError('Error al conectar con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="container-login" onSubmit={handleSubmit}>
        <h2> Crear Cuenta </h2>

        <div className='container-input'>
          <p>Nombre</p>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='container-input'>
          <p>Apellidos</p>
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className='container-input'>
          <p>Correo Electrónico</p>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='container-input'>
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className='container-input'>
          <p>Repetir Contraseña</p>
          <input
            type="password"
            name="password2"
            value={form.password2}
            onChange={handleChange}
            required
          />
        </div>

        <div className='new-account-button'>
          <p onClick={login}>¿Ya tienes cuenta? Inicia Sesión</p>
        </div>

        {error ? (
          <p className="error-message-login">{error}</p>
        ) : (
          <p className="error-message-login-false"> . </p>
        )}

        <button className={`button-login ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
          {loading ? 'Comprobando' : 'Crear cuenta'}
        </button>
      </form>
    </>
  );
};

export default NewAccount;
