import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import { useLocation, useParams } from 'react-router-dom'
import backgroundImage from '/img/fondoProduct.jpg';
import './Product.css'
import { useNavigate } from 'react-router-dom'
import LocationHeader from '../../components/locationHeader/LocationHeader';


const importJson = async ()=>{
  const response = await fetch('../data/productos.json',{headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }})
  const datos  = await response.json();
  return datos
}   



function Product() {
  const location = useLocation();
  let { id } = useParams();
  const  [datosProducto,setDatosProducto] = useState({
    nombre:'...'
  })
  const navigate = useNavigate()
  useEffect(()=>{
    importJson().then((datos)=>{
        const datoProducto = datos.find((producto)=>{
            return producto.codigo == id;
        })
        if(datoProducto) setDatosProducto(datoProducto)
        else navigate('/404');
    })
    },[])
  const handleVolverClick = (e)=>{
    navigate('/home');
  }
  return (
    <>
      <form action="" className='product-page'>
        <ProductCard {...datosProducto} className='productCard'/>
      </form>
      <button type="button" className='product-page-volver' onClick={handleVolverClick}>Volver</button>
    </>
  )
}

export default Product