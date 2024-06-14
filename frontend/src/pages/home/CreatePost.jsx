import React, { useState } from "react";
import { useRef } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreatePost = () => {
     const [text, setText] = useState("");
     const [img, setImg] = useState();

     const imageRef = useRef();
     const { data: authUser } = useQuery({ queryKey: ["Authuser"] });

     const queryClient = useQueryClient();

     const {
          mutate: createPost,
          isError,
          isPending,
          error,
     } = useMutation({
          mutationFn: async ({ text, img }) => {
               try {
                    const res = await fetch("/api/posts/createpost", {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ text, img }),
                    });

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
          onSuccess: () => {
               setText("");
               setImg(null);
               toast.success("Post created Successfully");
               queryClient.invalidateQueries(["posts"]);
          },
          onError: (error) => {
               toast.error(`Failed to create post: ${error.message}`);
          },
     });

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
               const reader = new FileReader();

               reader.addEventListener("load", () => {
                    setImg(reader.result);
               });
               reader.readAsDataURL(file);
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          createPost({ text, img });
     };

     return (
          <div className="w-full">
               <div className="text-center pt-5">
                    <h1 className="text-lg font-semibold tracking-wide">
                         Revitalize Your day!
                    </h1>
               </div>
               <div className="border-b opacity-30 mb-10 pb-5"></div>
               <div className="px-10">
                    <div className="flex gap-5 w-full h-full">
                         <div className="rounded-full overflow-hidden ">
                              <img
                                   src={
                                        authUser?.profileImg ||
                                        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                   }
                                   width="40px"
                                   alt="profileImg"
                                   className="rounded-full"
                              />
                         </div>
                         <div className="w-full">
                              <div className="flex justify-between items-center flex-col pb-10">
                                   <textarea
                                        name="text"
                                        type="text"
                                        placeholder="Express Your Daily Worth Thoughts!"
                                        className="w-full resize-none textarea border-none focus:outline-none h-1 opacity-75 overflow-hidden text-white"
                                        value={text}
                                        onChange={(e) => {
                                             setText(e.target.value)
                                        }}
                                   />
                                   {img && (
                                        <div className="flex w-96 h-auto justify-center items-center relative">
                                             <RiCloseCircleFill
                                                  className="absolute w-6 h-auto text-white top-[-10px] right-[-10px] cursor-pointer"
                                                  onClick={() => {
                                                       setImg(null);
                                                  }}
                                             />
                                             <div>
                                                  <img
                                                       src={img}
                                                       alt="postImage"
                                                  />
                                             </div>
                                        </div>
                                   )}
                              </div>
                              <div className="border-b opacity-30 mb-5"></div>
                              <div className="flex w-full justify-between">
                                   <input
                                        type="file"
                                        ref={imageRef}
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                   />
                                   <BiImageAdd
                                        className="h-8 w-auto bg-cover hover:scale-110"
                                        onClick={() => {
                                             imageRef.current.click();
                                        }}
                                   />
                                   <button
                                        className="py-1 px-4 rounded-full bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-all"
                                        onClick={handleSubmit}
                                   >
                                        {isPending? "Posting..." : "Post"}
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="border-b opacity-30 mb-5 mt-5"></div>
          </div>
     );
};

export default CreatePost;
