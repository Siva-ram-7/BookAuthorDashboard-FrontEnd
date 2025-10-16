import React, { useEffect } from 'react'
import {BrowserRouter , Routes ,Route, useNavigate, useLocation, replace} from 'react-router-dom'
import Login from './components/Login/Login'
import DashBoard from './components/dashboard/DashBoard'
import SingleBookpage from './components/Singlebook/SingleBookpage'
import PageNotFount from './components/PageNotFount'
const Router = () => {
  const navigation = useNavigate()
  const loaction = useLocation()
  useEffect(() => {
    const email = localStorage.getItem('email')
    const userId = localStorage.getItem('userId')
    

    if ((!email || !userId ) && loaction.pathname !=="/login" ) {
      navigation('/login' , {replace: true})
    }

    if (email && userId && loaction.pathname == '/login') {
      navigation('/' ,{replace : true})
    }

    else{
      return;
    }

  }, [navigation , loaction])
  
  return (
    <Routes>
        <Route  path='/login'  element={<Login/>} />
        <Route path='/'  element={<DashBoard/>}/>
        <Route path='/viewBook/:bookId'  element={<SingleBookpage/>}/>
        <Route path='*'  element={<PageNotFount/>}/>
    </Routes>
    

  )
}

export default Router