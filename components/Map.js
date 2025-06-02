import React, { useRef, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Map({ location, selectedLocation, selectedPlaceInfo }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 // duration in ms
      );
    }
  }, [selectedLocation]);

  if (!location) return null;

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="You are here!"
        pinColor="blue"
      />

      {selectedPlaceInfo && (
        <Marker
          coordinate={selectedPlaceInfo.coordinates}
          title={selectedPlaceInfo.name}
          pinColor="red"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
