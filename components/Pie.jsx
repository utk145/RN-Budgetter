import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Pie({ categoryList }) {

    // Width and height of the pie chart
    const widthAndHeight = 150;

    // State to store values for pie chart slices
    const [values, setValues] = useState([1]);

    // Color for pie chart slices
    const [sliceColor, setSliceColor] = useState([Colors.GRAY])
    // console.log("categoryList from Pie", categoryList, "\n\n");

    // State to store the count of remaining categories
    const [remainingCategories, setRemainingCategories] = useState(0);
    const [totalEstimateCost, settotalEstimateCost] = useState(0);
    useEffect(() => {
        categoryList && updatePieChart();
    }, [categoryList]);


    const updatePieChart = () => {
        const filteredCategories = categoryList.filter(
            (category) => category?.CategoryItem?.length > 0
        );

        if (filteredCategories.length === 0) {
            return; // Do nothing if all categories are empty
        };

        let totalEstimate = 0;
        setSliceColor([]);
        setValues([]);
        let otherCosts = 0;
        let totalCategories = 0;
        categoryList?.forEach((item, index) => {
            if (index < 4) {
                let totalCost = 0;
                item?.CategoryItem?.forEach((item_) => {
                    totalCost = totalCost + item_?.price;
                    totalEstimate += item_?.price
                })
                setSliceColor(sliceColor => [...sliceColor, Colors.COLORS_LIST[index]]);
                setValues(values => [...values, totalCost])
            } else {
                item?.CategoryItem?.forEach((item_) => {
                    otherCosts = otherCosts + item_?.price;
                    totalEstimate += item_?.price
                })
            }
            totalEstimate += otherCosts;
            settotalEstimateCost(totalEstimate)
            totalCategories++;
        });

        // Calculate the number of remaining categories
        const remaining = Math.max(totalCategories - 4, 0);
        setRemainingCategories(remaining);

        setSliceColor(sliceColor => [...sliceColor, Colors.COLORS_LIST[4]]);
        setValues(values => [...values, otherCosts])
    };

    return (
        <View style={styles.mainView}>
            <Text style={styles.pieText}>
                Total Expenditure: <Text style={{ fontFamily: "Outfit-Bold" }}>₹ {totalEstimateCost}</Text>
            </Text>
            <View style={styles.pieContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                {categoryList?.length === 0 ?
                    <View style={styles.usageCategoryContainer}>
                        <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
                        <Text>NA</Text>
                    </View>
                    :
                    <View>
                        {categoryList?.map((category, index) => index <= 4 && (
                            <View key={index} style={styles.usageCategoryContainer}>
                                <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.COLORS_LIST[index]} />
                                <Text>{index < 4 ? category?.name : `Others (${remainingCategories})`}</Text>
                            </View>
                        ))}
                    </View>
                }
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