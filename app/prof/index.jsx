/**
 * UtkProf Component
 * Represents the profile screen of the developer, Utkarsh.
*/

import { Image, Text, View, StyleSheet, Dimensions, TouchableHighlight, Linking } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../utils/colors';


// Get the width of the device screen
const { width } = Dimensions.get('window');
const imageSize = width * 0.5;


export default function UtkProf() {


    /**
    * Function to handle the press event on the GitHub link.
    * Opens the link to Utkarsh's GitHub profile in the browser.
    */
    const handleGithubLinkPress = () => {
        // Open link to github.com/utk145 in browser
        Linking.openURL('https://github.com/utk145');
    };


    return (
        <View style={styles.container}>
            <FontAwesome name="arrow-circle-left" size={35} color="black" style={{
                position: "absolute",
                top: 50,
                left: 30,
            }}
                onPress={() => router.back()}
            />
            <View style={styles.imageContainer}>
                <Image source={{ uri: "https://avatars.githubusercontent.com/u/122993091?v=4" }} style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Hey there! Thanks for checking out my React Native Budget Planner App! My name is Utkarsh and I'm the developer behind this app. It took me quite sometime to create this app and I'm excited to share it with you. I hope you'll find it useful and enjoy using it as much as I enjoyed creating it.
                </Text>
                <TouchableHighlight onPress={handleGithubLinkPress} underlayColor="transparent">
                    <Text style={styles.linkText}>
                        github.com/utk145
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};


/**
 * StyleSheet for styling the UtkProf component.
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, // Updated marginBottom value
    },
    image: {
        resizeMode: 'cover',
    },
    textContainer: {
        marginHorizontal: 20,
        marginTop: 30, // Adjusted marginTop value to match the reduced marginBottom value in imageContainer
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginBottom: 20,
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: 2,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    linkText: {
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: 2,
        fontWeight: 'bold',
        color: "red",
    },
});