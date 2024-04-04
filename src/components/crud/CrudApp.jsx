import React, {useState} from 'react'
import Image from './../../assets/Logo.png';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

const CrudApp = () => {

    const [isVisible, setIsVisible] = useState(false)

    const changeVisibility = () => {
        setIsVisible(!isVisible)
    }

  return (<>
        <h2> Crud restaurantes Foddie Guard </h2>
        <div id='logo'>
            <img src={Image} alt='logo' />
        </div>

        <button onClick={changeVisibility}>asdas</button>

        {isVisible && <CrudForm />}

        <CrudTable />
    </>
  )
}

export default CrudApp