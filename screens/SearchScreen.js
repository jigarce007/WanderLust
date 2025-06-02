import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function SearchScreen() {
  const [location, setlocation] = useState(null);

  useEffect(() => {
    (async () => {
      //Asking for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Not Granted!",
          "Location Permission Required to find your location."
        );
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setlocation(loc.coords);
    })();
  }, []);

  if (!location) {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here!"
        />
      </MapView>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { flex: 1 },
});
