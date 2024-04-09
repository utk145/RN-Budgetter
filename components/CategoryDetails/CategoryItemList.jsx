/**
 * CategoryItemList Component
 * Component to display a list of items belonging to a specific category.
 * Each item includes its name, image, price, and an optional product link.
 * Allows users to click on the product link to navigate to the external product page.
 */
import { View, Text, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native'
import React from 'react'
import Colors from '../../utils/colors';

export default function CategoryItemList({ categoryData }) {

  console.log(categoryData?.CategoryItem);

  /**
   * Function to handle clicking on the product link.
   * Opens the provided URL in the device's default browser.
   * @param {string} itemUrl - The URL of the product to be opened.
   */
  const handleProductClickLink = (itemUrl) => {
    Linking.openURL(itemUrl);
  };


  return (
    <View style={styles.mainView}>
      <Text style={styles.heading} >
        Items
      </Text>
      <View style={styles.itemWrapper}>
        {
          categoryData?.CategoryItem?.length > 0 ?
            categoryData?.CategoryItem?.map((item, index) => (
              <>
                <View key={`${item.item_name}_${index}`} style={styles.mainItemContainer}>
                  {item?.image ?
                    <Image
                      source={{
                        uri: item?.image
                      }}
                      style={styles.image}
                    />
                    :
                    <Image src='https://gtzlvlopqwdjxlfzgkrn.supabase.co/storage/v1/object/public/images/ww.jpg' style={styles.image} />
                  }

                  <View style={styles.detailsContainer}>
                    <Text style={styles.itemNameText}>{item?.item_name}</Text>

                    {item?.url &&
                      <TouchableHighlight onPress={() => handleProductClickLink(item.url)} style={styles.productBuyButton}>
                        <Text style={styles.buttontext}>Product Link</Text>
                      </TouchableHighlight>
                    }
                  </View>
                  <Text style={styles.itemPriceText}>₹{item?.price}</Text>
                </View>

                {/*  This line of code conditionally renders a horizontal line separator between items in the list. The condition checks if the current index is not equal to the length of the `CategoryItem` array minus one, which means that the horizontal line should be rendered for all items except the last one.
            */}
                {categoryData?.CategoryItem?.length - 1 != index && <View key={index + 1} style={styles.horizontalLine}></View >}

              </>
            ))

            :
            <Text>No items to display!</Text>
        }
      </View>
    </View >
  )
}


// Styles for the CategoryItemList component
const styles = StyleSheet.create({
  mainView: {
    marginTop: 20
  },
  heading: {
    fontFamily: "Outfit-Bold",
    fontSize: 25,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors?.BLACK
  },
  itemWrapper: {
    marginTop: 10
  },
  productBuyButton: {
    padding: 7,
    backgroundColor: Colors.ORANGE,
    width: "50%",
    borderRadius: 8,
    alignItems: "center"
  },
  mainItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    gap: 5
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
    gap: 5
  },
  buttontext: {
    color: Colors.WHITE,
    fontFamily: "Outfit-Regular"
  },
  itemNameText: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium'
  },
  itemPriceText: {
    fontSize: 20,
    fontFamily: "Outfit-Bold"
  },
  horizontalLine: {
    borderWidth: .5,
    marginVertical: 10,
    opacity: .4
  }
})