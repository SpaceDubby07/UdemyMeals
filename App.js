import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import mealsReducter from "./redux/reducers/meals";
import { Provider } from "react-redux";

// unlocks screens behind the scenes, a slight performance boost
enableScreens();

// This is for the reducer, we need to merge the reducers into one - combineReducers
const rootReducer = combineReducers({
  // this mergers the meals reducer into this root reducer, so we can manager state
  // using this 'meals' property
  meals: mealsReducter,
});

// we pass this into the provider - interact with the redux store of data
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // used for loading fonts, load them once data is loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  // Data not loaded, then fetch fonts, when finished load data
  // otherwise log an error to console
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return <Provider store={store}><MealsNavigator /></Provider>;
}

const styles = StyleSheet.create({});
