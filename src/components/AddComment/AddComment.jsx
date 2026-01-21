import React, { useState } from 'react'
import style from './AddComment.module.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AddComment({id}) {

  let [content , setContent] = useState('')
  let [post , setPost] = useState(id)

  let clint = useQueryClient()

  let CreateComment = (fromComments)=>{
    return axios.post(`https://linked-posts.routemisr.com/comments` ,fromComments ,{
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
  }
  


  let {mutate , isPending} = useMutation({
    mutationFn:CreateComment , 
    onSuccess:()=>{
      toast.success('Done!')
      , clint.invalidateQueries({
        queryKey:['singlepost']
      })
      
    },
    onError:()=>{
      toast.error('Error')
    }
  })


  let handleComment = ()=>{
    
   mutate({
    content:content,
    post:post
   })
   setContent('')

   
   

    


  }

  let {handleSubmit} = useForm()

  
  return <>

  {isPending && toast('loading....')}

  <div>

<form onSubmit={handleSubmit(handleComment) }>
  <label htmlFor="chat" className="sr-only">Your message</label>
  <div className="flex items-center px-3 py-2 rounded-base bg-neutral-secondary-soft">
    <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}  id="content" rows={1} className="mx-4 bg-neutral-primary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body" placeholder="Your message..."  />
    <button disabled={isPending} type="submit" className="inline-flex justify-center p-2 text-fg-brand rounded-full cursor-pointer hover:bg-brand-softer">
      {isPending ? <i class="fa-solid fa-spinner fa-spin cursor-not-allowed"></i> :  <svg className="w-6 h-6 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" /></svg>}
      <span className="sr-only">Send Comment</span>
    </button>
  </div>
</form>


  </div>
  
  
  
  </>
}
