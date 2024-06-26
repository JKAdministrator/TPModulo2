import React from 'react'
import './LocationHeader.css'
import { useLocation } from 'react-router-dom';
function LocationHeader() {
    const location = useLocation();
  return (
    <nav className='locationHeader'>
        <span>Path : {location.pathname}</span>
    </nav>
  )
}

export default LocationHeader