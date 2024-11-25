import { Image, StyleSheet, Platform, View, TouchableOpacity, Alert, Text, FlatList } from 'react-native';

//import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';
import { Animated } from 'react-native';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Colors} from '@/constants/Colors';
import React, { useState, useMemo, Component, FC } from 'react';
import {ITEMS} from '@/constants/testIDs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Moment from 'moment';

interface Item {
  id: string;
  title: string;
  date: string;
}

const isSameDay = (date1: string, date2: string): boolean => {
  return Moment(date1).isSame(Moment(date2), 'day');
};


export default function CalendarScreen() {
    
    const [selected, setSelected] = useState<string>(Moment().format('YYYY-MM-DD'));
    
    const Item: FC<{ title: string }> = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const markedDates = ITEMS.reduce((acc, item) => {
      acc[item.date] = { marked: true }; // Mark the date for each item in the array
      return acc;
    }, {} as { [key: string]: { marked: boolean } });

    return (
      <>
        <StatusBar style="dark" />
        <SafeAreaProvider style={styles.safeAreaView}>
          <SafeAreaView style={styles.safeAreaView}>
            <Agenda
              //selected={new Date()}
              selected={selected}
              onDayPress={(day: {dateString: string}) => setSelected(day.dateString)}
              renderList={() => {
                return (
                  <FlatList
                    data={ITEMS.filter(item => isSameDay(item.date, selected))}
                    renderItem={({ item }: { item: Item }) => <Item title={item.title} />}
                    keyExtractor={(item: Item) => item.id}
                    contentContainerStyle={styles.list}
                  />
                );
              }}

              showOnlySelectedDayItems = {true}
              showClosingKnob={true}
              markedDates={markedDates}
              scrollEnabled = {true}
              disabledByDefault
              // Agenda theme
              theme={{
                agendaKnobColor: '#768390',
                calendarBackground: '#2d333b',
              }}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </>
    );

      }

  
  const styles = StyleSheet.create({
    calendar:{
        borderWidth: 1,
        borderRadius: 7,
        borderColor: Colors.dark.text,
        height: 350,
    },
    container: {
        flex: 1,
        paddingTop: 30,
        padding: 5,
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
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
    customDay: {
      margin: 10,
      fontSize: 24,
      color: 'green'
    },
    dayItem: {
      marginLeft: 34
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: '#2d333b'
    },
    list: {
      backgroundColor: '#22272e',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    item: {
      backgroundColor: '#2d333b',
      paddingHorizontal: 20,
      paddingVertical: 24,
      marginVertical: 8,
      borderRadius: 8,
    },
    title: {
      fontSize: 32,
      color: '#768390',
    },
  });

  type AgendaEntry = {
    name: string;
    height: number;
    day: string;
  }
  
  type AgendaSchedule = {
    [date: string]: AgendaEntry[];
  }
  
  type DateData = {
    year: number;
    month: number;
    day: number;
    timestamp: number;
    dateString: string;
  };

  type ItemType = {
    id: string; // `id` must be a string because it's used as the key
    date: Date;
    title: string; // `title` is the property being displayed in the `Item` component
  };
  //const themes = ThemedView.create