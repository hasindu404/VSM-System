import React, { useState } from 'react';
import axios from 'axios';

function firstmail() {
    const [email,setEmail] = useState("");
    const handleMail = ()=>{
        axios.post('http://127.0.0.1:8000/send-mail',{
            email: email
        }).then(res=>{
            console.log(res);
        }).catch(e=>{
            console.error(e);
        })
    }
  return (
    <div>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" name="mail" id="mail" />
        <button onClick={handleMail}>Send Email</button>
    </div>
  )
}

export default firstmail
