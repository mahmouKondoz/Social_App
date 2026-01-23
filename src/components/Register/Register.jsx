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
        className="max-w-md  mx-auto p-10 lg:p-0 "
      >
        <div className="relative z-0 w-full mb-5 group my-9">
          <input
            type="text"
            {...register('name')}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer"
            placeholder="  "
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Name
          </label>
          {formState.errors.name ? <p className='text-center my-3 text-red-700 font-bold'>{formState.errors.name.message}</p> : ""}
        </div>

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
          passwordValue ?  <span onClick={()=>{setShowpass(!showPass)}}><i class={`fa-solid ${showPass ? "fa-eye":"fa-eye-slash"} absolute start-80 lg:start-100 top-2`}></i></span>  : ""
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


        <div className="relative z-0 w-full mb-5 group my-9">
          <input
            type="password"
           {...register('rePassword')}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer"
            placeholder="  "
          />
          <label
            htmlFor="rePassword"
            className="absolute text-xs text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Confirm Your Password
          </label>
          {formState.errors.rePassword ? <p className='text-center my-3 text-red-700 font-bold'>{formState.errors.rePassword.message}</p> : ""}
        </div>

        <div className="relative z-0 w-full mb-5 group my-9">
          <input
            type="date"
            {...register('dateOfBirth')}
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer"
            placeholder="  "
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Your Date of Birth
          </label>
           {formState.errors.dateOfBirth ? <p className='text-center my-3 text-red-700 font-bold'>{formState.errors.dateOfBirth.message}</p> : ""}
        </div>

        <fieldset className="flex gap-4 py-4">
          <div className="flex items-center mb-4">
            <input
              id="male"
              type="radio"
              {...register('gender')}
              defaultValue="male"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-pink-700 focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="male"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Male
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="female"
              type="radio"
              {...register('gender')}
              defaultValue="female"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border- focus:ring-2 focus:outline-none focus:ring-pink-700-subtle border border-default appearance-none"
            />
            <label
              htmlFor="female"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Female
            </label>
             {formState.errors.gender ? <p className='text-center my-3 text-red-700 font-bold'>{formState.errors.gender.message}</p> : ""}
          </div>
        </fieldset>
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
