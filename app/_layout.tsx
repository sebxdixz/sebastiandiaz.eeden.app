import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar barStyle="dark-content" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
