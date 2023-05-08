import React from 'react';
import { View, StyleSheet } from 'react-native';

const Commoncard = ({ children,height }) => {
  return (
    <View style={[styles.cardContainer,height ? {height:height}:{}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // justifyContent:"center",
    // alignItems:"center",
  
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:"90%",
  },
});

export default Commoncard;
