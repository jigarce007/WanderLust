import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

function HistoryItem({ place, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {place.photoUrl ? (
        <Image source={{ uri: place.photoUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={{ color: "#fff" }}>No Image</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default HistoryItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  noImage: {
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    color: "#555",
  },
});
