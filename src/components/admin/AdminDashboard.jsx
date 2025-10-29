import React from 'react'
import ImagesManager from './ImagesManager'
import ColorSettings from './ColorSettings'
import CalendarManager from './CalendarManager'
export default function AdminDashboard(){
  return (
    <div className='admin-panel'>
      <h2>Admin Dashboard</h2>
      <p>Benvenuto, Rachele Admin</p>
      <ColorSettings />
      <ImagesManager />
      <CalendarManager />
    </div>
  )
}
