import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Project } from '../constants/projects';

interface ProjectGridItemProps {
  project: Project;
}

function ProjectGridItem({ project }: ProjectGridItemProps) {
  const [isInverted, setIsInverted] = useState(false);
  const rotateValue = useSharedValue(0);

  const handlePress = () => {
    setIsInverted(!isInverted);
    rotateValue.value = withTiming(isInverted ? 0 : 180, {
      duration: 600
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateValue.value}deg` }]
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.gridItemContainer}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.gridItem,
          {
            backgroundColor: isInverted ? '#000000' : '#FFFFFF'
          },
          animatedStyle
        ]}
      >
        <Text
          style={[
            styles.gridItemTitle,
            { color: isInverted ? '#FFFFFF' : '#000000' }
          ]}
        >
          {project.name}
        </Text>
        
        {isInverted && (
          <View style={styles.gridItemDetails}>
            <Text style={styles.gridItemDesc}>{project.description}</Text>
            <View style={styles.gridItemTechs}>
              {project.techs.slice(0, 3).map((tech, idx) => (
                <Text key={idx} style={styles.gridItemTech}>
                  {tech}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

interface ProjectsGridProps {
  projects?: Project[];
}

export default function ProjectsGrid({ projects = [] }: ProjectsGridProps) {
  const gridData = projects.length > 0 ? projects : [
    {
      id: 'grid-1',
      name: 'Real-time Dashboard',
      description: 'Analytics dashboard with live data updates',
      techs: ['React', 'D3.js', 'WebSocket'],
      links: {}
    },
    {
      id: 'grid-2',
      name: 'Mobile App',
      description: 'Cross-platform mobile application',
      techs: ['React Native', 'Firebase'],
      links: {}
    },
    {
      id: 'grid-3',
      name: 'API Gateway',
      description: 'Microservices orchestration layer',
      techs: ['Node.js', 'Kubernetes', 'gRPC'],
      links: {}
    },
    {
      id: 'grid-4',
      name: 'Cloud Infrastructure',
      description: 'Serverless deployment architecture',
      techs: ['AWS', 'Lambda', 'CDK'],
      links: {}
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={gridData}
        renderItem={({ item }) => <ProjectGridItem project={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16
  },
  gridItemContainer: {
    width: itemWidth,
    height: 200,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    overflow: 'hidden'
  },
  gridItem: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000'
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center'
  },
  gridItemDetails: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 16,
    justifyContent: 'center'
  },
  gridItemDesc: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center'
  },
  gridItemTechs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  gridItemTech: {
    fontSize: 10,
    color: '#FFFFFF',
    marginRight: 4
  }
});
