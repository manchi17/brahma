import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import { common } from "../styles/common";
import { getBrewerie } from "../ducks/brewerie";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: "",
      complete: false,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(row) {
    const { item, index } = row;
    if (this.state.searchField.toLowerCase() === item.state.toLowerCase()) {
      return (
        <View style={styles.flatListContainer}>
          <Image
            style={{
              width: 80,
              marginRight: 5,
              height: 80,
              borderWidth: 5,
              borderRadius: 40,
              borderColor: "white",
            }}
            source={require("../../assets/brewerie.png")}
          />
          <View>
            <Text style={styles.brewerieTitle}>{item.name.toUpperCase()}</Text>
            <View style={common.rowConatiner}>
              <Ionicons name={"location"} size={16} color={COLORS.blue} />
              <Text style={styles.brewerieText}>
                {item.street} , {item.state}
              </Text>
            </View>
            <View style={common.rowConatiner}>
              <Ionicons
                name={"phone-portrait-sharp"}
                size={16}
                color={"black"}
              />
              <Text style={styles.brewerieText}>{item.phone}</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  componentDidMount() {
    this.props.getBreweries();
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          inputStyle={styles.searchBarInput}
          autoCapitalize="none"
          lightTheme
          round
          placeholder="Enter the state name"
          onChangeText={(text) =>
            this.setState({ searchField: text, complete: false })
          }
          value={this.state.searchField}
          onSubmitEditing={() => {
            this.setState({ complete: true });
          }}
          returnKeyType="search"
        />
        {this.state.complete && (
          <ScrollView horizontal={true}>
            <FlatList
              pagingEnabled={true}
              legacyImplementation={false}
              data={this.props.breweries}
              renderItem={(row) => this.renderItem(row)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${item}${index}`}
            />
          </ScrollView>
        )}
        {this.props.loading === true && (
          <View style={{ marginTop: 70 }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
        {this.props.error === "NoSongFount" && (
          <Text style={styles.line3}>No Breweries Found.</Text>
        )}
        {this.props.error === "NetworkIssue" && (
          <Text style={styles.line3}>
            Network Connection issue, please try again.
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 38,
    backgroundColor: COLORS.white,
  },
  searchBarInput: {
    color: COLORS.black,
  },
  brewerieTitle: {
    color: COLORS.maroon,
    fontSize: 14,
    fontWeight: "bold",
  },
  brewerieText: {
    color: COLORS.black,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => ({
  breweries: state.brewerie.information,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBreweries: () => dispatch(getBrewerie()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
