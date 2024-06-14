import React from 'react'

const PostSkeleton = () => {
  return (
    <div className='w-full'>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center w-full">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    </div>
  );
}

export default PostSkeleton