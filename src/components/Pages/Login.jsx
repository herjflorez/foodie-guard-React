import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Usuario tiene token');
      navigate('/');
    } else {
      console.log('No hay token');
    }
  }, [navigate]);   

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, form);

      localStorage.setItem('token', response.data.Token);
      navigate('/')

    } catch (err) {
      if (err.response) {
        setError(err.response.data || 'Credenciales inválidas');
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
        <h2> Iniciar Sesión </h2>

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

        <div className='new-account-button'>
          <p> ¿No tienes cuenta? Registrate</p>
        </div>

          {error ? (
            <p className="error-message-login">{error}</p>
          ) : (
            <p className="error-message-login-false"> asdj </p>
          )}

        <button className={`button-login ${loading  ? 'loading' : ''}`} type="submit" disabled={loading}>
          {loading ? 'Comprobando' : 'Entrar'}
        </button>
      </form>
    </>
  );
};

export default Login;
