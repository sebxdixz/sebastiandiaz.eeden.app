import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform
} from 'react-native';

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
}

interface LabCardProps {
  repo: Repository;
  delay: number;
}

const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'Roboto, Arial, sans-serif',
});

function LabCard({ repo, delay }: LabCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <View style={[styles.card, { opacity: isVisible ? 1 : 0 }]}>
      <TouchableOpacity
        onPress={() => Linking.openURL(repo.url)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.repoName}>{repo.name}</Text>
          <Text style={styles.stars}>* {repo.stars}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {repo.description || 'No description available'}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.language}>{repo.language}</Text>
          <Text style={styles.link}>View on GitHub -></Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function LabSection() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/users/sebxdixz/repos?sort=stars&per_page=6'
      );
      const data = await response.json();

      const formattedRepos: Repository[] = data.map(
        (repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count
        })
      );

      setRepos(formattedRepos);
    } catch (error) {
      console.error('Failed to fetch repos:', error);
      setRepos([
        {
          id: '1',
          name: 'N1K70',
          description: 'AI experiments and machine learning playground',
          url: 'https://github.com/sebxdixz/n1k70',
          language: 'Python',
          stars: 42
        },
        {
          id: '2',
          name: 'Axion',
          description: 'Modern web framework',
          url: 'https://github.com/sebxdixz/axion',
          language: 'TypeScript',
          stars: 28
        },
        {
          id: '3',
          name: 'Creative Dev Tools',
          description: 'Collection of developer utilities',
          url: 'https://github.com/sebxdixz/creative-dev-tools',
          language: 'JavaScript',
          stars: 15
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {repos.map((repo, idx) => (
        <LabCard
          key={repo.id}
          repo={repo}
          delay={idx * 100}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16
  },
  loadingContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  repoName: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    flex: 1
  },
  stars: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 12
  },
  description: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    color: '#000000',
    lineHeight: 18,
    marginBottom: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#000000'
  },
  language: {
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    fontWeight: '600',
    color: '#000000'
  },
  link: {
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    fontWeight: '600',
    color: '#000000'
  }
});
