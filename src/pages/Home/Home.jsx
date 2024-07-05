import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";

import './Home.css'
import ProductSmallCard from '../../components/productSmallCard/ProductSmallCard';
const importJson = async ()=>{
    const response = await fetch('data/productos.json',{headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }})
    const datos  = await response.json();
    return datos
}   

const isTextInProduct = (producto, valorABuscar)=>{
    const encontrado = producto.nombre.toUpperCase().search(valorABuscar.toUpperCase());
    if(encontrado != -1) return true;
    return false;
}
const getRandomInt =(max) =>{
    return Math.floor(Math.random() * max);
}
const getRandomSizeClassname = (index)=>{
    switch(getRandomInt(10)){
        case 9 :{
            return 'wide';
        }
        case 8:{
            return 'tall';
        }
        default: {
            return '';
        }
    }
}


function Home() {
    const navigate = useNavigate();
    const   [searchParams, setSearchParams]                 = useSearchParams();
    const   [firstRender,setFirstRender]                    = useState(true);
    const   [loading,setLoading]                            = useState(true);
    const   formRef                                         = useRef();
    const   [productSearhValue,setProductSearhValue]        = useState(searchParams.get('name') ? searchParams.get('name') : '' );
    const   [productos,setProductos]                        = useState([]);

    useEffect((e)=>{
        if (firstRender) {
            importJson().then((datos)=>{
                setProductos(datos);
                setLoading(false);
            });
            setFirstRender(false);
            return;
        }
        setProductSearhValue(searchParams.get('name'));
    },[searchParams])

    const handleSalir = (e)=>{
        navigate('/login')
    }
    const HandleSearchInputOnKeyDown = (e)=>{
        setSearchParams({ name: e.target.value });
    }

    const productoFiltrados = productos.filter(producto=>{return isTextInProduct(producto, productSearhValue)});
    return (
        <>
        <div className={`home ${productos.length === 0 ? 'loading' : ''}`}>
            <section>
                <form ref={formRef}>
                    <h1>Luxe Couture Co.</h1>
                    <input type="text" name="searchProductInput" id="searchProductInput" onChange={HandleSearchInputOnKeyDown} value={productSearhValue} autoFocus placeholder='Busca tu nuevo estilo'/>
                    <button onClick={handleSalir} type='button'>Salir</button>
                </form>
                {productoFiltrados.length > 0 && !loading?
                    <ul>
                        {productoFiltrados.map(producto=>{
                            return <ProductSmallCard key={producto.codigo} nombre={producto.nombre} codigo={producto.codigo} precio={producto.precio} imagen={producto.imagen} className={getRandomSizeClassname()} />;
                        })}
                    </ul>
                : <></>}

                {productoFiltrados.length == 0 && !loading?
                    <div className='imageContainer'>
                        <img src="./img/noProductFound.jpg" alt="no product found" srcSet="" />
                    </div>
                 : <></>}
                 {loading?
                    <div className='loader'></div>
                 : <></>}
            </section>
            </div>
        </>
    )
}

export default Home