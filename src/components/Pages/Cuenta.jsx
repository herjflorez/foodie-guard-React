import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import MenuUser from '../Elements/MenuUser';
import '../../css/Account.css';

const Cuenta = () => {
    const [form, setForm] = useState({ token: localStorage.getItem('token'),lastpassword: '', newpassword: '' , newpassword2: ''});
    const { isAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState([]);
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [selectedOption, setSelectedOption] = useState(0);

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // if(!isAuthenticated){
            const checkToken = async () => {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRetrieve`, { token });
                    setAccount(response.data);
                } catch (error) {
                    console.error('Token inválido');
                }
            };
    
            checkToken();
        // }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        if (form.newpassword !== form.newpassword2) {
          setError('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }
    
        try {
          await axios.put(`${process.env.REACT_APP_API_URL}/user`, form);
          localStorage.removeItem('token');
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

      const handleCloseSeasion = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      }

    return (
        <>
            <MenuUser />
            {isAuthenticated ? (

            <div className='container-account' style={{ height: size.height - 80 }}>

                        <div className="account-menu">
                            <div className='photo-user'>
                                <img src={`data:image/jpeg;base64,${account.image}`} alt='user' />
                            </div>

                            <div className='container-menu-options'>
                                <div
                                    className={`option-selection ${selectedOption === 0 ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(0)}
                                >
                                    Información Usuario
                                </div>
                                <div
                                    className={`option-selection ${selectedOption === 1 ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(1)}
                                >
                                    ¿Eres Propietario?
                                </div>
                                <div
                                    className={`option-selection ${selectedOption === 2 ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(2)}
                                >
                                    Servicio Premium
                                </div>
                                <div
                                    className={`option-selection ${selectedOption === 3 ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(3)}
                                >
                                    Sobre FoodieGuard
                                </div>
                                <div
                                    className={`option-selection ${selectedOption === 4 ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(4)}
                                >
                                    Historial
                                </div>
                            </div>
                        </div>
                        <div className='line-divisor'></div>
                        <div className='container-options'>
                            {selectedOption === 0 && (
                                <div className="option-menu">
                                    <div className='name-account tittle-option-account'>
                                        {account.name} {account.surname}
                                    </div>    
                                    <div className='mail-account'>
                                        {account.email}
                                    </div>
                                    <div className='container-change-password'>
                                        <h2> Cambio de Contraseña</h2>
                                        <form className='form-change-password' onSubmit={handleSubmit}>
                                            <div className='container-input-account'>
                                                <p className='prueba'> Antigua contraseña </p>
                                                <input
                                                    type="password" 
                                                    name="lastpassword" 
                                                    value={form.lastpassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <p> Nueva contraseña </p>
                                                <input
                                                    type="password" 
                                                    name="newpassword" 
                                                    value={form.newpassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <p> Repetir contraseña </p>
                                                <input
                                                    type="password" 
                                                    name="newpassword2" 
                                                    value={form.newpassword2}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                                {error ? (
                                                <p className="error-message-login">{error}</p>
                                                ) : (
                                                <p className="error-message-login-false"> . </p>
                                                )}

                                            <button className={`button-change-password ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
                                                {loading ? 'Comprobando' : 'Cambiar'}
                                            </button>
                                        </form>

                                        <button className='button-account-closeSession' onClick={handleCloseSeasion}> Cerrar sesion </button>

                                    </div>
                                </div>
                            )}
                            {selectedOption === 1 && (
                                <div className="option-menu">
                                    <h2 className='tittle-option-account'>
                                        Solicitud para registrar restaurante
                                    </h2>
                                    <div>
                                        <p>Rellena este formulario para confirmar que eres propietario de un restaurante. Nos pondremos en contacto contigo. </p>
                                        <div className='container-form-new-restaurants'>
                                            <div className='prueba1'>
                                                <div>
                                                    <p> Nombre </p>
                                                    <input 
                                                        type='text'
                                                        name='nameRestaurant'
                                                    /> 
                                                </div>
                                                <div>
                                                    <p> Telefono de contacto </p>
                                                    <input 
                                                        type='text'
                                                        name='nameRestaurant'
                                                    /> 
                                                </div>
                                                <div>
                                                    <p> Tipo de gastronomia </p>
                                                    <input 
                                                        type='text'
                                                        name='nameRestaurant'
                                                    /> 
                                                </div>
                                            </div>
                                            <div className='prueba2'>
                                                as
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {selectedOption === 2 && (
                                <div className="option-menu">Servicio Premium</div>
                            )}
                            {selectedOption === 3 && (
                                <div className="option-menu">Sobre FoodieGuard</div>
                            )}
                            {selectedOption === 4 && (
                                <div className="option-menu">Historial</div>
                            )}
                        </div>
                
                
            </div>
            ) : (
                <div className='container-session-inactive'>
                    <h1 className='session-inactive' style={{height: size.height -80}}>Debes iniciar sesión</h1>
                </div>
            )}
        </>
    );
};

export default Cuenta;
