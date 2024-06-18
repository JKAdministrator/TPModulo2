import React, { useEffect, useState } from 'react'
import './ProductCard.css'



function ProductCard({codigo, nombre, descripcion, precio}) {
    
    return (
    <section className='productCard'>
        <h1>{nombre}</h1>
        <label htmlFor='detalle'>Detalle:</label>
        <span type="text" name="codigo" id="codigo" disabled value={codigo}/>
        <textarea name="detalle" id="detalle" value={descripcion} disabled />
        <span type="text" name="precio" id="precio" disabled >{precio}</span>
        <button type='button' className='primary'>COMPRAR</button>
    </section>
  )

}

export default ProductCard