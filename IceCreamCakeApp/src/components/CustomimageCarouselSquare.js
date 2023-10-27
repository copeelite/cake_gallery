import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";
const CustomImageCarouselSquare = ({ data }) => {
  const [newData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.6;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <Animated.ScrollView
      horizontal
      showHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      decelerationRate="fast"
      onScroll={onScroll}
    >
      {newData.map((item, index) => {
        const style = useAnimatedStyle(() => {
          const scale = interpolate(
            x.value,
            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
            [0.8, 1, 0.8]
          );
          return {
            transform: [{ scale }],
          };
        });
        if (!item.image) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View key={index} style={{ width: SIZE }}>
            <Animated.View style={[styles.imageContainer, style, style.shadowEffect]}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default CustomImageCarouselSquare;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 34,
    overflow: "hidden",
  },
  image: {
    width: "100%", // example width
    height: undefined,
    resizeMode: "contain",
    backgroundColor: "white",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  
});
