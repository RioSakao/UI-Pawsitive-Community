'use client'
// components/PostForm.tsx
import React, { useEffect, useState, useContext } from 'react';
import Checkbox from './category-checkbox';
import axios from 'axios';
import CustomFileSelector from "./choose-image";
import ImagePreview from "./image-preview";
import { useBearStore } from './login-util';

interface CheckboxState {
  missing: boolean,
  foster: boolean,
  adoption:boolean,
  general: boolean,
}

interface PostData {
  id: number;
  username: string;
  categories: CheckboxState; 
  content: string;
  image: File[];
}

const initialCheckboxState = {
  missing: false,
  foster: false,
  adoption: false,
  general: false,
};

const initialPostData = {
  id: 0,
  username: '',
  categories: { ...initialCheckboxState },
  content: '',
  image: [],
};


const PostForm: React.FC = () => {
 
  const [isExpanded, setExpanded] = useState(false);
  const isLoggedIn = useBearStore(state => state.username !== "");
  const [images, setImages] = useState<File[]>([]);
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    missing: false,
    foster: false,
    adoption: false,
    general: false,
  });
  // const { loginState } = useContext(LoginContext);
  const [postData, setPostData] = useState<PostData>({
    // Initialize postData with empty values
    id: 0,
    // username: loginState['username'],
    username: '',
    categories: { ...checkboxState },
    content: '',
    image:[],
  });
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles)
      setPostData({ ...postData, image: images });
    }
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(postData.username)
      const JSONobj =  JSON.stringify(postData);
      console.log(JSONobj);
      // console.log('Login State:', loginState);
      axios.post('http://127.0.0.1:8000/api/timeline', JSONobj), {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // const res = await axios.post('http://127.0.0.1:8000/api/timeline', JSONobj);
      setExpanded(false);
    } catch (error) {
      // Handle error
      console.error('Error posting data:', error);
    }
  };
  const handleCancel = () => {
    setCheckboxState(initialCheckboxState);
    setPostData(initialPostData);
    if (!isLoggedIn) {
      // Show error popup or perform some other action to indicate that the user must log in
      alert("You must log in to create a post.");
      // setExpanded((prevExpanded) => !prevExpanded);
      // return;
    }
    // Collapse the form
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const paw = useBearStore.getState().username
  return (
    <div className="mb-4">
      <button
        onClick={() => handleCancel()}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
      >
        {isExpanded ? 'Cancel' : 'New Post'}
      </button>
      {isExpanded && paw !== "" && (
        <form onSubmit={handleSubmit}>
          {/* <input type="checkbox" /> */}
          <div className="categories">
            <Checkbox
            label="Missing"
            name="missing"
            checked={checkboxState.missing}
            onChange={(isChecked) => {
              setCheckboxState((prevState) => ({
                ...prevState,
                missing: isChecked,
              }));
              setPostData((prevData) => ({
                ...prevData,
                categories: {
                  ...prevData.categories,
                  missing: isChecked,
                },
              }));
            }}
            />
          <Checkbox
            label="Foster"
            name="foster"
            checked={checkboxState.foster}
            onChange={(isChecked) => {
              setCheckboxState((prevState) => ({
                ...prevState,
                foster: isChecked,
              }));
              setPostData((prevData) => ({
                ...prevData,
                categories: {
                  ...prevData.categories,
                  foster: isChecked,
                },
              }));
            }}
          />
          <Checkbox
            label="Adoption"
            name="adoption"
            checked={checkboxState.adoption}
            onChange={(isChecked) => {
              setCheckboxState((prevState) => ({
                ...prevState,
                adoption: isChecked,
              }));
              setPostData((prevData) => ({
                ...prevData,
                categories: {
                  ...prevData.categories,
                  adoption: isChecked,
                },
              }));
            }}
          />
          <Checkbox
            label="General"
            name="general"
            checked={checkboxState.general}
            onChange={(isChecked) => {
              setCheckboxState((prevState) => ({
                ...prevState,
                general: isChecked,
              }));
              setPostData((prevData) => ({
                ...prevData,
                categories: {
                  ...prevData.categories,
                  general: isChecked,
                },
              }));
            }}
          />
          </div>
          <textarea
            placeholder="What's on your mind?"
            value={postData.content}
            onChange={(e) => setPostData({ ...postData, content: e.target.value, username: paw })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            rows={5}
          ></textarea>
          {/* <FileUploadForm /> */}
          <form className="w-full">
            <CustomFileSelector
            accept="image/png, image/jpeg"
            onChange={handleFileSelected}
            />
            <ImagePreview images={images} />
            </form>
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
