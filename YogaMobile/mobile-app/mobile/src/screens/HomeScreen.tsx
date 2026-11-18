
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Content = {
  id: string | number;
  title: string;
  category: string;
  description: string;
};

async function getContents(): Promise<{ data: Content[] }> {
  return { data: [] };
}

export default function HomeScreen() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadContents() {
      try {
        const response = await getContents();
        setContents(response.data);
      } catch {
        setError('Não foi possível carregar os conteúdos.');
      } finally {
        setLoading(false);
      }
    }

    loadContents();
  }, []);

  if (loading) {
    return React.createElement(
      View,
      { style: styles.center },
      React.createElement(ActivityIndicator, { size: 'large' }),
      React.createElement(Text, null, 'Carregando conteúdos...'),
    );
  }

  if (error) {
    return React.createElement(
      View,
      { style: styles.center },
      React.createElement(Text, null, error),
    );
  }

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Text, { style: styles.title }, 'Yoga & Bem-estar'),
    React.createElement(FlatList<Content>, {
      data: contents,
      keyExtractor: item => String(item.id),
      ListEmptyComponent: React.createElement(
        Text,
        null,
        'Nenhum conteúdo encontrado.',
      ),
      renderItem: ({ item }) =>
        React.createElement(
          View,
          { style: styles.card },
          React.createElement(Text, { style: styles.cardTitle }, item.title),
          React.createElement(Text, null, item.category),
          React.createElement(Text, null, item.description),
        ),
    }),
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#263B32',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#263B32',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
