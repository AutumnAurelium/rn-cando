/**
 * This is the root layout file. It defines all of the screens and the navbar.
 */
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Gets the current OS color theme string
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme; // Uses the default color scheme for that theme

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.colors.border }]
      }}>
      <Tabs.Screen
        name="index" // This matches to `app/(tabs)/index.tsx`, the home screen
        options={{
          title: '', // We don't use titles for these for a more streamlined look
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
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
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
          tabBarButton: () => null, // Hide the calendar tab on the bottom bar
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
          tabBarButton: () => null, // Hide the profile button on the bottom bar
        }}
      />
      <Tabs.Screen
        name="allTaskList"
          options={{
            title: '',
            tabBarButton: () => null, // Hide the profile button on the bottom bar
          }}
     />
     <Tabs.Screen
        name="personalTaskList"
            options={{
                title: '',
                tabBarButton: () => null, // Hide the profile button on the bottom bar
            }}
     />
     <Tabs.Screen
             name="groupDetail"
                 options={{
                     title: '',
                     tabBarButton: () => null, // Hide the profile button on the bottom bar
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
});