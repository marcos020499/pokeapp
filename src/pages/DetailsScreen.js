import React from 'react';
import Container from '../components/Container';

import Details from '../components/Details';
export const DetailsScreen = ({navigation, route}) => {
  return (
    <Container>
      <Details navigation={navigation} route={route} testId='are in details'/>
    </Container>
  );
};
export default DetailsScreen;
