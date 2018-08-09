import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RecipeWrapper = styled.div`
  .recipe-view {
    padding: 2%;
  }

  .recipe-view-name {
    font-size: 1.5rem;
    color: #000;
    text-transform: uppercase;
    text-align: center;
  }

  .recipe-body {
    width: 100%;
  }

  button[title="Edit Recipe"],
  button[title="Delete Recipe"] {
    float: right;
  }

  .unstyle-button {
    background: none;
    border: none;
    outline: none;
    color: #176f8a;
    cursor: pointer;
    transition: opacity 0.25s;
  }

  .unstyle-button:hover {
    opacity: 0.6;
  }
`;

const RecipePane = ({ displayRecipe, handleDelete, handleEdit, contents }) => {
  const recipe = (
    <RecipeWrapper>
      <div id={displayRecipe.toLowerCase()} className="recipe-view">
        <div className="recipe-title">
          <div className="recipe-view-name title-row">{contents.recipe.replace(/-/g, " ")}</div>
          <div className="title-row">
            <Link to="/">
              <button
                id={`delete-${displayRecipe.toLowerCase()}`}
                onClick={handleDelete}
                title="Delete Recipe"
                value={displayRecipe}
                className="unstyle-button"
              >
                <i className="fa fa-trash fa-lg fa-2x" />
              </button>
            </Link>
            <Link to={`/${displayRecipe.toLowerCase()}/edit`}>
              <button
                id={`edit-${displayRecipe.toLowerCase()}`}
                onClick={handleEdit}
                title="Edit Recipe"
                value={displayRecipe}
                className="unstyle-button"
              >
                <i className="fas fa-edit fa-lg fa-2x" />
              </button>
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
    </RecipeWrapper>
  );

  return <div>{recipe}</div>;
};

export default RecipePane;
