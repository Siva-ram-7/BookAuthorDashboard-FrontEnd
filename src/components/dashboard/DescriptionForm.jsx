import React, { useEffect, useState } from 'react'
import { bookUpdateReq, generateDescription } from '../../Api';
import "./dashboard.css"
const DescritionForm = (props) => {
  const { isOpen, isOpen2,form, setForm , setLoad} = props;



function handleChange(e) {
    const {name, value} = e.target
    setForm({...form,
        [name] : value
    })
}

// console.log(form);



async function handleUpdateReq(params) {
  setLoad({state :true , msg:"Updating Description and KeyWords"})
  const {description , keywords ,id} = form
  await bookUpdateReq({description, keywords} , id)
  setLoad({state : true ,msg: "Book Published."})

 setTimeout(() => {
  setLoad({state : false ,msg: ""})
  isOpen2(false)
}, 600);



  setForm({
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

}


  return (
       <div className="formContainer">
      <h3>We’ve generated a book description using AI. Are you happy with it?</h3>

<h5>Description</h5>
      <textarea
        type="text"
        name="description"
        placeholder="Please Enter a Title"
        onChange={(e) => handleChange(e)}
        value={form.description}
      />
<h5>Keywords</h5>
   
   <textarea type="text" name="keywords" value={form.keywords}  onChange={handleChange}/>

      <button onClick={handleUpdateReq}>Submit</button>
    </div>
  )
}

export default DescritionForm