import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/storiesPage.css';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://mxpertztestapi.onrender.com/api/sciencefiction')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error('Error fetching stories:', err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(stories.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const currentStories = stories.slice(startIndex, startIndex + storiesPerPage);

  return (
    <div className="stories-wrapper">
      <div className="stories-container">
        {currentStories.map(story => (
          <div
            key={story._id}
            className="story-card"
            onClick={() => navigate(`/story/${story._id}`)}
          >
            <img
              src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
              alt={story.Title}
              className="story-image"
            />
            <div className="story-content">
              <h3>{story.Title}</h3>
              <button className="status-btn">{story.Status}</button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
