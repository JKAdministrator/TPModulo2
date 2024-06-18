import React from 'react'
import './Register.css'

import backgroundImage from '/img/fondoRegister.jpg';
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate = useNavigate()
  const onHasUserClick = ()=> {
    navigate('/login');
  }
  return (
    <form action="" className='register'>
        <img src={backgroundImage} alt="background image" />
        <section>
            <h1>Registro de usuario</h1>
            <label htmlFor="username">Usuario:</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confirm-password">Confirmar password:</label>
            <input type="password" name="confirm-password" id="confirm-password" />
            <button type="button" className='primary'>REGISTRAR</button>
            <button type="button" className='secondary' onClick={onHasUserClick}>Ya tengo usuario!</button>
        </section>
    </form>
  )
}

export default Register