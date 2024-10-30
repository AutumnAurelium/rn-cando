import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.colors.border }]
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addTask"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color} style={[styles.addTaskButton, { backgroundColor: theme.colors.border }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'podium' : 'podium-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
          tabBarButton: () => null, // Hide the calendar tab
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
          tabBarButton: () => null, // Hide the calendar tab
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 6,
    paddingBottom: 6,
    height: 80,
    backgroundColor: 'transparent'
  },
  addTaskButton: {
    position: 'absolute',
    width: '90%',
    textAlign: 'center',
    bottom: 32,
    fontSize: 64,
    height: 56,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
  }
})