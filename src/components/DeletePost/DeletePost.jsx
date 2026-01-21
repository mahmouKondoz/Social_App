import React from 'react'
import style from './DeletePost.module.css'
import { useParams } from 'react-router-dom'
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';

export default function DeletePost({id}) {
  let clint = useQueryClient()

  let DeletePost = ()=>{


    return axios.delete(`https://linked-posts.routemisr.com/posts/${id}` , {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
  }



  let {mutate , isPending} = useMutation({
    mutationFn:DeletePost ,
    onSuccess:()=>{
      toast.success('The post has been deleted successfully.')
       
      clint.invalidateQueries({
        queryKey:['getUserPosts']
      })
      


  
    }
  })


  let handelDelete = ()=>{

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    toast('loading...')
    mutate()
    
  }
});

  }
  return <>

   
   <button disabled = {isPending} onClick={()=>{handelDelete()}} className='cursor-pointer'>
    
    {isPending ? <i class="fa-solid fa-spinner fa-spin cursor-not-allowed"></i> : <IoCloseSharp size={30}/>}
   </button>
  
  
</>
 }
