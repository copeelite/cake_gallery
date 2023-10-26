import React from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import fakeHoliday from "./HolidayData";

const HolidayEasy = ({ categories = fakeHoliday, onCategorySelect = () => {} }) => {
  return (
    <ScrollView
    >
     {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onCategorySelect(category)}
          style={styles.categoryItem}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
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
export default HolidayEasy;
