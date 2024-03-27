import { StyleSheet, Text, View } from "react-native";
import services from "../../utils/storage.services";
import { useEffect } from "react";
import { useRouter } from "expo-router";

/**
 * Home Component
 * Represents the main screen of the application.
 */
export default function Home() {

  // utils
  const router = useRouter();


  // Effect Hook to check user login status on component mount
  useEffect(() => {
    checkUserLoggedIn();
  }, []);



  /**
  * Function to check if the user is logged in.
  * Fetches login data from storage services asynchronously.
  */
  const checkUserLoggedIn = async () => {
    const result = await services.getData("login");
    console.log("result: ", result);
    if (result !== 'true') {
      router.replace("/login")
    }
  }

  return (
    <View>
      <Text>HomeOs Page</Text>
    </View>
  );
}


/**
 * StyleSheet for styling the Home component.
 */
const styles = StyleSheet.create({

});
