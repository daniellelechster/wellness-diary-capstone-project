import React, { useState } from "react";
import logo from "./images/logo.png";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (topic) => {
    setLoading(true);
    setArticles([]);
    setCurrentIndex(0);
    setCurrentArticle(null);

    try {
      const response = await fetch(`http://localhost:8080/api/article/${topic}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setArticles(data);
        setCurrentIndex(0);
        setCurrentArticle(data[0]);
      } else {
        console.error("No articles returned.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextArticle = () => {
    if (articles.length === 0) return;

    const newIndex = (currentIndex + 1) % articles.length;
    setCurrentIndex(newIndex);
    setCurrentArticle(articles[newIndex]);
  };

  return (
    <div className="articles-page">
      <h1>Health & Wellness Articles</h1>

      <div className="mental-buttons-container">
        <h2 className="mental-buttons-title">Select an Article Topic</h2>
        <div className="article-buttons-row">
          <button className="mental-button depression" onClick={() => fetchArticles("depression")}>
            Depression
          </button>
          <button className="mental-button anxiety" onClick={() => fetchArticles("anxiety")}>
            Anxiety
          </button>
          <button className="mental-button stress" onClick={() => fetchArticles("stress")}>
            Stress
          </button>
        </div>
      </div>

      <div className="article-container">
        {!currentArticle && !loading && (
          <div
            className="article-placeholder"
            style={{ backgroundImage: `url(${logo})` }}
          />
        )}

        {loading && <p>Loading article...</p>}

        {currentArticle && !loading && (
          <>
            <h2 className="article-title">{currentArticle.title}</h2>

            {currentArticle.description && (
              <p className="article-desc">{currentArticle.description}</p>
            )}

            {currentArticle.imageUrl && (
              <img
                src={currentArticle.imageUrl}
                alt={currentArticle.title}
                className="article-image"
              />
            )}

            <div className="article-buttons-row" style={{ marginTop: "15px" }}>
              {articles.length > 1 && (
                <button
                  className="next-article-button"
                  onClick={nextArticle}
                >
                  Next Article
                </button>
              )}

              <button
                className="article-link-button"
                onClick={() => {
                  if (currentArticle.accessibleVersion) {
                    window.open(currentArticle.accessibleVersion, "_blank");
                  } else {
                    alert("No accessible version available for this article.");
                  }
                }}
              >
                Read Full Article
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
