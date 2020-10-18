import * as SecureStore from 'expo-secure-store';

const jwtKey = 'authToken';
const refreshTokenKey = 'refreshToken';

export const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(jwtKey, authToken);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(jwtKey);
  } catch (error) {
    console.log('Error retrieving the auth token', error);
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(jwtKey);
  } catch (error) {
    console.log('Error deleting the auth token', error);
  }
};

export const storeRefreshToken = async (refreshToken: string) => {
  try {
    await SecureStore.setItemAsync(refreshTokenKey, refreshToken);
  } catch (error) {
    console.log('Error storing the refresh token', error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync(refreshTokenKey);
  } catch (error) {
    console.log('Error retrieving the refresh token', error);
  }
};

export const removeRefreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync(refreshTokenKey);
  } catch (error) {
    console.log('Error deleting the refresh token', error);
  }
};
