import React, { useEffect, useState, useRef } from "react";
import { savePlace, getSavedPlaces } from "../utils/storage";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import SearchBar from "../components/Searchbar";
import * as Location from "expo-location";
import Map from "../components/Map";
import PlaceDetailCard from "../components/PlaceDetailsCard";

function SearchScreen() {
  const GOOGLE_API_KEY = "AIzaSyC2xZMs5URAtzyCbTjDZi4HYxaKTOrL6F4";
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // <-- new state
  const googlePlacesRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState(null);

  const route = useRoute();

  const [savedPlaces, setSavedPlaces] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.selectedPlaceInfo) {
        const place = route.params.selectedPlaceInfo;
        console.log(`Selected History Place : ${JSON.stringify(place)}`);
        setSelectedPlaceInfo(place);
        setSelectedLocation(place.coordinates);

        if (googlePlacesRef.current) {
          googlePlacesRef.current.setAddressText("");
        }
      }
    }, [route.params])
  );

  useEffect(() => {
    const loadPlaces = async () => {
      const saved = await getSavedPlaces();
      setSavedPlaces(saved);
    };
    loadPlaces();
  }, []);
  const onPlaceSelected = async (data, details) => {
    const loc = details?.geometry?.location;
    if (loc) {
      const coords = {
        latitude: loc.lat,
        longitude: loc.lng,
      };

      const place = {
        name: data.description,
        address: details.formatted_address || "No address found",
        coordinates: coords,
        photoUrl: details.photos?.[0]
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
          : null,
      };

      setSelectedPlaceInfo(place);
      setSelectedLocation(coords);
      await savePlace(place);

      if (googlePlacesRef.current) {
        googlePlacesRef.current.setAddressText("");
      }
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Not Granted!",
          "Location Permission Required to find your location."
        );
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (!location) {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }

  return (
    <View style={styles.container}>
      <Map
        location={location}
        selectedLocation={selectedLocation}
        selectedPlaceInfo={selectedPlaceInfo}
      />
      <SearchBar
        googlePlacesRef={googlePlacesRef}
        searchText={searchText}
        onChangeText={setSearchText}
        onPlaceSelected={onPlaceSelected}
        onClear={() => {
          setSearchText("");
          setSelectedLocation(null);
        }}
      />
      {selectedPlaceInfo && (
        <PlaceDetailCard placeDetails={selectedPlaceInfo} />
      )}
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
