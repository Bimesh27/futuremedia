import React, { useEffect, useState } from 'react'
import { POSTS } from '../../utils/db/dummy.js'
import Post from './Post.jsx'
import { useQuery } from '@tanstack/react-query';
import PostSkeleton from "../skeletons/PostSkeleton";


const Posts = ({feedType, username}) => {

     const getPostEndpoint = () => {
          switch(feedType) {
               case 'all':
                    return '/api/posts/all'
               case 'posts':
                    return `/api/posts/profile/${username}`
               default:
                    return '/api/posts/all'
          }
     }

     const POST_ENDPOINT = getPostEndpoint();

     const { data: posts, isLoading, refetch, isRefetching } = useQuery({
          queryKey: ["posts"],
          queryFn: async () => {
               try {
                    const res = await fetch(POST_ENDPOINT);
                    const data = await res.json();

                    if (!res.ok) {
                         throw new Error(data.error || "Something went wrong");
                    }
                    

                    return data;
               } catch (error) {
                    throw new Error(error);
               }
          },
     });
     useEffect(() => {
          refetch()
     }, [feedType, refetch, username])

     console.log("Posts are here: ",posts);
     
  return (
       <div>
            {isLoading && <PostSkeleton />}
            {!isLoading && posts?.length === 0 && (
                 <p className="text-center">No post available 👻</p>
            )}

            {!isLoading && Array.isArray(posts) && posts && (
                 <div>
                      {posts.map((post) => (
                           <Post key={post._id} post={post} />
                      ))}
                 </div>
            )}
       </div>
  );
}

export default Posts;