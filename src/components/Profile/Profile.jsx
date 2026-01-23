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


    <div className="w-full sm:w-[90%] md:w-[75%] lg:w-[50%] mx-auto mb-7 relative shadow-2xl shadow-black p-4 sm:p-6 lg:p-7 rounded-3xl">
  <div className="absolute end-3 top-3 flex gap-2 items-center">
    <DeletePost id={post?.id} />
    <UpdatePost post={post} />
  </div>

  <div className="flex gap-3 items-center">
    <img
      className="size-10 sm:size-12 rounded-full"
      src={post?.user?.photo}
      alt=""
    />
    <div>
      <p className="font-bold text-sm sm:text-base">
        {post?.user?.name}
      </p>
      <p className="text-xs sm:text-sm">
        {new Date(post?.createdAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  </div>

  <div className="my-3 ms-1 sm:ms-3 text-sm sm:text-base">
    {post?.body}
  </div>

  <Link to={`/singlepost/${post?.id}`}>
    <img
      className="w-full rounded-2xl sm:rounded-3xl max-h-[400px] object-cover"
      src={post?.image}
      alt=""
    />
  </Link>

  <div className="flex justify-between shadow-xl rounded-2xl my-4 sm:my-5">
    <div className="flex cursor-pointer items-center gap-1 sm:gap-2 hover:bg-gray-300 rounded-2xl p-3 sm:p-5 duration-300">
      <AiFillLike size={20} />
      <p className="text-xs sm:text-sm">Like</p>
    </div>

    <div className="flex cursor-pointer items-center gap-1 sm:gap-2 hover:bg-gray-300 rounded-2xl p-3 sm:p-5 duration-300">
      <FaComment size={20} />
      <p className="text-xs sm:text-sm">Comment</p>
    </div>

    <div className="flex cursor-pointer items-center gap-1 sm:gap-2 hover:bg-gray-300 rounded-2xl p-3 sm:p-5 duration-300">
      <FaShare size={20} />
      <p className="text-xs sm:text-sm">Share</p>
    </div>
  </div>
</div>




  </div>
 })}



  
  
  
  </>
}
