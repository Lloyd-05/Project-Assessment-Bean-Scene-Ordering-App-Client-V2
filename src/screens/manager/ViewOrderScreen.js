import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BeanSceneLogo from '../../../assets/images/logo/png/logo-primary-transparent.png';
import { useOrderStore } from "../../store/OrderStore";
import { useLogo, useTheme } from "../../context/ThemeContext";

const ViewOrderScreen = () => {
const { theme, overrideTheme } = useTheme(); 
  const navigation = useNavigation();
  const route = useRoute();
  const beanSceneLogo = useLogo()

  const { date } = route.params;

  const orders = useOrderStore((s) => s.orders);

  const fetchOrders = useOrderStore((s) => s.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const ordersForDate = orders.filter(
    o => new Date(o.dateTime).toLocaleDateString('en-GB') === date
  );

  // const orders = [
  //   {
  //     id: 1,
  //     table: 'M1',
  //     timePlaced: '8:13 AM',
  //     totalValue: '$31.0',
  //     items: [
  //       { name: 'Steak Sandwich', price: '$12.0', qty: 2 },
  //       { name: 'Cappuccino', price: '$3.5', qty: 2 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     table: 'M2',
  //     timePlaced: '8:13 AM',
  //     totalValue: '$31.0',
  //     items: [
  //       { name: 'Steak Sandwich', price: '$12.0', qty: 2 },
  //       { name: 'Cappuccino', price: '$3.5', qty: 2 },
  //     ],
  //   },
  // ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.bannerTitle}>Viewing Orders</Text>
          {/* <Text style={[styles.bannerSubtitle, { color: theme.colors.onPrimary }]}>24/03/2026</Text> */}
        </View>

        <TouchableOpacity style={[styles.backButton, , { backgroundColor: theme.colors.beanDarkBlue }]}
         onPress={() => navigation.goBack()}>
          <Text style={[styles.backText, , { color: theme.colors.white}]}>Back</Text>
        </TouchableOpacity>

        {/* <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>Total Orders Placed: 50</Text>
          <Text style={styles.summaryText}>Average Completion Time (Min): 35</Text>
          <Text style={styles.summaryText}>Total Revenue: $105</Text>
        </View> */}

        {/* <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>Search Order No.</Text>
          <View style={styles.searchRow}>
            <TextInput style={styles.searchInput} placeholder="Input" />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* <View style={styles.ordersContainer}>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderTitle}>Order {order.id}</Text>
              <Text style={styles.orderDetail}>Table: {order.table}</Text>
              <Text style={styles.orderDetail}>Time Placed: {order.timePlaced}</Text>
              <Text style={styles.orderDetail}>Total Value: {order.totalValue}</Text>
              <Text style={styles.orderDetail}>Null</Text>

              {order.items.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                  {item.name} — {item.price} — Qty: {item.qty}
                </Text>
              ))}
            </View>
          ))}
        </View> */}

        <View style={styles.ordersContainer}>
          {ordersForDate.map((order) => (
            <View key={order._id} style={styles.orderCard}>
              <Text style={styles.orderTitle}>Order {order._id}</Text>
              <Text style={styles.orderDetail}>Table: {order.tableCode}</Text>
              <Text style={styles.orderDetail}>
                Time Placed: {new Date(order.dateTime).toLocaleTimeString('en-GB')}
              </Text>

              {order.menuItems.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                  {item.menuItemId.name} — Qty: {item.quantity}
                </Text>
              ))}
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
  };

export default ViewOrderScreen;

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
  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  // summary: {
  //   width: '90%',
  //   backgroundColor: '#4fa3b6',
  //   borderRadius: 6,
  //   paddingVertical: 10,
  //   marginBottom: 20,
  //   alignItems: 'center',
  // },
  summaryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
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
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 10,
    width: '60%',
    fontSize: 18,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ordersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
  orderCard: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    margin: 10,
    width: '45%',
    elevation: 3,
  },
  orderTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  orderDetail: {
    fontSize: 16,
    marginBottom: 3,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
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
