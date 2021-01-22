import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import client from 'api/client';
import useAuth from 'auth/useAuth';
import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import logger from 'logging/logger';
import Clothing from 'interfaces/Clothing';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import env from 'config/env';
import { useNavigation } from '@react-navigation/native';

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
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Screen>
  );
};

const RenderClothing = ({ item }: { item: Clothing }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate('ClothingDetails', {
          clothing: item,
        })
      }
    >
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
          text={`${item.name}`}
          fontWeight="600"
          style={{ fontSize: 25, color: '#404040', flex: 1, margin: 10 }}
        />
        <Text
          text={`${item.price.toFixed(2).toString()}€`}
          fontWeight="600"
          style={{ fontSize: 25, color: '#64A731', margin: 10 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  list: {
    padding: 10,
  },
  separator: {
    marginTop: 10,
  },
});

export default ClothingScreen;
