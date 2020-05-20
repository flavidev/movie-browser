import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";

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

  render() {
    return (
      <ImageBackground
        source={require("../assets/blackbackground.png")}
        style={styles.background}
      >
        <View>
          <Text style={styles.title}>
            {this.state.loading ? "" : this.state.movieDetails.Title}
          </Text>
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
              Released: {this.state.movieDetails.Released}
            </Text>
            <Text style={styles.detailsText}>
              Actors: {this.state.movieDetails.Actors}
            </Text>
            <Text style={styles.detailsText}>
              Year: {this.state.movieDetails.Year}
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
      </ImageBackground>
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
    marginVertical: 10,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "black",
  },
  detailsContainer: {
    marginHorizontal: 10,
    backgroundColor: "black",
  },
  detailsText: {
    color: "white",
    fontSize: 15,
    paddingHorizontal: 10,
  },
});
