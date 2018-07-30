import React from "react";

const RecipePane = ({ contents, displayRecipe, handleDelete, handleEdit }) => {
  let recipe;

  for (let i = 0; i < contents.length; i += 1) {
    if (contents[i].recipe.toLowerCase() === displayRecipe) {
      recipe = (
        <div id={contents[i].recipe.toLowerCase()} className="recipe-view">
          <div className="recipe-title">
            <div className="recipe-view-name title-row">{contents[i].recipe.replace(/-/g, " ")}</div>
            <div className="title-row">
              <button
                id={`delete-${contents[i].recipe.toLowerCase()}`}
                onClick={handleDelete}
                title="Delete Recipe"
                value={contents[i].recipe}
              >
                <i className="fa fa-trash" />
              </button>
              <button
                id={`edit-${contents[i].recipe.toLowerCase()}`}
                onClick={handleEdit}
                title="Edit Recipe"
                value={contents[i].recipe}
              >
                <i className="fas fa-edit" />
              </button>
            </div>
          </div>
          <div className="recipe-body">
            <h4>Ingredients:</h4>
            <ul>{contents[i].ingredients.map((ing, j) => <li key={j}>{ing}</li>)}</ul>
            <h4>Directions:</h4>
            <ol className="directions list">{contents[i].directions.map((step, j) => <li key={j}>{step}</li>)}</ol>
          </div>
        </div>
      );
    }
  }

  return <div>{recipe}</div>;
};

export default RecipePane;
