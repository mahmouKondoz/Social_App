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
      <div className="px-3 sm:px-0">
  <div className="w-full md:w-[80%] lg:w-[50%] mx-auto mb-7 shadow-2xl shadow-black p-4 sm:p-6 lg:p-7 rounded-3xl">

    <div className="flex gap-3 items-center">
      <img
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        src={data?.user?.photo}
        alt=""
      />

      <div>
        <p className="font-bold text-sm sm:text-base">
          {data?.user?.name}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          {new Date(data?.createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>

    <div className="my-3 text-sm sm:text-base">
      {data?.body}
    </div>

    <img
      className="w-full rounded-2xl object-cover max-h-[400px]"
      src={data?.image}
      alt=""
    />

    <div className="grid grid-cols-3 gap-2 shadow-2xl rounded-3xl my-5">
      <div className="flex cursor-pointer items-center justify-center gap-2 hover:bg-gray-300 rounded-3xl p-3 sm:p-5 duration-300">
        <AiFillLike size={22} />
        <p className="text-xs sm:text-sm">Like</p>
      </div>

      <div className="flex cursor-pointer items-center justify-center gap-2 hover:bg-gray-300 rounded-3xl p-3 sm:p-5 duration-300">
        <FaComment size={22} />
        <p className="text-xs sm:text-sm">Comment</p>
      </div>

      <div className="flex cursor-pointer items-center justify-center gap-2 hover:bg-gray-300 rounded-3xl p-3 sm:p-5 duration-300">
        <FaShare size={22} />
        <p className="text-xs sm:text-sm">Share</p>
      </div>
    </div>

    <AllComments id={data?.id} />

  </div>
</div>
    </>
  );
}
