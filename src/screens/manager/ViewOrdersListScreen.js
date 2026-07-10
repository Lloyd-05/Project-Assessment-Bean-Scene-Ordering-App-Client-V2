import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BeanSceneLogo from '../../../assets/images/logo/png/logo-primary-transparent.png';
import { useOrderStore } from "../../store/OrderStore";
import { useLogo, useTheme } from "../../context/ThemeContext";

const dateToNumber = (dateStr) => {
  const [dd, mm, yyyy] = dateStr.split('/').map(Number);
  return yyyy * 10000 + mm * 100 + dd;
};

const binarySearchOrders = (arr, targetDate) => {
  const targetNum = dateToNumber(targetDate);

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midNum = dateToNumber(arr[mid].date);

    if (midNum === targetNum) return arr[mid];
    if (midNum < targetNum) left = mid + 1;
    else right = mid - 1;
  }

  return null;
};

const ViewOrdersListScreen = () => {
  const { theme, overrideTheme } = useTheme();
  const navigation = useNavigation();
  const beanSceneLogo = useLogo();
  const orders = useOrderStore((s) => s.orders);
  const fetchCompletedOrders = useOrderStore((s) => s.fetchCompletedOrders);

  // State Variables
  const [errorMessage, setErrorMessage] = useState("");
  const [ddInput, setDdInput] = useState("");
  const [mmInput, setMmInput] = useState("");
  const [yyyyInput, setYyyyInput] = useState("");

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.dateTime).toLocaleDateString('en-GB');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const pastOrders = Object.entries(groupedOrders).map(([date, total]) => ({
    date,
    total,
  }));

  const sortedPastOrders = [...pastOrders].sort((a, b) => {
    return dateToNumber(a.date) - dateToNumber(b.date);
  });

  // 1. CLEAR HANDLER DEFINITION
  const handleClear = () => {
    setDdInput("");
    setMmInput("");
    setYyyyInput("");
    setErrorMessage("");
  };

  // 2. SEARCH HANDLER DEFINITION
  const handleSearch = async () => {
    setErrorMessage("");

    if (!ddInput || !mmInput || !yyyyInput) {
      setErrorMessage("All date fields (DD/MM/YYYY) are required.");
      return;
    }

    if (isNaN(ddInput) || isNaN(mmInput) || isNaN(yyyyInput)) {
      setErrorMessage("Date must contain numbers only.");
      return;
    }

    const dd = Number(ddInput);
    const mm = Number(mmInput);
    const yyyy = Number(yyyyInput);

    if (dd < 1 || dd > 31) {
      setErrorMessage("Day must be between 1 and 31.");
      return;
    }

    if (mm < 1 || mm > 12) {
      setErrorMessage("Month must be between 1 and 12.");
      return;
    }

    if (yyyy < 1900 || yyyy > 2100) {
      setErrorMessage("Year must be between 1900 and 2100.");
      return;
    }

    const paddedDd = ddInput.padStart(2, '0');
    const paddedMm = mmInput.padStart(2, '0');
    const searchDate = `${paddedDd}/${paddedMm}/${yyyyInput}`;

    const result = binarySearchOrders(sortedPastOrders, searchDate);

    if (!result) {
      setErrorMessage("No orders found for this date.");
    } else {
      navigation.navigate("viewOrder", { date: result.date });
    }
  };

  // 3. RENDER CONTENT
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Viewing Past Orders
          </Text>
        </View>

        <View style={styles.searchSection}>
          <Text style={[styles.searchLabel, { color: theme.colors.text }]}>
            Search Date
          </Text>

          <View style={styles.dateRow}>
            <TextInput
              style={[styles.dateInput, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
              placeholder="DD"
              value={ddInput}
              onChangeText={setDdInput}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.dateInput, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
              placeholder="MM"
              value={mmInput}
              onChangeText={setMmInput}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.dateInput, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
              placeholder="YYYY"
              value={yyyyInput}
              onChangeText={setYyyyInput}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          {errorMessage ? (
            <Text style={[styles.errorText, { color: theme.colors.beanDarkGold }]}>
              {errorMessage}
            </Text>
          ) : null}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.goBackButton, { backgroundColor: theme.colors.beanGold }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.goBackText, { color: theme.colors.beanDarkBlue }]}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.clearButton, { backgroundColor: theme.colors.beanGold }]}
              onPress={handleClear}
            >
              <Text style={[styles.clearText, { color: theme.colors.beanDarkBlue }]}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.searchButton, { backgroundColor: theme.colors.beanDarkBlue }]}
              onPress={handleSearch}
            >
              <Text style={[styles.searchText, { color: theme.colors.white }]}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {pastOrders.map((order, index) => (
          <View key={index} style={[styles.orderCard, { backgroundColor: theme.colors.beanLightBlue }]}>
            <View style={styles.orderInfo}>
              <Text style={[styles.orderDate, { color: theme.colors.white }]}>{order.date}</Text>
              <Text style={[styles.orderTotal, { color: theme.colors.white }]}>
                Total Orders Placed: {order.total}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.viewButton, { backgroundColor: theme.colors.beanDarkBlue }]}
              onPress={() => navigation.navigate('viewOrder', { date: order.date })}
            >
              <Text style={[styles.viewText, { color: theme.colors.white }]}>View</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </View>
  );
};



export default ViewOrdersListScreen;

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
    paddingBottom: 40,
    marginBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
  },
  Image: {
    marginTop: 50,
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: 'contain'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  brand: {
    fontSize: 28,
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
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchSection: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 10,
    width: '30%',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  goBackText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  clearText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4fa3b6',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    marginBottom: 10,
  },
  orderInfo: {
    flexDirection: 'column',
  },
  orderDate: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderTotal: {
    color: '#fff',
    fontSize: 16,
  },
  viewButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  viewText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
