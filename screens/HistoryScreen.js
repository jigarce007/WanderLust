import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

function HistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
