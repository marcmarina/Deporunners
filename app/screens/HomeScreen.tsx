import React, { FunctionComponent, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import padStart from 'lodash/padStart';

import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import useAuth from 'auth/useAuth';
import TextWithLabel from 'components/common/TextWithLabel';
import client from 'api/client';
import logger from 'logging/logger';

const HomeScreen: FunctionComponent = () => {
  let { member: authMember } = useAuth();
  const [member, setMember] = useState(authMember);

  const retrieveData = async () => {
    try {
      const { data } = await client.get(`/member/${member?._id}`);
      if (data) setMember(data);
    } catch (ex) {
      logger.log(ex);
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  if (!member) return null;

  return (
    <Screen style={styles.container}>
      <Image
        source={require('assets/applogo_round.png')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text
          text={member.firstName + ' ' + member.lastName}
          fontWeight="600"
          style={styles.fullName}
        />
        <TextWithLabel
          text={member.dni}
          label="DNI: "
          fontWeight="600"
          style={styles.dni}
        />
        <TextWithLabel
          text={padStart(member.numMember.toString(), 3, '0')}
          label="Núm Soci: "
          fontWeight="600"
          style={styles.dni}
        />
        <TextWithLabel
          text={member.telephone}
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
