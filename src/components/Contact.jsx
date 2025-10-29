import React, {useState} from 'react'
export default function Contact(){
  const [name,setName] = useState(''); const [email,setEmail] = useState(''); const [phone,setPhone] = useState(''); const [message,setMessage] = useState('')
  const submit = (e)=>{ e.preventDefault(); alert('Messaggio inviato (demo).') }
  return (
    <section id='contact' className='section'>
      <h2 style={{textAlign:'center'}}>Contattaci</h2>
      <div style={{display:'flex', gap:20, flexWrap:'wrap'}}>
        <div style={{flex:1}}>
          <p><strong>Contatti</strong></p>
          <p>Email: info@villettarachele.it</p>
          <p>Telefono: +39 123 456 7890</p>
        </div>
        <div style={{flex:1}}>
          <form onSubmit={submit}>
            <div className='form-row'><input placeholder='Il tuo nome' value={name} onChange={e=>setName(e.target.value)} required/></div>
            <div className='form-row'><input placeholder='La tua email' value={email} onChange={e=>setEmail(e.target.value)} required/></div>
            <div className='form-row'><input placeholder='Telefono' value={phone} onChange={e=>setPhone(e.target.value)} /></div>
            <div className='form-row'><textarea placeholder='Il tuo messaggio...' value={message} onChange={e=>setMessage(e.target.value)} /></div>
            <div><button className='btn primary' type='submit'>Invia Richiesta</button></div>
          </form>
        </div>
      </div>
    </section>
  )
}
