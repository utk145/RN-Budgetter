import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Pie() {

    // Width and height of the pie chart
    const widthAndHeight = 150;

    // State to store values for pie chart slices
    const [values, setValues] = useState([1]);

    // Color for pie chart slices
    const sliceColor = [Colors.GRAY];

    return (
        <View style={styles.mainView}>
            <Text style={styles.pieText}>
                Total Expenditure: <Text style={{ fontFamily: "Outfit-Bold" }}>0 ₹</Text>
            </Text>
            <View style={styles.pieContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                <View style={styles.usageCategoryContainer}>
                    <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
                    <Text>NA</Text>
                </View>
            </View>
        </View>
    )
}



/**
 * StyleSheet for styling the Pie component.
*/
const styles = StyleSheet.create({
    mainView: {
        marginTop: 20,
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        elevation: 1
    },
    pieText: {
        fontSize: 20,
        marginBottom: 10,
    },
    pieContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 40
    },
    usageCategoryContainer: {
        display: 'flex',
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    }
})



// Ref: https://www.npmjs.com/package/react-native-pie-chart