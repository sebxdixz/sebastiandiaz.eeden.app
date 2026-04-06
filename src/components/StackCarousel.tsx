import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants/projects';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export default function StackCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROJECTS.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Project Card */}
      <View style={styles.cardContainer}>
        <ProjectCard
          project={PROJECTS[activeIndex]}
          isActive={true}
        />
      </View>

      {/* Navigation Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, !activeIndex && styles.buttonDisabled]}
          onPress={handlePrev}
          disabled={activeIndex === 0}
        >
          <Text style={styles.buttonText}>← Previous</Text>
        </TouchableOpacity>

        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>
            {activeIndex + 1} / {PROJECTS.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            activeIndex === PROJECTS.length - 1 && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={activeIndex === PROJECTS.length - 1}
        >
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      {/* Dots Navigation */}
      <View style={styles.dots}>
        {PROJECTS.map((_, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.dot, activeIndex === idx && styles.dotActive]}
            onPress={() => setActiveIndex(idx)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 40
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 6,
    backgroundColor: '#FFFFFF'
  },
  buttonDisabled: {
    opacity: 0.3
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000'
  },
  indicator: {
    alignItems: 'center'
  },
  indicatorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000'
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    borderWidth: 1,
    borderColor: '#000000'
  },
  dotActive: {
    backgroundColor: '#000000',
    width: 10,
    height: 10,
    borderRadius: 5
  }
});
