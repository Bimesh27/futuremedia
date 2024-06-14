import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SideBar = () => {
     const queryClient = useQueryClient();

     const { mutate: logout } = useMutation({
          mutationFn: async () => {
               try {
                    const res = await fetch("/api/auth/logout", {
                         method: "POST",
                    });
                    const data = await res.json();

                    if (!res.ok) {
                         throw new Error(data.error || "Something went wrong");
                    }
               } catch (error) {
                    throw new Error(error);
               }
          },
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ["authUser"] });
          },
          onError: () => {
               toast.error("Logout failed");
          },
     });

     
     const { data: authUser } = useQuery({ queryKey: ["authUser"] });

     return (
          <div className="px-28 h-screen pt-10 justify-between flex flex-col py-10 w-fit border-r">
               <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-1">
                         <h1 className="text-xl font-bold text-center text-blue-400 ">
                              Future
                         </h1>
                         <h1 className="text-3xl font-bold text-center text-green-400">
                              X
                         </h1>
                         <h1 className="text-xl font-bold text-center text-blue-400">
                              Media
                         </h1>
                    </div>

                    <Link to={"/"} className="w-full">
                         <div className="flex gap-5 text-center hover:scale-105">
                              <MdHomeFilled
                                   size={25}
                                   className="text-gray-500"
                              />
                              <h1>Home</h1>
                         </div>
                    </Link>

                    <Link to={`/profile/${authUser.user.username}`}>
                         <div className="flex gap-5 hover:scale-105">
                              <FaUser size={19} className="text-gray-500" />
                              <h1>Profile</h1>
                         </div>
                    </Link>
               </div>
               <div className="flex items-center gap-3">
                    <Link to={`profile/${authUser.user.username}`}>
                         <div className="flex items-center gap-3">
                              <div>
                                   <img
                                        src={
                                             authUser?.user.profilePic ||
                                             "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                        }
                                        width="35px"
                                        alt={`profile pic of ${authUser?.user.username}`}
                                        className="rounded-full"
                                   />
                              </div>
                              <div>
                                   <h1 className="font-bold">
                                        @{authUser?.user.username}
                                   </h1>
                              </div>
                         </div>
                    </Link>
                    <div className="flex items-center gap-3 relative">
                         <div className="lg:tooltip" data-tip="logout">
                              <RiLogoutCircleLine
                                   size={25}
                                   className="text-gray-500 hover:text-gray-400 lg:tooltip"
                                   onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                   }}
                              />
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default SideBar;
