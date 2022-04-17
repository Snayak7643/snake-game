import React from "react";

export default function Food({ food }) {
  return (
    <div>
      <div
        className="food-dot"
        style={{
          top: `${food[0]}%`,
          left: `${food[1]}%`,
        }}
      />
    </div>
  );
}
