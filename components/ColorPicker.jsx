/**
 * ColorPicker Component
 * Represents the color picker for selecting category colors.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/colors'

export default function ColorPicker({ setSelectedColor, selectedColor }) {
    return (
        <View style={styles.mainview}>
            {Colors.COLORS_LIST.map((item, indx) => (
                <TouchableOpacity key={indx + 1}
                    style={[{
                        height: 30,
                        width: 30,
                        backgroundColor: item,
                        borderRadius: 100
                    },
                    selectedColor===item&&{borderWidth:4}
                    ]}
                    onPress={() => setSelectedColor(item)}
                >

                </TouchableOpacity>
            ))}
        </View>
    )
};



const styles = StyleSheet.create({
    mainview: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        marginTop: 40,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    }
})