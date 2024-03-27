import React from 'react'
import { Stack } from 'expo-router'

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}