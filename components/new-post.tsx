'use client'
// components/PostForm.tsx
import React, { useEffect, useState } from 'react';
import Checkbox from './category-checkbox';
import FileUploadForm from "@/components/image-upload-form";
import { get_data, post_data } from './api/timeline';


interface PostFormProps {
  onAddPost: (content: string) => void;
}

interface CheckboxState {
  [key: string]: boolean;
}

interface PostData {
  username: string;
  categories: CheckboxState; 
  comment: string;
  image: string;
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    missing: false,
    foster: false,
    adoption: false,
    general: false,
  });
  const [postData, setPostData] = useState<PostData>({
    // Initialize postData with empty values
    username: '',
    categories: { ...checkboxState },
    comment: '',
    image:'',
  });

  const handleCheckboxChange = (checkboxName: string) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post_data({ postData }); 

      setContent('');

      setExpanded(false);
    } catch (error) {
      // Handle error
      console.error('Error posting data:', error);
    }
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
            <Checkbox
            label="Missing"
            checked={checkboxState['missing']}
            onChange={() => handleCheckboxChange('missing')}
            />
          <Checkbox
            label="Foster"
            checked={checkboxState['foster']}
            onChange={() => handleCheckboxChange('foster')}
          />
          <Checkbox
            label="Adoption"
            checked={checkboxState['adoption']}
            onChange={() => handleCheckboxChange('adoption')}
          />
          <Checkbox
            label="General"
            checked={checkboxState['general']}
            onChange={() => handleCheckboxChange('general')}
          />
          </div>
          <textarea
            placeholder="What's on your mind?"
            value={postData.comment}
            onChange={(e) => setPostData({ ...postData, comment: e.target.value })}
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
