import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getSavedPlaces, clearPlaces } from "../utils/storage";
import HistoryItem from "../components/HistoryItem";
import ClearHistoryButton from "../components/ClearHistoryButton";

function HistoryScreen({ navigation }) {
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await getSavedPlaces();
      setSavedPlaces(places);
    };
    const unsubscribe = navigation.addListener("focus", loadPlaces);
    return unsubscribe;
  }, [navigation]);

  const handleClearHistory = async () => {
    await clearPlaces();
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      {savedPlaces.length === 0 ? (
        <Text style={styles.emptyText}>No saved places yet.</Text>
      ) : (
        <FlatList
          data={savedPlaces}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <HistoryItem
              place={item}
              onPress={() =>
                navigation.navigate("Search", { selectedPlaceInfo: item })
              }
            />
          )}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
      <ClearHistoryButton onClear={handleClearHistory} />
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
