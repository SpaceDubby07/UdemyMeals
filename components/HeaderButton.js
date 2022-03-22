import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  // ...props forward all props
  return (
    // this shows an iconComponent and we use Ionicons
    // Style the icon according to platform
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
