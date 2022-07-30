import React, {useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';

export const FadeInImage = ({uri, route}) => {
  const {fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };
  const onError = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.pokemonImage}>
      {isLoading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: route?.name === 'DetailsScreen' ? -30 :70,
            left: route?.name === 'DetailsScreen' ? -100 :70,
          }}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onError={onError}
        onLoad={finishLoading}
        style={
          route?.name === 'DetailsScreen'
            ? styles.pokemonImages
            : styles.pokemonImage
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImages: {
    width: 220,
    height: 220,
    position: 'absolute',
    right: 100,
    bottom: 20,
  },
});
