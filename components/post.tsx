// components/Post.tsx
import React from 'react';
import Image from 'next/image';

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  date: string;
}

const Post: React.FC<PostProps> = ({ username, avatar, content, date }) => {
  return (
    <div className="bg-white p-4 my-4 shadow-md rounded-md">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full mr-4 overflow-hidden">
          <Image src={avatar} alt={`${username}'s avatar`} width={40} height={40} />
        </div>
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-gray-600 text-sm">{date}</p>
        </div>
      </div>
      <p className="mt-4">{content}</p>
    </div>
  );
};

export default Post;
