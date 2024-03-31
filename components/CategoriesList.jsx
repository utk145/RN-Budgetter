import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/colors'
import { useRouter } from 'expo-router'

export default function CategoriesList({ categoryList }) {

    const router = useRouter();
    const onCategoryClick = (categoryDetails) => {
        // router.push("/CategoryDetails");
        router.push({
            pathname: "/CategoryDetails",
            // params: categoryDetails
            params: {
                categoryId: categoryDetails?.id
            }
        });

    }

    return (
        <View style={styles.mainView}>
            <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 25, marginBottom: 10 }}>Budget</Text>
            <View>
                {categoryList?.map((item, indx) => (
                    <TouchableOpacity key={indx + 1} style={styles.listContainer} onPress={() => onCategoryClick(item)}>
                        <View style={styles.iconConatainerView}>
                            <Text style={[styles.iconText, { backgroundColor: item?.color }]}>{item?.icon}</Text>
                        </View>
                        <View style={styles.subListContainer}>
                            <View>
                                <Text style={styles.nameText}>{item?.name}</Text>
                                <Text style={styles.countText}>{item?.CategoryItem.length} items</Text>
                            </View>
                            <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 17 }}>₹{item?.assigned_budget}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    mainView: {
        marginTop: 20,
    },
    iconText: {
        fontSize: 30,
        padding: 15,
        borderRadius: 15
    },
    iconConatainerView: {
        alignItems: "baseline",
        justifyContent: 'center'
    },
    listContainer: {
        marginBottom: 10,
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        padding: 10
    },
    nameText: {
        fontSize: 17,
        fontFamily: 'Outfit-Bold'
    },
    countText: {
        fontFamily: 'Outfit-Regular',
    },
    subListContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        width: "70%"
    }
})


