import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import BeanSceneLogo from '../../../../assets/images/logo/png/logo-primary-transparent.png';
import { useMenuItemStore } from '../../../store/MenuItemStore';
import { useCategoryStore } from '../../../store/MenuCategoryStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const CreateMenuItemScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();

  const { createMenuItem, loading } = useMenuItemStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [dietaryFlags, setDietaryFlags] = useState('');
  const [availability, setAvailability] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const categoryOptions = categories.map(c => ({
    label: c.name,
    value: c._id
  }));

  const handleCreate = async () => {
    if (!name.trim() || !description.trim() || !category || !price.trim()) {
      setErrorMessage('Name, description, category and price are required.');
      return;
    }

    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setErrorMessage('Price must be a positive number.');
      return;
    }

    const itemData = {
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

    const result = await createMenuItem(itemData);

    if (result) {
      setErrorMessage('');
      navigation.goBack();
    } else {
      setErrorMessage('Failed to create menu item. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Create Menu Item
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: theme.colors.beanGold }]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={[styles.cancelText, { color: theme.colors.beanDarkBlue }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: theme.colors.beanDarkBlue }]}
            onPress={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={[styles.createText, { color: theme.colors.white }]}>Create</Text>
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
            style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
            placeholder="Input"
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
            placeholder="Input"
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
            style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
            placeholder="Input"
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
            style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
            placeholder="Image URL"
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
            style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
            placeholder="e.g. Vegan, Gluten-Free"
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
}

export default CreateMenuItemScreen;

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
    alignItems: 'center'
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
    marginBottom: 20
  },
  cancelButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10
  },
  cancelText: {
    fontSize: 32,
    fontWeight: 'bold'
  },

  createButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10
  },
  createText: {
    fontSize: 32,
    fontWeight: 'bold'
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