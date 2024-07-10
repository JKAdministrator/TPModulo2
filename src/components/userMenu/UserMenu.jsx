import React from 'react'
import { useApi } from '../../context/ApiContext';
import './UserMenu.css'
import { useNavigate } from 'react-router-dom'
function UserMenu() {
    const   {user}                                 = useApi();
    const navigate                          = useNavigate();
    const handleSalir = (e)=>{
        navigate('/login')
    }
    return (
        <button className='userMenu' onClick={handleSalir} type='button'>(<span> {user?.email} </span>) Logout</button>
    )
}

export default UserMenu