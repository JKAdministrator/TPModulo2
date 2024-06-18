import React from 'react'
import backgroundImage from '/img/fondo404.jpg';
import './NotFound.css'
import { useNavigate } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();
  const onVolverClick = ()=>{
    navigate('/login')
  }
  return (
    <form action="" className='notFound'>
        <img src={backgroundImage} alt="background image" />
        <section>
            <button type='button' onClick={onVolverClick}>Volver al inicio</button>
        </section>
    </form>
  )
}

export default NotFound
