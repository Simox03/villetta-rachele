import React, {useState, useEffect} from 'react'
import { getFirestore, collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

export default function ImagesManager(){
  const [files,setFiles]=useState([])
  const [images,setImages]=useState([])
  const db = getFirestore(app)

  useEffect(()=>{ fetchImages() },[])

  async function fetchImages(){
    const q = query(collection(db,'images'), orderBy('order','asc'))
    const snap = await getDocs(q)
    setImages(snap.docs.map(d=> ({id:d.id, ...d.data()})))
  }

  async function upload(e){
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const file = e.target.files[0]
    if(!file) return
    const form = new FormData()
    form.append('file', file)
    form.append('upload_preset', preset)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/upload`, { method:'POST', body: form })
    const data = await res.json()
    // save metadata to Firestore
    await addDoc(collection(db,'images'), { url: data.secure_url, filename: data.original_filename, tags:[], order: Date.now(), uploadedAt: new Date() })
    fetchImages()
  }

  async function remove(id){
    if(!confirm('Eliminare immagine?')) return
    await deleteDoc(doc(getFirestore(app),'images',id))
    fetchImages()
  }

  return (
    <div style={{marginTop:20}}>
      <h3>Gestione Immagini</h3>
      <input type='file' onChange={upload} />
      <div style={{marginTop:12}} className='gallery-grid'>
        {images.map(img=> (
          <div key={img.id}>
            <img src={img.url} style={{width:200, height:120, objectFit:'cover'}}/>
            <div>
              <button className='btn' onClick={()=>remove(img.id)}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
      <small className='note'>Le immagini vengono caricate su Cloudinary. Crea un upload preset (unsigned) nelle impostazioni Cloudinary.</small>
    </div>
  )
}
