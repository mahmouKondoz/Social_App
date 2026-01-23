import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { data, useNavigate } from 'react-router-dom';
import z, { email } from 'zod';
import Swal from 'sweetalert2'
import { ContextLogin } from '../../Context/ContextLogin';







export default function Login() {
  let [isloading , setIsloading] = useState(false)
  let [showPass , setShowpass] = useState(false)
  let navigate = useNavigate()
  let {setGettoken} = useContext(ContextLogin)

  

let schems = z.object({
 
  email:z.email('Please Enter a valid email address'),
  password:z.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "“Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.”")

})

let form = useForm({
  defaultValues:{
     
    email:"",
    password:"",

  },
  resolver:zodResolver(schems),
  mode:'onTouched',

})
let passwordValue = form.watch('password')

async function hangelRegister(userData){


  
  try {

    setIsloading(true)
    let {data} = await axios.post('https://linked-posts.routemisr.com/users/signin' , userData)
    console.log(data.token);
    localStorage.setItem('userToken',data.token)
    setGettoken(data.token)
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully signed in.',
      icon: 'success',
      confirmButtonText: 'Done'
}).then(()=>{

  setTimeout(()=>{
    navigate('/')
  },1000)

})


  
    
  } catch (error) {

    console.log(error);
    

    Swal.fire({

      title: 'Error!',
      text: 'This password or Email incorrect',
      icon: 'error',
      confirmButtonText: 'Try again'
})
console.log(error);

    
  }
  finally{
    setIsloading(false)
  }
  
  

}
let {register,handleSubmit,formState} = form

  return <>

  
    <form
     onSubmit={handleSubmit(hangelRegister)}
        className="max-w-md  mx-auto p-10 lg:p-0 "
      >
       

        <div className="relative z-0 w-full mb-5 group my-9">
          <input
            type="email"
             {...register('email')}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer"
            placeholder="  "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your email
          </label>
          {formState.errors.email ? <p className='text-center my-3 text-red-700 font-bold'>{formState.errors.email.message}</p> : ""}
        </div>

        <div className="relative z-0 w-full mb-5 group my-9">
         {
          passwordValue ?  <span onClick={()=>{setShowpass(!showPass)}}><i class={`fa-solid ${showPass ? "fa-eye":"fa-eye-slash"} absolute start-80 lg:start-100 p-2`}></i></span>  : ""
         }
          <input
            type={showPass ? "text" : "password"}
           {...register('password')}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer"
            placeholder="  "
          />
          <label
            htmlFor="password"
            className="absolute text-xs text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter your Password
          </label>
          {formState.errors.password ? <p className='text-center my-3 text-red-700 font-bold'>{formState.errors.password.message}</p> : ""}
        </div>
        <button

        disabled={isloading}
          type="submit"
          className={`text-black hover:shadow-2xl shadow-black hover:scale-120 duration-500 bg-sky-300 box-border border border-transparent hover:bg-fg-yellow-strong focus:ring-4 focus:ring-yellow  -medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-non ${isloading?"cursor-not-allowed":"cursor-pointer"}`}
        >
        {isloading ? <i class="fa-solid fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </form>
  
  </>
}
