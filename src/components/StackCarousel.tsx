import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollViewProps
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDecay,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants/projects';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 500;
const OFFSET = 10;

export default function StackCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const isGestureActive = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onStart(() => {
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      scrollX.value = event.translationX;
    })
    .onEnd((event) => {
      const threshold = CARD_WIDTH * 0.3;

      if (event.velocityX < -500 && activeIndex < PROJECTS.length - 1) {
        // Swipe left
        scrollX.value = withDecay({
          velocity: event.velocityX,
          clamp: [-CARD_WIDTH, 0]
        });
        runOnJS(setActiveIndex)(activeIndex + 1);
      } else if (event.velocityX > 500 && activeIndex > 0) {
        // Swipe right
        scrollX.value = withDecay({
          velocity: event.velocityX,
          clamp: [0, CARD_WIDTH]
        });
        runOnJS(setActiveIndex)(activeIndex - 1);
      } else {
        // Snap back
        scrollX.value = withSpring(0, {
          damping: 10,
          mass: 1,
          overshootClamping: false
        });
      }

      isGestureActive.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        {PROJECTS.map((project, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const offset = (index - activeIndex) * (CARD_HEIGHT + OFFSET);
            const translateY = interpolate(
              scrollX.value,
              [-CARD_WIDTH, 0, CARD_WIDTH],
              [offset + OFFSET, offset, offset - OFFSET],
              Extrapolate.CLAMP
            );

            const scale = interpolate(
              scrollX.value,
              [-CARD_WIDTH, 0, CARD_WIDTH],
              [0.95, 1, 0.95],
              Extrapolate.CLAMP
            );

            const opacity = interpolate(
              Math.abs(scrollX.value),
              [0, CARD_WIDTH * 0.5],
              [1, 0.7],
              Extrapolate.CLAMP
            );

            return {
              transform: [
                { translateY },
                { scale },
                { translateX: scrollX.value }
              ],
              opacity
            };
          });

          return (
            <Animated.View
              key={project.id}
              style={[styles.cardWrapper, animatedStyle]}
            >
              <ProjectCard project={project} isActive={index === activeIndex} />
            </Animated.View>
          );
        })}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  cardWrapper: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12
  }
});
