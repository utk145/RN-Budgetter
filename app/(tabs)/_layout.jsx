import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import colors from '../../utils/colors';

// https://docs.expo.dev/router/advanced/tabs/
/**
 * TabLayout Component
 * Represents the tab layout for navigation.
*/
export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: colors.PRIMARY, headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Pomodoro',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="clock-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
