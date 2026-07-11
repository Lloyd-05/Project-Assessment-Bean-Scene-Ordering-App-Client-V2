import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenuItemStore } from '../../../store/MenuItemStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const quickSortMenuItems = (items) => {
  if (!items || items.length <= 1) {
    return items;
  }
  const pivot = items[items.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < items.length - 1; i++) {
    const current = items[i];

    if (current.name.toLowerCase() < pivot.name.toLowerCase()) {
      left.push(current);
    }
    else {
      right.push(current);
    }
  }

  return [
    ...quickSortMenuItems(left),
    pivot,
    ...quickSortMenuItems(right),
  ];
};


const MenuItemsListScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();

  const { menuItems, loading, error, fetchMenuItems } = useMenuItemStore();
  const [selectedItemId, setSelectedItemId] = useState(null);


  useEffect(() => {
    fetchMenuItems();
  }, []);

  const sortedMenuItems = quickSortMenuItems(menuItems);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Menu Items List
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.manageButton, { backgroundColor: theme.colors.beanDarkBlue }]}
            onPress={() => navigation.navigate('menuCategoryList')}
          >
            <Text style={[styles.buttonText, { color: theme.colors.white }]}>Manage Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: theme.colors.beanGold }]}
            onPress={() => navigation.navigate('createMenuItem')}
          >
            <Text style={[styles.buttonText, { color: theme.colors.beanDarkBlue }]}>Create New Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemGrid}>
          {loading && <ActivityIndicator size="large" color={theme.colors.beanLightBlue} />}
          {error && <Text style={[styles.errorText, { color: theme.colors.beanDarkGold }]}>Error: {error}</Text>}

          {sortedMenuItems && sortedMenuItems.map((item) => (
            <View key={item._id} style={[styles.itemCard, { backgroundColor: theme.colors.surface }]}>

              {/* Header */}
              <View style={[styles.itemHeader, { backgroundColor: theme.colors.beanLightBlue }]}>
                <Text style={[styles.itemName, { color: theme.colors.white }]}>{item.name}</Text>

                <View style={styles.itemButtons}>
                  <TouchableOpacity
                    style={[styles.updateButton, { backgroundColor: theme.colors.beanDarkBlue }]}
                    onPress={() => {
                      setSelectedItemId(item._id);
                      navigation.navigate('updateMenuItem', { itemId: item._id });
                    }}
                  >
                    <Text style={[styles.updateText, { color: theme.colors.white }]}>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: theme.colors.beanGold }]}
                    onPress={() => {
                      setSelectedItemId(item._id);
                      navigation.navigate('deleteMenuItem', { itemId: item._id });
                    }}
                  >
                    <Text style={[styles.deleteText, { color: theme.colors.beanDarkBlue }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Body */}
              <View style={styles.itemBody}>
                <Text style={[styles.itemPrice, { color: theme.colors.onSurface }]}>
                  Price: ${item.price}
                </Text>
                <Text style={[styles.itemDescription, { color: theme.colors.onSurface }]}>
                  Description: {item.description}
                </Text>
                <Text style={[styles.itemCategory, { color: theme.colors.onSurface }]}>
                  Category: {item.category?.name || 'N/A'}
                </Text>
                <Text style={[styles.itemDietary, { color: theme.colors.onSurface }]}>
                  Dietary Flags: {item.dietaryFlags?.join(', ') || 'None'}
                </Text>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

export default MenuItemsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%'
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
    marginBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    },
  Image: {
    marginTop: 50,
    width: "80%",
    height: undefined,
    aspectRatio: 1.8, // tweak until it fits nicely
    resizeMode: "contain",
    alignSelf: "center"
  },
  banner: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 25
  },
  bannerText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  manageButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
        marginVertical: 10,

  },
  createButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  },

  itemCard: {
    borderRadius: 6,
    padding: 10,
    margin: 10,
    width: '40%',
    elevation: 3,
    flexGrow: 1,
    minWidth: 250
  },

  itemHeader: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  itemName: {
    fontWeight: 'bold',
    fontSize: 18
  },

  itemButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  updateButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5
  },
  updateText: {
    fontWeight: 'bold'
  },

  deleteButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5
  },
  deleteText: {
    fontWeight: 'bold'
  },

  itemBody: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 5
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5
  },
  itemCategory: {
    fontSize: 14,
    marginBottom: 3
  },
  itemDietary: {
    fontSize: 14,
    marginBottom: 3
  },

  errorText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  },
});