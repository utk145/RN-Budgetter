import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import services from "../../utils/storage.services";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../utils/supabase.config";
import { client } from "../../utils/auth.kinde";
import Header from "../../components/Header";
import Colors from "../../utils/colors";
import Pie from "../../components/Pie";
import { AntDesign } from '@expo/vector-icons';
import CategoriesList from "../../components/CategoriesList";

/**
 * Home Component
 * Represents the main screen of the application.
 */
export default function Home() {

  const [categoryList, setCategoryList] = useState();
  const [isloading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const user = await client.getUserDetails();
    // console.log(user);
    const { data } =
      await supabase
        .from('Category')
        .select('*,CategoryItem(*)')
        .eq('created_by', user?.email);

    console.log("data retrieved is", data);
    setCategoryList(data);
    data && setIsLoading(false);
  }

  return (
    <View style={styles.screnView}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryist()}
            refreshing={isloading}
          />
        }
      >
        <View style={styles.mainView}>
          <Header />
        </View>
        <View style={styles.newView}>
          <Pie categoryList={categoryList} />
          <CategoriesList categoryList={categoryList} />
        </View>
      </ScrollView>
      <Link href={"/AddNewCategory"} style={styles.addIconView}>
        <AntDesign name="pluscircle" size={50} color={Colors.PRIMARY} />
      </Link>
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
  },
  newView: {
    padding: 20,
    marginTop: -90
  }
});
