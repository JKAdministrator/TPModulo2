import React, {useState} from 'react'
import './Register.css'

import backgroundImage from '/img/fondoRegister.jpg';
import { useLocation, useNavigate } from 'react-router-dom'
import LocationHeader from '../../components/locationHeader/LocationHeader';
import {useApi} from '../../context/ApiContext.jsx';
function Register() {
  const location = useLocation();
  const navigate = useNavigate()
  
  const { API} = useApi();

  const [mensajeDeError, setMensajeDeError] = useState(null);

  const [isLoading,setIsLoading] = useState(false);

  const [nombre,setNombre]      = useState('');
  const [apellido,setApellido]  = useState('');
  const [email,setEmail]        = useState('');
  const [password,setPassword]  = useState('');

  const [nombreError,setNombreError]      = useState(false);
  const [apellidoError,setApellidoError]  = useState(false);
  const [emailError,setEmailError]        = useState(false);
  const [passwordError,setPasswordError]  = useState(false);
  const [registroExitoso,setRegistroExitoso]  = useState(false);

  const onHasUserClick = ()=> {
    navigate('/login');
  }

  const onRegisterClick = async (e)=> {
    if(!nombre || nombre == '' )      setNombreError(true);
    if(!apellido || apellido == '' )  setApellidoError(true);
    if(!email || email == '' )        setEmailError(true);
    if(!password || password == '' )  setPasswordError(true);
    if(nombre && nombre != '' && apellido && apellido != '' && email && email != '' && password && password != '') {
      setNombreError(false);
      setApellidoError(false);
      setEmailError(false);
      setPasswordError(false);
      setIsLoading(true);
      const respuestaRegister = await API.register(nombre, apellido, email, password);
      setIsLoading(false);
      if(!respuestaRegister) setRegistroExitoso(true);
      setMensajeDeError(respuestaRegister);
    }
    //navigate('/login');
  }

  return (
    <>
    <form action="" className='register'>
        <img src={backgroundImage} alt="background image" />
        <section className={isLoading? 'loading' : ''}>
        <h1>Registro de usuario</h1>
          {!registroExitoso ?
            <>
              <label htmlFor="username">Nombre:</label>
              <input type="text" name="username" id="username" autoComplete='username' value={nombre} className={nombreError? 'error' : ''} onChange={(e)=>{setNombre(e.target.value)}} />
              <label htmlFor="lastname">Apellido:</label>
              <input type="text" name="lastname" id="lastname" autoComplete='lastname' value={apellido} className={apellidoError? 'error' : ''} onChange={(e)=>{setApellido(e.target.value)}}/>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" autoComplete='email' value={email} className={emailError? 'error' : ''} onChange={(e)=>{setEmail(e.target.value)}}/>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" autoComplete='password' value={password} className={passwordError? 'error' : ''} onChange={(e)=>{setPassword(e.target.value)}}/>
              <button type="button" className='primary' onClick={onRegisterClick}>{isLoading? 'Registrando...' : 'REGISTRAR' }</button>
              <button type="button" className='secondary' onClick={onHasUserClick}>Ya tengo usuario!</button>
              <span className='mensajeError'>{mensajeDeError && !isLoading ? mensajeDeError : ''}</span>
            </>
            :
            <>
            <label>Registro de usuario exitoso</label>
            <button type="button" className='primary' onClick={(e)=>{
              navigate('/login');
            }}>INGRESAR</button>
            </>
        }
        </section>
    </form>
    </>
  )
}

export default Register