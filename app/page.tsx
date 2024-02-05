'use client'
import React from 'react';
import Timeline from '../components/timeline';

const posts = [
  {
    username: 'John Doe',
    avatar: '',
    content: 'This is my first post on the timeline!',
    date: '01/15/2024',
  },
  {
    username: 'Jane Smith',
    avatar: '',
    content: 'Excited to share updates with everyone!',
    date: '01/15/2024',
  },
  // Add more posts as needed
];

const Home: React.FC = () => {
  return (
    <div>
      <Timeline events={posts} />
    </div>
  );
};

export default Home;
