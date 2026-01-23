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
  className="max-w-md mx-auto px-4 sm:px-6 lg:px-0 py-10"
>
 
  <div className="relative w-full mb-6">
    <input
      type="email"
      {...register("email")}
      id="email"
      className="block w-full py-2.5 text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:ring-0 focus:border-sky-300 peer"
      placeholder=" "
    />
    <label
      htmlFor="email"
      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
    >
      Enter your email
    </label>
    {formState.errors.email && (
      <p className="mt-2 text-center text-sm text-red-600 font-semibold">
        {formState.errors.email.message}
      </p>
    )}
  </div>

  
  <div className="relative w-full mb-6">
    {passwordValue && (
      <button
        type="button"
        onClick={() => setShowpass(!showPass)}
        className="absolute right-2 top-2 text-gray-500 hover:text-black"
      >
        <i
          className={`fa-solid ${
            showPass ? "fa-eye" : "fa-eye-slash"
          }`}
        ></i>
      </button>
    )}

    <input
      type={showPass ? "text" : "password"}
      {...register("password")}
      id="password"
      className="block w-full py-2.5 text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:ring-0 focus:border-sky-300 peer"
      placeholder=" "
    />
    <label
      htmlFor="password"
      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
    >
      Enter your password
    </label>

    {formState.errors.password && (
      <p className="mt-2 text-center text-sm text-red-600 font-semibold">
        {formState.errors.password.message}
      </p>
    )}
  </div>

  
  <button
    disabled={isloading}
    type="submit"
    className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-300 text-black rounded-lg px-6 py-2.5 font-medium duration-300 hover:scale-105 hover:shadow-xl ${
      isloading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
    }`}
  >
    {isloading ? (
      <i className="fa-solid fa-spinner fa-spin"></i>
    ) : (
      "Submit"
    )}
  </button>
</form>
  
  </>
}
