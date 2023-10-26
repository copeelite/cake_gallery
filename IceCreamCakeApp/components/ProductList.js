const fakeProducts = [
  // Halloween Products
  {
    id: 1,
    name: "Spooky Pumpkin Cake",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/pumpkin-cake.png?v=1&d=20180402T175240Z",
  },
  {
    id: 2,
    name: "Ghostly Cupcakes",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/car_450099_screamers-product-page-update_v1.png?v=1&d=20201102T124746Z",
  },
  {
    id: 3,
    name: "Witch Hat Cookies",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/featured/cakes/3d-butterfly-card/cake-cta-new_0015_50-witch.png?v=1&d=20180507T160631Z&la=en&h=215&w=436&hash=C04B53AA83AE596AC7EAA0A6CC150D16",
  },

  // Christmas Products
  {
    id: 4,
    name: "Christmas Tree Cake",
    category: "Christmas",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/christmas-tree-cake.png?v=1&d=20180328T151204Z",
  },
  {
    id: 5,
    name: "Santa Claus Cookies",
    category: "Christmas",
    image: "https://via.placeholder.com/150?text=Santa+Claus+Cookies",
  },

  // Birthday Products
  {
    id: 6,
    name: "Classic Birthday Cake",
    category: "Birthday",
    image: "https://via.placeholder.com/150?text=Classic+Birthday+Cake",
  },
  {
    id: 7,
    name: "Birthday Cupcakes",
    category: "Birthday",
    image: "https://via.placeholder.com/150?text=Birthday+Cupcakes",
  },

  // Valentine's Day Products
  {
    id: 8,
    name: "Heart-Shaped Cake",
    category: "Valentine's Day",
    image: "https://via.placeholder.com/150?text=Heart-Shaped+Cake",
  },
  {
    id: 9,
    name: "Love Cookies",
    category: "Valentine's Day",
    image: "https://via.placeholder.com/150?text=Love+Cookies",
  },
  {
    id: 10,
    name: "Tom the Turkey® Cake",
    category: "Thanksgiving",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/tom-the-turkey-cake.png?v=1&d=20180402T175505Z",
  },
];

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";

const ProductList = ({ products = fakeProducts, title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(
    (product) => product.category === title
  );
  const screenHeight = Dimensions.get("window").height;
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);

    // Start the animation from off-screen
    pan.setValue({ x: 0, y: screenHeight });

    //Animate to slide up
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy >= 0) {
        // Only allow dragging downwards
        pan.setValue({ x: 0, y: gestureState.dy });
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 50) {
        // Threshold to trigger close
        setModalVisible(false);
      } else {
        // Snap back to original position
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.listContainer}>
        {filteredProducts.map((product, index) => (
          <Pressable
            key={index}
            style={styles.productItem}
            onPress={() => openModal(product)}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
          </Pressable>
        ))}
      </View>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Animated.View
            style={[styles.modalView, { transform: [{ translateY: pan.y }] }]}
            {...panResponder.panHandlers}
          >
            {selectedProduct && (
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.modalImage}
              />
            )}
          </Animated.View>
        </View>
      </Modal>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productImage: {
    width: 50,
    height: 50,
  },
  productName: {
    marginLeft: 10,
    flex: 1,
  },
  productPrice: {
    marginLeft: 10,
    textAlign: "right", // Ensure the price is aligned to the right
  },

  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 10, // Reduced top padding
    paddingBottom: 35, // Adjust as needed
    paddingHorizontal: 35, // Adjust as needed
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 600,
    height: 600,
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#2196F3",
    padding: 10,
    elevation: 2,
    borderRadius: 10,
  },
  // closeButtonText: {
    
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ProductList;
