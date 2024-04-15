'use client'
import React, { useState, useEffect } from 'react';
import Post from './post';
import SearchBar from './search-bar';
import PostForm from './new-post';
import axios from 'axios'
import { useBearStore } from './login-util';

interface Event {
  id: number;
  username: string;
  missing: boolean;
  foster: boolean;
  adoption: boolean;
  general: boolean;
  content: string;
  images: File[];
  created_at: string;
}

export const getTimelinePosts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/timeline');
    return response.data;
  } catch (error) {
    console.error('Error fetching timeline posts:', error);
    throw error; // Re-throw the error for handling in your components
  }
};
const Timeline: React.FC = () => {
  // const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [timelinePosts, setTimelinePosts] = useState<Event[]>([]);

  useEffect(() => {
    const fetchTimelinePosts = async () => {
      try {
        const posts = await getTimelinePosts();
        setTimelinePosts(posts);
      } catch (error) {
        // Handle the error as needed
      }
    };

    fetchTimelinePosts();
    // Set up interval to fetch data every X seconds
    const intervalId = setInterval(fetchTimelinePosts, 60000); // Fetch data every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to fetch data only once when the component mounts


  // erase user's login state in 24 hours 
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store the current timestamp in localStorage when the window is about to close
      localStorage.setItem('lastUnloadTime', Date.now().toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  useEffect(() => {
    // Check if the stored timestamp is older than 24 hours
    const storedUnloadTime = localStorage.getItem('lastUnloadTime');
    if (storedUnloadTime) {
      const lastUnloadTime = parseInt(storedUnloadTime, 10);
      const currentTime = Date.now();
      if (currentTime - lastUnloadTime >= 24 * 60 * 60 * 1000) {
        // Clear the username if 24 hours have passed
        useBearStore.getState().resetUsername();
      }
    }
  }, []);



  const handleSearch = (searchQuery: string) => {
    // const filtered = events.filter((event) =>
    //   event.comment.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setFilteredEvents(filtered);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="timeline-container">
        {timelinePosts.slice().reverse().map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            missing={post.missing}
            foster={post.foster}
            adoption={post.adoption}
            general={post.general}
            content={post.content}
            images={post.images}
            createdAt={post.created_at}
          />
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <PostForm />
      </div>
    </div>
  );
};

export default Timeline;