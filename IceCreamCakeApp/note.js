// import React, { useState, useRef } from "react";
// import {
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import MenuBar from "./components/MenuBar";
// import ProductList from "./components/ProductList";

// const App = () => {
//   const [isMenuBarOpen, setMenuBarOpen] = useState(false);
//   const menuBarWidth = 250;
//   const screenWidth = Dimensions.get("window").width;

//   const menuBarPosition = useRef(new Animated.Value(-menuBarWidth)).current;
//   const productListPosition = useRef(new Animated.Value(0)).current;
//   const productListWidth = useRef(new Animated.Value(screenWidth)).current;

//   const toggleMenuBar = () => {
//     setMenuBarOpen(!isMenuBarOpen);

//     Animated.parallel([
//       Animated.timing(menuBarPosition, {
//         toValue: isMenuBarOpen ? -menuBarWidth : 0,
//         duration: 150,
//         useNativeDriver: false,
//       }),
//       Animated.timing(productListPosition, {
//         toValue: isMenuBarOpen ? 0 : menuBarWidth / 2,
//         duration: 150,
//         useNativeDriver: false,
//       }),
//     ]).start();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View
//         style={[
//           styles.menuBarContainer,
//           { width: menuBarWidth, left: menuBarPosition },
//         ]}
//       >
//         <MenuBar />
//       </Animated.View>
//       <Animated.View
//         style={{
          
//           flex: 1,
//           transform: [{ translateX: productListPosition }],
//           width: productListWidth,
//         }}
//       >
//         <ProductList />
//       </Animated.View>
//       <TouchableOpacity onPress={toggleMenuBar} style={styles.iconContainer}>
//         <Feather name="sidebar" size={24} color="#5c83ef" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     zIndex: 0,
//   },
//   menuBarContainer: {
//     position: "absolute",
//     top: 0,
//     height: "100%",
//     backgroundColor: "#e0e0e0",
//     borderRightWidth: 1,
//     borderRightColor: "#888",
//     elevation: 3,
//     zIndex: 1,
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'center', // Center content vertically
//     alignItems: 'center', // Center content horizontally
//   },
//   iconContainer: {
//     position: "absolute",
//     top: 25,
//     left: 25,
//     zIndex: 9999,
//   },
// });

// export default App;

// const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderEnd: (e, gestureState) => {
//       if (gestureState.dx > 100) {  // if swipe left to right
//         if (!isMenuBarOpen) toggleMenuBar(); // open the menu bar
//       } else if (gestureState.dx < -100) { // if swipe right to left
//         if (isMenuBarOpen) toggleMenuBar();  // close the menu bar
//       }
//       return true;
//     }});




<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Animated.View
            style={[styles.modalView, { transform: `translateY(${pan.y}px)` }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.imageContainer}>
              {filteredProducts.length > 2 && filteredProducts[prevIndex] && (
                <Image
                  source={{ uri: filteredProducts[prevIndex].image }}
                  style={[styles.sideImage]}
                />
              )}
            </View>

            <View style={styles.imageContainer}>
              {filteredProducts[currentIndex] && (
                <Image
                  source={{ uri: filteredProducts[currentIndex].image }}
                  style={styles.modalImage}
                />
              )}
            </View>
            <View style={styles.imageContainer}>
              {filteredProducts.length > 1 && filteredProducts[prevIndex] && (
                <Image
                  source={{ uri: filteredProducts[nextIndex].image }}
                  style={[styles.sideImage]}
                />
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>