import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BeanSceneLogo from '../../../assets/images/logo/png/logo-primary-transparent.png';
import MenuItemPanel from '../../components/MenuItemPanel';
import { useOrderStore } from "../../store/OrderStore";
// import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, useLogo } from "../../context/ThemeContext";

const WaiterCreateOrdersScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const beanSceneLogo = useLogo();

    const [tableCode, setTableCode] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const sheetRef = useRef(null);
    const orderItems = useOrderStore((s) => s.currentOrderItems);
    const createOrder = useOrderStore((s) => s.createOrder);
    const removeItemFromOrder = useOrderStore((s) => s.removeItemFromOrder);
    const loading = useOrderStore((s) => s.loading);

    //TODO: add UI validation messages for the end user
    //TODO: add validation when the order has empty menu list

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Image source={beanSceneLogo} style={styles.Image} />

                <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>Create Order</Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.cancelButton, { backgroundColor: theme.colors.beanGold }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.cancelText, { color: theme.colors.beanDarkBlue }]}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={() => sheetRef.current?.expand()}
                        onPress={() => navigation.navigate("MenuItemList")}
                    >
                        <View style={[styles.line, { backgroundColor: theme.colors.onSurface }]} />
                        <View style={[styles.line, { backgroundColor: theme.colors.onSurface }]} />
                        <View style={[styles.line, { backgroundColor: theme.colors.onSurface }]} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.createButton, { backgroundColor: theme.colors.beanDarkBlue }]}
                        onPress={async () => {
                            if (!tableCode.trim()) {
                                setErrorMessage('Table Code is required.');
                                return;
                            }
                            if (!orderItems || orderItems.length === 0) {
                                setErrorMessage('Add at least one item to the order.');
                                return;
                            }

                            setErrorMessage('');

                            const result = await createOrder({
                                tableCode: tableCode.trim(),
                                specialRequests: specialRequests.trim(),
                                notes: notes.trim(),
                                dateTime: new Date().toISOString(),
                                status: "in-progress",
                            });

                            if (result) navigation.goBack();
                            else setErrorMessage('Unable to create order. Please try again.');
                        }}
                        disabled={loading}
                    >
                        <Text style={[styles.createText, { color: theme.colors.white }]}>Create</Text>
                    </TouchableOpacity>
                </View>

                {errorMessage ? (
                    <Text style={[styles.errorText, { color: theme.colors.beanDarkGold }]}>
                        {errorMessage}
                    </Text>
                ) : null}

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Table Code</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
                        placeholder="Input"
                        value={tableCode}
                        onChangeText={(text) => {
                            setTableCode(text);
                            if (errorMessage) setErrorMessage('');
                        }}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Special Requests</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
                        placeholder="Input"
                        value={specialRequests}
                        onChangeText={setSpecialRequests}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Notes</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
                        placeholder="Input"
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                <View style={[styles.itemsList, { backgroundColor: theme.colors.beanLightBlue }]}>
                    <Text style={[styles.itemsTitle, { color: theme.colors.white }]}>Items List</Text>

                    {orderItems?.map((i) => (
                        <View key={i.menuItem._id} style={[styles.orderItemRow, { backgroundColor: theme.colors.surface }]}>
                            <Text style={{ color: theme.colors.onSurface }}>{i.menuItem.name}</Text>
                            <Text style={{ color: theme.colors.onSurface }}>Qty: {i.quantity}</Text>

                            <TouchableOpacity
                                style={[styles.removeButton]}
                                onPress={() => removeItemFromOrder(i.menuItem._id)}
                            >
                                <Text style={[styles.removeText, { color: theme.colors.white }]}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* <MenuItemPanel sheetRef={sheetRef} /> */}
        </View>
    );
};

export default WaiterCreateOrdersScreen;

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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
        minWidth: 250,
    },

    cancelButton: {
        backgroundColor: '#d4af37',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    cancelText: {
        color: '#000',
        fontSize: 32,

    },
    menuIconButton: {
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignContent: "center",
        // height: 30,
        padding: 10,

    },
    line: {
        width: 50,
        height: 6,
        backgroundColor: '#000',
        borderRadius: 2,
        marginHorizontal: 50,
        marginVertical: 10,

    },
    createButton: {
        backgroundColor: '#0b4d4b',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        marginVertical: 10,

    },
    createText: {
        color: '#fff',
        fontSize: 32,

    },
    inputGroup: {
        width: '90%',
        marginBottom: 15,
        alignSelf: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 22,

    },
    input: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 4,
        fontSize: 22,

    },
    itemsList: {
        width: '90%',
        backgroundColor: '#4fa3b6',
        borderRadius: 6,
        paddingVertical: 15,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 22,
    },
    itemsTitle: {
        color: '#fff',
        fontSize: 32,
    },
    itemsSubtitle: {
        color: '#fff',
        fontSize: 22,
    },
    orderItemRow: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        fontSize: 22,
    },

    removeButton: {
        backgroundColor: '#b00020',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginLeft: 10,
    },
    removeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center',
    },
});