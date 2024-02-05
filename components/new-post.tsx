'use client'
// components/PostForm.tsx
import React, { useState } from 'react';
import Checkbox from './category-checkbox';
import FileUploadForm from "@/components/image-upload-form";

interface PostFormProps {
  onAddPost: (content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPost(content);
    // Clear the input field after submitting
    setContent('');
    // Collapse the form after submitting
    setExpanded(false);
  };

  return (
    <div className="mb-4">
      <button onClick={() => setExpanded(!isExpanded)} className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">
        {isExpanded ? 'Cancel' : 'New Post'}
      </button>
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          {/* <input type="checkbox" /> */}
          <div className="categories">
            <Checkbox label="Missing" />
            <Checkbox label="Foster" />
            <Checkbox label="Adoption" />
            <Checkbox label="General" />
          </div>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            rows={3}
          ></textarea>
          <FileUploadForm />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default PostForm;
