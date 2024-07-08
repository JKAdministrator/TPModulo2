import React from 'react'
import './ProductSmallCard.css'
import { useNavigate } from "react-router-dom";

function ProductSmallCard({nombre,SKU, precio, imagen, className }) {
    const navigate = useNavigate();
    const handleProductOnClick = (e)=>{
        console.log('handleProductOnClick()',{SKU});
        navigate(`/product/${SKU}`);
    }
  return (
    <li className={`product ${className}`} onClick={handleProductOnClick}>
        <div className='imageContainer'>
            <img src={`./img/productos/${imagen}`} alt="imagen de producto" srcSet="" />
        </div>
        <span className='name'>{nombre}</span>
        <span className='price'>{precio}</span>
    </li>
  )
}



export default ProductSmallCard