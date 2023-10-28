import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';


const AnimatedItem = ({ item, index, x, SIZE, SPACER }) => {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
      [0.8, 1, 0.8]
    );
    return { transform: [{ scale }] };
  });

  if (!item.image) {
    return <View style={{ width: SPACER }} />;
  }

  return (
    <View style={{ width: SIZE }}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const CustomImageCarouselSquare = ({ data, startIndex = 0 }) => {
  const scrollViewRef = useRef(null);
  useEffect(() => {
    const offset = SIZE * startIndex;
    scrollViewRef.current?.scrollToOffset({ offset, animated: false });
  }, [startIndex, SIZE]);

  const { width } = useWindowDimensions();
  const SIZE = width * 0.55;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const newData = [
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ];

  return (
    <Animated.FlatList
      horizontal
      data={newData}
      renderItem={({ item, index }) => (
        <AnimatedItem item={item} index={index} x={x} SIZE={SIZE} SPACER={SPACER} />
      )}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      decelerationRate="fast"
      onScroll={onScroll}
      ref={scrollViewRef}
    />
  );
};

export default CustomImageCarouselSquare;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 34,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: undefined,
    resizeMode: "contain",
    backgroundColor: "white",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
