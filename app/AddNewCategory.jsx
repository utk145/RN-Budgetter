/**
 * AddNewCategory Component
 * Represents the screen for adding a new category.
 */

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/colors'
import ColorPicker from '../components/ColorPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase.config';
import { client } from '../utils/auth.kinde';
import { useRouter } from 'expo-router';

export default function AddNewCategory() {

    const router = useRouter();

    const [selectedIcon, setSelectedIcon] = useState('IC'); // initial category
    const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
    // console.log("selectedColor is ", selectedColor);
    // console.log("selectedIcon is ", selectedIcon);

    const [categoryName, setCategoryName] = useState();
    const [totalBudget, setTotalBudget] = useState();


    // Function to create a new category
    const onClickCreateCategory = async () => {
        const { data } = await supabase.from('Category').insert([{
            name: categoryName,
            assigned_budget: totalBudget,
            icon: selectedIcon,
            color: selectedColor,
            created_by: (await client.getUserDetails())?.email
        }]).select();

        if (data) {
            router.replace({
                pathname: "/CategoryDetails",
                params: {
                    categoryId: data[0]?.id
                }
            })
            console.log("data is", data);
            ToastAndroid.show("Category Created!", ToastAndroid.SHORT);
        }
    }

    return (
        <ScrollView style={styles.mainView}>
            <View style={styles.textView}>
                <TextInput style={[styles.iconInput, { backgroundColor: selectedColor }]}
                    maxLength={2}
                    placeholder='IC'
                    placeholderTextColor={Colors.WHITE}
                    onChangeText={(value) => setSelectedIcon(value)}
                >{selectedIcon}</TextInput>
            </View>
            <ColorPicker
                selectedColor={selectedColor}
                setSelectedColor={(color) => setSelectedColor(color)}
            />
            {/* **Notes */}

            <View style={styles.categoryAndInputView}>
                <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder='Category Name'
                    style={{ width: "100%", fontSize: 17 }}
                    onChangeText={(val) => setCategoryName(val)}
                />
            </View>

            <View style={styles.categoryAndInputView}>
                <MaterialIcons name="currency-rupee" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder='Total Budget'
                    keyboardType='numeric'

                    style={{ width: "100%", fontSize: 17 }}
                    onChangeText={(val) => setTotalBudget(val)}
                />
            </View>

            <TouchableOpacity
                style={styles.createButton}
                disabled={!categoryName && !totalBudget}
                onPress={() => onClickCreateCategory()}
            >
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
        padding: 20,
    },
    iconInput: {
        textAlign: "center",
        fontSize: 30,
        padding: 20,
        borderRadius: 100,
        paddingHorizontal: 28,
        color: Colors.WHITE
    },
    textView: {
        justifyContent: "center",
        alignItems: "center"
    },
    categoryAndInputView: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 20,
        padding: 14,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    createButton: {
        marginTop: 30,
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 20,
        alignSelf: "center"
    }
})


/*  **Notes

Notes for ColorPicker Component Usage:

- The ColorPicker component is used to allow users to select colors from a predefined list.
- It receives two props:
  1. selectedColor: This prop represents the currently selected color.
  2. setSelectedColor: This prop is a function that updates the selectedColor state when a new color is chosen by the user.
- When the user selects a color, the setSelectedColor function is called with the chosen color as an argument to update the state accordingly.
- Ensure that the selectedColor prop is set to the current state value and setSelectedColor is passed as a callback function to update the state.
- The ColorPicker component renders color options based on the COLORS_LIST array defined in the Colors utility file.
- Each color option is displayed as a small square with the corresponding background color.
- The selected color is visually highlighted with a border around the color option.


*/