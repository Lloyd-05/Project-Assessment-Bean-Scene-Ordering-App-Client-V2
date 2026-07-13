import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import MenuItemPanel from '../../components/MenuItemPanel';
import { useMenuItemStore } from "../../store/MenuItemStore";
import { useCategoryStore } from "../../store/MenuCategoryStore";
import { useOrderStore } from "../../store/OrderStore";
import { useTheme, useLogo } from "../../context/ThemeContext";

const quickSortMenuItems = (items) => {
  if (!items || items.length <= 1) {
    return items
  };

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

export default function WaiterMenuItemListScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();

  const menuItems = useMenuItemStore((s) => s.menuItems);
  const fetchMenuItems = useMenuItemStore((s) => s.fetchMenuItems);

  const menuCategories = useCategoryStore((s) => s.categories);
  const fetchMenuCategories = useCategoryStore((s) => s.fetchCategories);

  const addItemToOrder = useOrderStore((s) => s.addItemToOrder);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchMenuItems();
    fetchMenuCategories();
  }, [fetchMenuItems, fetchMenuCategories]);

  const categoryOptions = useMemo(
    () =>
      (menuCategories || []).map((cat) => ({
        label: cat.name,
        value: cat._id || cat.name,
      })),
    [menuCategories]
  );

  // const filteredMenuItems = useMemo(() => {
  //   return menuItems.filter((item) => {
  //     const matchesCategory = category ? item.category?._id === category : true;
  //     const matchesName = name
  //       ? item.name.toLowerCase().includes(name.toLowerCase())
  //       : true;
  //     return matchesCategory && matchesName;
  //   });
  // }, [menuItems, category, name]);

  const sortedMenuItems = useMemo(() => quickSortMenuItems(menuItems), [menuItems]);

  // FILTER + BINARY SEARCH
  const filteredMenuItems = useMemo(() => {

    const categoryFiltered = category
      ? sortedMenuItems.filter(item => item.category?._id === category)
      : sortedMenuItems;

    if (!name) {
      return categoryFiltered;
    }
    const exactMatch = binarySearchByName(categoryFiltered, name);

    if (exactMatch) {
      return [exactMatch]
    };

    return categoryFiltered.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [sortedMenuItems, category, name]);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Select Menu Items
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.beanGold }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: theme.colors.beanDarkBlue }}>Back</Text>
        </TouchableOpacity>

        <View style={styles.filterRow}>
          <Dropdown
            style={[styles.dropdown, { backgroundColor: theme.colors.surface }]}
            data={categoryOptions}
            labelField="label"
            valueField="value"
            placeholder="Category"
            value={category}
            onChange={(selectedCategory) => setCategory(selectedCategory.value)} />

          <TextInput
            style={[styles.searchInput, { backgroundColor: theme.colors.surface }]}
            placeholder="Search name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: theme.colors.beanGold }]}
          onPress={() => {
            setCategory("");
            setName("");
          }}
        >
          <Text style={{ color: theme.colors.beanDarkBlue }}>Clear</Text>
        </TouchableOpacity>
        <View style={styles.itemsContainer}>
          {filteredMenuItems.map((item, index) => {
            const qty = getQuantityForItem(item, index);

            return (
              <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.itemName, { color: theme.colors.onSurface }]}>
                  {item.name}
                </Text>
                <Text style={[ styles.itemText, {color: theme.colors.onSurface }]}>
                  Price: ${item.price}
                </Text>
                <Text style={[styles.itemText,{ color: theme.colors.onSurface }]}>
                  Category: {item.category?.name || "N/A"}
                </Text>
                <Text style={[styles.itemText,{ color: theme.colors.onSurface }]}>
                   Dietary Flags: {item.dietaryFlags?.join(', ') || 'None'}

                </Text>

                {/* Quantity + Add */}
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={[styles.qtyButton, { backgroundColor: theme.colors.beanGold }]}
                    onPress={() => setQuantityForItem(item, index, qty - 1)}
                  >
                    <Text style={{ color: theme.colors.beanDarkBlue }}>−</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={[styles.qtyInput, { backgroundColor: theme.colors.surface }]}
                    keyboardType="numeric"
                    value={String(qty)}
                    onChangeText={(t) =>
                      setQuantityForItem(item, index, parseInt(t, 10) || 1)
                    }
                  />

                  <TouchableOpacity
                    style={[styles.qtyButton, { backgroundColor: theme.colors.beanGold }]}
                    onPress={() => setQuantityForItem(item, index, qty + 1)}
                  >
                    <Text style={{ color: theme.colors.beanDarkBlue }}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: theme.colors.beanDarkBlue }]}
                    onPress={() => {
                      addItemToOrder(item, qty);
                    }}
                  >
                    <Text style={{ color: theme.colors.white }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    paddingBottom: 400,
    marginBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
  },
  Image: {
    marginTop: 50,
    width: "80%",
    height: undefined,
    aspectRatio: 1.8, // tweak until it fits nicely
    resizeMode: "contain",
    alignSelf: "center"
  },

  brand: {
    fontSize: 32,
    fontFamily: 'serif',
    color: '#0b4d4b',
    marginBottom: 15,
  },
  banner: {
    width: '90%',
    backgroundColor: '#4fa3b6',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 25,
    alignSelf: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
  },
  header: {
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  filterRow: {
    width: '80%',
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  dropdown: {
    width: "45%",
    padding: 10,
    borderRadius: 6,
  },

  searchInput: {
    width: "45%",
    padding: 10,
    borderRadius: 6,
  },

  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
    marginBottom: 20,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    margin: 10,
    elevation: 3,
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

  itemName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  itemText: {
    fontSize: 16,

  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  qtyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  qtyInput: {
    width: 50,
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 6,
  },

  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: "auto",
  },

  backButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});