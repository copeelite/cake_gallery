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
      "https://www.carvel.com/-/media/carvel/menu/cakes/happy-holidays-square-cake.png?v=1&d=20180402T175052Z",
  },

  // Christmas Products
  {
    id: 4,
    name: "Christmas Tree Cake",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/christmas-tree-cake.png?v=1&d=20180328T151204Z",
  },
  {
    id: 5,
    name: "Santa Claus Cookies",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/fudgie-the-whale.png?v=1&d=20180402T175020Z&la=en&h=600&w=600&hash=EB523660900A86FC3D4C1F8C90A5FEE1",
  },

  // Birthday Products
  {
    id: 6,
    name: "Classic Birthday Cake",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/3d-ice-cream-cone-cake.png?v=1&d=20180328T151229Z",
  },
  {
    id: 7,
    name: "Birthday Cupcakes",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/car-1061871-c5-cinn-olo-web-600x600-cake-2023-01.png?v=1&d=20230927T093350Z&la=en&h=597&w=597&hash=38E984F68AC8A2F57398D4CDBAF62632",
  },

  // Valentine's Day Products
  {
    id: 8,
    name: "Heart-Shaped Cake",
    category: "Halloween",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/3d-butterfly-cake.png?v=1&d=20180328T151155Z",
  },
  {
    id: 9,
    name: "Love Cookies",
    category: "Valentine's Day",
    image:
      "https://www.carvel.com/-/media/carvel/menu/cakes/sweet-image-cake.png?v=1&d=20180328T151153Z&la=en&h=600&w=600&hash=2314D5957C149913C898DCECC8F1BB8A",
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
import CustomImageCarouselSquare from "./CustomimageCarouselSquare";
import CustomimageCarouselSquareNew from "./CustomimageCarouselSquareNew";
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
        <View >
          <Animated.View
            style={[ { transform: [{ translateY: pan.y }] }]}
            {...panResponder.panHandlers}
          >
            <CustomImageCarouselSquare data={filteredProducts}/>

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

  

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ProductList;
