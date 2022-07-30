import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
export const PokemonDetails = ({pokemon, color, route}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={{marginTop: 370, marginLeft: 20}}>
        <Text style={styles.title}>Tipo</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon?.types?.map(({type, index}) => (
            <Text key={type.name + index} style={{marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>
        {/* Peso */}
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon?.weight}kg</Text>
      </View>

      {/* Types */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView
        // style
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <Image
          source={{uri: pokemon?.sprites?.front_default}}
          style={styles.basicSprite}
        />
        <Image
          source={{uri: pokemon?.sprites?.back_default}}
          style={styles.basicSprite}
        />
        <Image
          source={{uri: pokemon?.sprites?.front_shiny}}
          style={styles.basicSprite}
        />
        <Image
          source={{uri: pokemon?.sprites?.back_shiny}}
          style={styles.basicSprite}
        />
      </ScrollView>
      {/* Habilidades */}
      <View style={styles.container}>
        <Text style={styles.title}>Habilidades base</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon?.abilities?.map(({ability, index}) => (
            <Text key={ability.name + index} style={{marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>
      {/* Habilidades */}
      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon?.moves?.map(({move, index}) => (
            <Text key={move.name + index} style={{marginRight: 10}}>
              {move.name},{'  '}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon?.stats?.map((stat, i) => (
            <View
              key={stat.stat.name + i}
              style={{flexDirection: 'row', marginVertical: 10}}>
              <Text
                style={{
                  marginRight: 10,
                  width: 150,
                }}
                key={stat.stat.name}>
                {stat.stat.name}
              </Text>
              <Animated.View style={styles.animatedContainer}>
                <Animated.View
                  style={[
                    {
                      width: (190 / 170) * Number(stat.base_stat),
                      backgroundColor: color,
                    },
                    styles.animatedView,
                  ]}></Animated.View>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {stat.base_stat}
                </Text>
              </Animated.View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  animatedView: {
    height: 5,
    borderRadius: 1,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    marginLeft: 11,
    top: 6,
    left: -10,
  },
  animatedContainer: {
    display: 'flex',
    flexDirection: 'row',
    left: -40,
  },
});
