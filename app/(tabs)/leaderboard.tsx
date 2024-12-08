import { Image, StyleSheet, View, Text, FlatList, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { Colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';

import { getApp } from "firebase/app";
import { collection, addDoc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { app } from "@/app/init";
// A.K.A. Task List

const db = getFirestore(app)

export default function LeaderboardScreen() {
  useEffect(() => {
          const getGroups = collection(db, 'Groups')

          const subscribe = onSnapshot(getGroups, (querySnapshot) => {
              const addGroups = []
              querySnapshot.forEach((list) => {
                  addGroups.push({...list.data(), id: list.id})
              })
              setGroups(addGroups)
              console.log(addGroups)
          });
          return () => subscribe();
        }, []);
  const [groups, setGroups] = useState([]);
  const data = [
      {name: "Test1", score: 10},
      {name: "Test2", score: 50},
      {name: "Test3", score: 70},
      {name: "Test4", score: 25},
      {name: "Test5", score: 15},
  ]
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  const topThree = sortedData.slice(0, 3)
  const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;
  return (
    <CanDoScrollView>
    <View style={styles.row}>
                <ThemedText style={styles.settingsName}>Choose Group</ThemedText>
                    <Picker style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem}>
                         {groups.map((group) => (
                                     <Picker.Item label={group.groupName} value={group.id} />
                                     ))}
                    </Picker>
            </View>
      <View style={styles.headerRow}>
        <View style={styles.leftColumn}>
           <Text style={styles.headerText}>{topThree[1]?.name}</Text>
           <Text style={styles.two}>2</Text>
        </View>
        <View style={styles.centerColumn}>
            <Text style={styles.headerText}>{topThree[0]?.name}</Text>
            <Text style={styles.one}>1</Text>
        </View>
        <View style={styles.rightColumn}>
            <Text style={styles.headerText}>{topThree[2]?.name}</Text>
            <Text style={styles.three}>3</Text>
        </View>
      </View>
      <FlatList data={sortedData} keyExtractor={(item) => item.name} renderItem={({ item, index }) => (
          <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.rowText}>{index + 1}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.rowText}>{item.name}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.rowText}>{item.score}</Text>
            </View>
          </View>
          )}
          />
    </CanDoScrollView>
  );
}
const styles = StyleSheet.create({
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
    headerRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    leftColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7F33D',
        marginRight: 10,
    },
    two: {
        color: '#B4B0B0',
        fontSize: 75,
        textShadowColor: 'white',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    one: {
        color: '#FFD900',
        fontSize: 100,
        textShadowColor: 'white',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    three: {
        color: '#AF7543',
        fontSize: 50,
        textShadowColor: 'white',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    centerColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#39CE75',
        marginHorizontal: 10,
    },
    rightColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BF3434',
        marginLeft: 10,
    },
    column: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
        textShadowColor: 'white',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        },
    rowText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        },
    });