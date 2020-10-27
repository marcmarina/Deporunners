import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import client from 'api/client';
import useAuth from 'auth/useAuth';
import Icon from 'components/common/Icon';
import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import EventListItem from 'components/EventListItem';
import Event from 'interfaces/Event';
import logger from 'logging/logger';

const EventsScreen: FC = () => {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(false);

  const { member } = useAuth();

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      setLoading(true);
      const res = await client.get(`/event`);
      if (res) {
        setEvents(res.data);
      }
      setLoading(false);
    } catch (ex) {
      logger.log(ex);
    }
  };

  if (!events || !member) return null;

  const createSectionedEventList = (events: Event[]) => {
    const attending: Event[] = [];
    const rest: Event[] = [];
    events.forEach(event => {
      if (event.members.includes(member._id.toString())) {
        attending.push(event);
      } else {
        rest.push(event);
      }
    });

    return [
      {
        title: 'Els teus events',
        icon: () => <Icon name="heart" size={70} iconColor="tomato" />,
        data: attending,
      },
      {
        title: 'Altres events',
        data: rest,
      },
    ];
  };

  const sectionedEvents = createSectionedEventList(events);

  return (
    <Screen>
      <SectionList
        sections={sectionedEvents}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={retrieveData}
        refreshing={loading}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <EventListItem event={item} />}
        renderSectionHeader={({ section: { title, icon } }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={styles.header}
              fontSize={25}
              fontWeight="500"
              text={title}
            />
            {icon && icon()}
          </View>
        )}
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
  header: {
    marginVertical: 10,
    marginRight: 'auto',
  },
});

export default EventsScreen;
