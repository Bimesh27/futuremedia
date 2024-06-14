import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {
     const [user, setUser] = useState({
          email: "",
          password: "",
     });

     const queryClient = useQueryClient();

     const { mutate: loginMutation, isError, isPending, error } = useMutation({
          mutationFn: async ({ email, password }) => {
               try {
                    const res = await fetch("/api/auth/login", {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ email, password }),
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
               queryClient.invalidateQueries({queryKey: ['authUser']})
          },
     });

     const handleSubmit = (e) => {
          e.preventDefault();
          loginMutation(user);
     };
     const handleChange = (e) => {
          setUser({ ...user, [e.target.name]: e.target.value });
     };

     return (
          <div className="w-full h-screen flex justify-center items-center">
               <div>
                    <h1 className="text-3xl font-bold text-center uppercase">
                         Login
                    </h1>
                    <div className="p-10 px-20 justify-start flex flex-col gap-5">
                         <label className="input input-bordered flex items-center gap-2">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 16 16"
                                   fill="currentColor"
                                   className="w-4 h-4 opacity-70"
                              >
                                   <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                   <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                              </svg>
                              <input
                                   type="text"
                                   className="grow"
                                   placeholder="Email"
                                   name="email"
                                   value={user.email}
                                   onChange={handleChange}
                              />
                         </label>

                         <label className="input input-bordered flex items-center gap-2">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 16 16"
                                   fill="currentColor"
                                   className="w-4 h-4 opacity-70"
                              >
                                   <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd"
                                   />
                              </svg>
                              <input
                                   type="password"
                                   className="grow"
                                   value={user.password}
                                   name="password"
                                   onChange={handleChange}
                              />
                         </label>
                         <button
                              className="btn btn-primary "
                              onClick={handleSubmit}
                         >
                              {isPending ? "Loading..." : "Login"}
                         </button>
                         {isError && (<p className="text-red-500 text-[12px]">{error.message}</p>)}
                         <p>Don't have any account?</p>
                         <Link to="/signup" className="text-center w-full">
                              <button className="btn btn-success w-full btn-outline">
                                   Signup
                              </button>
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default LoginPage;
