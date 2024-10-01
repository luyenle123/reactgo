import React, { useState } from 'react'
import '../../styles/contactus.css';

export default function ContactUs(){
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);

        console.log(JSON.stringify(inputs));
      }    

  return (
    <div className='contactus-container'>
        <div className='contactus-header'>
            Contact Us
        </div>

        <div className='contactus-body'>
            <form onSubmit={handleSubmit}>
                <div className='contactus-form-control'>
                    <input type='text' name='enquiry' placeholder='Enquiry' onChange={handleChange}></input>
                </div>
                <div className='contactus-form-control-flex'>
                    <div className='contactus-form-control float-left p-right-5'>
                        <input type='text' name='firstname' placeholder='First name' onChange={handleChange}></input>
                    </div>
                    <div className='contactus-form-control float-right p-left-5'>
                        <input type='text' name='lastname' placeholder='Last name' onChange={handleChange}></input>
                    </div>
                </div>

                <div className='contactus-form-control-flex'>
                    <div className='contactus-form-control float-left p-right-5'>
                        <input type='text' name='email' placeholder='Email' onChange={handleChange}></input>
                    </div>
                    <div className='contactus-form-control float-right p-left-5'>
                        <input type='text' name='contactnumber' placeholder='Contact number' onChange={handleChange}></input>
                    </div>
                </div>

                <div className='contactus-form-control'>
                    <textarea name='message' onChange={handleChange} placeholder='Message'></textarea>
                </div>

                <div className='contactus-form-control'>
                    <label className='contactus-form-control-checkbox'>
                        <input type="checkbox" name="chk1"/> 
                        <span>By continuing, you agree to GO GO</span>
                    </label>
                </div>

                <div className='contactus-form-control'>
                    <label className='contactus-form-control-checkbox'>
                        <input type="checkbox" name="chk2"/> 
                        <span>Agree to GO GO</span>
                    </label>
                </div>

                <div className='contactus-form-control'>
                    <div className='contactus-form-control-buttons'>
                        <button>SEND</button>
                    </div>
                </div>                

            </form>
        </div>
    </div>
  )
}
