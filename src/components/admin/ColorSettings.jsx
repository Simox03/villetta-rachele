import React, {useState, useEffect} from 'react'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

export default function ColorSettings(){
  const db = getFirestore(app)
  const [primary, setPrimary] = useState('#1fb6b3')

  useEffect(()=>{ load() },[])
  async function load(){
    const d = await getDoc(doc(db,'settings','theme'))
    if(d.exists()) setPrimary(d.data().primary)
  }
  async function save(){
    await setDoc(doc(db,'settings','theme'), { primary })
    document.documentElement.style.setProperty('--primary', primary)
    alert('Salvato')
  }
  return (
    <div style={{marginTop:12}}>
      <h3>Colori Tema</h3>
      <input value={primary} onChange={e=>setPrimary(e.target.value)} />
      <div style={{marginTop:8}}><button className='btn primary' onClick={save}>Salva Colore</button></div>
    </div>
  )
}
