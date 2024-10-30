/**
 * This is the header bar that appears everywhere.
 */
import { useColorScheme, StyleSheet, View, Button } from "react-native";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { NavigationButton } from "./navigation/NavigationButton";

export default function CanDoNavBar() {
    const colorScheme = useColorScheme() ?? 'light';

    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;

    return (
        <SafeAreaView>
            <View style={[styles.navbar, colorStyles[colorScheme].navbar]}>
                <View style={styles.farLeft}>
                    <NavigationButton nameActive="calendar" nameInactive="calendar-outline" screen="/(tabs)/calendar" matchPath="/calendar" color={tint} />
                </View>
                
                <View style={styles.farRight}>
                    <NavigationButton nameActive="person" nameInactive="person-outline" screen="/(tabs)/profile" matchPath="/profile" color={tint} />
                </View>
            </View>
        </SafeAreaView>
    );
}

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

const styles = StyleSheet.create({
    navbar: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 12
    },
    farLeft: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    center: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    farRight: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 18,
    }
});