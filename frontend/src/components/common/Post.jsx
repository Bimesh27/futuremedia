import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";

const Post = ({ post }) => {
     const { data: authUser } = useQuery({ queryKey: ["authUser"] });
     const queryClient = useQueryClient();
     const isMyPost = authUser.user._id === post.user._id;

     const { mutate: deletePost, isPending } = useMutation({
          mutationFn: async () => {
               try {
                    const res = await fetch(`/api/posts/${post._id}`, {
                         method: "DELETE",
                    });

                    const data = await res.json();
                    if (!res.ok) {
                         throw new Error(data.error || "Something went wrong");
                    }

                    return data;
               } catch (error) {
                    throw new Error(error);
               }
          },
          onSuccess: () => {
               toast.success("Post deleted Successfully");
               queryClient.invalidateQueries(["posts"]);
          },
          onError: (error) => {
               toast.error(`Failed to delete post: ${error.message}`);
          },
     });

     const handleDelete = (e) => {
          e.preventDefault();
          deletePost();
     };

     // const postOwner = post.user;

     
     console.log(isMyPost);
     return (
          <div className="py-5 px-10">
               <div>
                    <div className="flex justify-between items-center">
                         <div className="flex gap-3 items-center">
                              <div className="rounded-full overflow-hidden">
                                   <img
                                        src={
                                             post.user.profileImg ||
                                             "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                        }
                                        alt={`profileImg of ${post.user.username}`}
                                        width="35px"
                                   />
                              </div>
                              <div className="flex gap-2 items-center">
                                   <h1 className="font-bold">
                                        {post.user.username}
                                   </h1>
                                   
                              </div>
                         </div>
                         <div>
                              {isMyPost && (
                                   <IoMdTrash
                                        className="hover:scale-110 w-5 h-auto hover:text-red-500"
                                        onClick={handleDelete}
                                   />
                              )}
                         </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden border-slate-800 mt-3 flex flex-col gap-2">
                         <h1>{post.text}</h1>
                         <img src={post.img} alt="" className="rounded-lg" />
                    </div>
               </div>

               <div className="border-b opacity-30 mb-5 mt-5"></div>
          </div>
     );
};

export default Post;
