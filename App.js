import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/Homescreen";
import Results from "./screens/Results";
import Details from "./screens/Details";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "MovieBrowser",
            headerStyle: {
              backgroundColor: "#7F2724",
            },
          }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={({ route }) => ({
            title: `Showing results for: ${route.params.search}`,
            headerStyle: { backgroundColor: "black" },
          })}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({
            title: `Loading ${route.params.imdbID}`,
            headerStyle: { backgroundColor: "black" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
