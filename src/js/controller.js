import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // SPINNER
    recipeView.renderSpinner();

    // LOADING RECIPE
    await model.loadRecipe(id); //not returning anything thats why is not stored

    // RENDERING RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return resultsView.renderError();

    // 2. Load Search Results
    await model.loadSearchResult(query);

    // 3. Render Result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage(3));

    // 4. Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  // render new result
  resultsView.render(model.getSearchResultPage(gotoPage));

  //  Render New Pagination Btn
  paginationView.render(model.state.search);
};

const controlServings = function () {
  // Update the recpe servings (in state)
  model.updateServings(6);

  // update the recipe view
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
