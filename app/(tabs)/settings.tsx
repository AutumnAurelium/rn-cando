import { Image, StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import CanDoScrollView from '@/components/CanDoScrollView';
import { useState } from 'react';
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors';

export default function SettingsScreen(){
  const colorScheme = useColorScheme() ?? 'light';
  const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;
  const [theme, setTheme] = useState("dark");
  const [size, setSize] = useState("regular");
  const [startDay, setStartDay] = useState("monday");
  const [infoDisplay, setInfoDisplay] = useState("location");
  const [exportFormat, setExportFormat] = useState("appleCalendar");
  const handleEditAccount = () =>{
    Alert.alert('Edit account details clicked')
  }

  const handleDeleteAccount = () =>{
    Alert.alert('Delete account clicked')
  }

  return (
    <CanDoScrollView>
      <View style = {styles.container}>
        <Text style = {styles.centerText}>Appearance</Text>

        <View style={styles.row}>
            <ThemedText style={styles.settingsName}>Theme</ThemedText>
            <Picker selectedValue={theme} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setTheme}>
                <Picker.Item label="Dark" value="dark" />
                <Picker.Item label="Light" value="light" />
            </Picker>
        </View>

        <View style={styles.row}>
            <ThemedText style={styles.settingsName}>Font Size</ThemedText>
                <Picker selectedValue={size} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setSize}>
                    <Picker.Item label="Small" value="small" />
                    <Picker.Item label="Regular" value="regular" />
                    <Picker.Item label="Large" value="large" />
                </Picker>
        </View>

        <Text style = {styles.centerText}>Calendar</Text>

        <View style={styles.row}>
            <ThemedText style={styles.settingsName}>Week Start Day</ThemedText>
                <Picker selectedValue={startDay} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setStartDay}>
                    <Picker.Item label="Sunday" value="sunday" />
                    <Picker.Item label="Monday" value="Monday" />
                    <Picker.Item label="Saturday" value="saturday" />
                </Picker>
        </View>

        <View style={styles.row}>
            <ThemedText style={styles.settingsName}>Info Display</ThemedText>
                <Picker selectedValue={infoDisplay} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setInfoDisplay}>
                    <Picker.Item label="Location" value="location" />
                    <Picker.Item label="Due Date" value="dueDate" />
                    <Picker.Item label="Description" value="description" />
                </Picker>
        </View>

        <View style={styles.row}>
            <ThemedText style={styles.settingsName}>Export Format</ThemedText>
                <Picker selectedValue={exportFormat} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setExportFormat}>
                    <Picker.Item label="Outlook" value="outlook" />
                    <Picker.Item label="Apple Calendar" value="appleCalendar" />
                    <Picker.Item label="Google Calendar" value="googleCalendar" />
                </Picker>
        </View>

        <Text style = {styles.centerText}>Account</Text>

        <View style = {styles.buttonRow}>
            <TouchableOpacity style = {{backgroundColor: 'grey', borderRadius:8, marginVertical: 20}} onPress = {handleEditAccount}>
                <Text style = {styles.buttonText}> Edit Account Details </Text>
            </TouchableOpacity>
        </View>

        <View style = {styles.buttonRow}>
            <TouchableOpacity style = {{backgroundColor: 'red', borderRadius: 8}} onPress = {handleDeleteAccount}>
                <Text style = {styles.buttonText}> Delete Account </Text>
            </TouchableOpacity>
        </View>
      </View>
    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({

  centerText: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
    marginVertical: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0
  },
  dropdown: {
    color: 'white',
    flexShrink: 1,
    flexGrow: 1,
    height: 90
  },
  dropdownItem: {
    color: 'white',
    fontSize: 20,
    height: 90
  },
  settingsName: {
    marginRight: 10,
    color: 'white',
    fontSize: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 24
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

});
