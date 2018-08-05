import React from "react";
import { NavLink } from "react-router-dom";

const IndexView = ({ contents, handleClick }) => {
  const items = contents.map((recipe, i) => (
    <NavLink
      to={`/${recipe.recipe.toLowerCase()}`}
      key={i}
      activeStyle={{ color: "#79B473", backgroundColor: "#084C61" }}
    >
      <span onClick={handleClick} className="recipe-list__item" id={`view-${recipe.recipe.toLowerCase()}`}>
        {recipe.recipe.replace(/-/g, " ")}
      </span>
    </NavLink>
  ));

  return (
    <div id="index-view" className="recipe-list">
      {items}
    </div>
  );
};

export default IndexView;
