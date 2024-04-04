import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { supabase } from '../utils/supabase.config';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import CategoryInfo from '../components/CategoryDetails/CategoryInfo';
import CategoryItemList from '../components/CategoryDetails/CategoryItemList';
import { AntDesign } from '@expo/vector-icons';


export default function CategoryDetails() {

    const { categoryId } = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState();

    useEffect(() => {
        console.log("categoryId is ", categoryId);
        categoryId && getCategoryDetails();
    }, [categoryId]);


    const getCategoryDetails = async () => {
        const { data } = await supabase
            .from("Category")
            .select('*,CategoryItem(*)')
            .eq("id", categoryId);

        console.log("Category: ", data);
        setCategoryData(data[0]); // to retrive an object which is inside [] data
    };

    return (
        <View style={styles.mainView}>
            <FontAwesome name="arrow-circle-left" size={35} color="black"
                onPress={() => router.back()}
            />

            <CategoryInfo categoryData={categoryData} />
            <CategoryItemList categoryData={categoryData} />

            <Link href={{
                pathname: "/AddNewCategoryItem",
                params: {
                    categoryId: categoryData?.id
                }
            }} style={styles.addIconView}>
                <AntDesign name="pluscircle" size={50} color={categoryData?.color} />
            </Link>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        padding: 20,
        marginTop: 20,
        flex: 1
    },
    addIconView: {
        position: "absolute",
        bottom: 35,
        right: 20,
    },
})