import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MenuBar = ({ categories, onCategorySelect }) => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => onCategorySelect(category)}>
          <Text style={{ padding: 10 }}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default MenuBar;
