import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: [],
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; // 0;
  const end = page * state.search.resultPerPage; // 9;

  console.log(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // new quantity = oldQt + newServings / OldServings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookMark = function (recipe) {
  // Add BookMark

  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
