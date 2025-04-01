import React, { useEffect, useState } from "react";

const FLAG_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/747265";

export default function App() {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    fetch(FLAG_URL)
      .then((res) => res.text())
      .then((text) => {
        setFlag(text.trim());
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && flag && displayed.length === 0) {
      // Use a recursive function with delay using setTimeout
      const revealNext = (i) => {
        if (i >= flag.length) return;
        setDisplayed((prev) => [...prev, flag[i]]);
        setTimeout(() => revealNext(i + 1), 500);
      };
      revealNext(0);
    }
  }, [loading, flag, displayed]);

  return (
    <div>
      <h1>Flag Reveal</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayed.map((char, idx) => (
            <li key={idx}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Bonus: Script used to extract the flag URL
/*
let chars = [];
document.querySelectorAll('section').forEach(section => {
  if (!section.dataset.id?.startsWith('92')) return;
  section.querySelectorAll('article').forEach(article => {
    if (!article.dataset.class?.endsWith('45')) return;
    article.querySelectorAll('div').forEach(div => {
      if (!div.dataset.tag?.includes('78')) return;
      div.querySelectorAll('b.ref').forEach(b => {
        chars.push(b.getAttribute('value'));
      });
    });
  });
});
console.log(chars.join(''));
*/
