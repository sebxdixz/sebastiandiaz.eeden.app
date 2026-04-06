import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Video } from 'expo-av';
import { Project } from '../constants/projects';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

export default function ProjectCard({ project, isActive }: ProjectCardProps) {
  const videoRef = React.useRef<Video>(null);
  const [isMuted] = useState(true);
  const scaleValue = useSharedValue(1);

  React.useEffect(() => {
    if (isActive) {
      videoRef.current?.playAsync();
      scaleValue.value = withTiming(1, { duration: 300 });
    } else {
      videoRef.current?.pauseAsync();
      scaleValue.value = withTiming(0.95, { duration: 300 });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }]
  }));

  return (
    <Animated.View
      style={[styles.card, animatedStyle]}
    >
      {/* Video Background */}
      {project.videoUrl && (
        <Video
          ref={videoRef}
          source={{ uri: project.videoUrl }}
          style={styles.video}
          isLooping
          isMuted={isMuted}
          shouldPlay={false}
          useNativeControls={false}
          rate={1.0}
          progressUpdateIntervalMillis={1000}
        />
      )}

      {/* Overlay with content */}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>

          {/* Tech Stack */}
          <View style={styles.techStack}>
            {project.techs.map((tech, idx) => (
              <View key={idx} style={styles.techTag}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>

          {/* CTA Button */}
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>View Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 500,
    backgroundColor: '#000000',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000000'
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 32
  },
  content: {
    width: '100%'
  },
  projectName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12
  },
  projectDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 20
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24
  },
  techTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },
  techText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000'
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center'
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000'
  }
});
