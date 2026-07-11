import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useCategoryStore } from '../../../store/MenuCategoryStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';


const CreateMenuCategoryScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();
  const { createCategory, loading } = useCategoryStore();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      setErrorMessage('Please enter a category name.');
      return;
    }

    const result = await createCategory({ name: name.trim() });
    if (result) {
      setErrorMessage('');
      navigation.goBack();
    } else {
      setErrorMessage('Failed to create category. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>Create Menu Category</Text>
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

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]} placeholder="Input"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errorMessage) {
                setErrorMessage('')
              };
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateMenuCategoryScreen;

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
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});