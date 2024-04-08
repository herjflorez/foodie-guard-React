import axios from 'axios'
import React, { useState } from 'react'

const CrudForm = ({ onHide, getRestaurants, URL }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [photo, setPhoto] = useState('')
    const [medianPrice, setMedianPrice] = useState('')
    const [website, setWeb] = useState('')
    const [type, setType] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')



    const createRestaurant = () => {
        axios.post(URL, { name, description, phone, email, address, photo, medianPrice, website, type, lat, lon })
        .then((response) => {
            console.log(response)
            getRestaurants()
            onHide()
        })
        .catch(() => window.alert("Error al intentar crear el restaurante"))

    }

  return (
    
    <div id='formulario' className='popUpAddRestaurant'>
        <form>
            <h2> Añadir Nuevo Restaurant </h2>
            <div className='container-inputs-form'>
                <div className='colums'>
                    <div className='input-form'> 
                        <label htmlFor='name'> Nombre </label>
                        <input name='name' className='inputs-form' type='text' onChange={(value) => setName(value.target.value)} />
                    </div>
                    <div className='input-form'>
                        <label htmlFor='email'> Email </label>
                        <input name='email' className='inputs-form' type='email' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='phone'> Telefono  </label>
                        <input name='phone' className='inputs-form' type='number' onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                </div>

                <div className='input-form'>
                    <label htmlFor='Description'> Descripcion  </label>
                    <textarea name='Desctiption' className='inputs-form' onChange={(e) => setDescription(e.target.value)}> </textarea>
                </div>

                <div className='colums'>
                    <div className='input-form'>
                        <label htmlFor='address'> Direccion  </label>
                        <input name='address' className='inputs-form' type='text' onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='lat'> Latitud  </label>
                        <input name='lat' className='inputs-form' type='text' onChange={(e) => setLat(e.target.value)}/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='long'> Longitud </label>
                        <input name='long' className='inputs-form' type='text' onChange={(e) => setLon(e.target.value)}/>
                    </div>
                </div>

                <div className='colums two-colums'>
                    <div className='input-form'>
                        <label htmlFor='price'> Precio Medio  </label>
                        <input name='price' className='inputs-form' type='number' onChange={(e) => setMedianPrice(e.target.value)}/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='type'> Tipo comida  </label>
                        <select name='type' className='inputs-form' onChange={(e) => setType(e.target.value)}>
                            <option value="-"> - </option>
                            <option value="American"> Americana</option>
                            <option value="Italian"> Italiana</option>
                            <option value="Mexican"> Mexicano</option>
                            <option value="Peruvian"> Peruano </option>
                        </select>
                    </div>
                </div>
                
                <div className='input-form'>
                    <label htmlFor='photo'> Foto (URL)  </label>
                    <input name='photo' className='inputs-form' type='url' onChange={(e) => setPhoto(e.target.value)}/>
                </div>
                <div className='input-form'>
                    <label htmlFor='web'> Web  </label>
                    <input name='web' className='inputs-form' type='url' onChange={(e) => setWeb(e.target.value)}/>
                </div>
                
            </div>

            <div className='buttons-form'>
                <button type='button' onClick={() => createRestaurant()}> Añadir </button>
                <button type='button' onClick={onHide}> Cancelar </button>
            </div>
        </form>
    </div>
   
  )
}

export default CrudForm

