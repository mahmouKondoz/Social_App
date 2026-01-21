import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";




export let ContextUserInfo = createContext()

export default function ContextUserInfoProvider(props){
    

    let getUserInfo = async ()=>{

        return await axios.get('https://linked-posts.routemisr.com/users/profile-data' , {
            headers:{
                token:localStorage.getItem('userToken')
            }
        })

    }

    let {data} = useQuery({
        queryKey:['userInfo'], 
        queryFn:getUserInfo,
        select:(data)=>data?.data?.user
    })


    // console.log(data);
    



    return <ContextUserInfo.Provider value={{data}}>



        {props.children}
    </ContextUserInfo.Provider>



}

