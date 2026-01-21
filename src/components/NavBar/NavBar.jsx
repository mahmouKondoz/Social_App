import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import img1 from "../../assets/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png"
import { ContextLogin } from '../../Context/ContextLogin'
import { ContextUserInfo } from '../../Context/ContextUserInfo'


export default function NavBar() {

  let {getToken , setGettoken} = useContext(ContextLogin)
  let {data} = useContext(ContextUserInfo)
 
  return <>

 <nav className=" text-sky-300 fixed w-full z-20 top-0 start-0 border-b border-default bg-black shadow-2xl shadow-slate-500">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center  text-sky-300 font-semibold whitespace-nowrap hover:scale-115 duration-500 text-5xl hover:shadow-2xl ">Social App <i class="fa-brands fa-bluesky"></i>  </span>
    </Link>
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

      {getToken ? <>

      <button type="button" className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={data?.photo} alt="user photo" />
      </button> 
      
       <div className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="user-dropdown">
        
        <div className="px-4 py-3 text-sm border-b border-default">
          <span className="block text-heading font-medium">{data?.name}</span>
          <span className="block text-body truncate">{data?.email}</span>
        </div>
        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
          <li>
            <Link to="profile" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profile</Link>
          </li>
          <li>
            <Link to="login" onClick={()=>{
              localStorage.removeItem('userToken')
              setGettoken('')

            }} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</Link>
          </li>
        </ul>
      </div>
      
      
      </> :
      <ul className='flex gap-4 ms-5'>
          <li><Link to="login"  >Login</Link></li>
            <li><Link to="Register"  >Register</Link></li>
        </ul>
      }
     
      
      
      
      
      

    </div>
   
  </div>
</nav>

      
  
  </>
}
