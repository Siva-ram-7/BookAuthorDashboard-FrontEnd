import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/Login'
import Layout from './Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Layout/>
    </>
  )
}

export default App