import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { data, useNavigate } from 'react-router-dom';
import z, { email } from 'zod';
import Swal from 'sweetalert2'







export default function Register() {
  let [isloading , setIsloading] = useState(false)
  let [showPass , setShowpass] = useState(false)
  let navigate = useNavigate()

  

let schems = z.object({
  name:z.string().min(2,'"You have to enter between 2 to 15 chars"').max(15,'"You have to enter between 2 to 15 chars"'),
  email:z.email('Please Enter a valid email address'),
  password:z.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "“Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.”"),
  rePassword:z.string(),
  dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((x)=>{

    let currentDate = new Date()
    currentDate.getHours(0,0,0,0)
    let userDate = new Date(x)

    return userDate < currentDate


  },"You can not use a future date") ,
  gender:z.enum(['male','female'],'You can just select male or female')

}).refine((obj)=>{
 return obj.password === obj.rePassword
} , {
error:"“The passwords you entered don’t match. Try again.”",
  path:['rePassword']
})

let form = useForm({
  defaultValues:{
    name:"" , 
    email:"",
    password:"",
    rePassword:"",    
    dateOfBirth:"",
    gender:"" ,

  },
  resolver:zodResolver(schems),
  mode:'onTouched',

})
let passwordValue = form.watch('password')

async function hangelRegister(data){


  
  try {

    setIsloading(true)
    let x = await axios.post('https://linked-posts.routemisr.com/users/signup' , data)
    console.log(x);
    Swal.fire({
      title: 'Success!',
      text: 'Your account has been created successfully.',
      icon: 'success',
      confirmButtonText: 'Login'
}).then(()=>{

  setTimeout(()=>{
    navigate('/login')
  },1000)

})


  
    
  } catch (error) {

    console.log(error);
    

    Swal.fire({

      title: 'Error!',
      text: 'User already exists.',
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
      type="text"
      {...register("name")}
      id="name"
      className="block w-full py-2.5 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-sky-300 peer"
      placeholder=" "
    />
    <label
      htmlFor="name"
      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 origin-[0]
      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
      peer-focus:-translate-y-6 peer-focus:scale-75"
    >
      Enter your name
    </label>
    {formState.errors.name && (
      <p className="mt-2 text-center text-sm text-red-600 font-semibold">
        {formState.errors.name.message}
      </p>
    )}
  </div>

  
  <div className="relative w-full mb-6">
    <input
      type="email"
      {...register("email")}
      id="email"
      className="block w-full py-2.5 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-sky-300 peer"
      placeholder=" "
    />
    <label
      htmlFor="email"
      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 origin-[0]
      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
      peer-focus:-translate-y-6 peer-focus:scale-75"
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
      className="block w-full py-2.5 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-sky-300 peer"
      placeholder=" "
    />
    <label
      htmlFor="password"
      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 origin-[0]
      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
      peer-focus:-translate-y-6 peer-focus:scale-75"
    >
      Enter your password
    </label>
    {formState.errors.password && (
      <p className="mt-2 text-center text-sm text-red-600 font-semibold">
        {formState.errors.password.message}
      </p>
    )}
  </div>

  
  <div className="relative w-full mb-6">
    <input
      type="password"
      {...register("rePassword")}
      id="rePassword"
      className="block w-full py-2.5 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-sky-300 peer"
      placeholder=" "
    />
    <label
      htmlFor="rePassword"
      className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 origin-[0]
      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
      peer-focus:-translate-y-6 peer-focus:scale-75"
    >
      Confirm your password
    </label>
    {formState.errors.rePassword && (
      <p className="mt-2 text-center text-sm text-red-600 font-semibold">
        {formState.errors.rePassword.message}
      </p>
    )}
  </div>

  
  <div className="relative w-full mb-6">
    <input
      type="date"
      {...register("dateOfBirth")}
      id="dateOfBirth"
      className="block w-full py-2.5 text-sm bg-transparent border-0 border-b-2 border-default-medium focus:outline-none focus:border-sky-300"
    />
    {formState.errors.dateOfBirth && (
      <p className="mt-2 text-center text-sm text-red-600 font-semibold">
        {formState.errors.dateOfBirth.message}
      </p>
    )}
  </div>

  
  <fieldset className="flex gap-6 mb-6">
    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        type="radio"
        {...register("gender")}
        value="male"
        defaultChecked
        className="w-4 h-4 accent-sky-300"
      />
      Male
    </label>

    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        type="radio"
        {...register("gender")}
        value="female"
        className="w-4 h-4 accent-pink-500"
      />
      Female
    </label>
  </fieldset>

  {formState.errors.gender && (
    <p className="mb-4 text-center text-sm text-red-600 font-semibold">
      {formState.errors.gender.message}
    </p>
  )}

  
  <button
    disabled={isloading}
    type="submit"
    className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-300 text-black rounded-lg px-6 py-2.5 font-medium duration-300 hover:scale-105 hover:shadow-xl ${
      isloading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
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
