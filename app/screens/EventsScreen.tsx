import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import client from '../api/client';
import Screen from '../components/common/Screen';
import EventListItem from '../components/EventListItem';
import Event from '../interfaces/Event';
import logger from '../logging/logger';

const EventsScreen: FC = () => {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      setLoading(true);
      const { data } = await client.get(`/event?page=1&limit=10`);
      setEvents(data);
      setLoading(false);
    } catch (ex) {
      logger.log(ex);
      console.log(ex);
    }
  };

  const retrieveMore = async () => {
    try {
      setLoading(true);

      const { data } = await client.get(`/event?page=${page + 1}&limit=10`);

      if (events && data.length > 0) {
        const newEvents = [...events, ...data];
        setEvents(newEvents);
      }
      setPage(page + 1);

      setLoading(false);
    } catch (ex) {
      logger.log(ex);
      console.log(ex);
    }
  };

  const increasePage = () => {
    if (!loading) {
      retrieveMore();
    }
  };

  return (
    <Screen>
      <FlatList
        data={events}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={() => {
          setPage(1);
          retrieveData();
        }}
        refreshing={loading}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <EventListItem event={item} />}
        onEndReached={increasePage}
        onEndReachedThreshold={0.2}
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
