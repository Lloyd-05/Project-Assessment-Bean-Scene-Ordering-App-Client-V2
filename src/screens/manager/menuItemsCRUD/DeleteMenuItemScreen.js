import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import BeanSceneLogo from '../../../../assets/images/logo/png/logo-primary-transparent.png';
import { useCategoryStore } from '../../../store/MenuCategoryStore';
import { useMenuItemStore } from '../../../store/MenuItemStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const DeleteMenuItemScreen = () => {

  const { theme } = useTheme();
  const beanSceneLogo = useLogo();

  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;

  const [errorMessage, setErrorMessage] = useState('');
  const { deleteMenuItem, fetchMenuItemById, loading } = useMenuItemStore();
  const menuCategories = useCategoryStore((c) => c.categories);
  const fetchMenuCategories = useCategoryStore((c) => c.fetchCategories);

  const selectedItem = useMenuItemStore((s) => s.selectedItem);


  // const menuCategories = useCategoryStore((c) => c.categories);

  // const fetchMenuCategories = useCategoryStore((c) => c.fetchCategories);

  // const categories = [
  //   { label: 'Entrees', value: 'entrees' },
  //   { label: 'Mains', value: 'mains' },
  //   { label: 'Specials', value: 'specials' },
  //   { label: 'Sides', value: 'sides' },
  //   { label: 'Desserts', value: 'desserts' },
  //   { label: 'Drinks', value: 'drinks' },
  // ];

  useEffect(() => {
    fetchMenuCategories();
    fetchMenuItemById(itemId);
  }, [itemId]);

  const handleDelete = async () => {
    const success = await deleteMenuItem(itemId);

    if (success) {
      navigation.goBack();
    } else {
      setErrorMessage('Failed to delete menu item.');
    }
    setErrorMessage('');

  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.bannerText}>Are you sure you want to delete this menu item?</Text>
        </View>

      <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: theme.colors.beanGold }]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={[styles.cancelText, { color: theme.colors.beanDarkBlue }]}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.colors.beanDarkBlue }]} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteMenuItemScreen;

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
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: 'contain'
  },

  banner: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 25
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 45,
  },
  availabilityText: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
  },
});