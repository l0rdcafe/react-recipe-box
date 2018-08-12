import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LSM from "./local-storage-manager";
import recipesArr from "./recipes";
import Dialog from "./dialog";
import IndexView from "./index-view";
import RecipePane from "./recipe-pane";

const DialogWrap = styled.div`
  box-shadow: 2px 10px 10px 5000px rgba(0, 0, 0, 0.6);
`;

const RecipeBoxWrapper = styled.div`
  background: #fff;
  border-radius: 4px 4px 0 0;
  width: 100%;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.4);
  max-width: calc(100% - 20px);
  display: flex;
  flex-direction: column;

  .heading {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .add-button {
    padding-bottom: 4%;
    display: block;
    margin: 0 auto;
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

  @media (max-width: 700px) {
    * {
      font-size: 0.75rem;
    }
    .heading {
      font-size: 1.5rem;
    }

    .recipe-view-name {
      font-size: 1.15rem;
    }
  }
`;

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
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={1000} classNames="fade">
                <Switch location={location}>
                  <RecipeBoxWrapper>
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
                              contents={this.state.recipes.find(
                                r => r.recipe.toLowerCase() === recipe.recipe.toLowerCase()
                              )}
                            />
                          )}
                        />
                        <Route
                          key={`edit-${recipe.recipe.toLowerCase()}`}
                          path={`/${recipe.recipe.toLowerCase()}/edit`}
                          render={() => (
                            <DialogWrap>
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
                            </DialogWrap>
                          )}
                        />
                      </div>
                    ))}
                    <Route
                      path="/new"
                      render={() => (
                        <DialogWrap>
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
                        </DialogWrap>
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
                  </RecipeBoxWrapper>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    );
  }
}

export default App;
