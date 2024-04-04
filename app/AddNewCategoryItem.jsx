import { View, Text, StyleSheet, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "../utils/colors";
import { MaterialIcons } from '@expo/vector-icons';


const placeholderImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCGPPu5x0HGfWucb9PBNFwXF8U7MwjYNJFFWcYsUlxcQ&s";

export default function AddNewCategoryItem() {
    const { categoryId } = useLocalSearchParams();
    // console.log("categoryId from AddNewCategory ", categoryId);

    const [image, setImage] = useState(placeholderImage);

    return (
        <ScrollView style={styles.mainView}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.itemInputView}>
                <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder="Item Name"
                    style={styles.input}
                />
            </View>
            <View style={styles.itemInputView}>
                <MaterialIcons name="currency-rupee" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder="Item Price"
                    style={styles.input}
                />
            </View>
            <View style={styles.itemInputView}>
                <MaterialIcons name="link" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder="Item URL / Buy link"
                    style={styles.input}
                />
            </View>
            <View style={styles.itemInputView}>
                <MaterialIcons name="draw" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder="Add a note"
                    style={styles.input}
                    numberOfLines={3}
                />
            </View>

            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        backgroundColor: Colors.GRAY,
        borderRadius: 15,
        alignSelf: "center"
    },
    itemInputView: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 20,
        padding: 12,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    input: {
        fontSize: 17
    },
    createButton: {
        marginTop: 20,
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 20,
        alignSelf: "center",
        fontFamily: "Outfit-Bold"
    }
});
