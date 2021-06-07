import React from "react";
import * as SecureStore from "expo-secure-store";

export async function storageSetItem(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function storageGetItem(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function storageDeleteItem(key) {
  await SecureStore.deleteItemAsync(key);
}
