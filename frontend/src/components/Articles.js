import React, { useState } from "react";
import logo from "./images/logo.png";

export default function Articles() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArticle = async (topic) => {
    setLoading(true);
    setArticle(null);

    try {
      const response = await fetch(`http://localhost:8080/api/article/${topic}`);
      const data = await response.json();
      setArticle(data);
    } catch (err) {
      console.error("Error fetching article:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="articles-page">
      <h1>Health & Wellness Articles</h1>

      <div className="mental-buttons-container">
        <h2 className="mental-buttons-title">Select an Article Topic</h2>

        <div className="article-buttons-row">
          <button
            className="mental-button depression"
            onClick={() => fetchArticle("depression")}
          >
            Depression
          </button>

          <button
            className="mental-button anxiety"
            onClick={() => fetchArticle("anxiety")}
          >
            Anxiety
          </button>

          <button
            className="mental-button stress"
            onClick={() => fetchArticle("stress")}
          >
            Stress
          </button>
        </div>
      </div>

      {/* Article Container */}
      <div className="article-container">
        {!article && !loading && (
          <div
            className="article-placeholder"
            style={{
              backgroundImage: `url(${logo})`,
            }}
          />
        )}

        {loading && <p>Loading article...</p>}

        {article && !loading && (
          <>
            <h2 className="article-title">{article.title}</h2>

            <p className="article-desc">{article.description}</p>

            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-image"
              />
            )}

            {!article.content && (
              <p className="no-content-msg">
                Full article content is not provided by the API.  
                <br />
                Click the button below to read it on Health.gov.
              </p>
            )}

            <button
              className="article-link-button"
              onClick={() => {
                if (article.accessibleVersion) {
                  window.open(article.accessibleVersion, "_blank");
                } else {
                  alert("No accessible version available for this article.");
                }
              }}
            >
              Read Full Article
            </button>
          </>
        )}
      </div>
    </div>
  );
}
