import React, { useState } from 'react'
import style from './AddPost.module.css'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'



export default function AddPost() {

let [img , setImg] = useState(null)
let [imgSrc , setImgSrc] = useState(null)
let [body , setBody] = useState(null)
let queryClint = useQueryClient()



let addPost = (formdata)=>{

  return axios.post('https://linked-posts.routemisr.com/posts',formdata , {
    headers:{
      token:localStorage.getItem('userToken')
    }
  })



}




let {mutate , isPending} = useMutation({
  mutationFn:addPost ,
  onSuccess:()=>{

queryClint.invalidateQueries({
  queryKey:['getUserPosts']

})  
toast.success('Successfully created!')
},
onError:()=>{
  toast.error('Something went wrong')
}
})











let handleImg = (e)=>{

  let file = e.target.files[0]
  setImg(file)
  let imgUrl = URL.createObjectURL(file)
  setImgSrc(imgUrl)
  
  
}

let  handleFormData = ()=>{

  let formData = new FormData() 
  img && formData.append('image' , img)
  body && formData.append('body' ,body)
  mutate(formData)
  setBody('')
  setImgSrc('')




}

let {handleSubmit} = useForm()

  return <>


{isPending && toast ('loading.....')}
<form onSubmit={handleSubmit(handleFormData)} className='mx-auto w-[50%]'>
  <div className="w-full mb-4  border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
    <div className="flex items-center justify-between px-3 py-2 border-b border-default-medium">
      <div className="flex flex-wrap items-center divide-default-medium sm:divide-x sm:rtl:divide-x-reverse">
        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">

         
         
        <input onChange={handleImg}  type="file" id="image" class="swal2-file rounded-2xl " />
         
        </div>
        
      </div>
    </div>
    <div className="px-4 py-2 relative bg-neutral-secondary-medium rounded-b-base">
      <label htmlFor="editor" className="sr-only">Publish post</label>


      <textarea id="editor" rows={2} className="block w-full px-0 text-sm text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body" placeholder="What is in your mind..." required 
      value={body}
      
      onChange={(e)=>{setBody(e.target.value)}}
      
      
      />


        {<>

        {imgSrc && <div className='relative '>
          
          <img className='size-30 rounded-2xl ' src={imgSrc}></img>
         <span  onClick={()=>{
          setImgSrc(null)
         }} className='absolute -top-3 start-28 cursor-pointer '> <i class="fa-solid fa-xmark"></i></span>
          
          </div>}
        
        
        
        </>
        }


        <button type="submit" className=" absolute end-2 top-3 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Publish post</button>
    </div>
  </div>

</form>


\
  
  
  
  </>
}
