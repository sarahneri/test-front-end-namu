
import React from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>SEU ESPAÇO DE BEM-ESTAR</Text>
          <Text style={styles.heading}>Olá, Ana 👋</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroKicker}>UM MOMENTO PARA VOCÊ</Text>
        <Text style={styles.heroTitle}>Respire fundo.{ '\n' }Encontre seu equilíbrio.</Text>
        <Text style={styles.heroDescription}>Práticas simples para cuidar do corpo e da mente.</Text>
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>Começar prática  →</Text>
        </Pressable>
        <Text style={styles.sun}>☼</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore práticas</Text>
        <Text style={styles.seeAll}>Ver todas</Text>
      </View>
      <View style={styles.categoryRow}>
        <Pressable style={[styles.category, styles.relax]}>
          <Text style={styles.categoryIcon}>🌿</Text>
          <Text style={styles.categoryTitle}>Relaxar</Text>
          <Text style={styles.categoryCaption}>10–20 min</Text>
        </Pressable>
        <Pressable style={[styles.category, styles.energy]}>
          <Text style={styles.categoryIcon}>☀️</Text>
          <Text style={styles.categoryTitle}>Energizar</Text>
          <Text style={styles.categoryCaption}>15–30 min</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recomendado para você</Text>
      </View>
      <Pressable style={styles.lesson}>
        <View style={styles.lessonArtwork}><Text style={styles.lessonEmoji}>🧘</Text></View>
        <View style={styles.lessonDetails}>
          <Text style={styles.lessonTitle}>Yoga para iniciantes</Text>
          <Text style={styles.lessonCaption}>Com Marina Costa  ·  20 min</Text>
        </View>
        <Text style={styles.play}>▶</Text>
      </Pressable>
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF8F2' },
  content: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  kicker: { color: '#849087', fontSize: 10, fontWeight: '700', letterSpacing: 1.1 },
  heading: { color: '#263D32', fontSize: 26, fontWeight: '700', marginTop: 6 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E7EBDD', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#385747', fontSize: 17, fontWeight: '700' },
  hero: { minHeight: 248, borderRadius: 24, backgroundColor: '#345A49', padding: 22, justifyContent: 'center', overflow: 'hidden' },
  heroKicker: { color: '#D5E0C8', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  heroTitle: { color: '#FFFDF7', fontSize: 26, lineHeight: 33, fontWeight: '700', marginTop: 12 },
  heroDescription: { color: '#E0E7DB', fontSize: 13, marginTop: 8, maxWidth: 250 },
  button: { alignSelf: 'flex-start', backgroundColor: '#E4E9D5', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14, marginTop: 18 },
  buttonText: { color: '#294638', fontSize: 13, fontWeight: '700' },
  sun: { position: 'absolute', right: 12, top: 8, color: 'rgba(255,255,255,0.12)', fontSize: 105 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 14 },
  sectionTitle: { color: '#263A31', fontSize: 18, fontWeight: '700' },
  seeAll: { color: '#66816F', fontSize: 12, fontWeight: '600' },
  categoryRow: { flexDirection: 'row', gap: 12 },
  category: { flex: 1, minHeight: 132, borderRadius: 20, padding: 16, justifyContent: 'center' },
  relax: { backgroundColor: '#E8EEE3' },
  energy: { backgroundColor: '#F3EBDD' },
  categoryIcon: { fontSize: 23, marginBottom: 8 },
  categoryTitle: { color: '#2C4337', fontSize: 15, fontWeight: '700' },
  categoryCaption: { color: '#7B887D', fontSize: 11, marginTop: 4 },
  lesson: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 18, padding: 13, borderWidth: 1, borderColor: '#F0EEE7' },
  lessonArtwork: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#F2EDE3', alignItems: 'center', justifyContent: 'center' },
  lessonEmoji: { fontSize: 23 },
  lessonDetails: { flex: 1, marginLeft: 12 },
  lessonTitle: { color: '#2B4035', fontSize: 13, fontWeight: '700' },
  lessonCaption: { color: '#899189', fontSize: 10, marginTop: 5 },
  play: { color: '#54735F', fontSize: 14, marginHorizontal: 7 },
});
