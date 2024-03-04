// components/Post.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Comments {
  username: string;
  comment: string;
}
interface PostProps {
  id: number;
  username: string;
  missing: boolean;
  foster: boolean;
  adoption: boolean;
  general: boolean;
  content: string;
  images: string;
  createdAt: string;
  comments: Comments[];
}

const Post: React.FC<PostProps> = ({
  id,
  username,
  missing,
  foster,
  adoption,
  general,
  content,
  images,
  createdAt,
  comments = [],
}) => {

  const [newComment, setNewComment] = useState<Comments>({ username: '', comment: '' });
  const handleCommentChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new comment to the comments array
    // Note: You should replace this logic with your actual method of submitting comments to the server.
    // This is just an example.
    setNewComment({ username: '', comment: '' });
  };
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
      <p className="mt-4">{content}</p>
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
      <div className="mt-4">
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            value={newComment.username}
            onChange={handleCommentChange}
            className="mr-2 p-1 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="content"
            placeholder="Leave a comment"
            value={newComment.comment}
            onChange={handleCommentChange}
            className="p-1 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-1 rounded">Comment</button>
        </form>
      </div>
      {comments.map((comment, index) => (
          <div key={index} className="border-t pt-2 mt-2">
            <p className="text-gray-600 text-sm">
              <span className="font-bold">{comment.username}:</span> {comment.comment}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Post;
