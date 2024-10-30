import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';

// A.K.A. Task List

export default function AddTaskScreen() {
  return (
    <CanDoScrollView>
      <ThemedText type='title'>
        Add Task
      </ThemedText>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your text here"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
        />
      </View>
    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
  },
});
