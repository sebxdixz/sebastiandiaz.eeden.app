import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import StackCarousel from '../src/components/StackCarousel';
import ProjectsGrid from '../src/components/ProjectsGrid';
import LabSection from '../src/components/LabSection';
import { TRANSLATIONS, Lang } from '../src/constants/translations';
import { PROJECTS } from '../src/constants/projects';

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/sebastiandiazti/',
  github: 'https://github.com/sebxdixz',
  email: 'sdiazdelafuente9@gmail.com',
};

const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'Roboto, Arial, sans-serif',
});
const PAGE_MIN_HEIGHT = Platform.OS === 'web' ? ('100vh' as any) : ('100%' as any);

export default function HomeScreen() {
  const [lang, setLang] = useState<Lang>('es');
  const t = TRANSLATIONS[lang];

  const openLink = (url: string) => Linking.openURL(url);
  const openEmail = () => Linking.openURL(`mailto:${SOCIAL_LINKS.email}`);

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.langBar}>
        {(['es', 'en', 'de'] as Lang[]).map((l) => (
          <TouchableOpacity
            key={l}
            onPress={() => setLang(l)}
            style={[styles.langButton, lang === l && styles.langButtonActive]}
          >
            <Text style={[styles.langText, lang === l && styles.langTextActive]}>
              {l.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.header}>
        <Text style={styles.name}>Sebastian Diaz</Text>
        <Text style={styles.role}>{t.role}</Text>
        <Text style={styles.bio}>{t.bio}</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink(SOCIAL_LINKS.linkedin)}
          >
            <Text style={styles.socialText}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink(SOCIAL_LINKS.github)}
          >
            <Text style={styles.socialText}>GitHub</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={openEmail}
          >
            <Text style={styles.socialText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.carouselSection}>
        <StackCarousel lang={lang} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.featuredProjects}</Text>
        <ProjectsGrid projects={PROJECTS} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.theLab}</Text>
        <LabSection />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => openLink(SOCIAL_LINKS.linkedin)}>
            <Text style={styles.footerLink}>LinkedIn</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}> · </Text>
          <TouchableOpacity onPress={() => openLink(SOCIAL_LINKS.github)}>
            <Text style={styles.footerLink}>GitHub</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}> · </Text>
          <TouchableOpacity onPress={openEmail}>
            <Text style={styles.footerLink}>{SOCIAL_LINKS.email}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>{t.rights}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  pageContent: {
    minHeight: PAGE_MIN_HEIGHT,
  },
  langBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 8,
  },
  langButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
  },
  langButtonActive: {
    backgroundColor: '#000000',
  },
  langText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  name: {
    fontFamily: FONT_FAMILY,
    fontSize: 48,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 8,
  },
  role: {
    fontFamily: FONT_FAMILY,
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  bio: {
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 30,
    maxWidth: 720,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 6,
  },
  socialText: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: 20,
  },
  carouselSection: {
    minHeight: 650,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 40,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLink: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  footerDot: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    color: '#000000',
  },
  footerText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    color: '#000000',
  },
});
