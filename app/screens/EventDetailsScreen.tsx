import { RouteProp } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import client from '../api/client';
import useAuth from '../auth/useAuth';

import Icon from '../components/common/Icon';
import Screen from '../components/common/Screen';
import Text from '../components/common/Text';
import logger from '../logging/logger';
import { EventsStackParamList } from '../navigation/EventsNavigator';

interface Props {
  route: RouteProp<EventsStackParamList, 'EventDetails'>;
}

const EventDetailsScreen: FC<Props> = ({ route }) => {
  const { event: routeEvent } = route.params;
  const [event, setEvent] = useState(routeEvent);

  const { member } = useAuth();

  const handleAttend = async (attending: boolean) => {
    try {
      const { data, status } = await client.patch(
        `/event/${event._id}/attend?attending=${attending}`
      );
      if (status === 201) {
        setEvent(data);
      }
    } catch (ex) {
      logger.log(ex);
      console.log(ex);
    }
  };

  const retrieveData = async () => {
    try {
      const { data } = await client.get(`/event/${event._id}`);
      setEvent(data);
    } catch (ex) {
      logger.log(ex);
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  if (!member) return null;

  const attending = event.members.includes(member._id.toString());

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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleAttend(true)}
            disabled={attending}
            style={{ opacity: attending ? 1 : 0.6 }}
          >
            <Icon
              backgroundColor="#4CAF50"
              iconColor="#f6f6f6"
              name="thumb-up"
              size={85}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleAttend(false)}
            disabled={!attending}
            style={{ opacity: attending ? 0.6 : 1 }}
          >
            <Icon
              backgroundColor="tomato"
              iconColor="#f6f6f6"
              name="thumb-down"
              size={85}
              style={styles.icon}
            />
          </TouchableOpacity>
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
    borderRadius: 25,
    margin: 20,
  },
});

export default EventDetailsScreen;
