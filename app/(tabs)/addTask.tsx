import { StyleSheet, Switch, TextInput, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useState } from 'react';

// A.K.A. Task List

export default function AddTaskScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;

  const colorTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const [notifications, setNotifications] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [group, setGroup] = useState(0);

  return (
    <CanDoScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ margin: 36, alignItems: 'center' }}>
            <Ionicons name="calendar-number" color={tint} size={48} />
            <ThemedText style={{ textAlign: 'center' }}>Select Date</ThemedText>
          </View>
          <View style={{ margin: 36, alignItems: 'center' }}>
            <Ionicons name="time" color={tint} size={48} />
            <ThemedText style={{ textAlign: 'center' }}>Select Date</ThemedText>
          </View>
        </View>

        <View style={styles.labeledInputContainer}>
          <ThemedText style={styles.label}>Frequency</ThemedText>
          <Picker selectedValue={frequency} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setFrequency}>
            <Picker.Item label="Monthly" value="monthly" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Daily" value="daily" />
          </Picker>
        </View>

        <View style={styles.labeledInputContainer}>
          <ThemedText style={{verticalAlign: 'middle', flexGrow: 1}}>Notifications</ThemedText>
          <Switch trackColor={{false: colorTheme.colors.border, true: colorTheme.colors.border}} value={notifications} onChange={() => setNotifications(!notifications)} />
        </View>

        <View style={styles.labeledInputContainer}>
          <ThemedText style={styles.label}>Group</ThemedText>
          <Picker selectedValue={group} onValueChange={setGroup} 
            style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem}>
            <Picker.Item label="Personal" value={0} />
            <Picker.Item label="Test Group 1" value={1} />
            <Picker.Item label="Test Group 2" value={2} />
          </Picker>
        </View>

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
  label: {
    verticalAlign: 'middle',
    flex: 1
  },
  labeledInputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
    color: 'white',
    fontSize: 24,
    margin: 14
  },
  dropdown: {
    color: 'white',
    justifyContent: 'flex-end',
    flexShrink: 1,
    flexGrow: 1,
  },
  dropdownItem: {
    fontSize: 24
  }
});
