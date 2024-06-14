import React, { useEffect, useState } from "react";
import Posts from "../../components/common/Posts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PostSkeleton from "../../components/skeletons/PostSkeleton";

const ProfilePage = () => {
     const [feedType, setFeedType] = useState("all");

     const { data: authUser } = useQuery({ queryKey: ["authUser"] });

     const { username } = useParams();

     const {
          data: user,
          isLoading,
          refetch,
          isRefetching,
     } = useQuery({
          queryKey: ["userProfile"],
          queryFn: async () => {
               try {
                    const res = await fetch(`/api/users/profile/${username}`);

                    const data = await res.json();
                    if (!res.ok) {
                         throw new Error(
                              data.message || "Something went wrong"
                         );
                    }
                    return data;
               } catch (error) {
                    throw new Error(error);
               }
          },
     });

     useEffect(() => {
          refetch();
          setFeedType("posts")
     }, [username, refetch]);

     // useEffect(() => {
     //      setFeedType("posts");
     // }, [username]);

     return (
          <div className="w-full h-screen overflow-auto">
               {isLoading || (isRefetching && <PostSkeleton />)}
               <div className="w-full flex flex-col items-center relative">
                    <div className="rounded-full overflow-hidden mt-20 z-50">
                         <img
                              src={
                                   user?.profileImg ||
                                   "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                              }
                              alt=""
                              width="130px"
                         />
                    </div>
                    <div className="border-b w-full absolute top-36 z-0 opacity-30"></div>
                    <div className="text-center mt-2">
                         <h1 className="font-semibold tracking-wide">
                              @{user?.username}
                         </h1>
                    </div>
               </div>
               <div className="border-b w-full opacity-50 mt-10"></div>
               <div className="text-center text-white font-normal py-1">
                    <h1 className="underline decoration-blue-500 decoration-4 ">
                         Posts
                    </h1>
               </div>
               {!isLoading && user && (
                    <Posts feedType={feedType} username={username} />
               )}
          </div>
     );
};

export default ProfilePage;
