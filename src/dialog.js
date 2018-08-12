import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DialogWrapper = styled.div`
  text-align: center;
  position: fixed;
  width: 500px;
  min-width: 300px;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -200px;
  box-shadow: 0 0 2px black;
  border-radius: 4px;
  background: #fff;
  z-index: 1000;

  textarea {
    margin-bottom: 10px;
    background: #ecf0f0;
    min-width: 300px;
    min-height: 60px;
    resize: vertical;
    color: darken(#176f8a, 10%);
    font-weight: bold;
    font-size: 13px;
    overflow: auto;
    border: 1px solid #176f8a;
  }

  textarea:first-of-type {
    resize: none;
    min-height: 15px;
  }

  textarea:nth-of-type(3) {
    min-height: 100px;
  }

  textarea:focus {
    box-shadow: 0 0 5px #176f8a;
    outline: 1px solid #176f8a;
    border: 1px solid #176f8a;
  }

  .input-title {
    margin: 5px;
  }

  .corner-close {
    background: none;
    border: none;
    outline: none;
    color: #176f8a;
    font-size: 20px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    transition: opacity 0.25s;
  }

  .corner-close:hover {
    opacity: 0.6;
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

  .edit-btn,
  .submit-btn {
    padding: 1% 2%;
    background: #ecf0f0;
    margin: 2%;
    border-radius: 2px;
    font-size: 0.75rem;
    transition: opacity 0.25s;
  }
`;

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
  <DialogWrapper>
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
    <Link to={`/${currRecipe.recipe.toLowerCase()}`}>
      <button className="corner-close" onClick={handleClose}>
        <i className="fa fa-times fa-lg" />
      </button>
    </Link>
    <Link to={`/${currRecipe.recipe.toLowerCase()}`}>
      <button id={submitID} onClick={handleSubmit} className="unstyle-button submit-btn">
        {buttonType}
      </button>
    </Link>
    <Link to={`/${currRecipe.recipe.toLowerCase()}`}>
      <button id={closeID} onClick={handleClose} className="unstyle-button edit-btn">
        Close
      </button>
    </Link>
  </DialogWrapper>
);

export default Dialog;
