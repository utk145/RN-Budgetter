/**
 * AddNewCategory Component
 * Represents the screen for adding a new category.
 */

import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/colors'
import ColorPicker from '../components/ColorPicker';

export default function AddNewCategory() {

    const [selectedIcon, setSelectedIcon] = useState(''); // initial category
    const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
    // console.log("selectedColor is ", selectedColor);

    return (
        <View style={styles.mainView}>
            <View style={styles.textView}>
                <TextInput style={[styles.iconInput, { backgroundColor: selectedColor }]}
                    value={selectedIcon}
                    maxLength={2}
                    placeholder='IC'
                    placeholderTextColor={Colors.WHITE}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                />
            </View>
            <ColorPicker
                selectedColor={selectedColor}
                setSelectedColor={(color) => setSelectedColor(color)}
            /> 
            {/* **Notes */}
        </View>
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