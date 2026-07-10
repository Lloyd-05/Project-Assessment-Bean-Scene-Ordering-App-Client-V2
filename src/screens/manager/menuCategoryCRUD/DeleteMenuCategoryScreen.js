import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCategoryStore } from '../../../store/MenuCategoryStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const DeleteMenuCategoryScreen = () => {
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();
  const navigation = useNavigation();
  const route = useRoute();
  const categoryId = route.params?.categoryId;

  const deleteCategory = useCategoryStore((s) => s.deleteCategory);
  const loading = useCategoryStore((s) => s.loading);
  const fetchCategoryById = useCategoryStore((s) => s.fetchCategoryById);
  const selectedCategory = useCategoryStore((s) => s.selectedCategory);

  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (categoryId) {
      fetchCategoryById(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
    }
  }, [selectedCategory]);

  const handleDelete = async () => {
    const success = await deleteCategory(categoryId);

    if (success) {
      navigation.goBack();
    } else {
      setErrorMessage('Failed to delete menu category.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.bannerText}>Are you want to delete this menu category?</Text>
        </View>

        {loading && <ActivityIndicator size="large" color="#4fa3b6" style={{ marginTop: 20 }} />}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: theme.colors.beanGold }]}
            onPress={() => navigation.goBack()}
            disabled={loading}>
            <Text style={[styles.cancelText, { color: theme.colors.beanDarkBlue }]}>Cancel</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.colors.beanDarkBlue }]} onPress={handleDelete} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.deleteText}>Delete</Text>
            )}
          </TouchableOpacity>
        </View>
{/* 
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
          <TextInput style={styles.input} value={name} editable={false} />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default DeleteMenuCategoryScreen;

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
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
  },
});