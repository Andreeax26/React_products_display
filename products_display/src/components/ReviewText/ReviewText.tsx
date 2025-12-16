import { useState } from "react";
import './reviewtext.css'

type ReviewText = {
    text: string;
}

 export function ReviewText({ text }: ReviewText) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p className={expanded ? "review-text expanded" : "review-text"}>
        {text}
      </p>

      {text.length > 120 && (
        <button
          className="view-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </>
  );
}
