import React from "react";
import { Link } from "react-router-dom";

const RecipePane = ({ displayRecipe, handleDelete, handleEdit, contents }) => {
  const recipe = (
    <div id={displayRecipe.toLowerCase()} className="recipe-view">
      <div className="recipe-title">
        <div className="recipe-view-name title-row">{contents.recipe.replace(/-/g, " ")}</div>
        <div className="title-row">
          <Link
            to="/"
            id={`delete-${displayRecipe.toLowerCase()}`}
            onClick={handleDelete}
            title="Delete Recipe"
            value={displayRecipe}
          >
            <i className="fa fa-trash fa-lg fa-2x" />
          </Link>
          <Link
            to={`/${displayRecipe.toLowerCase()}/edit`}
            id={`edit-${displayRecipe.toLowerCase()}`}
            onClick={handleEdit}
            title="Edit Recipe"
            value={displayRecipe}
          >
            <i className="fas fa-edit fa-lg fa-2x" />
          </Link>
        </div>
      </div>
      <div className="recipe-body">
        <h4>Ingredients:</h4>
        <ul>{contents.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}</ul>
        <h4>Directions:</h4>
        <ol className="directions list">{contents.directions.map((step, j) => <li key={j}>{step}</li>)}</ol>
      </div>
    </div>
  );

  return <div>{recipe}</div>;
};

export default RecipePane;
