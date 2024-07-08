import React, { useEffect, useState } from 'react'
import './ProductCard.css'



function ProductCard({SKU, nombre, descripcion, precio, color, genero, imagen}) {
    return (
      SKU? 
      <div className="product-card">
        <div className="badge">Hot</div>
        <div className="product-tumb">
          <img src={`../img/productos/${imagen}`} alt="imagen de producto" srcSet=''/>
        </div>
        <div className="product-details">
          <span className="product-catagory">Genero: {genero}</span>
          <span className="product-catagory">Color: {color}</span>
          <span className="product-catagory">SKU: {SKU}</span>
          <h4><a href="">{nombre}</a></h4>
          <p>{descripcion}</p>
          <div className="product-bottom-details">
            <div className="product-price"><small>{precio * 2}</small>{precio}</div>
            <div className="product-links">
              <a href=""><i className="fa fa-heart"></i></a>
              <a href=""><i className="fa fa-shopping-cart"></i></a>
            </div>
          </div>
        </div>
        <button type="button" className='product-buy'>COMPRAR</button>
      </div> : <></>
  )

}

export default ProductCard