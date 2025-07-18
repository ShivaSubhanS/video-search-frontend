import React, { useState } from 'react';
import VideoUpload from './VideoUpload';
import VideoSearch from './VideoSearch';
import './App.css';

// eslint-disable-next-line no-unused-vars
function App() {
  const [videoUrl, setVideoUrl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [, setSelectedTimestamp] = useState(0);

  return (
    <div className="app">
      <h1>Video Search App</h1>
      <VideoUpload setVideoUrl={setVideoUrl} />
      {videoUrl && (
        <>
          <VideoSearch setSelectedTimestamp={setSelectedTimestamp} />
        </>
      )}
    </div>
  );
}

export default App;