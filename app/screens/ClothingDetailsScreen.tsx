import { RouteProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { ClothingStackParamList } from 'navigation/ClothingNavigator';
import { Button } from '@ui-kitten/components';

import client from 'api/client';
import useAuth from 'auth/useAuth';
import Screen from 'components/common/Screen';
import Icon from 'components/common/Icon';
import logger from 'logging/logger';
import env from 'config/env';
import TShirtSize from 'interfaces/TShirtSize';
import Text from 'components/common/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
  route: RouteProp<ClothingStackParamList, 'ClothingDetails'>;
}

const ClothingDetailsScreen: FC<Props> = ({ route }) => {
  const { clothing: routeClothing } = route.params;
  const [clothing, setClothing] = useState(routeClothing);
  const [activeSize, setActiveSize] = useState<TShirtSize>();

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
            width: '100%',
            height: 350,
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
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
            }}
          >
            <Text
              text="Talles Disponibles"
              style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: 10,
              }}
              fontWeight="500"
              fontSize={20}
            />
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
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              margin: 10,
            }}
          >
            <Text
              text={`${clothing.price.toFixed(2).toString()}€`}
              fontWeight="600"
              style={{ fontSize: 45, color: '#64A731', margin: 10 }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('Pressed!')}
            >
              <Icon
                backgroundColor="#4CAF50"
                iconColor="#f6f6f6"
                name="cart"
                size={100}
                style={{
                  borderRadius: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ClothingDetailsScreen;
