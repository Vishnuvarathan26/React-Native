import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import Commoncard from '../../components/Commoncard';
import Header from '../../components/Header';
import NoData from '../../components/NoData';

let stateColors = {
    ALARM: "#2980B9",
    STOP: "#E74C3C",
    EMERGENCY: '#F1C40F',
    SUSPEND: 'pink',
    OPERATE: 'green'
}

let piechartStructure = {
    fontWeight: "bold",
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
}

const Avaliability = ({ navigation, route }) => {
    const [machineStatus, setmachineStatus] = useState([])
    const [downTime, setdownTime] = useState([])
    const data = [
        { name: 'Alarm', population: 30, color: '#2980B9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Stop', population: 50, color: '#E74C3C', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Emergen..', population: 20, color: '#F1C40F', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Suspend', population: 20, color: 'pink', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Operate', population: 20, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 }

    ];
    // console.log(route.params.promises)
    useEffect(() => {
        if (route.params.promises[0].machineStatus.length) {
            let machineStatusValues = []
            let groupByState = _.groupBy(route.params.promises[0].machineStatus, "state")
            // console.log(groupByState)
            for (let state in groupByState) {
                if (state != "WARNING" && state != "WARNING/OPERATE") {
                    let tempObj = {}
                    let cumulativeTime = groupByState[state].reduce((init, obj) => {
                        return init + obj.timespan
                    }, 0)
                    // console.log(state);
                    tempObj['name'] = state
                    tempObj['color'] = stateColors[state]
                    tempObj['timespan'] = Math.round(cumulativeTime)
                    tempObj = { ...tempObj, ...piechartStructure }
                    machineStatusValues.push(tempObj)
                }

            }
            setmachineStatus(machineStatusValues)
            console.log(machineStatus);
        }
        // console.log(route.params.promises[0].DownTime);
        if (route.params.promises[0].DownTime.length) {
            let DownTimeValues = []
            let groupByState = _.groupBy(route.params.promises[0].DownTime, "state")
            // console.log(groupByState)
            for (let state in groupByState) {
                let tempObj = {}
                let cumulativeTime = groupByState[state].reduce((init, obj) => {
                    return init + obj.timespan
                }, 0)
                console.log(state);
                tempObj['name'] = state
                tempObj['color'] = stateColors[state]
                tempObj['timespan'] = Math.round(cumulativeTime)
                tempObj = { ...tempObj, ...piechartStructure }
                DownTimeValues.push(tempObj)
            }
            setdownTime(DownTimeValues)
            console.log(DownTimeValues);
        }
    }, [])
    //   console.log(machineStatus)
    return (
        <>
            <Header></Header>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><Ionicons name="arrow-back-outline" size={40} color="#242526" /></TouchableOpacity>
            <View style={styles.container}>
                <Commoncard>
                    <Text style={styles.cardText}>Machine Status Distribution</Text>
                    {
                        machineStatus.length ?
                            <PieChart
                                data={machineStatus}
                                width={Dimensions.get('window').width}
                                height={250}
                                chartConfig={{
                                    backgroundColor: '#e26a00',
                                    backgroundGradientFrom: '#fb8c00',
                                    backgroundGradientTo: '#ffa726',
                                    decimalPlaces: 0,
                                    color: (opacity = 0.7) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    }
                                }}
                                accessor="timespan"
                                backgroundColor="transparent"
                                absolute
                            /> :
                            <NoDataImage />
                    }

                </Commoncard>
            </View>
            <View style={styles.container}>
                <Commoncard>
                    <Text style={styles.cardText}>Downtime Distribution</Text>
                    {
                        downTime.length ?
                            <PieChart
                                data={downTime}
                                width={Dimensions.get('window').width}
                                height={250}
                                chartConfig={{
                                    backgroundColor: '#e26a00',
                                    backgroundGradientFrom: '#fb8c00',
                                    backgroundGradientTo: '#ffa726',
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 25,
                                        paddingHorizontal: 50
                                    },
                                }}
                                accessor="timespan"
                                backgroundColor="transparent"
                                absolute
                            /> : <NoDataImage />
                    }

                </Commoncard>
            </View>

        </>
    );
};

const NoDataImage = () => {
    return (
        <Image style={styles.imageStyle} source={require("../../assets/no-data-found.png")}></Image>

    )
}




const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "7%",
    },
    backButton: {
        marginLeft: 10,
        marginTop: 5
    }, cardText: {
        fontSize: 20,
        color: '#333',
    }, imageStyle: {
        height: 250,
        width: 350,
    }
})



export default Avaliability;
