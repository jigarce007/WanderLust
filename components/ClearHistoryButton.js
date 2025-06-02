import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
const ClearHistoryButton = ({ onClear }) => {
  return (
    <View style={style.clearButtonContainer}>
      <TouchableOpacity onPress={onClear} style={style.clearButton}>
        <Text style={style.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClearHistoryButton;

const style = StyleSheet.create({
  clearButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  clearButton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
