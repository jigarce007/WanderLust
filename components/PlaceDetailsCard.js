import { View, Text, ImageBackground, StyleSheet } from "react-native";
function PlaceDetailCard({ placeDetails }) {
  return (
    <View style={styles.detailsCard}>
      {placeDetails.photoUrl ? (
        <ImageBackground
          source={{ uri: placeDetails.photoUrl }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <Text style={styles.detailsTitle}>{placeDetails.name}</Text>
            <Text style={styles.detailsDescription}>
              {placeDetails.address}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.imageBackground,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={{ color: "#fff" }}>No Image Available</Text>
        </View>
      )}
    </View>
  );
}

export default PlaceDetailCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },

  detailsCard: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    overflow: "hidden",
    borderRadius: 10,
    height: 180,
    zIndex: 2,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },

  imageStyle: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
  },

  detailsTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  detailsDescription: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
