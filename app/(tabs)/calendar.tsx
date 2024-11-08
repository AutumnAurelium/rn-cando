import { Image, StyleSheet, Platform, View, TouchableOpacity, Alert, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';

// A.K.A. Task List

export default function CalendarScreen() {
    const handleJan = () => {
        Alert.alert('January Clicked')
    }
    const handleFeb = () => {
        Alert.alert('February Clicked')
    }
    const handleMar = () => {
        Alert.alert('March Clicked')
    }
    const handleApr = () => {
        Alert.alert('April Clicked')
    }
    const handleMay = () => {
        Alert.alert('May Clicked')
    }
    const handleJun = () => {
        Alert.alert('June Clicked')
    }
    const handleJul = () => {
        Alert.alert('July Clicked')
    }
    const handleAug = () => {
        Alert.alert('August Clicked')
    }
    const handleSep = () => {
        Alert.alert('September Clicked')
    }
    const handleOct = () => {
       Alert.alert('October Clicked')
    }
    const handleNov = () => {
        Alert.alert('November Clicked')
    }
    const handleDec = () => {
       Alert.alert('December Clicked')
    }

    return (
      <CanDoScrollView>
        <View style = {styles.container}>
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.button} onPress = {handleJan}>
                    <Text style = {styles.buttonText}>January</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress = {handleFeb}>
                    <Text style = {styles.buttonText}>February</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.button} onPress = {handleMar}>
                    <Text style = {styles.buttonText}>March</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress = {handleApr}>
                   <Text style = {styles.buttonText}>April</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.button} onPress = {handleMay}>
                    <Text style = {styles.buttonText}>May</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress = {handleJun}>
                    <Text style = {styles.buttonText}>June</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.button} onPress = {handleJul}>
                    <Text style = {styles.buttonText}>July</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress = {handleAug}>
                    <Text style = {styles.buttonText}>August</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.button} onPress = {handleSep}>
                    <Text style = {styles.buttonText}>September</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress = {handleOct}>
                    <Text style = {styles.buttonText}>October</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.button} onPress = {handleNov}>
                    <Text style = {styles.buttonText}>November</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress = {handleDec}>
                    <Text style = {styles.buttonText}>December</Text>
                </TouchableOpacity>
            </View>
        </View>
      </CanDoScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    button: {
        borderWidth: 2,
        height: 50,
        width: 150,
        borderColor: 'white',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
  });
  