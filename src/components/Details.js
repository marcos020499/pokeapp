import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FadeInImage} from './FadeInImage';
import {PokemonDetails} from './PokemonDetails';
import {useIsFocused} from '@react-navigation/native';

export const Details = ({navigation, route}) => {
  const {simplePokemon, color, picture, id} = route?.params;
  const {name} = simplePokemon;
  const {pokemons} = useSelector(state => state);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setData(pokemons?.pokemonDetails);
    }
  }, [isFocused, pokemons]);

  return (
    <View style={{flex: 1}}>
      {/* Heade Containerr */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* Backbutton */}
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          activeOpacity={0.8}
          style={styles.button}>
          <Image
            style={{width: 130, height: 130}}
            source={{
              uri: 'https://res.cloudinary.com/marcos020499/image/upload/v1658711234/Group_57_x1w763.png',
            }}
          />
        </TouchableOpacity>

        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: 80,
          }}>
          {name + '\n'}#{id}
        </Text>

        {/* Pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        <FadeInImage
          uri={picture}
          style={[styles.pokemonImages]}
          route={route}
          navigation={navigation}
        />
      </View>

      {/* Detalles y Loading */}

      <PokemonDetails color={color} pokemon={data} />
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImages: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  button: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
});
