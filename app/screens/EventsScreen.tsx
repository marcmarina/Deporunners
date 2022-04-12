import React, { FC } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import { http } from 'api';
import useAuth from 'auth/useAuth';
import Icon from 'components/common/Icon';
import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import EventListItem from 'components/EventListItem';
import Event from 'interfaces/Event';
import { logger } from 'logging';
import { useQuery } from 'react-query';

const EventsScreen: FC = () => {
  const {
    data: events,
    isLoading,
    refetch,
  } = useQuery(
    'events',
    async () => {
      const res = await http.get('/event');

      return res.data;
    },
    {
      onError: (error) => {
        logger.log(error);
      },
    }
  );

  const { member } = useAuth();

  if (isLoading || !member) return null;

  const createSectionedEventList = (events: Event[]) => {
    const attending: Event[] = [];
    const rest: Event[] = [];
    events.forEach((event) => {
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
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
