import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const isFavorite = favoriteMeals.some(
      (meal) => meal.id === itemData.item.id
    );
    return (
      // use the MealItem component to render the meal items
      // We get the title, duration, complexity, affordabiliy,
      // the image, and when we 'onSelectMeal' go to the MealDetailScreen
      // by passing in the item id - which we get from categoryMealsScreen
      // displayedMeals - listData prop using the flatlist below
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavorite,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      {/* 
      data is the props.listData - we call this in CategoryMealsScreen 
      we render the item, using the renderMealItem function above
      which is the MealItem component 
      */}
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "90%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default MealList;
