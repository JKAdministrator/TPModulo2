import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import './Home.css'
import ProductSmallCard from '../../components/productSmallCard/ProductSmallCard';
import { useApi } from '../../context/ApiContext';
import UserMenu from '../../components/userMenu/UserMenu';

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
    const   navigate                                    = useNavigate();
    const   [searchParams, setSearchParams]             = useSearchParams();
    const   [firstRender,setFirstRender]                = useState(true);
    const   [loading,setLoading]                        = useState(true);
    const   formRef                                     = useRef();
    const   [productSearhValue,setProductSearhValue]    = useState(searchParams.get('name') ? searchParams.get('name') : '' );
    const   [productos,setProductos]                    = useState([]);
    const   {user, API}                                 = useApi();
    useEffect((e)=>{
        if (firstRender) {
            API.getProducts().then(e=>{
                setProductos(e);
                setLoading(false);
                setFirstRender(false);
            }).catch(e=>{
                console.error(e);
                setFirstRender(false);
            })
            return;
        }
        setProductSearhValue(searchParams.get('name'));
    },[searchParams])


    const HandleSearchInputOnKeyDown = (e)=>{
        setSearchParams({ name: e.target.value });
    }

    const productoFiltrados = productos.filter(producto=>{return isTextInProduct(producto, productSearhValue)});
    return (
        <>
        <UserMenu />
        <div className={`home ${productos.length === 0 ? 'loading' : ''}`}>
            <section>
                <form ref={formRef}>
                    <h1>Luxe Couture Co.</h1>
                    <input type="text" name="searchProductInput" id="searchProductInput" onChange={HandleSearchInputOnKeyDown} value={productSearhValue} autoFocus placeholder='Busca tu nuevo estilo'/>
                </form>
                {productoFiltrados.length > 0 && !loading?
                    <ul>
                        {productoFiltrados.map(producto=>{
                            return <ProductSmallCard key={producto.SKU} nombre={producto.nombre} SKU={producto.SKU} precio={producto.precio} imagen={producto.imagen} className={getRandomSizeClassname()} />;
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