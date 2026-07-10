import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/AuthStore';

export default function OfflineBanner() {
    const apiOnline = useAuthStore((s) => s.apiOnline);
    const checkApiStatus = useAuthStore((s) => s.checkApiStatus);
    console.log("apiOnline =", apiOnline);

    useEffect(() => {
        checkApiStatus();

        const interval = setInterval(
            () => {
                checkApiStatus();
            },
            5000);

        return () => clearInterval(interval);

    }, []);

    console.log("apiOnline =", apiOnline);


    if (apiOnline) {

        return null; // Hide banner when API is online
    }
    return (
        <View style={styles.banner}>
            <Text style={styles.text}>You are currently offline</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#b00020',
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
});