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
    return<div key={post.id} className="px-3 sm:px-0">
  <div className="w-full md:w-[80%] lg:w-[50%] mx-auto mb-7 shadow-2xl shadow-black p-4 sm:p-6 lg:p-7 rounded-3xl">

    <Link to="profile">
      <div className="flex gap-3 items-center">
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          src={post.user.photo}
          alt=""
        />

        <div>
          <p className="font-bold text-sm sm:text-base">
            {post.user.name}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>

    <div className="my-3 text-sm sm:text-base">
      {post.body}
    </div>

    <Link to={`/singlepost/${post.id}`}>
      <img
        className="w-full rounded-2xl object-cover max-h-[400px]"
        src={post.image}
        alt=""
      />
    </Link>

    <div className="mt-4">
      <SingleCommet comment={post?.comments} />
    </div>

    <div className="grid grid-cols-3 gap-2 shadow-2xl rounded-3xl my-5">
      <div className="flex cursor-pointer items-center justify-center gap-2 hover:bg-gray-300 rounded-3xl p-3 sm:p-5 duration-300">
        <AiFillLike size={22} />
        <p className="text-xs sm:text-sm">Like</p>
      </div>

      <Link
        to="/addcomment"
        className="flex cursor-pointer items-center justify-center gap-2 hover:bg-gray-300 rounded-3xl p-3 sm:p-5 duration-300"
      >
        <FaComment size={22} />
        <p className="text-xs sm:text-sm">Comment</p>
      </Link>

      <div className="flex cursor-pointer items-center justify-center gap-2 hover:bg-gray-300 rounded-3xl p-3 sm:p-5 duration-300">
        <FaShare size={22} />
        <p className="text-xs sm:text-sm">Share</p>
      </div>
    </div>

    <AddComment id={post?.id} />

  </div>
</div>
   
    
    
    
            
  })}



  
  
  
  
  </>
}
  