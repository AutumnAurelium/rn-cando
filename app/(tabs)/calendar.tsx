import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';

// A.K.A. Task List

export default function CalendarScreen() {
    return (
      <CanDoScrollView>
        <ThemedText>
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
  