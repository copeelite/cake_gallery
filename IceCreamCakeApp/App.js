import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MenuBar from "./components/MenuBar";
import ProductList from "./components/ProductList";

const App = () => {
  const [isMenuBarOpen, setMenuBarOpen] = useState(false);
  const menuBarWidth = 250;
  const screenWidth = Dimensions.get("window").width;

  const menuBarPosition = useRef(new Animated.Value(-menuBarWidth)).current;
  const productListPosition = useRef(new Animated.Value(0)).current;
  const productListWidth = useRef(new Animated.Value(screenWidth)).current;

  const toggleMenuBar = () => {
    setMenuBarOpen(!isMenuBarOpen);

    Animated.parallel([
      Animated.timing(menuBarPosition, {
        toValue: isMenuBarOpen ? -menuBarWidth : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(productListPosition, {
        toValue: isMenuBarOpen ? 0 : menuBarWidth / 2,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.menuBarContainer,
          { width: menuBarWidth, left: menuBarPosition },
        ]}
      >
        <MenuBar />
      </Animated.View>
      <Animated.View
        style={{
          
          flex: 1,
          transform: [{ translateX: productListPosition }],
          width: productListWidth,
        }}
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
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  iconContainer: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 9999,
  },
});

export default App;
