import { useEffect, useState } from "react";

export default function DailyQuote() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://zenquotes.io/api/today") // http://localhost:3000/api/daily-quote
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setQuote(data[0]);
        }
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="quote-card">
        <p>Unable to load your daily quote. Please try again later.</p>
      </div>
    );
  }

  if (!quote) {
    return <p>Loading quote...</p>;
  }

  return (
    <div className="quote-card">
      <h2>Daily Inspiration</h2>
      <p style={{ fontStyle: "italic" }}>"{quote.q}"</p>
      <p>- {quote.a}</p>
    </div>
  );
}