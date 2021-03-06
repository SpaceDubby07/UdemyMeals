import React from "react";
import { Text, StyleSheet } from "react-native";

const DefaultText = (props) => {
  // We just use this to style some text in the MealItem.js file
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});

export default DefaultText;
