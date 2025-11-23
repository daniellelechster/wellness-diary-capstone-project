import React, { useState } from "react";

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

      {/* Buttons */}
      <div className="mental-buttons-container">
        <h2 className="mental-buttons-title">Select an Article Topic</h2>
        <div className="article-buttons-row">
          <button className="mental-button depression" onClick={() => fetchArticle("depression")}>
            Depression
          </button>
          <button className="mental-button anxiety" onClick={() => fetchArticle("anxiety")}>
            Anxiety
          </button>
          <button className="mental-button stress" onClick={() => fetchArticle("stress")}>
            Stress
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p>Loading article...</p>}

      {/* Article Display */}
      {article && (
        <div className="article-container">
          <h2>{article.title}</h2>

          {article.imageUrl && (
            <img className="article-image" src={article.imageUrl} alt={article.title} />
          )}

          {article.description && (
            <p className="article-description">{article.description}</p>
          )}

          <a
            className="read-more-button"
            href={`https://health.gov/myhealthfinder/topics/health-topic/${article.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Full Article
          </a>
        </div>
      )}
    </div>
  );
}





// import React, { useState } from "react";

//     export default function Articles() {
//     const [article, setArticle] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchArticle = async (topic) => {
//         setLoading(true);
//         setArticle(null);

//         try {
//         const response = await fetch(`http://localhost:8080/api/article/${topic}`);
//         const data = await response.json();
//         setArticle(data);
//         } catch (err) {
//         console.error("Error fetching article:", err);
//         } finally {
//         setLoading(false);
//         }
//     };

//     return (
//         <div className="articles-page">
//         <h1>Health & Wellness Articles</h1>

//         {/* Buttons */}
//                 <div className="mental-buttons-container">
//                     <h2 className="mental-buttons-title">Select an Article Topic</h2>
//         <div className="article-buttons-row">
//             <button className="mental-button depression" onClick={() => fetchArticle("depression")}>
//             Depression
//             </button>

//             <button className="mental-button anxiety" onClick={() => fetchArticle("anxiety")}>
//             Anxiety
//             </button>

//             <button className="mental-button stress" onClick={() => fetchArticle("stress")}>
//             Stress
//             </button>
//         </div>
//     </div>

//         {/* Loading State */}
//         {loading && <p>Loading article...</p>}

//         {/* Article Display */}
//         {article && (
//             <div className="article-container">
//             <h2>{article.Title}</h2>

//             <div
//                 className="article-content"
//                 dangerouslySetInnerHTML={{ __html: article.Content }}>
//             </div>
//             </div>
//         )}

//         </div>
//     );
// }
