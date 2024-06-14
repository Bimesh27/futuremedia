import React from 'react';
import CreatePost from './CreatePost.jsx';
import Posts from '../../components/common/Posts.jsx'

const HomePage = () => {
  return (
    <div className="w-full h-screen border-r border-l overflow-auto ">
      <CreatePost />
      <Posts />
    </div>
  );
}

export default HomePage