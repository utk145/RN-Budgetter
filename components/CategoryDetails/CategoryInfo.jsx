/**
 * CategoryInfo Component
 * Component to display detailed information about a category, including its icon, name, number of items, total budget, and budget progress.
 */

import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../utils/colors';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase.config';




export default function CategoryInfo({ categoryData }) {

    // state
    const [totalCost, setTotalCost] = useState();
    const [percentage, setPercentage] = useState(0);

    // Function to calculate total cost and percentage completion
    useEffect(() => {
        categoryData && calTotalPercentage();
    }, [categoryData, percentage])


    const calTotalPercentage = () => {
        let total = 0;
        categoryData?.CategoryItem?.forEach(item => {
            total += item?.price
        });
        // console.log("totalCost is", total);
        setTotalCost(total);
        percent = (total / (categoryData?.assigned_budget)) * 100;
        if (percent > 100) {
            percent = 100;
        }
        setPercentage(percent)
    }

    // handle category delete functionality
    const handleDelete = async () => {
        try {
            // Confirmation dialog for category deletion
            Alert.alert(
                "Are you sure?",
                "Do you really want to delete this category?",
                [
                    {
                        text: "Cancel",
                        style: 'cancel'
                    },
                    {
                        text: "Yes",
                        style: "destructive",
                        onPress: async () => {

                            // Delete all items under the category
                            const { data, error } = await supabase
                                .from('CategoryItem')
                                .delete()
                                .eq('category_id', categoryData.id)

                            // Delete the category itself
                            await supabase
                                .from("Category")
                                .delete()
                                .eq("id", categoryData.id)

                            if (error) {
                                throw error;
                            }
                            console.log('Category deleted successfully');
                            ToastAndroid.show(`${categoryData?.name} deleted!`, ToastAndroid.SHORT);
                            router.replace("/")
                        }
                    }
                ])
        } catch (error) {
            console.error('Error deleting category:', error.message);
        }
    }


    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <View style={styles.wrapperView}>
                    <Text style={[styles.iconTextStyle, { backgroundColor: categoryData?.color }]}>{categoryData?.icon}</Text>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.nameText}>{categoryData?.name}</Text>
                    <Text style={styles.countText}>{categoryData?.CategoryItem?.length} items</Text>
                </View>
                <TouchableOpacity onPress={handleDelete}>
                    <FontAwesome5 name="trash" size={24} color="#FF0000" />
                </TouchableOpacity>
            </View>

            <View style={styles.budgetContainer}>
                <Text style={{ fontFamily: 'Outfit-Bold' }}>₹{totalCost}</Text>
                <Text style={{ fontFamily: 'Outfit-Regular', fontSize: 17 }}>Total Budget: ₹{categoryData?.assigned_budget}</Text>
            </View>

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarSubContainer, { width: `${percentage}%` }]}>
                </View>
            </View>

        </View>
    )
}


/**
 * StyleSheet for styling the CategoryInfo component.
 */
const styles = StyleSheet.create({
    mainView: {
        marginTop: 20,
        gap: 20
    },
    headerView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    iconTextStyle: {
        fontSize: 30,
        padding: 18,
        borderRadius: 15
    },
    wrapperView: {
        justifyContent: "center",
        alignItems: "baseline",
    },
    infoView: {
        flex: 1,
        marginLeft: 25
    },
    nameText: {
        fontSize: 18,
        fontFamily: 'Outfit-Bold'
    },
    countText: {
        fontFamily: 'Outfit-Regular',
    },
    budgetContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    progressBarContainer: {
        width: "100%",
        height: 15,
        marginTop: 7,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
    },
    progressBarSubContainer: {
        height: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
    }
})