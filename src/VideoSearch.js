import React, { useState } from 'react';
import axios from 'axios';

function VideoSearch({ setSelectedTimestamp }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setError(null);
    try {
      const response = await axios.post('https://0562f4ff5a67.ngrok-free.app/search', { query });
      setResults(response.data);
    } catch (err) {
      setError('Error searching: ' + (err.response?.data?.error || err.message));
    }
  };

  const formatTimestamp = (timestamp) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-search">
      <h2>Search Video</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <div className="results">
          <h3>Search Results</h3>
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => setSelectedTimestamp(result.timestamp)}
                className="result-item"
              >
                <img src={`data:image/jpeg;base64,${result.thumbnail}`} alt="Thumbnail" />
                <div>
                  <p><strong>Caption:</strong> {result.caption}</p>
                  <p><strong>Time:</strong> {formatTimestamp(result.timestamp)}</p>
                  <p><strong>Similarity:</strong> {(result.similarity * 100).toFixed(2)}%</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VideoSearch;
