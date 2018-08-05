import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import LSM from "./local-storage-manager";
import recipesArr from "./recipes";
import Dialog from "./dialog";
import IndexView from "./index-view";
import RecipePane from "./recipe-pane";

class App extends React.Component {
  constructor(props) {
    super(props);
    const recipes =
      !LSM.get("recipe-item") || LSM.get("recipe-item").length === 0 ? recipesArr : LSM.get("recipe-item");
    const currRecipe =
      recipes.length > 1
        ? recipes[1].recipe
            .toLowerCase()
            .split(" ")
            .join("-")
        : recipes[0].recipe
            .toLowerCase()
            .split(" ")
            .join("-");

    this.state = {
      showDialog: false,
      recipes,
      dialogType: "Add Recipe",
      currRecipe
    };
  }
  getRecipeList = () => this.state.recipes.map(recipe => recipe.recipe.toLowerCase());
  setDialogType = () => {
    if (this.state.dialogType === "Add Recipe") {
      this.addRecipe(this.state.dialogType);
    } else {
      this.editRecipe(this.state.dialogType);
    }
  };
  showRecipe = recipe => {
    this.setState({ currRecipe: recipe });
  };
  showOnClick = e => {
    let currRecipe = e.target.innerText;
    currRecipe = currRecipe
      .toLowerCase()
      .split(" ")
      .join("-");
    this.showRecipe(currRecipe);
  };
  addRecipe = type => {
    const dialogIDs =
      type === "Add Recipe"
        ? ["add-recipe-name", "add-ingredients", "add-directions"]
        : ["edit-recipe-name", "edit-ingredients", "edit-directions"];
    let recipeName = document.getElementById(dialogIDs[0]).value.replace(/\s+/g, "-");

    if (recipeName.endsWith("-")) {
      recipeName = recipeName.slice(0, -1);
    }

    const newRecipe = {
      recipe: recipeName,
      ingredients: document.getElementById(dialogIDs[1]).value.split("\\"),
      directions: document.getElementById(dialogIDs[2]).value.split("\\")
    };

    const recipes = LSM.get("recipe-item");
    const recipeList = this.getRecipeList();

    if (newRecipe.recipe === "") {
      alert("Recipe must have name");
    } else if (recipeList.indexOf(recipeName.toLowerCase()) !== -1) {
      recipeName = recipeName.replace("-", " ");
      alert(`${recipeName} has already been added to the Recipe Box`);
    } else {
      recipes.push(newRecipe);
      LSM.set(recipes);
      setTimeout(() => {
        this.showRecipe(newRecipe.recipe.toLowerCase());
      }, 10);
      this.setState({
        recipes,
        showDialog: !this.state.showDialog
      });
    }
  };
  editRecipe = () => {
    const recipes = this.state.recipes.filter(recipe => recipe.recipe.toLowerCase() !== this.state.editThis);
    LSM.set(recipes);
    this.addRecipe();
  };
  deleteRecipe = e => {
    let tabToFocus;
    const recipeList = this.getRecipeList();
    const { value } = e.currentTarget.attributes[2];
    if (recipeList.indexOf(value) >= 1) {
      tabToFocus = recipeList[recipeList.indexOf(value) - 1]
        ? recipeList[recipeList.indexOf(value) - 1]
        : recipeList[0];
    }

    this.showRecipe(tabToFocus);
    const recipes = this.state.recipes.filter(recipe => recipe.recipe.toLowerCase() !== value);
    LSM.set(recipes);
    this.setState({ recipes, currRecipe: tabToFocus });
  };
  populateFormData = str => {
    if (str === "") {
      return null;
    }
    const recipe = this.state.recipes.find(r => r.recipe.toLowerCase() === str);

    setTimeout(() => {
      this.setState({ editThis: recipe.recipe.toLowerCase() });
    }, 10);
  };
  toggleDialogDisplay = e => {
    const indicator = e.currentTarget.title ? e.currentTarget.title : "";
    this.setState({
      dialogType: indicator,
      showDialog: !this.state.showDialog
    });
    const val = e.currentTarget.value ? e.currentTarget.value : "";
    this.populateFormData(val);
  };
  render() {
    return (
      <Router>
        <Switch>
          <div className="recipe-box-wrapper">
            <div className="heading">Recipe Box</div>
            <IndexView handleClick={this.showOnClick} contents={this.state.recipes} />
            <Route
              exact
              path="/"
              render={() => <Redirect to={this.state.currRecipe ? `/${this.state.currRecipe}` : ""} />}
            />
            {this.state.recipes.map(recipe => (
              <div>
                <Route
                  key={recipe.recipe}
                  path={`/${recipe.recipe.toLowerCase()}`}
                  render={() => (
                    <RecipePane
                      displayRecipe={recipe.recipe.toLowerCase()}
                      handleDelete={this.deleteRecipe}
                      handleEdit={this.toggleDialogDisplay}
                      contents={this.state.recipes.find(r => r.recipe.toLowerCase() === recipe.recipe.toLowerCase())}
                    />
                  )}
                />
                <Route
                  key={`edit-${recipe.recipe.toLowerCase()}`}
                  path={`/${recipe.recipe.toLowerCase()}/edit`}
                  render={() => (
                    <div className="dialog-box dialog-wrap">
                      <Dialog
                        dialogType="Edit Recipe"
                        buttonType="Save"
                        nameID="edit-recipe-name"
                        ingredientsID="edit-ingredients"
                        directionsID="edit-directions"
                        submitID="edit-submit"
                        closeID="edit-close"
                        handleSubmit={this.setDialogType}
                        handleClose={this.toggleDialogDisplay}
                        currRecipe={recipe}
                      />
                    </div>
                  )}
                />
              </div>
            ))}
            <Route
              path="/new"
              render={() => (
                <div className="dialog-box dialog-wrap">
                  <Dialog
                    dialogType="Add a Recipe"
                    buttonType="Add"
                    nameID="add-recipe-name"
                    ingredientsID="add-ingredients"
                    directionsID="add-directions"
                    submitID="add-submit"
                    closeID="add-close"
                    handleSubmit={this.setDialogType}
                    handleClose={this.toggleDialogDisplay}
                    currRecipe={this.state.recipes.find(r => r.recipe.toLowerCase() === this.state.currRecipe)}
                  />
                </div>
              )}
            />
            <div className="add-button">
              <Link to="/new">
                <button
                  className="unstyle-button"
                  id="add-recipe"
                  title="Add Recipe"
                  onClick={this.toggleDialogDisplay}
                >
                  <i className="far fa-plus-square fa-lg fa-2x" />
                </button>
              </Link>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
