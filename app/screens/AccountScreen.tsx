import React, { FC } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Text from 'components/common/Text';
import Screen from 'components/common/Screen';
import Button from 'components/common/Button';
import useAuth from 'auth/useAuth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from 'config';
import TextWithIcon from 'components/common/TextWithIcon';

import navigation from 'navigation/rootNavigation';

const AccountScreen: FC = () => {
  const { member, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Tancar Sessió?', 'Confirmar', [
      { text: 'No' },
      { text: 'Si', onPress: logout },
    ]);
  };

  if (!member) return null;

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          marginBottom: 40,
          padding: 10,
        }}
      >
        <NameEmailRow
          firstName={member.firstName}
          lastName={member.lastName}
          email={member.email}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('PasswordChange')}
      >
        <TextWithIcon
          text="Canviar contrasenya"
          icon="lock-outline"
          iconBgColor="tomato"
          iconColor="white"
          size={35}
        />
      </TouchableOpacity>

      <View style={styles.logoutView}>
        <Button
          title="Tancar sessió"
          onPress={handleLogout}
          color="secondary"
          style={styles.logout}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  logout: {
    backgroundColor: 'tomato',
    width: '100%',
  },
  logoutView: {
    padding: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  item: {
    backgroundColor: colors.secondary,
    marginBottom: 15,
    padding: 5,
    paddingStart: 15,
  },
});

const NameEmailRow: FC<{
  firstName: string;
  lastName: string;
  email: string;
}> = ({ firstName, lastName, email }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
          padding: 10,
          backgroundColor: '#1E6FC0',
          borderRadius: 1000,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginRight: 10,
          alignItems: 'center',
        }}
      >
        <Text text={firstName[0]} fontWeight="700" style={{ fontSize: 25 }} />
        <Text text={lastName[0]} fontWeight="700" style={{ fontSize: 25 }} />
      </View>
      <View>
        <Text
          text={`${firstName} ${lastName}`}
          fontWeight="500"
          style={{ fontSize: 24 }}
        />
        <Text text={`${email}`} fontWeight="300" style={{ fontSize: 16 }} />
      </View>
    </View>
  );
};

export default AccountScreen;
