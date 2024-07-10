import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Login,Product, Register, Home, NotFound} from './pages/index'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useApi } from './context/ApiContext'

function App() {

  const {user, loading, error, API} = useApi();

  return loading ? <></> : 
      <BrowserRouter basename="/TPModulo2">
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
}

export default App
