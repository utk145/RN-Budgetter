import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function CategoryDetails() {

    const { categoryId } = useLocalSearchParams();
    console.log("categoryId is ", categoryId);

    return (
        <View>
            <Text>CategoryDetails</Text>
        </View>
    )
}