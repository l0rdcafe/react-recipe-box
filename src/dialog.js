import React from "react";

const Dialog = ({
  dialogType,
  nameID,
  ingredientsID,
  directionsID,
  handleClose,
  submitID,
  closeID,
  handleSubmit,
  buttonType
}) => (
  <div className="dialog-box">
    <h2>{dialogType}</h2>
    <div className="input-title">Recipe</div>
    <textarea rows="1" id={nameID} placeholder="Recipe Name" />
    <div className="input-title">Ingredients</div>
    <textarea
      id={ingredientsID}
      placeholder={"Separate each ingredient with a '\\': \n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar"}
    />
    <br />
    <div className="input-title">Directions</div>
    <textarea
      id={directionsID}
      placeholder={
        "Separate each step with a '\\': \n\nPreheat over to 350°F \\ \nCombine ingredients in pie crust \\ \nBake until crust is golden brown"
      }
    />
    <br />
    <button className="corner-close" onClick={handleClose}>
      <i className="fa fa-times" />
    </button>
    <button id={submitID} onClick={handleSubmit}>
      {buttonType}
    </button>
    <button id={closeID} onClick={handleClose}>
      Close
    </button>
  </div>
);

export default Dialog;
