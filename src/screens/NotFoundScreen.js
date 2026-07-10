import React from "react";

import {View, Text, StyleSheet} from "react-native";

const NotFoundScreen = () => {

  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        404 - Screen Not Found
      </Text>

    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 26,
  },

});