import React, { useState } from 'react'

export default function Component() {

    const [text, setText] = useState()
    const [update, setUpdate] = useState()

    const changeText = (event) => {
        setText(event.target.value)
    }

    const buttonClick = () => {
        setUpdate(text)
    }

  return (
    <div>
        <input type="text" value={text} onChange={changeText}/>
        <button onClick={buttonClick}> Actualizar Texto </button>
        <p> texto input: {text} </p>
        <p> texto actualizado: {update} </p>
    </div>
  )
}
