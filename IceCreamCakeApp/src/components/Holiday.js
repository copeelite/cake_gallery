import React, {useRef} from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import upcomingHolidays from "./HolidayData";
const SECTIONS = 10; // using 3 copies of data (beginning, middle, end)

const Holiday = ({ categories = upcomingHolidays, onCategorySelect = () => {} }) => {
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}  bounces={false}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => onCategorySelect(category)}
            style={styles.categoryItem}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryText: {
    padding: 10,
  },

});

export default Holiday;