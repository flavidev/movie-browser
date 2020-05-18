import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class Movie extends Component {
  render() {
    return (
      <View style={styles.movieContainer}>
        <TouchableOpacity>
          <Text style={styles.titles}> {this.props.title} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    backgroundColor: "black",
    marginVertical: 10,
  },
  titles: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
