import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '/img/fondoLogin.jpg';
import LocationHeader from '../../components/locationHeader/LocationHeader';
function Login() {
  const navigate = useNavigate()
  const onNoUserClick = ()=>{
    navigate('/register');
  }
  const onLogin = ()=>{
    navigate('/home')
  }
  return (
    <>
    <LocationHeader />
    <form action="" className='login'>
        <img src={backgroundImage} alt="background image" />
        <section>
            <h1>Login</h1>
            <label htmlFor="username">Usuario:</label>
            <input type="text" name="username" id="username" autoComplete='username'/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" autoComplete='password'/>
            <button type="button" className='primary' onClick={onLogin}>INGRESAR</button>
            <button type="button" className='secondary' onClick={onNoUserClick}>No tengo usuario...</button>
        </section>
    </form>
    </>
  )
}

export default Login