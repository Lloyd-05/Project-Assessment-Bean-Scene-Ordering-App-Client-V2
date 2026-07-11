import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategoryStore } from '../../../store/MenuCategoryStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const MenuCategoriesListScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>Categories List</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.colors.beanDarkBlue }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.buttonText, { color: theme.colors.white }]}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: theme.colors.beanGold }]}
            onPress={() => navigation.navigate('createCategory')}
          >
            <Text style={[styles.createText, { color: theme.colors.beanDarkBlue }]}>Create New Category</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#4fa3b6" style={{ marginTop: 20 }} />}
        {error && <Text style={styles.errorText}>Error: {error}</Text>}

        <View style={styles.categoriesContainer}>
          {categories && categories.map((category, index) => (
            <View key={category._id} style={styles.categoryCard}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.categoryButtons}>
                <TouchableOpacity
                  style={[styles.updateButton, { backgroundColor: theme.colors.beanDarkBlue }]} onPress={() => {
                    setSelectedCategoryId(category._id);
                    navigation.navigate("updateCategory", { categoryId: category._id });
                  }}
                >
                  <Text style={[styles.updateText, { color: theme.colors.white }]}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: theme.colors.beanGold }]}
                  onPress={() => {
                    setSelectedCategoryId(category._id);
                    navigation.navigate("deleteCategory", { categoryId: category._id });
                  }}
                >

                  <Text style={[styles.deleteText, { color: theme.colors.beanDarkBlue }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuCategoriesListScreen;

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
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  backText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoriesContainer: {
    width: '90%',
    alignItems: 'center',
  },
  categoryCard: {
    backgroundColor: '#4fa3b6',
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  categoryName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginTop: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  deleteText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});