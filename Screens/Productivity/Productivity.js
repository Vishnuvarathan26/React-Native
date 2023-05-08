import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Productivity = ({ data }) => {
    console.log(data)
    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <Image style={styles.image} source={require("../../assets/engine.png")} />
                <Text style={styles.text}>
                    Actual/Target: {`${data[0].Productivity.ActualCabin ?? 0}/${data[0].Productivity.TargetCabin ?? 0}`}
                </Text>
                <Text style={styles.text}>
                    MTD: {`${data[0].MTDQuantity ?? 0}`}
                </Text>
                <Text style={styles.text}>
                    YTD: {`${data[0].YTDQuantity ?? 0}`}
                </Text>
            </View>
        </View>
    )
}

export default Productivity

const styles = StyleSheet.create({
    image: {
        width: 410,
        height: 300
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})