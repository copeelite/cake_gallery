<<<<<<< HEAD
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import upcomingHolidays from './HolidayData'
const MenuBar = ({categories = upcomingHolidays, onCategorySelect = () => {} }) => {
=======
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Holiday from "./Holiday";
import HolidayEasy from "./HolidayEasy";

const MenuBar = () => {
>>>>>>> 2941e3ad1c97a0c52590d7e97d758e9c54152f3b
  return (
    <View style={styles.menuBar}>
      <Text style={styles.menuTitle}>Holiday</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="&#x1F50E; Search"
        placeholderTextColor="gray"
      />
      <HolidayEasy />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  menuBar: {
    paddingTop: 60,
    flex: 1,
    padding: 25,
    backgroundColor: "#e0e0e0",
    borderRightWidth: 1, // Add a right border
    borderRightColor: "#888", // Slightly darker color to simulate shadow
    elevation: 3, // Add a subtle drop shadow
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  mainContentExpanded: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    width: "100%",
  },
  iconStyle: {
    alignSelf: "flex-start", // Center the icon horizontally
    marginTop: 20, // Add some margin around the icon
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "brown",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5, // padding inside the TextInput
    marginBottom: 10,
  },
});

export default MenuBar;
