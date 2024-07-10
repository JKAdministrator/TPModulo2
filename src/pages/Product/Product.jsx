import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import { useParams } from 'react-router-dom'
import './Product.css'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../context/ApiContext';
import UserMenu from '../../components/userMenu/UserMenu';
function Product() {

  const {API}                             = useApi();
  const navigate                          = useNavigate();
  let   { id }                            = useParams();
  const [datosProducto,setDatosProducto]  = useState(null);

  useEffect(()=>{
    API.getProduct(id).then(e=>{ e? setDatosProducto(e) : navigate('/404'); }).catch(e=>{ navigate('/404'); });
  }, []);

  const handleVolverClick = (e)=>{ navigate('/home'); }

  return (
    <>
      <UserMenu />
      <form action="" className='product-page'>
        {datosProducto? <ProductCard {...datosProducto} /> : <span className="loader"></span>}
      </form>
      <button type="button" className='product-page-volver' onClick={handleVolverClick}>Volver</button>
    </>
  )
}

export default Product