import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import openMap from 'react-native-open-maps';

import client from '../api/client';
import Screen from '../components/common/Screen';
import EventListItem from '../components/EventListItem';
import Event from '../interfaces/Event';

const EventsScreen: FC = () => {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      setLoading(true);
      const { data } = await client.get('/event');
      setEvents(data);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  if (!events) return null;

  return (
    <Screen>
      <FlatList
        data={events}
        keyExtractor={item => item._id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={() => retrieveData()}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              const [latitude, longitude] = item.coordinates
                .replace(/,/g, '')
                .split(' ');
              openMap({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                zoom: 50,
              });
            }}
          >
            <EventListItem event={item} />
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    // paddingBottom: 10,
  },
});

export default EventsScreen;
