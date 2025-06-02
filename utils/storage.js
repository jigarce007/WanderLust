import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "PLACE_HISTORY";

export const savePlace = async (place) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const places = existing ? JSON.parse(existing) : [];

    // Optional: avoid duplicate if same place name already exists
    const alreadyExists = places.find((p) => p.name === place.name);
    if (!alreadyExists) {
      const updated = [place, ...places];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error("Error saving place:", e);
  }
};

export const getSavedPlaces = async () => {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error loading places:", e);
    return [];
  }
};

export const clearPlaces = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing history:", e);
  }
};
