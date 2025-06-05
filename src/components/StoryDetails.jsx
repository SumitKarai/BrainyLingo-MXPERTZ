import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/storyDetails.css'; // Assuming you have a CSS file for styling

const StoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
      .then(res => res.json())
      .then(data => {
        setStory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Story not found.</p>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div>
            <h1 className="story-details-title">{story.Title}</h1>
            {story.Image?.[0] && (
              <img
                src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
                alt={story.Title}
                className="story-main-image"
              />
            )}
            <p className="story-status"><strong>Status:</strong> {story.Status}</p>
          </div>
        );
      case 'word':
        return (
          <div className="word-section">
            {story.Wordexplore?.map(word => (
              <div key={word._id} className="word-card">
                <h3>{word.Storytitle}</h3>
                <p>{word.Storyttext}</p>
                {word.Storyimage?.[0] && (
                  <img
                    src={`https://ik.imagekit.io/dev24/${word.Storyimage[0]}`}
                    alt={word.Storytitle}
                    className="word-image"
                  />
                )}
                <p><strong>Story itext:</strong> {word.Storyitext}</p>
                <p><strong>Synonyms:</strong> {word.Synonyms}</p>
                <p><strong>Antonyms:</strong> {word.Antonyms}</p>
                <p><strong>Noun:</strong> {word.Noun}</p>
              </div>
            ))}
          </div>
        );
      case 'images':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {story.Image?.map((img, idx) => (
              <img
                key={idx}
                src={`https://ik.imagekit.io/dev24/${img}`}
                alt="Main Img"
                className="word-image"
              />
            ))}
            {story.Wordexplore?.flatMap(word =>
              word.Storyimage?.map((img, idx) => (
                <img
                  key={word._id + idx}
                  src={`https://ik.imagekit.io/dev24/${img}`}
                  alt={word.Storytitle}
                  className="word-image"
                />
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="story-details-wrapper">
    <div className="story-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Story Info
        </button>
        <button
          className={`tab-btn ${activeTab === 'word' ? 'active' : ''}`}
          onClick={() => setActiveTab('word')}
        >
          Word Explore
        </button>
        <button
          className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
    </div>
  );
};

export default StoryDetails;
