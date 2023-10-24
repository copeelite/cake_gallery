import React, { useState } from 'react';
import { View } from 'react-native';
import MenuBar from './components/MenuBar';
import ProductList from './components/ProductList';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dummy data
  const categories = [
    { id: 1, name: 'Chocolate Cakes' },
    { id: 2, name: 'Vanilla Cakes' },
    // ... add more categories
  ];

  const products = [
    // ... products based on the selected category
  ];

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <MenuBar categories={categories} onCategorySelect={setSelectedCategory} />
      <ProductList products={products} />
    </View>
  );
}

export default App;
