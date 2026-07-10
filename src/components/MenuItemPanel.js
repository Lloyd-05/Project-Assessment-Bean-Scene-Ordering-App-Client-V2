import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Dropdown } from 'react-native-element-dropdown';
import { useOrderStore } from "../store/OrderStore";
import { useMenuItemStore } from "../store/MenuItemStore";
import { useCategoryStore } from '../store/MenuCategoryStore';
import { useLogo, useTheme } from "../context/ThemeContext";

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
        } else {
            right.push(current);
        }
    }

    return [
        ...quickSortMenuItems(left),
        pivot,
        ...quickSortMenuItems(right),
    ];
};

const binarySearchByName = (arr, targetName) => {
    const target = targetName.toLowerCase();
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midName = arr[mid].name.toLowerCase();

        if (midName === target) return arr[mid];
        if (midName < target) left = mid + 1;
        else right = mid - 1;
    }

    return null;
};


export default function MenuItemPanel({ sheetRef }) {
    const { theme, overrideTheme } = useTheme(); 

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [quantities, setQuantities] = useState({});

    const addItemToOrder = useOrderStore((s) => s.addItemToOrder);

    const menuItems = useMenuItemStore((s) => s.menuItems);
    const sortedMenuItems = quickSortMenuItems(menuItems);
    const fetchMenuItems = useMenuItemStore((s) => s.fetchMenuItems);

    const menuCategories = useCategoryStore((c) => c.categories);

    const fetchMenuCategories = useCategoryStore((c) => c.fetchCategories);

    const getItemKey = (item, index) => item._id || `${item.name}-${index}`;
    const getQuantityForItem = (item, index) => {
        const key = getItemKey(item, index);
        return quantities[key] ?? 1;
    };

    const setQuantityForItem = (item, index, value) => {
        const key = getItemKey(item, index);
        setQuantities((prev) => ({
            ...prev,
            [key]: Math.max(1, value),
        }));
    };

    const categoryFilteredItems = category === '' ? sortedMenuItems : sortedMenuItems.filter((item) => 
        (item.category?.name || item.category) === category);

    const searchedItem = name ? binarySearchByName(categoryFilteredItems, name) : null;

    const finalQuery = name ? searchedItem ? [searchedItem]: []: categoryFilteredItems;

    // const categoryFilteredItems = category === '' ? sortedMenuItems : sortedMenuItems.filter((item) =>
    //     (item.category?.name || item.category) === category);

    // const searchedItem = name ? binarySearchByName(categoryFilteredItems, name) : null;

    // const filteredItems = categoryFilteredItems.filter(item =>
    //     item.name.toLowerCase().includes(name.toLowerCase())
    // );

    // const finalQuery = filteredItems;

    useEffect(() => {
        fetchMenuItems();
        fetchMenuCategories();
    }, []);

    const categoryOptions = menuCategories.map((cat) => ({
        label: cat.name,
        value: cat.name,
    }));
    return (
<BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: theme.colors.primary }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.beanGold }}
    >
      <ScrollView>
        <View style={[styles.panelContainer, { backgroundColor: theme.colors.primary }]}>

          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.colors.beanGold }]}
              onPress={() => sheetRef.current?.close()}
            >
              <Text style={[styles.closeText, { color: theme.colors.beanDarkBlue }]}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Search Row */}
          <View style={styles.searchRow}>
            <Dropdown
              style={[styles.dropdown, { backgroundColor: theme.colors.beanLightGrey }]}
              data={categoryOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Category"
              value={category}
              onChange={(item) => setCategory(item.value)}
            />

            <TextInput
              style={[styles.searchInput, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
              placeholder="Search Item Name"
              value={name}
              onChangeText={setName}
            />

            <TouchableOpacity
              style={[styles.clearButton, { backgroundColor: theme.colors.beanGold }]}
              onPress={() => { setCategory(''); setName(''); }}
            >
              <Text style={[styles.clearText, { color: theme.colors.beanDarkBlue }]}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.searchButton, { backgroundColor: theme.colors.beanDarkBlue }]}
              onPress={() => console.log("Searching:", name)}
            >
              <Text style={[styles.searchText, { color: theme.colors.white }]}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* Items */}
          <ScrollView contentContainerStyle={styles.itemGrid}>
            {finalQuery.map((item, index) => {
              const itemQuantity = getQuantityForItem(item, index);

              return (
                <View
                  key={getItemKey(item, index)}
                  style={[styles.itemCard, { backgroundColor: theme.colors.surface }]}
                >
                  <Text style={[styles.itemName, { color: theme.colors.black }]}>{item.name}</Text>
                  <Text style={[styles.itemPrice, { color: theme.colors.black }]}>Price: {item.price}</Text>
                  <Text style={[styles.itemDescription, { color: theme.colors.black }]}>
                    Description: {item.description}
                  </Text>
                  <Text style={[styles.itemCategory, { color: theme.colors.black }]}>
                    Category: {item.category?.name || item.category}
                  </Text>
                  <Text style={[styles.itemDietary, { color: theme.colors.black }]}>
                    Dietary Flags: {item.dietaryFlags?.join(', ') || item.dietaryFlags}
                  </Text>
                  <Text style={[styles.itemAvailability, { color: theme.colors.black }]}>
                    Availability: {String(item.Availability ?? item.availability)}
                  </Text>

                  {/* Quantity Row */}
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={[styles.qtyButton, { backgroundColor: theme.colors.beanGold }]}
                      onPress={() => setQuantityForItem(item, index, itemQuantity - 1)}
                    >
                      <Text style={[styles.qtyButtonText, { color: theme.colors.beanDarkBlue }]}>−</Text>
                    </TouchableOpacity>

                    <TextInput
                      style={[styles.quantityInput, { backgroundColor: theme.colors.surface, color: theme.colors.onSurface }]}
                      keyboardType="numeric"
                      value={String(itemQuantity)}
                      onChangeText={(text) => setQuantityForItem(item, index, parseInt(text, 10) || 1)}
                    />

                    <TouchableOpacity
                      style={[styles.qtyButton, { backgroundColor: theme.colors.beanGold }]}
                      onPress={() => setQuantityForItem(item, index, itemQuantity + 1)}
                    >
                      <Text style={[styles.qtyButtonText, { color: theme.colors.beanDarkBlue }]}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.addButton, { backgroundColor: theme.colors.beanDarkBlue }]}
                      onPress={() => addItemToOrder(item, itemQuantity)}
                    >
                      <Text style={[styles.addText, { color: theme.colors.white }]}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>

        </View>
      </ScrollView>
    </BottomSheet>
  );
}


const styles = StyleSheet.create({
    panelContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 40,
        flexWrap: 'wrap',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    qtyButton: {
        width: 40,
        height: 40,
        backgroundColor: '#d4af37',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },

    qtyButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },

    quantityInput: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 10,
        width: '30%',
        height: 45,
        fontSize: 16,
        padding: 10,
        marginRight: 10,
    },
    // actionsRow: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginTop: 15,
    // },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    dropdown: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        width: '25%',
        height: 45,

        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    searchInput: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        width: '25%',
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    clearButton: {
        backgroundColor: '#d4af37',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    clearText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#0b4d4b',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    searchText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  },
    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 10,
        margin: 10,
        width: '100%',
        elevation: 3,
            flexGrow: 1,

            minWidth: 250

    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 16,
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        marginBottom: 5,
        // width: '45%',
    },
    itemCategory: {
        fontSize: 14,
        marginBottom: 3,
    },
    itemDietary: {
        fontSize: 14,
        marginBottom: 3,
    },
    itemAvailability: {
        fontSize: 14,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#0b4d4b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginLeft: 10,
    },

    addText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    closeButton: {
        backgroundColor: '#d4af37',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    closeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});