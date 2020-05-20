import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, FlatList } from "react-native";
import Movie from "../components/Movie";

export default class Results extends Component {
  state = {
    page: 1,
    loading:true
  };

  // api 21277e71
  data = {
    API_Adress: `http://www.omdbapi.com/?apikey=5a1e4eca&s=${this.props.route.params.search}`,
    movies: [],
    totalResults: 0,
  };

  // Navigate to Details
  goToDetails = (imdbID) => {
    this.props.navigation.navigate("Details", { imdbID: imdbID });
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
              loading:false
            }))
          : console.log("No results remaining")
      );
  }

  componentDidMount() {
    this.fetchResults();
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/blackbackground.png")}
        style={styles.background}
      >
        <View>
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
      </ImageBackground>
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
