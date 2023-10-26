import React, {useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import finalSortedHolidays from "./HolidayData";
const SECTIONS = 10; // using 3 copies of data (beginning, middle, end)

const Holiday = ({ categories = finalSortedHolidays, onCategorySelect = () => {} }) => {
  const scrollViewRef = useRef(null);
  const windowHeight = Dimensions.get('window').height;

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;

    // If user is near the start or the end of the list, adjust scroll position
    if (scrollY < windowHeight) {
      scrollViewRef.current.scrollTo({
        y: (contentHeight / SECTIONS) + scrollY,
        animated: false,
      });
    } else if (scrollY > contentHeight - 2 * windowHeight) {
      scrollViewRef.current.scrollTo({
        y: scrollY - (contentHeight / SECTIONS),
        animated: false,
      });
    }
  };


  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.container}
      showsVerticalScrollIndicator={false}
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

export default Holiday;