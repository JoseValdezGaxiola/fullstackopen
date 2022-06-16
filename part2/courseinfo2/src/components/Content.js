import React from "react";
import Part from "./Part";

function Content({ course }) {
  return (
    <>
      {course.parts.map(function (e, index) {
        return <Part key={index} part={e} />;
      })}
    </>
  );
}

export default Content;
