/**
 * AddNewCategoryItem Component
 * Represents the screen for adding a new item to a category.
 * Allows users to add details such as item name, price, image, URL, and notes.
 */

import { View, Text, StyleSheet, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "../utils/colors";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "../utils/supabase.config";
import { decode } from 'base64-arraybuffer'


// Placeholder image displayed before selecting an image
const placeholderImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCGPPu5x0HGfWucb9PBNFwXF8U7MwjYNJFFWcYsUlxcQ&s";

export default function AddNewCategoryItem() {
    const { categoryId } = useLocalSearchParams();
    // console.log("categoryId from AddNewCategory ", categoryId);


    // State variables to store item details
    const [imageBuffer, setBufferImage] = useState(placeholderImage);
    const [previewImage, setPreviewImage] = useState(placeholderImage);
    const [itemName, setItemName] = useState();
    const [itemPrice, setItemPrice] = useState();
    const [itemUrl, setItemUrl] = useState();
    const [itemNote, setItemNote] = useState();
    const [loader, setLoader] = useState(false);


    // Function to handle image selection from the device's gallery
    const onClickImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.canceled) {
            setBufferImage(result.assets[0].base64);
            setPreviewImage(result.assets[0].uri);
        }
    };


    // Function to save the item details to the database
    const onClickSave = async () => {
        try {
            setLoader(true);

            // https://supabase.com/docs/reference/javascript/storage-from-upload?example=upload-file-using-arraybuffer-from-base64-file-data

            let fileImageUploadUrl = null;

            // Check if an image is selected
            if (previewImage !== placeholderImage) {
                // 1. Uploading Image
                const uniqueFileName = Date.now();
                const fileExtension = previewImage.split('.').pop(); // Extract file extension from URI

                const { data, error } = await supabase.storage.from('images').upload(
                    `${uniqueFileName}.${fileExtension}`,
                    decode(imageBuffer),
                    {
                        contentType: `image/${fileExtension}` // Set content type dynamically based on file extension
                    }
                );

                if (error)
                    console.log("Error during File upload..: ", error);
                if (data) {
                    // console.log("File upload..", data);
                    // const fileImageUploadUrl = `https://gtzlvlopqwdjxlfzgkrn.supabase.co/storage/v1/object/public/images/${data?.path}`; // Not this because sometimes it takes longer to fetach data.path resulting in undefines CategoryItem upload 

                    fileImageUploadUrl = `https://gtzlvlopqwdjxlfzgkrn.supabase.co/storage/v1/object/public/images/${uniqueFileName}.${fileExtension}`;
                    // console.log(fileImageUploadUrl);
                }
            }

            const { data, error } = await supabase
                .from("CategoryItem")
                .insert([
                    {
                        item_name: itemName,
                        price: itemPrice,
                        note: itemNote,
                        image: fileImageUploadUrl,
                        category_id: categoryId,
                        url: itemUrl,
                    }
                ])
                .select();

            console.log("data saved is ", data);
            setLoader(false);
            ToastAndroid.show("Category Item Created!", ToastAndroid.SHORT);
            router.replace({
                pathname: "/CategoryDetails",
                params: {
                    categoryId: categoryId
                }
            });
        } catch (error) {
            console.log("Something unexpected went wrong.. ", error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView style={styles.mainView}>
                <TouchableOpacity onPress={() => onClickImagePicker()}>
                    <Image source={{ uri: previewImage }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.itemInputView}>
                    <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Item Name"
                        style={styles.input}
                        onChangeText={(value) => setItemName(value)}
                    />
                </View>
                <View style={styles.itemInputView}>
                    <MaterialIcons name="currency-rupee" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Item Price"
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(value) => setItemPrice(value)}
                    />
                </View>
                <View style={styles.itemInputView}>
                    <MaterialIcons name="link" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Item URL / Buy link"
                        style={styles.input}
                        onChangeText={(value) => setItemUrl(value)}
                    />
                </View>
                <View style={styles.itemInputView}>
                    <MaterialIcons name="draw" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Add a note"
                        style={styles.input}
                        numberOfLines={3}
                        onChangeText={(value) => setItemNote(value)}
                    />
                </View>

                <TouchableOpacity style={styles.createButton}
                    disabled={!itemName || !itemPrice || loader}
                    onPress={() => onClickSave()}
                >
                    {loader ? <ActivityIndicator color={Colors.WHITE} /> :
                        <Text style={styles.buttonText}>Add</Text>
                    }
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
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
        fontSize: 17,
        width: "100%"
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
