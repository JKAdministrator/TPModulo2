import React, { useEffect, useState } from 'react'
import backgroundImage from '/img/fondoHome.jpg';
import { useNavigate, useParams } from 'react-router-dom'
import LocationHeader from '../../components/locationHeader/LocationHeader';
import './Home.css'
const importJson = async ()=>{
    const response = await fetch('data/productos.json',{headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }})
    const datos  = await response.json();
    return datos
}   

function Home() {
    
  const navigate = useNavigate()
  const  [productos,setProductos] = useState([])
  const  [productoSeleccionado,setProductoSeleccionado] = useState(null)

 useEffect(()=>{
    importJson().then((datos)=>{
        setProductos(datos)
        setProductoSeleccionado(datos[0].codigo)
    })

 },[])
 const handleOnProductSelected = (e)=>{
    navigate(`/product/${productoSeleccionado}`);
 }
 const handleSetProductoSeleccionado = (e)=>{
    const value = e.currentTarget.value;
    setProductoSeleccionado(value)
 }
  return (
    <>
    <LocationHeader />
    <form action="" className='home'>
        <img src={backgroundImage} alt="background image" />
        <section>
            <h1>Busqueda de producto</h1>
            <select name="nombre" id="nombre" disabled={productos.length > 0? false : true} onChange={handleSetProductoSeleccionado}>
                {productos.length > 0 ? productos.map((producto)=>{
                    return <option key={producto.codigo} value={producto.codigo} >{producto.nombre}</option>
                }) : <option key='-1' value='' disabled>Cargando...</option>}
            </select>
            <button type='button' className='primary' onClick={handleOnProductSelected}>VER</button>
        </section>
    </form>
    </>
  )
}

export default Home