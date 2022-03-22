import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  // Extract a parameter, which is the categoryId from categoriesScreen.js
  // store this parameter in a constant => catId, which we use to get the specific id's
  const catId = props.navigation.getParam("categoryId");

  // takes a function, gets the state, then returns any data we want from the global store / state
  const availableMeals = useSelector(
    // get the meals that respect the filters setup by the user
    (state) => state.meals.filteredMeals
  );

  // display the meal data based on the selected category from the Category Screen
  // we filter meals as a function, then get the index of the category id's as long as there is an id >= 0 - which there is
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  // if filters are on, and no meals are showing, display some text.
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No Meals Found! Check Filters...</DefaultText>
      </View>
    );
  }

  // We return a MealList component
  // The list data uses the displayedMeals function to select the correct category id based on the navigation
  // We use props.navigation for navigating to the specific items mealData
  // MealList is a nested component inside MealItem
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

// This is a function because we are using different data for different categories
CategoryMealsScreen.navigationOptions = (navigationData) => {
  // get the catId and it becomes the categoryId from the categoriesScreen
  // it is data pulled from the touchableOpacity - Meal List data
  // We select the category and 'find' the id, based on that id we know what page we are on.
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  //return an the header title, as the category title that we select using the function above.
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
