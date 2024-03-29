import { StyleSheet, Text, View } from "react-native";
import services from "../../utils/storage.services";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase.config";
import { client } from "../../utils/auth.kinde";
import Header from "../../components/Header";
import Colors from "../../utils/colors";
import Pie from "../../components/Pie";
import { AntDesign } from '@expo/vector-icons';

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
    getCategoryist();
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

  /**
   * Function to get the category list for the logged-in user.
   * Fetches categories from the database using Supabase.
  */
  const getCategoryist = async () => {
    const user = await client.getUserDetails();
    // console.log(user);
    const { data } =
      await supabase
        .from('Category')
        .select('*')
        .eq('created_by', user?.email);

    console.log("data retrieved is", data);

  }

  return (
    <View style={styles.screnView}>
      <View style={styles.mainView}>
        <Header />
        <Pie />
      </View>
      <View style={styles.addIconView}>
        <AntDesign name="pluscircle" size={50} color={Colors.PRIMARY} />
      </View>
    </View>
  );
}


/**
 * StyleSheet for styling the Home component.
 */
const styles = StyleSheet.create({
  mainView: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    height: 140
  },
  screnView: {
    marginTop: 25,
    flex: 1,
  },
  addIconView: {
    position: "absolute",
    bottom: 35,
    right: 20,
  }
});
