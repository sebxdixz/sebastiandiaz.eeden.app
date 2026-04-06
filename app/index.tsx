import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StackCarousel from '../src/components/StackCarousel';
import ProjectsGrid from '../src/components/ProjectsGrid';
import LabSection from '../src/components/LabSection';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section with Stack Carousel */}
        <View style={styles.heroSection}>
          <StackCarousel />
        </View>

        {/* Projects Grid Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          <ProjectsGrid />
        </View>

        {/* The Lab Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Lab</Text>
          <LabSection />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Sebastian Diaz. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollContent: {
    flexGrow: 1
  },
  heroSection: {
    height: 600,
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#FFFFFF'
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 40
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 12,
    color: '#000000'
  }
});
