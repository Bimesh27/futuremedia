import React, { useReducer } from "react";
import RightPanleSkeleton from "../skeletons/RightPanleSkeleton.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const RightPanel = () => {
  const isLoading = false;

  const {data: suggestUser} = useQuery({
     queryKey: ['suggestUser'],
     queryFn: async () => {
          try {
               const res = await fetch("/api/users/suggesteduser");

               const data = res.json();
               if(!res.ok){
                    throw new Error(data.message || "Something went wrong");
               }
               return data;
          } catch (error) {
               throw new Error(error)
          }
     }
  });

//   if(suggestUser?.length === 0) return <div></div>

  return (
       <div className=" py-5 border-l min-w-fit px-10">
            <h1 className="text-center font-bold text-lg p-3">
                 Who to Trust ?
            </h1>
            {isLoading && (
                 <>
                      <RightPanleSkeleton />
                      <RightPanleSkeleton />
                      <RightPanleSkeleton />
                      <RightPanleSkeleton />
                 </>
            )}
            {!isLoading && (
                 <div className="flex flex-col w-fit justify-center ">
                      {suggestUser?.map((user) => (
                           <div
                                key={user._id}
                                className="flex items-center gap-3 p-1 justify-between"
                           >
                                <div className="overflow-hidden rounded-full">
                                     <img
                                          src={
                                               user.profileImg ||
                                               "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                          }
                                          width="51px"
                                          alt={`profilePicture of ${user.username}`}
                                          className="rounded-full"
                                     />
                                </div>
                                <div>
                                     <h2>@{user.username}</h2>
                                </div>
                                <button className="rounded-full bg-green-500 px-5 py-1 text-black font-semibold hover:bg-green-600 transition-all text-sm">
                                     <Link to={`profile/${user.username}`}>
                                          Visit
                                     </Link>
                                </button>
                           </div>
                      ))}
                 </div>
            )}
       </div>
  );
};

export default RightPanel;
