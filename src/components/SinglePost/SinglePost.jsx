import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AllComments from "../AllComments/AllComments";
import { SyncLoader } from "react-spinners";

export default function SinglePost() {
  let { id } = useParams();

  let getPost = async () => {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  };

  let { data , isLoading , isPending} = useQuery({
    queryKey: ["SinglePost"],
    queryFn: getPost,
    select: (data) => data?.data?.post,
  });

  console.log(data);

  return (
    <>
      <div className="gap-5">
        <div className="w-[50%] mx-auto mb-7 shadow-2xl shadow-black p-7 rounded-4xl ">
          <div className="flex gap-3 items-center">
            <div>
              <img
                className="size-13 rounded-full "
                src={data?.user?.photo}
                alt=""
              ></img>
            </div>
            <div>
              <div>
                <p className="font-bold">{data?.user?.name}</p>
                <p className="text-sm">
                  {new Date(data?.createdAt).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="my-3 ms-3">{data?.body}</div>

          <img className="w-full rounded-3xl" src={data?.image} alt=""></img>

          <div className="grid grid-cols-1 lg:grid-cols-3 justify-between  shadow-2xl rounded-3xl  my-5">
            <div className="flex cursor-pointer items-center gap-2 hover:bg-gray-300 rounded-3xl p-5 duration-500">
              <AiFillLike size={25} />
              <p className="text-sm">Like</p>
            </div>
            <div className="flex cursor-pointer items-center gap-2  hover:bg-gray-300 rounded-3xl p-5 duration-500">
              <FaComment size={25} />
              <p className="text-sm">Comment</p>
            </div>
            <div className="flex cursor-pointer items-center gap-2  hover:bg-gray-300 rounded-3xl p-5 duration-500">
              <FaShare size={25} />
              <p className="text-sm">Share</p>
            </div>
          </div>

          <AllComments id={data?.id}/>

        </div>
      </div>
    </>
  );
}
