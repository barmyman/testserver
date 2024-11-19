import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [keyword, setKeyword] = useState('');
    const [urls, setUrls] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState('');
    const [progress, setProgress] = useState(null);

    const fetchUrls = async () => {
        try {
            const response = await axios.post('/api/keywords', { keyword });
            setUrls(response.data.urls);
        } catch (err) {
            alert('Error fetching URLs');
        }
    };

    const downloadContent = async () => {
        try {
            const response = await axios.post('/api/download', { url: selectedUrl });
            alert('Download complete: ' + response.data.filePath);
        } catch (err) {
            alert('Error downloading file');
        }
    };

    return (
        <div>
            <h1>Keyword to URL Downloader</h1>
            <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={fetchUrls}>Search</button>

            {urls.length > 0 && (
                <div>
                    <h2>URLs</h2>
                    {urls.map((url, idx) => (
                        <div key={idx}>
                            <input
                                type="radio"
                                name="url"
                                value={url}
                                onChange={() => setSelectedUrl(url)}
                            />
                            {url}
                        </div>
                    ))}
                    <button onClick={downloadContent}>Download</button>
                </div>
            )}
        </div>
    );
};

export default App;