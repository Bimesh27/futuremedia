import React from 'react'

const RightPanleSkeleton = () => {
  return (
    <div className="flex gap-3 items-center p-1 ">
      <div className="skeleton w-12 h-12 flex rounded-full shrink-0"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-2 w-24"></div>
        <div className="skeleton h-2 w-16"></div>
      </div>
      <div className='skeleton w-16 h-8'></div>
    </div>
  );
}

export default RightPanleSkeleton