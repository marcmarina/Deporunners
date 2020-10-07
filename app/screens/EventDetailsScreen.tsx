import { RouteProp } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from '../components/common/Icon';
import Screen from '../components/common/Screen';
import Text from '../components/common/Text';
import { EventsStackParamList } from '../navigation/EventsNavigator';

interface Props {
  route: RouteProp<EventsStackParamList, 'EventDetails'>;
}

const EventDetailsScreen: FC<Props> = ({ route }) => {
  const { event } = route.params;
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Text text={event.name} style={styles.title} fontWeight="600" />
        <Text
          text={dayjs(event.dateTime).format('DD/MM/YYYY\nHH:MM')}
          style={styles.dateTime}
          fontWeight="600"
        />
        <Text
          text={event.description}
          style={styles.description}
          fontWeight="400"
        />
        <View style={styles.footer}>
          <Icon
            backgroundColor="#4CAF50"
            iconColor="#f6f6f6"
            name="thumb-up"
            size={85}
            style={styles.icon}
          />
          <Icon
            backgroundColor="tomato"
            iconColor="#f6f6f6"
            name="thumb-down"
            size={85}
            style={styles.icon}
          />
        </View>
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
    borderRadius: 30,
    margin: 20,
  },
});

export default EventDetailsScreen;
