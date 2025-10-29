import React from 'react'

export default function Hero(){
  return (
    <section className='hero'>
      <div className='hero-overlay'></div>
      <div className='content'>
        <h1 style={{fontSize:48}}>Villetta Rachele</h1>
        <p style={{fontSize:18, maxWidth:800, margin:'12px auto'}}>Scopri l'autenticità della Puglia nella nostra casa tradizionale, immersa tra ulivi e la bellezza del paesaggio mediterraneo</p>
        <div style={{marginTop:18}}>
          <a href="#availability" className="btn primary">📅 Richiedi Disponibilità</a>
          <a href="#contact" className="btn outline">📞 Contattaci</a>
          <a href="https://www.booking.com" target="_blank" rel="noreferrer" className="btn">Prenota su Booking.com</a>
          <a href="https://www.airbnb.com" target="_blank" rel="noreferrer" className="btn">Prenota su Airbnb</a>
        </div>
      </div>
    </section>
  )
}
