import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const ProductList = ({ products = [] }) => {
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
