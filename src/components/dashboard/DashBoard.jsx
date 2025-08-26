import React, { useState } from 'react'
import Header from './Header'
import Form from './Form'
import DescritionForm from './DescriptionForm'
import "../../app.css"
import BookList from './BookList'
const DashBoard = () => {
    const [openForm ,setOpenForm] = useState(false)
    const [openForm2 ,setOpenForm2] = useState(false)
    const [load , setLoad] = useState({state :false , msg: ""})
        const [form , setForm] = useState({
        title : "",
genre : "",
price : "",
description: "",
keywords : "",
coverUrl: "",
pdfUrl : "",
status : "process",
text : ""
    })

    console.log(load);
    
  return (
    <div className='dashboard'>
    <Header isOpen={setOpenForm} form={form} setForm={setForm}  />

{(!openForm && !openForm2)&& <BookList/>}
 {openForm &&    <Form  isOpen={setOpenForm} form={form} setForm={setForm} isOpen2={setOpenForm2} load={load} setLoad={setLoad}/>}
 {openForm2 &&    <DescritionForm  isOpen={setOpenForm} form={form} isOpen2={setOpenForm2} setForm={setForm} load={load} setLoad={setLoad}/>}

{    load.state&& <div className="loader-hold">
         <div className="loader">  </div>

         <div className="load-msg">
        {load.msg}
         </div>
     </div>}
    </div>
  )
}

export default DashBoard