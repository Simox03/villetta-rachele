import React from 'react'
export default function Property(){
  return (
    <section className='section'>
      <h2 style={{textAlign:'center'}}>La Proprietà</h2>
      <p style={{textAlign:'center', maxWidth:800, margin:'10px auto'}}>A soli 300 metri dalla splendida spiaggia di Punta Prosciutto, Villetta Rachele è stata recentemente ristrutturata unendo autenticità e comfort moderno.</p>
      <div className='cards'>
        <div className='card'>Casa Ristrutturata</div>
        <div className='card'>Fino a 7 Ospiti</div>
        <div className='card'>2 Camere + Divano Letto</div>
        <div className='card'>Cucina Attrezzata</div>
      </div>
    </section>
  )
}
