import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useDispatch} from 'react-redux';
import {getPokemonDetails} from '../redux/reducers/reducer';
export const PokemonCard = ({pokemon, navigation, route}) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  const urlParts = pokemon?.url.split('/');
  const id = urlParts[urlParts.length - 2];
  const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  useEffect(() => {
    ImageColors.getColors(picture, {fallback: 'grey'}).then(colors => {
      if (!isMounted.current) return;
      colors.platform === 'android'
        ? setBgColor(colors.dominant || 'grey')
        : setBgColor(colors.background || 'grey');
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      key={id}
      testID="press"
      onPress={() => {
        dispatch(getPokemonDetails({id: id})),
          navigation.navigate('DetailsScreen', {
            simplePokemon: pokemon,
            picture: picture,
            color: bgColor,
            id: id,
          });
      }}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: bgColor,
          },
        ]}>
        {/* Nombre del pokemon y ID */}
        <View style={styles.containerName}>
          <Text testID="element" key={pokemon.name + id} style={styles.name}>
            {pokemon.name}
          </Text>
          <Text style={styles.id}># {id}</Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={picture} key={picture + id} route={route} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: '80%',
    marginBottom: 25,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },

  id: {
    fontSize: 20,
    color: 'white',
    top: 30,
    left: 20,
  },
});
