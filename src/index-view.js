import React from "react";
import { Link } from "react-router-dom";

const IndexView = ({ contents, handleClick }) => {
  const items = contents.map((recipe, i) => (
    <Link
      to={`/${recipe.recipe.toLowerCase()}`}
      onClick={handleClick}
      key={i}
      className="index-view-item"
      id={`view-${recipe.recipe.toLowerCase()}`}
    >
      {recipe.recipe.replace(/-/g, " ")}
    </Link>
  ));

  return <div id="index-view">{items}</div>;
};

export default IndexView;
