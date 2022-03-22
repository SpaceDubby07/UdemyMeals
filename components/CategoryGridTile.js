import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const CategoryGridTile = (props) => {
  // Store touchableOpacity in a variable, this way we can adjust based on Platform
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    // TouchableCmp is touchable opacity, we switch to TouchableNativeFeedback when
    // The platform is Android.
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      {/* Show the touchable component (opacity/native) based on platform */}
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        {/* Allow multiple styles, spread operator */}
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
        {/* Display the title on the grid title, max lines is 2 */}
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    borderRadius: 10,
    // Overflow hidden crops out shadows on ios, so check platform
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    margin: 15,
    height: 150,
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "right",
  },
});

export default CategoryGridTile;
