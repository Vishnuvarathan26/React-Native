import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Header from '../../components/Header';
import CircularProgress from 'react-native-circular-progress-indicator';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import Speedometer from 'react-native-speedometer-chart';
import firebase from "../../firebase";
import Productivity from '../Productivity';
let db = firebase.firestore()

const Dashboard = ({ navigation }) => {
  //BottomSheet
  // hooks
  const sheetRef = useRef(null);
  const [isOpen, setisOpen] = useState(false)
  const snapPoints = ['60%']
  //
  const [oeeColor, setOeeColor] = useState({ color: '#d3d3d3', percentage: 0 });
  const [avaliabiltyColor, setAvaliabiltyColor] = useState({ color: '#d3d3d3', percentage: 0 });
  const [productivityColor, setProductivityColor] = useState({ color: '#d3d3d3', percentage: 0 });
  const [qualityColor, setQualityColor] = useState({ color: '#d3d3d3', percentage: 100 });
  const [statusData, setStatusData] = useState({})
  const [promises, setPromises] = useState()
  percentage = Number(percentage)
  useEffect(() => {
    const unsubscribe = db.collection("CollectionName").onSnapshot(snapshot => {
      let promises = [];
      if (snapshot.size != 0) {
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          promises.push(data);
        });
      }
      if (promises.length) {
        setStatusData['machineStatus'] = promises[0]?.machineStatus ? promises[0]?.machineStatus : []
        setStatusData['DownTime'] = promises[0]?.DownTime ? promises[0]?.DownTime : []
        for (let data of promises) {
          let OeeValue = determineColor(data.OEE)
          setOeeColor({ color: OeeValue, percentage: data.OEE })
          let avaliabilityValue = determineColor(data.Availability.Value)
          setAvaliabiltyColor({ color: avaliabilityValue, percentage: data.Availability.Value })
          let productivityValue = determineColor(data.Productivity.Value)
          setProductivityColor({ color: productivityValue, percentage: data.Productivity.Value })
        }
        setPromises(promises)
      }

    })
    return unsubscribe;
  }, []);

  let finalObj;
  let percentage = 70
  const determineColor = (percentage) => {
    if (percentage >= 0 && percentage <= 60) {
      return '#ff5252';
    } else if (percentage >= 60 && percentage <= 80) {
      return '#ffb730';
    } else {
      return '#87f538';
    }
  }
  // const handleSheetChanges = useCallback((index) => {
  //   sheetRef.current?.snapToIndex(index)
  //   setisOpen(true)
  // }, []);


  let dashboardContents = [{
    name: "OEE"
  }, {
    name: "Availability"
  }, {
    name: "Productivity"
  }, {
    name: "Quality"
  }]
  //navigation.navigate('Availability', { promises }) 
  const Details = ({ screenName }) => (
    <TouchableOpacity style={styles.buttoncontainer} onPress={() => screenName == "Availability" ? navigation.navigate('Availability', { promises }) : setisOpen(true)} >
      <Text style={styles.Details}>Details</Text>
    </TouchableOpacity>
  )

  if (!promises) {
    return (
      <View style={styles.loaderContainer}>
        <Image style={{ width: 80, height: 80 }} source={require("../../assets/loader.gif")} />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation}></Header>
        <ScrollView>
          {
            dashboardContents.map(({ name }, index) => {
              if (name === "Availability") {
                finalObj = avaliabiltyColor;
              }
              else if (name === "OEE") {
                finalObj = oeeColor
              }
              else if (name === "Productivity") {
                finalObj = productivityColor
              } else {
                finalObj = qualityColor
              }
              return (
                <View key={index} style={styles.cardContainer}>
                  <Text style={styles.cardText}>{name}</Text>
                  {name !== "OEE" && name !== "Quality" ? <Details screenName={name} /> : <></>}
                  {/* <Speedometer
                    style={styles.highcharts}
                    value={finalObj.percentage}
                    totalValue={100}
                    size={250}
                    outerColor="#d3d3d3"
                    internalColor={finalObj.color}
                    showIndicator
                    showPercent
                    percentStyle={{ color: "black" }}
                  /> */}
                  <View style={styles.highcharts}>
                    <CircularProgress
                      value={finalObj.percentage}
                      radius={100}
                      duration={1000}
                      progressValueColor={'black'}
                      maxValue={100}
                      valueSuffix={'%'}
                      titleColor={'black'}
                      titleStyle={{ fontWeight: 'bold' }}
                      activeStrokeWidth={10}
                      inActiveStrokeWidth={10}
                      strokeColorConfig={[
                        { color: 'red', value: 60 },
                        { color: 'orange', value: 80 },
                        { color: 'green', value: 100 },
                      ]}

                    />
                  </View>
                </View>
              );
            })

          }
        </ScrollView>
        {
          isOpen ?
            <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              enablePanDownToClose
              onClose={() => setisOpen(false)}
            >
              <BottomSheetView>
                <Productivity data={promises} />
              </BottomSheetView>
            </BottomSheet>
            : <></>
        }

      </View>
    </>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfdfe0",
  },
  cardContainer: {
    position: "relative",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    margin: 20
  },
  highcharts: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  cardText: {
    fontSize: 20,
    color: '#333',
  }, Details: {
    color: "white",
    textAlign: "center",
  },
  buttoncontainer: {
    backgroundColor: "#2a7cf6",
    width: "20%",
    height: "10%",
    alignSelf: "flex-end",
    borderRadius: 5,
    position: "absolute",
    marginTop: 8,
    right: 8,
    padding: 2
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Dashboard

// const Dashboard = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <Header navigation={navigation}></Header>
//         <ScrollView>
//         <View>
//         <Card text="OEE" percentage="59" ></Card>
//         <Card text="Avaliability" percentage="54"></Card>
//         <Card text="Productivity" percentage="70"></Card>
//         </View>
//         </ScrollView>
//     </View>
//   )
// }
// {
//   promises.length ?
//     <View style={styles.container}>
//       <Header navigation={navigation}></Header>
//       <ScrollView>
//         {
//           dashboardContents.map(({ name }, index) => {
//             if (name === "Availability") {
//               finalObj = avaliabiltyColor;
//             }
//             else if (name === "OEE") {
//               finalObj = oeeColor
//             }
//             else if (name === "Productivity" || name === "Quality") {
//               finalObj = productivityColor
//             }
//             return (
//               <View key={index} style={styles.cardContainer}>
//                 <Text style={styles.cardText}>{name}</Text>
//                 <Details screenName={name} />
//                 <Speedometer
//                   style={styles.highcharts}
//                   value={finalObj.percentage}
//                   totalValue={100}
//                   size={250}
//                   outerColor="#d3d3d3"
//                   internalColor={finalObj.color}
//                   showIndicator
//                   showPercent
//                   percentStyle={{ color: "black" }}
//                 />
//               </View>
//             );
//           })

//         }
//       </ScrollView>
//     </View>
//     :
//     <View style={styles.loader}>
//       <Image style={{ width: 80, height: 80 }} source={require("../../assets/loader.gif")} />
//     </View>
// }