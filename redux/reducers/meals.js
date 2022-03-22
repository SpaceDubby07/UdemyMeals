//Logic for marking a meal as a favorite and manager our filters
// a reducer is basically a function

import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

// Store a list of meals, and filteredMeals, favoriteMeals
// initial state
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

// We get the state - our initial state above, and the action
// then return the new state
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      //Add/remove items that are/aren't favorites
      // if true, and already part of favorites, remove it,
      // else its not part of favorite meals yet
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        // we create a copy of the array, then update it
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };

    default:
      return state;
  }
};

export default mealsReducer;
