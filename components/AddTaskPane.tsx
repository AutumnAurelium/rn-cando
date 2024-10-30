import { useColorScheme, StyleSheet, View } from "react-native";
import { NavigationButton } from "./navigation/NavigationButton";
import { Colors } from "@/constants/Colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export function AddTaskPane() {
    const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;

    return (
        <View style={[styles.addContainer, styles.semicircleBackground, colorStyles[colorScheme].navbar]}>
            <NavigationButton nameActive="add" nameInactive="add-outline" screen="/(tabs)/calendar" matchPath="/calendar" color={tint} />
        </View>
    );
}

const styles = StyleSheet.create({
    addContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 10,
        alignItems: 'center',
    },
    semicircleBackground: {
        position: 'absolute',
        left: '40%', // Adjust this value to center the semicircle horizontally
        bottom: -32,
        width: '20%',
        height: 64, // Adjust this value to change the semicircle size
        borderTopLeftRadius: 64, // Half of the height
        borderTopRightRadius: 64, // Half of the height
        // You may want to add a shadow or border here for better visibility
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // for Android shadow
    },
});

const colorStyles = {
    light: StyleSheet.create({
        navbar: {
            backgroundColor: DefaultTheme.colors.border,
        }
    }),
    dark: StyleSheet.create({
        navbar: {
            backgroundColor: DarkTheme.colors.border,
        }
    }),
}