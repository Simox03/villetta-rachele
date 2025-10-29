import React from 'react'
export default function Location(){
  return (
    <section className='section'>
      <h2 style={{textAlign:'center'}}>La Posizione</h2>
      <div style={{display:'flex', gap:20, alignItems:'center', flexWrap:'wrap'}}>
        <div style={{flex:1}}>
          <p><strong>Via Carlo Forlanini, 73010 Punta Prosciutto LE, Salento, Puglia</strong></p>
          <ul>
            <li>Spiaggia di Punta Prosciutto: 300 m</li>
            <li>Porto Cesareo: 5 km</li>
            <li>Lecce: 35 km</li>
            <li>Otranto: 60 km</li>
            <li>Torre Lapillo: 7 km</li>
          </ul>
          <a className='btn' href='https://www.google.com/maps' target='_blank' rel='noreferrer'>Vedi su Google Maps</a>
        </div>
        <div style={{flex:1}}>
          <img src='/sample/beach.jpg' alt='spiaggia' style={{width:'100%', borderRadius:8}}/>
        </div>
      </div>
    </section>
  )
}
