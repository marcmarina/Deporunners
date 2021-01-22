import { RouteProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';

import client from 'api/client';
import useAuth from 'auth/useAuth';

import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import logger from 'logging/logger';
import { ClothingStackParamList } from 'navigation/ClothingNavigator';
import env from 'config/env';

interface Props {
  route: RouteProp<ClothingStackParamList, 'ClothingDetails'>;
}

const ClothingDetailsScreen: FC<Props> = ({ route }) => {
  const { clothing: routeClothing } = route.params;
  const [clothing, setClothing] = useState(routeClothing);

  const { member } = useAuth();

  const retrieveData = async () => {
    try {
      const res = await client.get(`/clothing/${clothing._id}`);
      if (res) {
        setClothing(res.data);
      }
    } catch (ex) {
      logger.log(ex);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  if (!member) return null;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Image
          style={{
            flex: 1,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
          source={{
            uri: `${env.API_URL}/${clothing.image}?${new Date()}`,
          }}
        />
        <View style={{ flex: 1 }}></View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10,
  },
  dateTime: {
    fontSize: 23,
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    padding: 8,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  icon: {
    borderRadius: 25,
    margin: 20,
  },
});

export default ClothingDetailsScreen;
