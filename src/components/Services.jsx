import React from 'react'
export default function Services(){
  const items = ['WiFi Gratuito','Parcheggio Privato Gratuito','Grande Giardino con ulivi','Aria Condizionata','Vicinissima al Mare','Terrazza panoramica']
  return (
    <section className='section'>
      <h2 style={{textAlign:'center'}}>Servizi & Comfort</h2>
      <div className='cards' style={{marginTop:12}}>
        {items.map((it,i)=> <div key={i} className='card'>{it}</div>)}
      </div>
    </section>
  )
}
