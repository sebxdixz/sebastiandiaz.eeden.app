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
import {
  PROFILE_META,
  CORE_SKILLS,
  EDUCATION,
  EXPERIENCE,
  CERTIFICATIONS,
} from '../src/constants/resume';

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/sebastiandiazti/',
  github: 'https://github.com/sebxdixz',
  email: 'sdiazdelafuente9@gmail.com',
};

const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'Roboto',
});

const PAGE_MIN_HEIGHT = Platform.OS === 'web' ? ('100vh' as any) : ('100%' as any);

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

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
      <View style={styles.canvas}>
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

        <View style={styles.heroCard}>
          <View style={styles.heroGlowA} />
          <View style={styles.heroGlowB} />

          <View style={styles.identityWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SD</Text>
            </View>
            <View style={styles.identityText}>
              <Text style={styles.name}>Sebastian Diaz</Text>
              <Text style={styles.role}>{t.role}</Text>
            </View>
          </View>

          <Text style={styles.bio}>{t.bio}</Text>

          <Text style={styles.subTitle}>{t.coreSkills}</Text>
          <View style={styles.skillsRow}>
            {CORE_SKILLS.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
              </View>
            ))}
          </View>

          <View style={styles.contactGrid}>
            <Text style={styles.contactText}>{PROFILE_META.location}</Text>
            <Text style={styles.contactText}>{PROFILE_META.phone}</Text>
            <Text style={styles.contactText}>{PROFILE_META.email}</Text>
            <Text style={styles.contactText}>{PROFILE_META.academicEmail}</Text>
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialButton, styles.socialButtonPrimary]}
              onPress={() => openLink(SOCIAL_LINKS.linkedin)}
            >
              <Text style={[styles.socialText, styles.socialTextPrimary]}>LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openLink(SOCIAL_LINKS.github)}
            >
              <Text style={styles.socialText}>GitHub</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={openEmail}>
              <Text style={styles.socialText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {EDUCATION.map((item) => (
            <View key={item.institution} style={styles.resumeCard}>
              <View style={styles.resumeHeader}>
                <View style={styles.resumeHeaderMain}>
                  <Text style={styles.resumeTitle}>{item.institution}</Text>
                  <Text style={styles.resumeSubtitle}>{item.degree}</Text>
                  <Text style={styles.resumeSubtitle}>{item.title}</Text>
                </View>
                <Text style={styles.resumePeriod}>{item.period}</Text>
              </View>
              <View style={styles.bulletList}>
                {item.highlights.map((highlight) => (
                  <Bullet key={highlight} text={highlight} />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {EXPERIENCE.map((item) => (
            <View key={`${item.company}-${item.role}`} style={styles.resumeCard}>
              <View style={styles.resumeHeader}>
                <View style={styles.resumeHeaderMain}>
                  <Text style={styles.resumeTitle}>{item.role}</Text>
                  <Text style={styles.resumeSubtitle}>{item.company}</Text>
                  {item.location ? (
                    <Text style={styles.resumeSubtitle}>{item.location}</Text>
                  ) : null}
                </View>
                <Text style={styles.resumePeriod}>{item.period}</Text>
              </View>
              <View style={styles.bulletList}>
                {item.highlights.map((highlight) => (
                  <Bullet key={highlight} text={highlight} />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.certifications}</Text>
          <View style={styles.resumeCard}>
            {CERTIFICATIONS.map((cert, index) => (
              <View
                key={`${cert.provider}-${cert.name}`}
                style={[styles.certRow, index > 0 && styles.certRowBorder]}
              >
                <View style={styles.certMain}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certProvider}>{cert.provider}</Text>
                </View>
                <Text style={styles.certPeriod}>{cert.period}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.featuredProjects}</Text>
          <View style={styles.surface}>
            <View style={styles.carouselSection}>
              <StackCarousel lang={lang} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.surface}>
            <ProjectsGrid projects={PROJECTS} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.theLab}</Text>
          <View style={styles.surface}>
            <LabSection />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => openLink(SOCIAL_LINKS.linkedin)}>
              <Text style={styles.footerLink}>LinkedIn</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}> | </Text>
            <TouchableOpacity onPress={() => openLink(SOCIAL_LINKS.github)}>
              <Text style={styles.footerLink}>GitHub</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}> | </Text>
            <TouchableOpacity onPress={openEmail}>
              <Text style={styles.footerLink}>{SOCIAL_LINKS.email}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>{t.rights}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEF2FF',
  },
  pageContent: {
    minHeight: PAGE_MIN_HEIGHT,
    paddingVertical: 20,
  },
  canvas: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  langBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    gap: 8,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
  langButtonActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  langText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  langTextActive: {
    color: '#F8FAFC',
  },
  heroCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D8E1F0',
    shadowColor: '#1E293B',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  heroGlowA: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#DBEAFE',
    top: -80,
    right: -40,
  },
  heroGlowB: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EDE9FE',
    bottom: -60,
    left: -50,
  },
  identityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: FONT_FAMILY,
    fontSize: 24,
    fontWeight: '900',
    color: '#F8FAFC',
  },
  identityText: {
    flex: 1,
    minWidth: 220,
  },
  name: {
    fontFamily: FONT_FAMILY,
    fontSize: 44,
    fontWeight: '900',
    color: '#0F172A',
  },
  role: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginTop: 4,
  },
  bio: {
    marginTop: 18,
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    color: '#334155',
    lineHeight: 26,
    maxWidth: 940,
  },
  subTitle: {
    marginTop: 22,
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  skillsRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    borderWidth: 1,
    borderColor: '#D5E1F3',
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillChipText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  contactGrid: {
    marginTop: 16,
    gap: 4,
  },
  contactText: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  socialRow: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  socialButtonPrimary: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  socialText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  socialTextPrimary: {
    color: '#F8FAFC',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  resumeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1F0',
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
  },
  resumeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    flexWrap: 'wrap',
  },
  resumeHeaderMain: {
    flex: 1,
    minWidth: 240,
  },
  resumeTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  resumeSubtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2,
  },
  resumePeriod: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
    backgroundColor: '#EAF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  bulletList: {
    marginTop: 14,
    gap: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#0F172A',
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  certRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 10,
  },
  certRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  certMain: {
    flex: 1,
    minWidth: 220,
  },
  certName: {
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  certProvider: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 4,
  },
  certPeriod: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
    marginTop: 2,
  },
  surface: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E1F0',
    borderRadius: 18,
    padding: 14,
  },
  carouselSection: {
    minHeight: 620,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footer: {
    marginTop: 30,
    paddingVertical: 24,
    borderTopWidth: 1.5,
    borderTopColor: '#CBD5E1',
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  footerLink: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  footerDot: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    color: '#64748B',
  },
  footerText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    color: '#64748B',
  },
});
