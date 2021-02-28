import { StyleSheet } from "react-native";
export const common = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowConatiner: {
   flexDirection:"row"
  },
 
  flatList: {
    padding: 30,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
