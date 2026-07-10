import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Dropdown } from 'react-native-element-dropdown';
import { useOrderStore } from "../store/OrderStore";
import { useMenuItemStore } from "../store/MenuItemStore";


export default function MenuItemPanel({ sheetRef }) {
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [quantities, setQuantities] = useState({});

    const addItemToOrder = useOrderStore((s) => s.addItemToOrder);
    const menuItems = useMenuItemStore((s) => s.menuItems);
    const fetchMenuItems = useMenuItemStore((s) => s.fetchMenuItems);

    useEffect(() => { fetchMenuItems(); }, [fetchMenuItems]);

    const getItemKey = (item, index) => item._id || `${item.name}-${index}`;
    const getQuantityForItem = (item, index) => {
        const key = getItemKey(item, index);
        return quantities[key] ?? 1;
    };

    const setQuantityForItem = (item, index, value) => {
        const key = getItemKey(item, index);
        setQuantities((prev) => ({
            ...prev,
            [key]: Math.max(1, value),
        }));
    };

    const categories = [
        { label: 'Entrees', value: 'entrees' },
        { label: 'Mains', value: 'mains' },
        { label: 'Specials', value: 'specials' },
        { label: 'Sides', value: 'sides' },
        { label: 'Desserts', value: 'desserts' },
        { label: 'Drinks', value: 'drinks' },
    ];

    return (
        <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            backgroundStyle={{ backgroundColor: '#4fa3b6' }}
            handleIndicatorStyle={{ backgroundColor: '#d4af37' }}
            onChange={(index) => console.log(index)}
        >
            <ScrollView>
                <View style={styles.panelContainer}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => sheetRef.current?.close()}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchRow}>
                        <Dropdown
                            style={styles.dropdown}
                            data={categories}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Category"
                            value={category}
                            onChange={(name) => setCategory(name.value)}
                        />

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Item Name"
                            value={name}
                            onChangeText={setName}
                        />

                        <TouchableOpacity style={styles.clearButton} onPress={() => { setCategory(''); setName(''); }}>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.searchButton}>
                            <Text style={styles.searchText}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.itemsContainer}>
                        {menuItems.map((item, index) => {
                            const itemQuantity = getQuantityForItem(item, index);

                            return (
                                <View key={getItemKey(item, index)} style={styles.itemCard}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>Price: {item.price}</Text>
                                    <Text style={styles.itemDescription}>Description: {item.description}</Text>
                                    <Text style={styles.itemCategory}>
                                        Category: {item.category?.name || item.category}
                                    </Text>
                                    <Text style={styles.itemDietary}>Dietary Flags: {item.dietaryFlags?.join(', ') || item.dietaryFlags}</Text>
                                    <Text style={styles.itemAvailability}>Availability: {String(item.Availability ?? item.availability)}</Text>

                                    <View style={styles.quantityRow}>

                                        <TouchableOpacity
                                            style={styles.qtyButton}
                                            onPress={() => setQuantityForItem(item, index, itemQuantity - 1)}
                                        >
                                            <Text style={styles.qtyButtonText}>−</Text>
                                        </TouchableOpacity>

                                        <TextInput
                                            style={styles.quantityInput}
                                            keyboardType="numeric"
                                            value={String(itemQuantity)}
                                            onChangeText={(text) => setQuantityForItem(item, index, parseInt(text, 10) || 1)}
                                        />

                                        <TouchableOpacity
                                            style={styles.qtyButton}
                                            onPress={() => setQuantityForItem(item, index, itemQuantity + 1)}
                                        >
                                            <Text style={styles.qtyButtonText}>+</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => {
                                                console.log("ADDING ITEM:", item, itemQuantity)
                                                addItemToOrder(item, itemQuantity)
                                            }}                                            
                                        >
                                            <Text style={styles.addText}>Add</Text>
                                            
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>

                </View>
            </ScrollView>
        </BottomSheet >
    );
}


const styles = StyleSheet.create({
    panelContainer: {
        backgroundColor: '#4fa3b6',
        padding: 20,
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 40,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    qtyButton: {
        width: 40,
        height: 40,
        backgroundColor: '#d4af37',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },

    qtyButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },

    quantityInput: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 10,
        width: '30%',
        height: 45,
        fontSize: 16,
        padding: 10,
        marginRight: 10,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#4fa3b6', // match parent color
    },
    dropdown: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 10,
        width: '30%',
        height: 45,
    },
    searchInput: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 10,
        width: '30%',
        height: 45,
        fontSize: 16,
    },
    clearButton: {
        backgroundColor: '#d4af37',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    clearText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#0b4d4b',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    searchText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#4fa3b6',
    },
    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 10,
        margin: 10,
        width: '45%',
        elevation: 3,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 16,
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    itemCategory: {
        fontSize: 14,
        marginBottom: 3,
    },
    itemDietary: {
        fontSize: 14,
        marginBottom: 3,
    },
    itemAvailability: {
        fontSize: 14,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#0b4d4b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginLeft: 10,
    },

    addText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    closeButton: {
        backgroundColor: '#d4af37',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    closeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});