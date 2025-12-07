import { useEffect, useState } from "react";

export default function DailyQuote() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    console.log("DailyQuote mounted");

    fetch("http://localhost:8080/api/quote")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch quote");
        return response.json();
      })
      .then((data) => {
        if (!ignore && data?.text && data?.author) {
          setQuote(data);
        }
      })
      .catch((err) => setError(err.message));
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
      <p style={{ fontStyle: "italic" }}>"{quote.text}"</p>
      <p>- {quote.author}</p>
    </div>
  );
}
