/**
 * Quickstart snippet
 * snippets/react-native/app/[...slug].tsx
 */
import type { KhulnasoftContent } from '@khulnasoft.com/sdk-react-native';
import { Content, fetchOneEntry } from '@khulnasoft.com/sdk-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'page';

export default function HomeScreen() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);
  const { slug } = useLocalSearchParams<{ slug: string }>();

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: KHULNASOFT_API_KEY,
      userAttributes: {
        urlPath: slug ? `/${slug}` : '/',
      },
    })
      .then((data) => {
        setContent(data);
      })
      .catch((err) => console.error('Error fetching Khulnasoft Content: ', err));
  }, []);

  return (
    <View
      style={{
        // mimick body stylesheets from the web
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {content ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Content
            apiKey={KHULNASOFT_API_KEY}
            model={MODEL_NAME}
            content={content}
          />
        </View>
      ) : (
        <Text>Not Found.</Text>
      )}
    </View>
  );
}
