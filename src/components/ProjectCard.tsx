import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking
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

  const isAIAgent = project.techs.some(tech =>
    tech.toLowerCase().includes('ai') ||
    tech.toLowerCase().includes('agent') ||
    tech.toLowerCase().includes('claude')
  );

  const primaryLink =
    project.links.website ||
    project.links.demo ||
    project.links.github;

  const handleViewProject = () => {
    if (primaryLink) {
      Linking.openURL(primaryLink);
    }
  };

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
          <View style={styles.headerRow}>
            <Text style={styles.projectName}>{project.name}</Text>
            {isAIAgent && (
              <View style={styles.agentBadge}>
                <Text style={styles.agentBadgeText}>🤖 AI Agent</Text>
              </View>
            )}
          </View>
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
          {primaryLink && (
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={handleViewProject}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaText}>
                {project.links.website || project.links.demo ? 'Visit' : 'View on GitHub'} →
              </Text>
            </TouchableOpacity>
          )}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12
  },
  projectName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1
  },
  agentBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  agentBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000000'
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
