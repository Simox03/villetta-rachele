import React from 'react'
export default function Footer(){
  return (
    <footer className='footer'>
      <div style={{maxWidth:1100, margin:'0 auto', display:'flex', gap:20, flexWrap:'wrap', justifyContent:'space-between'}}>
        <div><h3>Villetta Rachele</h3><p>Casa tradizionale vicino al mare</p></div>
        <div><h4>Contatti</h4><p>info@villettarachele.it<br/>+39 123 456 7890</p></div>
        <div><h4>Seguici</h4><p>Facebook • Instagram</p></div>
      </div>
      <div style={{textAlign:'center', marginTop:12}}>© 2025 Villetta Rachele. Tutti i diritti riservati.</div>
    </footer>
  )
}
