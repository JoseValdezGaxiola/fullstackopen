import React from "react"

function Total({ course }) {
  const result = course.parts.reduce(
    (total, currentValue) => (total = total + currentValue.exercises),
    0
  );

  return <p>Number of exercises {result}</p>;
}

export default Total