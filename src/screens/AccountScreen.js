import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

// SafeAeraView is used so the content doesn;t go behind the iphone notch or navigation bar
import { SafeAreaView } from "react-native";

import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>Accoutn Screen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
