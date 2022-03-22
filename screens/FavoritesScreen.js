import React from "react";
import MealList from "../components/MealList";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
  // this selects a slice of our state, we dont want favorites hindered by anything
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  // check if there are favorites, if not, show fallback text
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No Favorite Meals Found!</DefaultText>
      </View>
    );
  }

  // return the mealList data on the filters page by using the listData as the favMeals constant above - dummy data
  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
