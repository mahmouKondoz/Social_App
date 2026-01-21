import React, { useState } from 'react'
import style from './SingleCommet.module.css'
import img1 from '../../assets/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png'

export default function SingleCommet({comment}) {

  let [userComment , setUserComment] = useState(comment[0])
  


  


  return <>


  <div className='my-7'>
  
        <div className='flex gap-3 items-center '>
          <div>
            <img className='size-13 rounded-full' src={img1} alt="" />
          </div>
          <div className=' bg-gray-300  p-3 rounded-3xl'>
            <h4 className='font-bold'>{userComment?.commentCreator?.name}</h4>
            <p>{userComment?.content}</p>
          </div>
          
        </div>
        <p className='text-sm ms-18 mt-2'>{new Date(userComment?.createdAt).toLocaleDateString('en-us' , {
              year:'numeric'
              ,month:'short'
              ,day:'numeric'
            })}</p>
        
  
  
  
      </div>
  
  
  
  </>
}
