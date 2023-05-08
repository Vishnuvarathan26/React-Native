import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Pressable} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import CustomButton from '../customButton';
const Card = ({ text, percentage }) => {
  const [color, setColor] = useState('#d3d3d3');
  percentage=Number(percentage)
  useEffect(() => {
    setColor(determineColor(percentage));
  }, []);

  const determineColor = (percentage) => {
    if (percentage >= 0 && percentage <= 60) {
      return '#ff5252';
    } else if (percentage >= 60 && percentage <= 80) {
      return '#ffb730';
    } else {
      return '#87f538';
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{text}</Text>
      <Pressable style={styles.buttoncontainer}>
        <Text style={styles.Details}>Details</Text>
      </Pressable>
      <Speedometer
        style={styles.highcharts}
        value={percentage}
        totalValue={100}
        size={250}
        outerColor="#d3d3d3"
        internalColor={color}
        showIndicator
        showPercent
        percentStyle={{color:"black"}}
      />
    </View>
  );
};


// const App = () => (
//   <View style={styles.container}>
//     <Card text="Card 1" />
//     <Card text="Card 2" />
//     <Card text="Card 3" />
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: "90%",
    height: "25%",
    backgroundColor: '#F5F5F5',
    position:"relative",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  cardText: {
    fontSize: 20,
    color: '#333',
  },

  highcharts: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Details:{
    color:"white",
    textAlign:"center",
  },
  buttoncontainer:{
    backgroundColor:"#2a7cf6",
    width: "20%",
    height:"15%",
    alignSelf: "flex-end",
    borderRadius: 5,
    position:"absolute",
    marginTop:8,
    right:8,
    padding:2
   }
});

export default Card;





