import { Image, StyleSheet, Platform, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect, useRouter } from 'expo-router';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';

// A.K.A. Task List

export default function TasksScreen() {
  const router = useRouter();
  return (
    <CanDoScrollView>
      <ThemedText>
        <Button title="Go to Details" onPress={() => {
          router.push('/(tabs)/calendar');
        }}>

        </Button>
        <LoremIpsumGenerator paragraphs={50} />
      </ThemedText>
    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
