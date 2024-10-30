import type { PropsWithChildren } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
    useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import CanDoNavBar from './CanDoHeader';
import { AddTaskPane } from './AddTaskPane';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{}>;

export default function CanDoScrollView({
    children
}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    return (
        <ThemedView style={styles.container}>
            <CanDoNavBar />
            <Animated.ScrollView 
                ref={scrollRef} 
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollContent}
            >
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
    },
});