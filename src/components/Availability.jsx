import React, {useState} from 'react'
export default function Availability(){
  const [month, setMonth] = useState(new Date())
  return (
    <section id='availability' className='section'>
      <h2 style={{textAlign:'center'}}>Disponibilità</h2>
      <p style={{textAlign:'center'}}>Verifica le nostre disponibilità da maggio a ottobre.</p>
      <div style={{textAlign:'center', marginTop:12}}>
        <div style={{display:'inline-block', padding:20, border:'1px solid #eee', borderRadius:8}}>Calendario interattivo (mese corrente) — gestione manuale da Admin.</div>
      </div>
    </section>
  )
}
