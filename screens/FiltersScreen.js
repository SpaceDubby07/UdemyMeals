import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/actions/meals";

// component built on page because we only use it on this page
const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      {/* For switches to work we need state 
      We can adjust colors when track is true - false if we want
      the value is the state prop we set on each filterSwitch*/}
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  //Destructure navigation object
  const { navigation } = props;

  // State for the switches
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  // Save the filters when we click the save button
  // useCallback allows us to cache data, store an array of dependencies
  // basically prevents the recreation of a function
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    // so we do not trigger a re-render
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  // When state changes, keep data
  // We use setParams to update the parameters on the currently loaded screen
  // We just point at the saveFilters function, we don't execute it.
  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filters and Restrictions</Text>
      {/* use the FilterSwitch component we made in this file
      label is the text that shows up 
      the state is the state, true/false
      do something onChange, get the newValue and use setIs... state, call that newValue on it true/false */}
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

// Navigation for the filters Screen
// Header title, and the toggle drawer side bar button...
FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filters",
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
    // For this to work we need to be able to save the filter - this shows the save icon
    // We use params to do this, we take the 'save' parameter from the useEffect parameters
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
