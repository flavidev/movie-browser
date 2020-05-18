import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, Button, FlatList } from "react-native";
import Movie from "../components/Movie";

export default class Results extends Component {
  state = {
    API_Adress: `http://www.omdbapi.com/?apikey=21277e71&s=${this.props.route.params.search}`,
    fetchData: {},
  };


  // Request API Data
  fetchResults(page = 1) {
    const results = fetch(this.state.API_Adress + `&page=${page}`)
      .then((response) => response.json())
      .then((data) =>
        data.Response
          ? this.setState({ fetchData: data })
          : alert("Could not complete request")
      );
  }
  
  
  render() {
    this.fetchResults();
    


    return (
      <ImageBackground
        source={require("../assets/cinema.jpg")}
        style={styles.background}
      >
        <View>
          <Text style={{ color: "white" }}>
            Total Results = {this.state.fetchData.totalResults}
          </Text>

          <Text style={{ color: "white" }}>
            Total Pages = {Math.ceil(this.state.fetchData.totalResults / 10)}
          </Text>


          <Button
            title="test"
            onPress={() => console.log(this.state.fetchData)}
          ></Button>

    <View style={styles.resultsContainer}>
      <FlatList
        data={this.state.fetchData.Search}
        renderItem={({ item }) => <Movie title={item.Title} />}
        keyExtractor={item => item.imdbID}
      />
    </View>

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
  resultsContainer:{
    margin: 15,

  }
});
