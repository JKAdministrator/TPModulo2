import React, { useEffect, useState } from 'react'
import './ProductCard.css'



function ProductCard({codigo, nombre, descripcion, precio, color, genero, imagen}) {
    
    return (
      <div class="product-card">
        <div class="badge">Hot</div>
        <div class="product-tumb">
          <img src={`../img/productos/${imagen}`} alt="imagen de producto" srcSet=''/>
        </div>
        <div class="product-details">
          <span class="product-catagory">Genero: {genero}</span>
          <span class="product-catagory">Color: {color}</span>
          <h4><a href="">{nombre}</a></h4>
          <p>{descripcion}</p>
          <div class="product-bottom-details">
            <div class="product-price"><small>{precio * 2}</small>{precio}</div>
            <div class="product-links">
              <a href=""><i class="fa fa-heart"></i></a>
              <a href=""><i class="fa fa-shopping-cart"></i></a>
            </div>
          </div>
        </div>
      </div>
  )

}

export default ProductCard