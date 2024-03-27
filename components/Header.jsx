import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { client } from '../utils/auth.kinde';
import Colors from '../utils/colors';
import { useRouter } from 'expo-router';


/**
 * Header Component
 * Represents the header section of the application.
*/
export default function Header() {

    // states
    const [userDetails, setUserDetails] = useState();

    // utils
    const router = useRouter();


    // Effect Hook to fetch user details on component mount
    useEffect(() => {
        getUserDetails();
    }, []);


    /**
     * Function to fetch user details.
     * Retrieves user details from the authentication client.
     */
    const getUserDetails = async () => {
        const user = await client.getUserDetails();
        console.log("user", user);
        setUserDetails(user);
    }


    return (

        <View style={styles.mainView}>

            {userDetails?.picture ?
                <Image source={{ uri: userDetails?.picture }} style={styles.userImage} />
                :
                <>
                    <View style={styles.avatarContainer}>
                        <FontAwesome size={42} name="user" color={Colors.WHITE} />
                    </View>
                </>
            }

            <View style={styles.contentView}>
                <View>
                    <Text style={{ color: Colors.WHITE, fontSize: 16 }}>Welcome, </Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontWeight: "bold" }}>{`${userDetails?.given_name} ${userDetails?.family_name}`}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("prof")}>
                    <FontAwesome name="bell" size={30} color="red" />
                </TouchableOpacity>
            </View>

        </View>
    )
}


/**
 * StyleSheet for styling the Home component.
 */
const styles = StyleSheet.create({
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 99
    },
    avatarContainer: {
        borderRadius: 99,
        backgroundColor: "orange",
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    mainView: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    contentView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        justifyContent: "space-between"
    }

});
