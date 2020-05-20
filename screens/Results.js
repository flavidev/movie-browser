import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Movie from "../components/Movie";

export default class Results extends Component {
  state = {
    page: 1,
    loading: true,
  };

  // api 21277e71
  data = {
    API_Adress: `http://www.omdbapi.com/?apikey=5a1e4eca&s=${this.props.route.params.search}`,
    movies: [],
    totalResults: 0,
  };

  // Navigate to Details
  goToDetails = (imdbID) => {
    this.props.navigation.navigate("Details", {
      imdbID: imdbID,
      navigation: this.props.navigation,
    });
  };

  // Request API Data
  fetchResults(page = this.state.page) {
    const results = fetch(this.data.API_Adress + `&page=${this.state.page}`)
      .then((response) => response.json())
      .then((data) =>
        data.Response === "True"
          ? ((this.data.totalResults = data.totalResults),
            (this.data.movies = [...this.data.movies, ...data.Search]),
            this.setState({
              page: this.state.page + 1,
              loading: false,
            }))
          : console.log("No results remaining")
      );
  }

  componentDidMount() {
    this.fetchResults();
  }
  componentDidUpdate() {
    if (this.data.totalResults !== 0) {
      this.props.navigation.setOptions({
        title: `Total Results: ${this.data.totalResults}`,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <FlatList
          data={this.data.movies}
          renderItem={({ item }) => (
            <Movie
              title={item.Title}
              imdbID={item.imdbID}
              goToDetails={this.goToDetails}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          onEndReached={() => this.fetchResults()}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
  },
  resultsContainer: {
    margin: 20,
  },
});
