import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {counterItems, getPokemonsFetch} from '../redux/reducers/reducer';
import {PokemonCard} from './PokemonCard';
import {useIsFocused} from '@react-navigation/native';

const PokemonList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {pokemons} = useSelector(state => state);
  const [input, setInput] = useState('');
  let [data, setData] = useState();
  const isFocused = useIsFocused();
  const [number, setNumber] = useState(10);
  useEffect(() => {
    if (isFocused === true) {
      dispatch(getPokemonsFetch({num: number}));
      setData(pokemons?.pokemons);
    }
  }, [input, isFocused, number]);
  if (input.length > 0) {
    data = data.filter(i => {
      return i.name.match(input);
    });
  }
  //Lazy loading, get more pokemons
  const fetchMoreData = async () => {
    setNumber(number + 10);
    await dispatch(getPokemonsFetch({num: number}));
  };
  return (
    <View style={styles.containerList}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        placeholder="Que pokemon estan buscando?"
        value={input}
        onChangeText={setInput}
        placeholderTextColor={'rgba(35, 42, 48, 0.5)'}
      />
      <FlatList
        data={input.length > 0 ? data : pokemons?.pokemons}
        keyExtractor={pokemons?.pokemons?.url}
        onEndReached={() => fetchMoreData()}
        onEndReachedThreshold={1}
        numColumns={1}
        renderItem={({item}) => (
          <PokemonCard pokemon={item} navigation={navigation} route={route} />
        )}
        ListFooterComponent={
          <ActivityIndicator style={{height: 100}} size={20} color="grey" />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerList: {
    paddingBottom: 300,
  },
  input: {
    marginBottom: 70,
    top: 50,
    width: 300,
    height: 50,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 3,
    color: 'black',
    fontSize: 18,
    paddingLeft: 20,
    alignSelf: 'center',
  },
});
export default PokemonList;
