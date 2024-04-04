import React from 'react'

const CrudForm = () => {
  return (
    <div className='popUpAddRestaurant'>
        <form>
            <h2> Añadir Nuevo Restaurant </h2>
            <div className='container-inputs-form'>
                <div className='colums'>
                    <div className='input-form'> 
                        <label htmlFor='name'> Nombre </label>
                        <input name='name' className='inputs-form' type='text'/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='email'> Email </label>
                        <input name='email' className='inputs-form' type='email'/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='phone'> Telefono  </label>
                        <input name='phone' className='inputs-form' type='number'/>
                    </div>
                </div>

                <div className='input-form'>
                    <label htmlFor='Description'> Descripcion  </label>
                    <textarea name='Desctiption' className='inputs-form'> </textarea>
                </div>

                <div className='colums'>
                    <div className='input-form'>
                        <label htmlFor='address'> Direccion  </label>
                        <input name='address' className='inputs-form' type='text'/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='lat'> Latitud  </label>
                        <input name='lat' className='inputs-form' type='text'/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='long'> Longitud </label>
                        <input name='long' className='inputs-form' type='text'/>
                    </div>
                </div>

                <div className='colums two-colums'>
                    <div className='input-form'>
                        <label htmlFor='price'> Precio Medio  </label>
                        <input name='price' className='inputs-form' type='number'/>
                    </div>
                    <div className='input-form'>
                        <label htmlFor='type'> Tipo comida  </label>
                        <select name='type' className='inputs-form'>
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
                    <input name='photo' className='inputs-form' type='url'/>
                </div>
                <div className='input-form'>
                    <label htmlFor='web'> Web  </label>
                    <input name='web' className='inputs-form' type='url'/>
                </div>
                
            </div>

            <div className='buttons-form'>
                <button> Añadir </button>
                <button> Cancelar </button>
            </div>
        </form>
    </div>
    
  )
}

export default CrudForm