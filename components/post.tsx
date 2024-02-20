// components/Post.tsx
import React from 'react';
import Image from 'next/image';

interface PostProps {
  id: number;
  username: string;
  missing: boolean;
  foster: boolean;
  adoption: boolean;
  general: boolean;
  comment: string;
  images: string;
  createdAt: string;
}

const Post: React.FC<PostProps> = ({
  id,
  username,
  missing,
  foster,
  adoption,
  general,
  comment,
  images,
  createdAt,
}) => {
  const date = new Date(createdAt)
  const formattedDate = date.toLocaleString();
  return (
    <div className="bg-white p-4 my-4 shadow-md rounded-md">
      <div className="flex items-center">
        {/* Display the user's avatar here */}
        <div className="w-10 h-10 rounded-full mr-4 overflow-hidden">
          {/* Replace with the user's avatar */}
        </div>
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-gray-600 text-sm">{formattedDate}</p>
        </div>
      </div>
      <p className="mt-4">{comment}</p>
      {/* Add logic to display images if available */}
      {images && (
        <div className="my-4">
          <Image src={images} alt="Post Images" width={500} height={300} />
        </div>
      )}
      {/* Display categories (missing, foster, adoption, general) */}
      <div className="flex items-center">
        {missing && <span className="category-label">Missing</span>}
        {foster && <span className="category-label">Foster</span>}
        {adoption && <span className="category-label">Adoption</span>}
        {general && <span className="category-label">General</span>}
      </div>
    </div>
  );
};

export default Post;
