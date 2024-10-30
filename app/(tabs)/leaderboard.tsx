import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';

export default function LeaderboardScreen() {
  return (
    <CanDoScrollView>
      <ThemedText>
        Hi.
      </ThemedText>
    </CanDoScrollView>
  );
}
