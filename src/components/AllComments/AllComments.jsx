import React, { useContext } from 'react'
import style from './AllComments.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import img1 from '../../assets/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png'
import { SyncLoader } from 'react-spinners'
import { ContextLogin } from '../../Context/ContextLogin'

export default function AllComments({id}) {

  

  let getAllcomments = async()=>{


    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments` , {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
  }

  





  let {data , isLoading , isPending} = useQuery({
    queryKey:['AllComments' ,id],
    queryFn:getAllcomments, 
    keepPreviousData:false ,   
    select:(data)=>data?.data?.comments
    
  })

  // console.log(data);
  
  
  
  return <>


{isPending && <div className='flex justify-center'>

    <SyncLoader size={20} />
    </div>}
  

  {data?.map((comment)=>{
    return<div className='my-7'>

      <div className='flex gap-3 items-center '>
        <div>
          <img className='size-13 rounded-full' src={img1} alt="" />
        </div>
        <div className=' bg-gray-300  p-3 rounded-3xl'>
          <h4 className='font-bold'>{comment.commentCreator.name}</h4>
          <p>{comment.content}</p>
        </div>
        
      </div>
      <p className='text-sm ms-18 mt-2'>{new Date(comment.createdAt).toLocaleDateString('en-us' , {
            year:'numeric'
            ,month:'short'
            ,day:'numeric'
          })}</p>
      



    </div>
  })}
  
  
  
  </>
}
