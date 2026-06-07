import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);

  // create short url
  const generateShortUrl = async () => {
    if (!url) return;

    try {
      setLoading(true);

      // request for shortcode
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shorten`,
        {
          url,
          customAlias,
        }
      );


      const shortCode = response.data.shortCode;
      setShortCode(shortCode);

      setShortUrl(
        `${import.meta.env.VITE_API_URL}/${shortCode}`
      );

    }
    catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  // fetch analytics data
  const fetchAnalytics = async () => {
    if (!shortCode) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${shortCode}`
      );

      setAnalytics(response.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching analytics");
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

      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
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

      {/* analytics btn */}
      {shortCode && (
        <button
          onClick={fetchAnalytics}
          style={{
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Show Analytics
        </button>
      )}

      {/* analytics data */}
      {analytics.length > 0 && (
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
          }}
        >
          <h2>Analytics</h2>

          <h3>
            Total Clicks: {analytics.length}
          </h3>

          {analytics.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom:
                  "1px solid lightgray",
                marginBottom: "10px",
                paddingBottom: "10px",
              }}
            >
              {/* use strong tag to bold the text */}
              <p>
                <strong>IP:</strong>{" "}
                {item.ipAddress}
              </p>

              <p>
                <strong>User Agent:</strong>{" "}
                {item.userAgent}
              </p>

              {/* it converts timeStamp string:"2026-05-26T10:30:00.000Z"
              into js data object: 26/5/2026, 4:00:00 pm */}
              <p>
                <strong>Visited At:</strong>{" "}
                {new Date(
                  item.visitedAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;