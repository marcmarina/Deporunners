import { RouteProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { ClothingStackParamList } from 'navigation/ClothingNavigator';
import { Button } from '@ui-kitten/components';

import client from 'api/client';
import useAuth from 'auth/useAuth';
import Screen from 'components/common/Screen';
import Icon from 'components/common/Icon';
import CustomButton from 'components/common/Button';
import logger from 'logging/logger';
import env from 'config/env';
import TShirtSize from 'interfaces/TShirtSize';
import Text from 'components/common/Text';
import colors from 'config/colors';
import NumberPicker from 'components/common/NumberPicker';
import { useCart } from 'hooks/useCart';
interface Props {
  route: RouteProp<ClothingStackParamList, 'ClothingDetails'>;
}

const ClothingDetailsScreen: FC<Props> = ({ route }) => {
  const { clothing: routeClothing } = route.params;
  const [clothing, setClothing] = useState(routeClothing);
  const [activeSize, setActiveSize] = useState<TShirtSize>();

  const [modalVisible, setModalVisible] = useState(false);
  const [shirtAmount, setShirtAmount] = useState(1);

  const handleMinus = () => {
    if (shirtAmount > 1) setShirtAmount(shirtAmount - 1);
  };

  const handlePlus = () => {
    if (shirtAmount < 10) setShirtAmount(shirtAmount + 1);
  };
  const { member } = useAuth();
  const { addItem } = useCart();

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
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  text={`${(clothing.price * shirtAmount)
                    .toFixed(2)
                    .toString()}€`}
                  fontWeight="600"
                  style={{ fontSize: 45, color: '#80C14F', margin: 10 }}
                />
                <Text
                  text={activeSize?.name || ''}
                  fontWeight="600"
                  style={{ fontSize: 45, margin: 10 }}
                />
              </View>
              <NumberPicker
                plus={handlePlus}
                minus={handleMinus}
                value={shirtAmount}
              />
              <CustomButton
                color="green"
                title="afegir"
                onPress={() => {
                  addItem(clothing);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
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
            <Text
              text={clothing.name}
              style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: 10,
              }}
              fontWeight="500"
              fontSize={30}
            />
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
                  color: colors.light,
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
                  appearance={
                    activeSize?._id === size._id ? 'filled' : 'outline'
                  }
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
                style={{ fontSize: 45, color: '#80C14F', margin: 10 }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(true)}
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
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ClothingDetailsScreen;
