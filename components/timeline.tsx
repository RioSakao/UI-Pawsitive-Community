'use client'
import React, { useState } from 'react';
import Post from './post';
import SearchBar from './search-bar';
import PostForm from './new-post';

interface Event {
  username: string;
  avatar: string;
  content: string;
  date: string;
}

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  const handleSearch = (searchQuery: string) => {
    const filtered = events.filter((event) =>
      event.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleAddPost = (content: string) => {
    const newPost: Event = {
      username: 'CurrentUser', // Replace with actual user data
      avatar: '', // Replace with actual user avatar URL
      content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    };

    setFilteredEvents([newPost, ...filteredEvents]);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="timeline-container">
        {filteredEvents.map((event, index) => (
          <Post
            key={index}
            username={event.username}
            avatar={event.avatar}
            content={event.content}
            date={event.date}
          />
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <PostForm onAddPost={handleAddPost} />
      </div>
    </div>
  );
};

export default Timeline;