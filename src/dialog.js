import React from "react";
import { Link } from "react-router-dom";

const Dialog = ({
  dialogType,
  nameID,
  ingredientsID,
  directionsID,
  handleClose,
  submitID,
  closeID,
  handleSubmit,
  buttonType,
  currRecipe
}) => (
  <div className="dialog-box">
    <h2>{dialogType}</h2>
    <div className="input-title">Recipe</div>
    <textarea
      rows="1"
      id={nameID}
      placeholder="Recipe Name"
      defaultValue={buttonType === "Save" ? currRecipe.recipe.replace(/-/g, " ") : null}
    />
    <div className="input-title">Ingredients</div>
    <textarea
      id={ingredientsID}
      placeholder={"Separate each ingredient with a '\\': \n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar"}
      defaultValue={buttonType === "Save" ? currRecipe.ingredients.join(" \\ ") : null}
    />
    <br />
    <div className="input-title">Directions</div>
    <textarea
      id={directionsID}
      defaultValue={buttonType === "Save" ? currRecipe.directions.join(" \\\n\n") : null}
      placeholder={
        "Separate each step with a '\\': \n\nPreheat over to 350°F \\ \nCombine ingredients in pie crust \\ \nBake until crust is golden brown"
      }
    />
    <br />
    <Link to={`/${currRecipe.recipe.toLowerCase()}`} className="corner-close" onClick={handleClose}>
      <i className="fa fa-times fa-lg" />
    </Link>
    <Link to={`/${currRecipe.recipe.toLowerCase()}`} id={submitID} onClick={handleSubmit}>
      {buttonType}
    </Link>
    <Link to={`/${currRecipe.recipe.toLowerCase()}`} id={closeID} onClick={handleClose}>
      Close
    </Link>
  </div>
);

export default Dialog;
