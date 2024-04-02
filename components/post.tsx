import useState from 'react-usestateref';
import Image from 'next/image';
import axios from 'axios';
import { useEffect } from 'react';

interface Comments {
  id: number;
  text: string;
}

interface ReturnComments {
  id: number;
  post: number;
  text: string;
}
interface PostProps {
  id: number;
  username: string;
  missing: boolean;
  foster: boolean;
  adoption: boolean;
  general: boolean;
  content: string;
  images: File[];
  createdAt: string;
}

export const getTimelineComments = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/timeline/comments');
    return response.data;
  } catch (error) {
    console.error('Error fetching timeline comments:', error);
    throw error; // Re-throw the error for handling in your components
  }
};

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
}) => {

  const [timelineComment, setTimelineComment] = useState<ReturnComments[]>([]);
  useEffect(() => {
    const fetchTimelineComments = async () => {
      try {
        const timeline_comments = await getTimelineComments();
        setTimelineComment(timeline_comments)
      } catch (error) {
        // Handle the error as needed
      }
    };

    fetchTimelineComments();
    // Set up interval to fetch data every X seconds
    const intervalId = setInterval(fetchTimelineComments, 60000); // Fetch data every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  });

  const [Comment, setComment, CommentRef] = useState<Comments>({ id: 0, text: '' });
  const handleCommentSubmit = () => {
    try {
      Comment.id = id
      const JSONobj =  JSON.stringify(Comment);
      axios.post('http://127.0.0.1:8000/api/timeline/comments', JSONobj), {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } catch (error) {
      console.error('Error posting data:', error);
    } 
    setComment({ id: 0 , text: '' });
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
        {images.map((imageFile, index) => (
          <Image key={index} src={URL.createObjectURL(imageFile)} alt={`Post Image ${index + 1}`} width={500} height={300} />
        ))}
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
            name="content"
            placeholder="Leave a comment"
            value={Comment.text}
            onChange={(e) => setComment({ ...Comment, text: e.target.value })}
            className="p-1 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-1 rounded">Comment</button>
        </form>
      </div>
      <ul >
        {timelineComment.reverse().map((comment) => (
          (id === comment.post ? <li className="comment-text" key={comment.id}>{comment.text}</li> : null)
        ))}
      </ul>
    </div>
  );
};

export default Post;
