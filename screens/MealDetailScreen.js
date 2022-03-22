import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/actions/meals";

// Custom component built onto the page since we do not use it anywhere else
// We take the DefaultText component for styling
const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    // Scrollview because the page will be larger for some details, no reason for a flatlist because we are just using a single data source
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        {/* We use the 'selectedMeal' constant to display the proper meal information */}
        <DefaultText>{selectedMeal.duration} minutes</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {/* The ingredients are in an array, so we map them, then return jsx 
      JSX also requires a key, since each ingredient is used once ingredient as the key is fine*/}
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {/* map the steps, also an array */}
      {selectedMeal.steps.map((steps) => (
        <ListItem key={steps}>{steps}</ListItem>
      ))}
    </ScrollView>
  );
};

// This is a function because we are using different date for different categories
MealDetailScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);

  //return the header title
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {/* Item title is a fallback title */}
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
