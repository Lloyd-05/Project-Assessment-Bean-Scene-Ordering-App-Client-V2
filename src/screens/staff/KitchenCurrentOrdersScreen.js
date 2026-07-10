import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BeanSceneLogo from '../../../assets/images/logo/png/logo-primary-transparent.png';
import { useOrderStore } from "../../store/OrderStore";
import { useLogo, useTheme } from "../../context/ThemeContext";

const KitchenCurrentOrdersScreen = () => {
    const { theme, overrideTheme } = useTheme();
    const navigation = useNavigation();
    const beanSceneLogo = useLogo()

    const localDate = new Date().toLocaleDateString('en-GB');

    const localTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });

    const AMPM = new Date().getHours() >= 12 ? 'PM' : 'AM';

    const orders = useOrderStore((s) => s.orders);
    const fetchOrders = useOrderStore((s) => s.fetchOrders);
    const markOrderComplete = useOrderStore((s) => s.updateOrder);

    const activeOrders = orders.filter(o => o.status !== "completed");

    useEffect(() => {
        fetchOrders();

        const interval = setInterval(
            () => {
                fetchOrders();
            },
            5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <Image source={beanSceneLogo} style={styles.Image} />

                <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.bannerTitle, { color: theme.colors.onPrimary }]}>Viewing Orders</Text>
                    <Text style={[styles.bannerSubtitle, { color: theme.colors.onPrimary }]}>
                        {localDate} {localTime}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.pastOrdersButton, { backgroundColor: theme.colors.beanDarkBlue }]}
                    onPress={() => navigation.navigate('pastOrdersList')}
                >
                    <Text style={[styles.buttonText, { color: theme.colors.white }]}>View Past Orders</Text>
                </TouchableOpacity>

                <View style={styles.orderGrid}>
                    {orders.length === 0 ? (
                        <Text style={[styles.emptyText, { color: theme.colors.onSurface }]}>No available orders</Text>
                    ) : (
                        activeOrders.map((order) => (
                            <View key={order._id} style={[styles.orderCard, { backgroundColor: theme.colors.surface }]}>
                                <Text style={[styles.orderTitle, { color: theme.colors.onSurface }]}>Order {order._id}</Text>
                                <Text style={{ color: theme.colors.onSurface }}>Table: {order.tableCode}</Text>
                                <Text style={{ color: theme.colors.onSurface }}>Time Placed: {new Date(order.dateTime).toLocaleTimeString('en-GB')}</Text>
                                {order.menuItems.map((item, idx) => (
                                    <Text key={idx} style={{ color: theme.colors.onSurface }}>
                                        {(item.menuItemId?.name ?? "Unknown Item")} Qty: {item.quantity}
                                    </Text>
                                ))}

                                <TouchableOpacity
                                    style={[styles.completeButton, { backgroundColor: theme.colors.beanDarkBlue }]}
                                    onPress={() => markOrderComplete(order._id, { status: 'completed' })}
                                >
                                    <Text style={[styles.completeText, { color: theme.colors.white }]}>Mark Complete</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default KitchenCurrentOrdersScreen;

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


    bodyContent: {
        alignContent: 'center',
    },
    orderGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    orderCard: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '47%', // two per row with small spacing
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    completeButton: {
        backgroundColor: '#0b4d4b',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    completeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    brand: {
        fontSize: 32,
        fontFamily: 'serif',
        color: '#0b4d4b',
        marginBottom: 20,
    },
    banner: {
        marginTop: 50,
        maxWidth: '100%',
        backgroundColor: '#4fa3b6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 25,
        width: '100%'
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        maxWidth: '100%',

    },
    bannerSubtitle: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        maxWidth: '100%',

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    pastOrdersButton: {
        backgroundColor: '#0b4d4b',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
    },
    startButton: {
        backgroundColor: '#0b4d4b',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
    },
    emptyText: {
        fontSize: 22,
        color: '#000',
        marginTop: 40,
        alignContent: 'center',
    },
});