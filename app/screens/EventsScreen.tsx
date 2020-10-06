import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

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

  return (
    <Screen>
      <FlatList
        data={events}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={() => retrieveData()}
        refreshing={loading}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  separator: {
    marginTop: 10,
  },
});

export default EventsScreen;
