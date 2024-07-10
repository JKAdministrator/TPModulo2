import React , {useEffect, useState}from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '/img/fondoLogin2.jpg';
import LocationHeader from '../../components/locationHeader/LocationHeader';
import {useApi} from '../../context/ApiContext.jsx';
function Login() {
  const navigate = useNavigate();
  const {API, user} = useApi();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [mensajeDeError, setMensajeDeError] = useState(null);

  const [emailError,setEmailError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);

  const onNoUserClick = ()=>{
    navigate('/register');
  }
  const onLogin = async ()=>{
    if(!email || email == '' )        setEmailError(true);
    if(!password || password == '' )  setPasswordError(true);
    if(email && email != '' && password && password != '') {
      setEmailError(false);
      setPasswordError(false);
      setIsLoading(true);
      const respuestaLogin = await API.login(email, password);
      setIsLoading(false);
      setMensajeDeError(respuestaLogin);
    }
      //navigate('/home')
  }

  const onEmailChangeHandler = (e)=>{
    setEmail(e.target.value);
  }
  const onPasswordChangeHandler = (e)=>{
    setPassword(e.target.value);
  }
  useEffect(()=>{
    if(user) navigate('/home');
  },[user]);

  return (
    <>
    <form action="" className='login'>
        <img src={backgroundImage} alt="background image" />
        <section className={isLoading? 'loading' : ''}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" autoComplete='email' value={email} onChange={onEmailChangeHandler} className={emailError? 'error' : ''}/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" autoComplete='password' value={password} onChange={onPasswordChangeHandler} className={passwordError? 'error' : ''}/>
            <button type="button" className='primary' onClick={onLogin}>{isLoading? 'Verificando...' : 'INGRESAR' }</button>
            <button type="button" className='secondary' onClick={onNoUserClick}>No tengo usuario...</button>
            <span className='mensajeError'>{mensajeDeError && !isLoading ? mensajeDeError : ''}</span>
        </section>
    </form>
    </>
  )
}

export default Login