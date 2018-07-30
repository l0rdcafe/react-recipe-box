import React from "react";

const IndexView = ({ contents, handleClick }) => {
  const items = contents.map((recipe, i) => (
    <div onClick={handleClick} key={i} className="index-view-item" id={`view-${recipe.recipe.toLowerCase()}`}>
      {recipe.recipe.replace(/-/g, " ")}
    </div>
  ));

  return <div id="index-view">{items}</div>;
};

export default IndexView;
