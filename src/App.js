import './css/App.css';
import './css/Menu.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CrudApp from './components/crud/CrudApp';
import Index from './components/Pages/Index';
import Alergenos from './components/Pages/Alergenos';
import Mapa from './components/Pages/Mapa';
import Cuenta from './components/Pages/Cuenta';
import Login from './components/Pages/Login';
import NewAccount from './components/Pages/NewAccount';
// import Component from './components/Component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/Restaurants' element={<CrudApp />} />
          <Route path='/Alergenos' element={<Alergenos />} />
          <Route path='/Map' element={<Mapa />} />
          <Route path='/Account' element={<Cuenta />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createAccount' element={<NewAccount />} />

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
