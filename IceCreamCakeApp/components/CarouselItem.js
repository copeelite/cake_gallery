import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CarouselItem = ({ product }) => {
  return (
    <View style={styles.carouselSlide}>
      <Image source={{ uri: product.image }} style={styles.carouselImage} />
      <Text style={styles.carouselText}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselSlide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '90%', // Adjust as needed
    height: 250, // Adjust as needed
    resizeMode: 'contain',
  },
  carouselText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default CarouselItem;
