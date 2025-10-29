import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Hero from './components/Hero'
import Property from './components/Property'
import Availability from './components/Availability'
import Gallery from './components/Gallery'
import Services from './components/Services'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div>
            <Hero/>
            <Property/>
            <Availability/>
            <Gallery/>
            <Services/>
            <Location/>
            <Contact/>
            <Footer/>
          </div>
        }/>
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}
