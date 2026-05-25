import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateShortUrl = async () => {
    if (!url) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/shorten",
        {
          url,
        }
      );

      const shortCode = response.data.shortCode;

      setShortUrl(
        `http://localhost:3000/${shortCode}`
      );
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "400px",
        margin: "100px auto",
      }}
    >
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={generateShortUrl}
        style={{
          padding: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {shortUrl && (
        <div>
          <p>Short URL:</p>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;