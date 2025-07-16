import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload({ setVideoUrl }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a video file');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('video', file);

    try {
      await axios.post('https://djk73tkd-5000.inc1.devtunnels.ms/upload', formData);
      setVideoUrl(URL.createObjectURL(file));
      alert('Video uploaded and processed successfully');
    } catch (err) {
      setError('Error uploading video: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-upload">
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default VideoUpload;