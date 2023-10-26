import React, { useState, useRef } from "react";
import {
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
  const menuBarPosition = useRef(new Animated.Value(-menuBarWidth)).current;
  const productListWidth = useRef(new Animated.Value(Dimensions.get("window").width)).current;

  const toggleMenuBar = () => {
    let targetWidth = isMenuBarOpen ? Dimensions.get("window").width : Dimensions.get("window").width - menuBarWidth;

    Animated.parallel([
      Animated.timing(menuBarPosition, {
        toValue: isMenuBarOpen ? -menuBarWidth : 0,
<<<<<<< HEAD
        duration: 150,
=======
        duration: 100,
>>>>>>> 2941e3ad1c97a0c52590d7e97d758e9c54152f3b
        useNativeDriver: false,
      }),
      Animated.timing(productListWidth, {
        toValue: targetWidth,
<<<<<<< HEAD
        duration: 150,
=======
        duration: 100,
>>>>>>> 2941e3ad1c97a0c52590d7e97d758e9c54152f3b
        useNativeDriver: false,
      }),
    ]).start(() => {
      
      setMenuBarOpen(!isMenuBarOpen);
    });
  };
<<<<<<< HEAD

=======
>>>>>>> 2941e3ad1c97a0c52590d7e97d758e9c54152f3b

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
          { left: menuBarPosition, width: menuBarWidth },
        ]}
      >
        <MenuBar />
      </Animated.View>

      <Animated.View
        style={[
          styles.productList,
          { width: productListWidth }
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
  productList: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%', }
});

export default App;
