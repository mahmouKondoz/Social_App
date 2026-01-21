import React from 'react'
import style from './UpdatePost.module.css'
import { MdSystemUpdateAlt } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


export default function UpdatePost({post}) {
  console.log(post);
  console.log(post?.image);
  
  let clint = useQueryClient()


  let UpdsatePost = (formData)=>{

    return axios.put(`https://linked-posts.routemisr.com/posts/${post?.id}` , formData , {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
  }

  let {mutate , isPending , } = useMutation({
    mutationFn:UpdsatePost , 
    onSuccess: ()=>{
      toast.success('Post Updated succfully')
      clint.invalidateQueries({
        queryKey:['getUserPosts']
      })
    },
    onError:()=>{
      toast.error('Error')
    }
  })


  let handleUpdate = ()=>{


    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  html:`
  
   <textarea id="body" class="swal2-textarea" placeholder="Update post...">${post?.body}</textarea>
        <input type="file" id="image" class="swal2-file" required />
  `,
  preConfirm: async ()=>{

    let formData = new FormData()
    let bodyValue = document.getElementById('body').value
    let imgValue = document.getElementById('image').files[0]

    if (!image) {
    Swal.showValidationMessage('Image is required')
    return false
  }

    
    bodyValue && formData.append('body',bodyValue)
    imgValue && formData.append('image' , imgValue)
    return(
      
      formData

    ) 

  },
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Update"
}).then((result) => {
  if (result.isConfirmed) {
    
   mutate(result.value)
   
  }
});
    
  }
  return <>

  
    {isPending && toast('loading...') }
    <div className='cursor-pointer'>
      
      <MdSystemUpdateAlt onClick={()=>{handleUpdate()}} size={25} />
    </div>
  
  </>
}





