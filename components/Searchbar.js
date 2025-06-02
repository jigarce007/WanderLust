import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Ionicons";

export default function SearchBar(props) {
  const {
    googlePlacesRef = null,
    searchText = "",
    onChangeText = () => {},
    onPlaceSelected = () => {},
    onClear = () => {},
  } = props || {};

  const GOOGLE_API_KEY = "AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4";
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Search for places"
        fetchDetails={true}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        onPress={onPlaceSelected}
        textInputProps={{
          onFocus: handleFocus,
          onBlur: handleBlur,
          placeholderTextColor: "#999",
          clearButtonMode: "never",
        }}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: { backgroundColor: "#fff" },
        }}
        debounce={300}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Icon name="close-circle" size={22} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 60,
    width: "90%",
    alignSelf: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  textInputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 12,
    paddingRight: 35, // space for the clear button
  },
  textInput: {
    color: "#333",
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  clearButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 20,
    padding: 5,
  },
});
