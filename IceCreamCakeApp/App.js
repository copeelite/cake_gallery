import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  PanResponder,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MenuBar from "./components/MenuBar";
import ProductList from "./components/ProductList";

const App = () => {
  const [isMenuBarOpen, setMenuBarOpen] = useState(false);
  const menuBarWidth = 250;
  const screenWidth = Dimensions.get("window").width;

  // const menuBarPosition = useRef(new Animated.Value(-menuBarWidth)).current;
  // const productListPosition = useRef(new Animated.Value(0)).current;
  // const productListWidth = useRef(new Animated.Value(screenWidth)).current;

  const toggleMenuBar = () => {
    setMenuBarOpen(!isMenuBarOpen);
    Animated.timing(animationValue, {
      toValue: isMenuBarOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const animationValue = useRef(new Animated.Value(0)).current;

  const menuBarTranslateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-menuBarWidth, 0],
  });

  const productListTranslateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -menuBarWidth],
  });

  const productListScaledWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, screenWidth - menuBarWidth],
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      if (gestureState.dx > 100) {
        // if swipe left to right
        if (!isMenuBarOpen) toggleMenuBar(); // open the menu bar
      } else if (gestureState.dx < -100) {
        // if swipe right to left
        if (isMenuBarOpen) toggleMenuBar(); // close the menu bar
      }
      return true;
    },
  });
  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.menuBarContainer,
          { transform: [{ translateX: menuBarTranslateX }] },
        ]}
      >
        <MenuBar />
      </Animated.View>

      <Animated.View
        style={[
          {
            transform: [{ translateX: productListTranslateX }],
            width: productListScaledWidth,
          },
        ]}
      >
        <ProductList />
      </Animated.View>
      <TouchableOpacity onPress={toggleMenuBar} style={styles.iconContainer}>
        <Feather name="sidebar" size={24} color="#5c83ef" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    zIndex: 0,
  },
  menuBarContainer: {
    position: "absolute",
    top: 0,
    height: "100%",
    backgroundColor: "#e0e0e0",
    borderRightWidth: 1,
    borderRightColor: "#888",
    elevation: 3,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  iconContainer: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 9999,
  },
});

export default App;
