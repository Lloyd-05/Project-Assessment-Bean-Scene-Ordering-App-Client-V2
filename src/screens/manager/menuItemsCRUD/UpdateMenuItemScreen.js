import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import BeanSceneLogo from '../../../../assets/images/logo/png/logo-primary-transparent.png';
import { useMenuItemStore } from '../../../store/MenuItemStore';
import { useCategoryStore } from '../../../store/MenuCategoryStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const UpdateMenuItemScreen = () => {
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();

  const navigation = useNavigation();
  const route = useRoute();
  const { replaceMenuItem, fetchMenuItemById, selectedItem, loading } = useMenuItemStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [dietaryFlags, setDietaryFlags] = useState('');
  const [availability, setAvailability] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const itemId = route.params?.itemId;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (itemId) {
      fetchMenuItemById(itemId);
    }
  }, [itemId]);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name || '');
      setDescription(selectedItem.description || '');
      setCategory(selectedItem.category?._id || selectedItem.category || '');
      setPrice(selectedItem.price?.toString() || '');
      setPhoto(selectedItem.photo || '');
      setDietaryFlags(
        Array.isArray(selectedItem.dietaryFlags)
          ? selectedItem.dietaryFlags.join(', ')
          : selectedItem.dietaryFlags || ''
      );
      setAvailability(
        selectedItem.Availability !== undefined
          ? selectedItem.Availability
          : selectedItem.availability !== undefined
            ? selectedItem.availability
            : true
      );
    }
  }, [selectedItem]);

  const handleUpdate = async () => {
    if (!itemId) {
      setErrorMessage('No item selected to update.');
      return;
    }

    if (!name.trim() || !description.trim() || !category || !price.trim()) {
      setErrorMessage('Name, description, category and price are required.');
      return;
    }

    const priceNumber = Number(price.replace(/[^0-9.]/g, ''));
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setErrorMessage('Price must be a positive number.');
      return;
    }

    const updateData = {
      name: name.trim(),
      description: description.trim(),
      category,
      price: priceNumber,
      photo: photo.trim(),
      dietaryFlags: dietaryFlags
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f),
      Availability: availability,
    };

    const result = await replaceMenuItem(itemId, updateData);
    if (result) {
      setErrorMessage('');
      navigation.goBack();
    } else {
      setErrorMessage('Failed to update menu item. Please try again.');
    }
  };
  //   { label: 'Entrees', value: 'entrees' },
  //   { label: 'Mains', value: 'mains' },
  //   { label: 'Specials', value: 'specials' },
  //   { label: 'Sides', value: 'sides' },
  //   { label: 'Desserts', value: 'desserts' },
  //   { label: 'Drinks', value: 'drinks' },
  // ];

  const categoryOptions = categories.map(c => ({
    label: c.name,
    value: c._id
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        {loading && (
          <ActivityIndicator
            size="large"
            color={theme.colors.beanLightBlue}
            style={{ marginTop: 20 }}
          />
        )}

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Update Menu Item
          </Text>
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

          <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: theme.colors.beanDarkBlue }]}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={[styles.updateText, { color: theme.colors.white }]}>Update </Text>
            )}
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <Text style={[styles.errorText, { color: theme.colors.beanDarkGold }]}>
            {errorMessage}
          </Text>
        ) : null}

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }
            ]}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }
            ]}
            multiline
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Category</Text>
          <Dropdown
            style={[styles.dropdown, { backgroundColor: theme.colors.beanLightGrey }]}
            data={categoryOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={category}
            onChange={(item) => {
              setCategory(item.value);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>

        {/* Price */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Price</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }
            ]}
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>

        {/* Photo */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Photo</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }
            ]}
            value={photo}
            onChangeText={(text) => {
              setPhoto(text);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>

        {/* Dietary Flags */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Dietary Flags</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }
            ]}
            value={dietaryFlags}
            onChangeText={(text) => {
              setDietaryFlags(text);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>

        {/* Availability */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Availability</Text>

          <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
              {availability ? 'Available' : 'Unavailable'}
            </Text>

            <Switch
              value={availability}
              onValueChange={setAvailability}
              thumbColor={availability ? theme.colors.beanDarkBlue : theme.colors.beanLightGrey}
              trackColor={{
                false: theme.colors.beanLightGrey,
                true: theme.colors.beanLightBlue
              }}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default UpdateMenuItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    width: '100%'
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
    marginBottom: 50,
  },
  scrollContent: {
    alignItems: 'center'
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
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
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
  updateButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  errorText: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center'
  },

  inputGroup: {
    width: '90%',
    marginBottom: 15
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 22
  },

  input: {
    padding: 10,
    borderRadius: 4,
    fontSize: 22
  },
  textArea: {
    height: 100
  },

  dropdown: {
    padding: 10,
    borderRadius: 6
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  switchLabel: {
    fontSize: 20,
    fontWeight: '500'
  },
});