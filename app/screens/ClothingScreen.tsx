import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import client from 'api/client';
import useAuth from 'auth/useAuth';
import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import logger from 'logging/logger';
import Clothing from 'interfaces/Clothing';
import { FlatList } from 'react-native-gesture-handler';
import env from 'config/env';

const ClothingScreen: FC = () => {
  const [clothing, setClothing] = useState<Clothing[]>();

  const { member } = useAuth();

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const res = await client.get(`/clothing`);
      if (res) {
        setClothing(res.data);
      }
    } catch (ex) {
      logger.log(ex);
    }
  };

  if (!clothing || !member) return null;

  return (
    <Screen>
      <FlatList
        data={clothing}
        renderItem={({ item }) => <RenderClothing item={item} />}
        keyExtractor={item => item._id}
        contentContainerStyle={{
          alignContent: 'flex-start',
          justifyContent: 'center',
          padding: 10,
        }}
        ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
      />
    </Screen>
  );
};

const RenderClothing = ({ item }: { item: Clothing }) => {
  return (
    <View style={styles2.container}>
      <Image
        style={{
          flex: 1,
          resizeMode: 'contain',
        }}
        source={{
          uri: `${env.API_URL}/${item.image}?${new Date()}`,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Text
          text={item.name}
          fontWeight="600"
          style={{ fontSize: 25, color: '#404040', flex: 1, margin: 10 }}
        />
        <Text
          text={`${item.price.toString()} €`}
          fontWeight="600"
          style={{ fontSize: 25, color: '#64A731', margin: 10 }}
        />
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  separator: {
    marginTop: 10,
  },
  header: {
    marginVertical: 10,
    marginRight: 'auto',
  },
});

export default ClothingScreen;
