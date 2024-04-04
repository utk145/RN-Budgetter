import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font';

export default function HomeLayout() {

    // Reference:  https://docs.expo.dev/versions/latest/sdk/font/
    const [fontsLoaded, fontError] = useFonts({
        'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
        'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    });

    return (
        <Stack
            screenOptions={{ headerShown: false }}
        >

            {/* Main screen with tabs */}
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }} />

            {/* Add new category modal screen */}
            <Stack.Screen name='AddNewCategory' options={{
                presentation: "modal",
                headerShown: true,
                headerTitle: 'Add a new category'
            }} />

            {/* Add new category-item modal screen */}
            <Stack.Screen
                name='AddNewCategoryItem'
                options={{
                    headerShown: true,
                    presentation: "modal",
                    headerTitle: "Add a new item",
                }}
            />

        </Stack>
    )
}