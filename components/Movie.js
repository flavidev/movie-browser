import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class Movie extends Component {

  //Callback function 
  goToDetails = this.props.goToDetails

  render() {
    return (
      <View style={styles.movieContainer}>
        <TouchableOpacity
          onPress={() => this.goToDetails(this.props.imdbID)}
        >
          <Text style={styles.titles}> {this.props.title} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    backgroundColor: "black",
    margin: 15,
  },
  titles: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});
