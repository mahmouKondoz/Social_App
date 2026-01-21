import { createContext, useState } from "react";



export let ContextLogin = createContext()

export default function ContextLoginprovider(props){

let [getToken , setGettoken] = useState(localStorage.getItem('userToken'))







    return <ContextLogin.Provider value={{getToken , setGettoken  }}>




        {props.children}

    </ContextLogin.Provider>
}