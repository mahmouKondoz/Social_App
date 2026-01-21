import React, { useContext } from 'react'
import { ContextUserInfo } from '../../Context/ContextUserInfo'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AddPost from '../AddPost/AddPost'
import { AiFillLike } from 'react-icons/ai'
import { FaComment, FaShare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DeletePost from '../DeletePost/DeletePost'
import UpdatePost from '../UpdatePost/UpdatePost'



export default function Profile() {

  let {data:userData} = useContext(ContextUserInfo)

  
  
  

  let getUserPosts = ()=>{

    return axios.get(`https://linked-posts.routemisr.com/users/${userData?._id}/posts?limit=50` , {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
  }

  let {data} = useQuery({
    queryKey:['getUserPosts'] , 
    queryFn:getUserPosts ,
    enabled:!!userData?._id,
    select:(data)=> data?.data?.posts
  })



  
  
  





  return <>
 <AddPost/>

 {data?.map((post)=>{
  return<div>


    <div className='w-[50%] mx-auto mb-7 relative shadow-2xl shadow-black p-7 rounded-4xl '>
       <div className='absolute end-5 flex gap-2 items-center '>
           <DeletePost id={post?.id}/>
           <UpdatePost post ={post}/>
          </div>
        
        
        
        <div className='flex gap-3 items-center'>
        <div>
          <img className='size-13 rounded-full ' src={post.user.photo} alt=''></img>
        </div>
        <div>
          <div>
            <p className='font-bold'>{post.user.name}</p>
            <p className='text-sm'>{new Date(post.createdAt).toLocaleDateString('en-us' , {
              year:'numeric' ,
              month:"short" ,
              day:"numeric"
            }) }</p>
          </div>
        </div>
      </div>
        
        
       
        <div className='my-3 ms-3'>{post.body}</div>
        <Link to={`/singlepost/${post.id}`}>

        <img className='w-full rounded-3xl' src = {post.image} alt='' ></img>
        </Link>

        {/* <div>
          <SingComment id = {post?.id}/>
        </div>
       */}

      <div className='flex justify-between  shadow-2xl rounded-3xl  my-5'> 
        <div className='flex cursor-pointer items-center gap-2 hover:bg-gray-300 rounded-3xl p-5 duration-500'>
         
          <AiFillLike size={25} />
           <p className='text-sm'>Like</p>
        </div>
        <div className='flex cursor-pointer items-center gap-2  hover:bg-gray-300 rounded-3xl p-5 duration-500'>
           
          <FaComment size={25} />
          <p className='text-sm'>Comment</p>
        </div>
        <div className='flex cursor-pointer items-center gap-2  hover:bg-gray-300 rounded-3xl p-5 duration-500'>
          
          <FaShare size={25} />
          <p className='text-sm'>Share</p>

        </div>
      </div>

    </div>




  </div>
 })}



  
  
  
  </>
}
