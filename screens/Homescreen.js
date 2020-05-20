import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

export default class Homescreen extends Component {
  state = {
    search: "",
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/cinema.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.searchBox}
            placeholder="Type movie title"
            value={this.state.search}
            onChangeText={(text) =>
              this.setState({
                search: text,
              })
            }
          />
          <TouchableOpacity
            onPress={
              this.state.search.length > 2
                ? () =>
                    this.props.navigation.navigate("Results", {
                      search: this.state.search,
                      navigation: this.props.navigation,
                    })
                : null
            }
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },

  searchBox: {
    backgroundColor: "white",
    width: "70%",
    height: "10%",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 25,
    borderRadius: 25,
  },

  searchButtonText: {
    marginVertical: 20,
    marginHorizontal: 120,
    padding: 10,
    backgroundColor: "#003772",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    borderRadius: 25,
  },
});
