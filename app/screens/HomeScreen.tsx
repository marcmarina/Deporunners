import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import padStart from 'lodash/padStart';

import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import TextWithLabel from 'components/common/TextWithLabel';
import { http } from 'api';
import { useQuery } from 'react-query';

const HomeScreen: FunctionComponent = () => {
  const { data: member, isLoading } = useQuery('member', async () => {
    const res = await http.get(`/member/self`);

    return res.data;
  });

  if (isLoading) return null;

  const { firstName, lastName, dni, numMember, telephone } = member;

  return (
    <Screen style={styles.container}>
      <Image
        source={require('assets/applogo_round.png')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text
          text={`${firstName} ${lastName}`}
          fontWeight="600"
          style={styles.fullName}
        />
        <TextWithLabel
          text={dni}
          label="DNI: "
          fontWeight="600"
          style={styles.dni}
        />
        <TextWithLabel
          text={padStart(numMember.toString(), 3, '0')}
          label="Núm Soci: "
          fontWeight="600"
          style={styles.dni}
        />
        <TextWithLabel
          text={telephone}
          label="Telèfon: "
          fontWeight="600"
          style={styles.dni}
        />
      </View>
      <View style={styles.buttonGroup}></View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 2,
    width: 100,
    alignItems: 'center',
  },
  container: {
    // backgroundColor: '#20232A',
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'column',
  },
  fullName: {
    fontSize: 30,
  },
  dni: {
    fontSize: 25,
    marginTop: 15,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 30,
    flex: 4,
  },
  image: {
    marginTop: 20,
    height: 150,
    width: 150,
  },
});

export default HomeScreen;
