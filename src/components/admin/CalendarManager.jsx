import React, {useState, useEffect} from 'react'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

export default function CalendarManager(){
  const db = getFirestore(app)
  const [start,setStart]=useState('2025-06-01')
  const [end,setEnd]=useState('2025-06-07')
  const [items,setItems]=useState([])

  useEffect(()=>{ fetchItems() },[])
  async function fetchItems(){
    const snap = await getDocs(collection(db,'bookings'))
    setItems(snap.docs.map(d=> ({id:d.id, ...d.data()})))
  }
  async function add(){
    await addDoc(collection(db,'bookings'), { start, end, status: 'blocked', note: '' })
    fetchItems()
  }
  return (
    <div style={{marginTop:12}}>
      <h3>Calendario (gestione manuale)</h3>
      <div className='form-row'><label>Da: <input type='date' value={start} onChange={e=>setStart(e.target.value)} /></label></div>
      <div className='form-row'><label>A: <input type='date' value={end} onChange={e=>setEnd(e.target.value)} /></label></div>
      <div><button className='btn primary' onClick={add}>Aggiungi blocco</button></div>
      <div style={{marginTop:12}}>
        <h4>Blocchi esistenti</h4>
        <ul>{items.map(it=> <li key={it.id}>{it.start} → {it.end} ({it.status})</li>)}</ul>
      </div>
    </div>
  )
}
