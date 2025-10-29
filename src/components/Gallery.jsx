import React from 'react'

const sample = [
  '/sample/1.jpg','/sample/2.jpg','/sample/3.jpg','/sample/4.jpg','/sample/5.jpg','/sample/6.jpg'
]

export default function Gallery(){
  return (
    <section className='section'>
      <h2 style={{textAlign:'center'}}>Galleria Fotografica</h2>
      <p style={{textAlign:'center'}}>Esplora gli ambienti della villetta.</p>
      <div className='gallery-grid' style={{marginTop:16}}>
        {sample.map((s,i)=> <img key={i} src={s} alt={'Foto '+(i+1)} />)}
      </div>
    </section>
  )
}
