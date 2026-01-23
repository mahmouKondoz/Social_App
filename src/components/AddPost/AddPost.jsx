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
  <div className="w-full mb-4 border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
  <div className="flex flex-wrap items-center justify-between px-3 py-2 border-b border-default-medium gap-2">
    <input
      onChange={handleImg}
      type="file"
      id="image"
      className="swal2-file rounded-xl text-xs sm:text-sm w-full sm:w-auto"
    />
  </div>

  <div className="px-3 sm:px-4 py-2 relative bg-neutral-secondary-medium rounded-b-base">
    <textarea
      rows={2}
      className="block w-full px-0 text-sm sm:text-base text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body resize-none"
      placeholder="What is in your mind..."
      required
      value={body}
      onChange={(e) => setBody(e.target.value)}
    />

    {imgSrc && (
      <div className="relative mt-3 w-fit">
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl"
          src={imgSrc}
          alt=""
        />
        <span
          onClick={() => setImgSrc(null)}
          className="absolute -top-2 -end-2 cursor-pointer bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          <i className="fa-solid fa-xmark text-xs"></i>
        </span>
      </div>
    )}

    <div className="flex justify-end mt-3">
      <button
        type="submit"
        className="text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-xs sm:text-sm px-3 sm:px-4 py-2 focus:outline-none"
      >
        Publish post
      </button>
    </div>
  </div>
</div>

</form>



  
  
  
  </>
}
