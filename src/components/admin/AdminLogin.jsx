import React, {useState} from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../..//firebaseConfig' // ensure firebase app init
export default function AdminLogin(){
  const [email,setEmail]=useState('admin@villettarachele.it')
  const [password,setPassword]=useState('ChangeMe123!')
  const navigate=useNavigate()
  const login=async(e)=>{ e.preventDefault(); const auth=getAuth(); try{ await signInWithEmailAndPassword(auth,email,password); navigate('/admin/dashboard') }catch(err){ alert('Login fallito: '+err.message) } }
  return (
    <div className='admin-panel'>
      <h2>Area Admin — Villetta Rachele</h2>
      <form onSubmit={login}>
        <div className='form-row'><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className='form-row'><input type='password' value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div><button className='btn primary' type='submit'>Accedi</button></div>
      </form>
      <p className='note'>Nota: crea l'utente admin in Firebase Console → Authentication → Add user (email: admin@villettarachele.it)</p>
    </div>
  )
}
