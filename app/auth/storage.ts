import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import Member from '../interfaces/Member';

const key = 'authToken';

export const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

export const getMember = async (): Promise<Member | null> => {
  const token = await getToken();
  if (token) {
    const member: Member = jwtDecode(token);
    return member;
  }
  return null;
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error retrieving the auth token', error);
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error deleting the auth token', error);
  }
};