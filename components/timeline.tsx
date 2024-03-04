'use client'
import React, { useState, useEffect } from 'react';
import Post from './post';
import SearchBar from './search-bar';
import PostForm from './new-post';
import axios from 'axios'


interface Comments {
  username: string;
  comment: string;
}

interface Event {
  id: number;
  username: string;
  missing: boolean;
  foster: boolean;
  adoption: boolean;
  general: boolean;
  content: string;
  images: string;
  created_at: string;
  comments: Comments[];
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
  const [reply, setReply] = useState([]);

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
            comments={post.comments}
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