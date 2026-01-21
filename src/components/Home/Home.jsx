import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import {SyncLoader} from 'react-spinners'
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AddPost from '../AddPost/AddPost';
import AddComment from '../AddComment/AddComment';
import SingleCommet from '../SingleCommet/SingleCommet';


export default function Home() {

   let getallposts = async()=>{
    return await axios.get('https://linked-posts.routemisr.com/posts?limit=50', {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
  }

  

  let {data , isLoading} = useQuery({
    queryKey:['HomePage'],
    queryFn:getallposts ,
    select:(data)=>data?.data?.posts
  })
  // if(data === undefined) {return null}

  // console.log(data);
  




  return <>
  {isLoading && <div className='flex justify-center'>

    <SyncLoader size={20} />
    </div>}
    {isLoading ? '' : <AddPost/>}
  {data?.map((post)=>{
    return<div key={post.id} className='gap-5'>
      
      
       <div className='w-[50%] mx-auto mb-7 shadow-2xl shadow-black p-7 rounded-4xl '>
        <Link to={`profile`}>
        
        
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
        
        
        </Link>
        <div className='my-3 ms-3'>{post.body}</div>
        <Link to={`/singlepost/${post.id}`}>

        <img className='w-full rounded-3xl' src = {post.image} alt='' ></img>
        </Link>

        <div>
          <SingleCommet comment={post?.comments}/>
        </div>
      

      <div className='grid grid-cols-1 lg:grid-cols-3 justify-between not-visited:   shadow-2xl rounded-3xl  my-5'> 
        <div className='flex cursor-pointer items-center gap-2 hover:bg-gray-300 rounded-3xl p-5 duration-500'>
         
          <AiFillLike size={25} />
           <p className='text-sm'>Like</p>
        </div>
        <div className='flex cursor-pointer items-center gap-2  hover:bg-gray-300 rounded-3xl p-5 duration-500'>
           
         <Link to='/addcomment'>

          <FaComment size={25} />
         
         </Link>
          <p className='text-sm'>Comment</p>
        </div>
        <div className='flex cursor-pointer items-center gap-2  hover:bg-gray-300 rounded-3xl p-5 duration-500'>
          
          <FaShare size={25} />
          <p className='text-sm'>Share</p>

        </div>
      </div>
      <AddComment id={post?.id}/>

    </div>

    </div>
   
    
    
    
            
  })}



  
  
  
  
  </>
}
  