import { RouteProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { ClothingStackParamList } from 'navigation/ClothingNavigator';
import { Button } from '@ui-kitten/components';

import client from 'api/client';
import useAuth from 'auth/useAuth';
import Screen from 'components/common/Screen';
import logger from 'logging/logger';
import env from 'config/env';
import TShirtSize from 'interfaces/TShirtSize';
interface Props {
  route: RouteProp<ClothingStackParamList, 'ClothingDetails'>;
}

const ClothingDetailsScreen: FC<Props> = ({ route }) => {
  const { clothing: routeClothing } = route.params;
  const [clothing, setClothing] = useState(routeClothing);
  const [activeSize, setActiveSize] = useState<TShirtSize>();
  const [number, setNumber] = useState(0);

  const { member } = useAuth();

  const retrieveData = async () => {
    try {
      const res = await client.get(`/clothing/${clothing._id}`);
      if (res) {
        setClothing({
          ...res.data,
          image: `${env.API_URL}/${res.data.image}?${new Date()}`,
        });
      }
    } catch (ex) {
      logger.log(ex);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const handleNumChange = (num: unknown) => {
    if (typeof num === 'number') setNumber(num);
  };

  if (!member) return null;

  return (
    <Screen>
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      > */}
      <Image
        style={{
          width: '100%',
          height: 400,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
        source={{
          uri: clothing.image,
        }}
      />

      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            padding: 5,
          }}
        >
          {clothing.sizes.map(size => (
            <Button
              style={{
                margin: 3,
              }}
              appearance={activeSize?._id === size._id ? 'filled' : 'outline'}
              onPress={() => setActiveSize(size)}
              key={size._id}
            >
              {size.name}
            </Button>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            padding: 5,
          }}
        ></View>
      </View>
      {/* </ScrollView> */}
    </Screen>
  );
};

export default ClothingDetailsScreen;
