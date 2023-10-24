
const fakeProducts = [
  {
    id: 1,
    name: 'Chocolate Cake',
    price: 12.99,
    image: 'https://via.placeholder.com/150?text=Chocolate+Cake'
  },
  {
    id: 2,
    name: 'Vanilla Cake',
    price: 10.99,
    image: 'https://via.placeholder.com/150?text=Vanilla+Cake'
  },
  {
    id: 3,
    name: 'Strawberry Cake',
    price: 14.99,
    image: 'https://via.placeholder.com/150?text=Strawberry+Cake'
  },
  {
    id: 4,
    name: 'Blueberry Muffin',
    price: 4.99,
    image: 'https://via.placeholder.com/150?text=Blueberry+Muffin'
  },
  {
    id: 5,
    name: 'Croissant',
    price: 2.99,
    image: 'https://via.placeholder.com/150?text=Croissant'
  }
];
import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const ProductList = ({ products = fakeProducts }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seneca Bakery</Text>
      </View>
      <View style={styles.listContainer}>
        {products.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  },
});

export default ProductList;
