import { useState } from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import ContextLoginprovider from "./Context/ContextLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePost from "./components/SinglePost/SinglePost";
import ContextUserInfoProvider from "./Context/ContextUserInfo";
import toast, { Toaster } from 'react-hot-toast';
import DeletePost from "./components/DeletePost/DeletePost";
import ProtectProject from "./components/ProtectProject/ProtectProject";
import NotFound from "./components/NotFound/NotFound";

let query = new QueryClient();

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element:
       <ProtectProject>
          <Home />
       </ProtectProject>},

      { path: "profile", element: 
        <ProtectProject>
          <Profile />
        </ProtectProject>
       },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "singlepost/:id", element: 
        <ProtectProject>
          <SinglePost /> 
        </ProtectProject>
      },
    {path:'*' , element:<NotFound/>}
       
     
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    

      <QueryClientProvider client={query}>
        <ContextLoginprovider>
          <ContextUserInfoProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </ContextUserInfoProvider>
        </ContextLoginprovider>
      </QueryClientProvider>

   
      
    </>
  );
}

export default App;
