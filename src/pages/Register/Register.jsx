import React from 'react'
import './Register.css'

import backgroundImage from '/img/fondoRegister.jpg';
import { useLocation, useNavigate } from 'react-router-dom'
import LocationHeader from '../../components/locationHeader/LocationHeader';
function Register() {
  const location = useLocation();
  const navigate = useNavigate()
  const onHasUserClick = ()=> {
    navigate('/login');
  }
  return (
    <>
    <LocationHeader />
    <form action="" className='register'>
        <img src={backgroundImage} alt="background image" />
        <section>
            <h1>Registro de usuario</h1>
            <label htmlFor="username">Usuario:</label>
            <input type="text" name="username" id="username" autoComplete='username'/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" autoComplete='password'/>
            <label htmlFor="confirm-password">Confirmar password:</label>
            <input type="password" name="confirm-password" id="confirm-password" autoComplete='password' />
            <button type="button" className='primary'>REGISTRAR</button>
            <button type="button" className='secondary' onClick={onHasUserClick}>Ya tengo usuario!</button>
        </section>
    </form>
    </>
  )
}

export default Register