import React from 'react';
import { View, Text, Image } from 'react-native';

const ProductList = ({ products }) => {
  return (
    <View style={{ flex: 2, padding: 10 }}>
      {products.map((product, index) => (
        <View key={index} style={{ flexDirection: 'row', padding: 10 }}>
          <Image source={{ uri: product.image }} style={{ width: 50, height: 50 }} />
          <Text style={{ marginLeft: 10 }}>{product.name}</Text>
          <Text style={{ marginLeft: 10 }}>${product.price}</Text>
        </View>
      ))}
    </View>
  );
}

export default ProductList;
