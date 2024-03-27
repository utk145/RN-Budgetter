import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import logoBg from "../../assets/images/bg.png";
import Colors from '../../utils/colors';
import { client } from '../../utils/auth.kinde';
import services from "../../utils/storage.services";
import { useRouter } from 'expo-router';

export default function LoginScreen() {

  // utils
  const router = useRouter();


  /**
   * Function to handle user sign-in.
   * Attempts to log the user in using client authentication.
   * If successful, stores login status in device storage.
   */
  const handleSignIn = async () => {
    try {
      const token = await client.login();
      console.log("login token", token);
      if (token) {
        // User was authenticated
        await services.storeData("login", "true");
        router.replace('/');

      }
    } catch (error) {
      console.log("error during login", error);
    }
  };



  return (
    <View style={styles.mainView}>

      <Image source={logoBg} style={styles.bgImage} />

      <View style={styles.bottomView}>
        <Text style={styles.bottomViewHeadingText}>Your Personal Budget Planner</Text>

        <Text style={styles.bottomViewSubHeadingText}>Balanced Money, Balanced Life. Know where your money is.</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
          <Text style={styles.loginBtnText}>Login / Signup</Text>
        </TouchableOpacity>
        <Text style={styles.disclaimerText}>* By login/signup you agree to our terms and conditions</Text>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 400,
    marginTop: 70,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.BLACK
  },
  mainView: {
    display: 'flex',
    alignItems: "center",
    backgroundColor: "#F8F8F8"
  },
  bottomView: {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    height: "100%",
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  bottomViewHeadingText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.WHITE,
  },
  bottomViewSubHeadingText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.WHITE
  },
  loginBtn: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 50,
    marginTop: 30,
  },
  loginBtnText: {
    color: Colors.PRIMARY,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 19
  },
  disclaimerText: {
    fontSize: 13,
    color: Colors.GRAY,
    marginTop: 10,
    textAlign: "center"
  }

})