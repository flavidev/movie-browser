import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

export default class Details extends Component {
  state = {
    imdbID: this.props.route.params.imdbID,
    movieDetails: {},
    loading: true,
  };

  fetchDetails() {
    const results = fetch(
      `https://www.omdbapi.com/?apikey=21277e71&i=${this.state.imdbID}`
    )
      .then((response) => response.json())
      .then((data) =>
        data.Response === "True"
          ? this.setState({
              movieDetails: data,
              loading: false,
            })
          : console.log("No results")
      );
  }

  componentDidMount() {
    this.fetchDetails();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({ title: this.state.movieDetails.Title });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <Image
          source={{
            uri:
              this.state.movieDetails.Poster !== "N/A"
                ? this.state.movieDetails.Poster
                : "https://img.freepik.com/free-vector/cinema-auditorium-with-white-blank-bright-screen_43605-2975.jpg?size=626&ext=jpg",
          }}
          style={styles.poster}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            Title: {this.state.movieDetails.Title}
          </Text>
          <Text style={styles.detailsText}>
            Released: {this.state.movieDetails.Released}
          </Text>
          <Text style={styles.detailsText}>
            Actors: {this.state.movieDetails.Actors}
          </Text>
          <Text style={styles.detailsText}>
            Genre: {this.state.movieDetails.Genre}
          </Text>
          <Text style={styles.detailsText}>
            Country: {this.state.movieDetails.Country}
          </Text>
          <Text style={styles.detailsText}>
            Director: {this.state.movieDetails.Director}
          </Text>
          <Text style={styles.detailsText}>
            Language: {this.state.movieDetails.Language}
          </Text>
          <Text style={styles.detailsText}>
            IMDB Rating: {this.state.movieDetails.imdbRating}
          </Text>
          <Text style={styles.detailsText}>
            Runtime: {this.state.movieDetails.Runtime}
          </Text>
          <Text style={styles.detailsText}>
            Plot: {this.state.movieDetails.Plot}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
  },
  poster: {
    width: 200,
    height: 200,
    marginTop: 25 ,
    marginBottom:20,

    alignSelf: "center",
  },
  detailsContainer: {
    marginHorizontal: 10,
    backgroundColor: "black",
  },
  detailsText: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom:3
  },
});
