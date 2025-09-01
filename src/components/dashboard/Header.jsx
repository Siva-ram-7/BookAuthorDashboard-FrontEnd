import React from 'react'
import "./dashboard.css"
import { useNavigate } from 'react-router-dom'
const Header = (props) => {

  const navigate = useNavigate()
  const name = localStorage.getItem('author')
  const {isOpen} = props

  function logout(params) {
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    localStorage.removeItem('author')


    navigate('/login')
    
  }
  return (
    <div className='header'>
      <h4>{name}</h4>
      <h2>Book Author Dashboard</h2>

      <section>
        <button className='p' onClick={()=>isOpen(prev=>!prev)}>Publish</button>

      <button className='l' onClick={logout}>Logout</button>
      </section>
    </div>
  )
}

export default Header