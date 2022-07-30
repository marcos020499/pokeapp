import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import Container from '../components/Container';
import PokemonList from '../components/PokemonList';

import {useIsFocused} from '@react-navigation/native';
const HomeScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  return (
    <Container isFocused={isFocused}>
      <SafeAreaView>
        <Text style={styles.textTitle}>POKEDEX</Text>
        <Text style={styles.textInfo}>Busca un pokemon por su nombre</Text>
        <PokemonList navigation={navigation} route={route} />
      </SafeAreaView>
    </Container>
  );
};
const styles = StyleSheet.create({
  textTitle: {
    fontSize: 25,
    color: 'rgba(35, 42, 48, 1)',
    textAlign: 'center',
    fontFamily: 'AvenirNext-Bold',
  },
  textInfo: {
    fontSize: 20,
    color: 'rgba(35, 42, 48, 1)',
    textAlign: 'center',
    fontFamily: 'AvenirNext-Regular',
  },
});
export default HomeScreen;
