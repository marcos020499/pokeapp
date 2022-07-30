import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

const Container = ({children, isFocused}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const color = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(color, {
        toValue: 1,
        delay: 100,
        duration: 4500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused]);
  const colors = color.interpolate({
    inputRange: [0, 1],
    outputRange: ['#232A30', 'rgba(229, 229, 229, 1);'],
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
    },
  });
  return (
    <Animated.View style={(styles.container, {backgroundColor: colors})}>
      {children}
    </Animated.View>
  );
};
export default Container;
