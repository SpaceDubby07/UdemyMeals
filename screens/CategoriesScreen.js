import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import customHeaderButton from "../components/HeaderButton";

const CategoriesScreen = (props) => {
  // render grid item, use itemData, get the item, and call the title from categories
  const renderGridItem = (itemData) => {
    return (
      // use the categoryGridTitle component to display/style the grid buttons
      // We get the title, the color
      // Navigate to the CategoryMeals page onSelect prop
      // We then get the categoryId stored in the dummy-data and model files.
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate("CategoryMeals", {
            categoryId: itemData.item.id,
          });
        }}
      />
    );
  };

  return (
    //   Newer versions of RN dont need keyExtractor
    // Return a flatlist which will show the data from the dummy data
    // we use the renderGridItem function to render the items, which is the categoryGridTitle
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

// restart app if not loaded,
// Check navigationOptions docs for more info
// allows us to set header title, styles, etc.
CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",

    // HeaderLeft shows a menu button, which is our side drawer
    // onPress we toggleDrawer and it will show the menu
    // HeaderButtons is built into header-buttons import, and Item is the 'icon' basically that functions as a button
    // we use the 'customeHeaderButton' component we made as our component
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={customHeaderButton}>
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

const styles = StyleSheet.create({});

export default CategoriesScreen;
