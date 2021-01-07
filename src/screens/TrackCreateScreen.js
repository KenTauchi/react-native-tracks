import "../_mockLocation";
import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";

import useLocation from "../hooks/useLocation";
import { add } from "react-native-reanimated";

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation } = useContext(LocationContext);

  const [err] = useLocation(isFocused, addLocation);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>TrackCreateScreen</Text>
      <Map />

      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
