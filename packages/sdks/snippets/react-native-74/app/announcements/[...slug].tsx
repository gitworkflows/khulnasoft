/**
 * https://www.khulnasoft.com/c/docs/integrate-section-building
 * https://www.khulnasoft.com/c/blueprints/announcement-bar
 * app/announcements/[...slug].tsx
 */
import type { KhulnasoftContent } from '@khulnasoft.com/sdk-react-native';
import { Content, fetchOneEntry } from '@khulnasoft.com/sdk-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const KHULNASOFT_API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'announcement-bar';

export default function AnnouncementScreen() {
  const [content, setContent] = useState<KhulnasoftContent | null>(null);
  const { slug } = useLocalSearchParams<{ slug: string }>();

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: KHULNASOFT_API_KEY,
      userAttributes: {
        urlPath: `/announcements/${slug}`,
      },
    })
      .then((data: KhulnasoftContent) => {
        setContent(data);
      })
      .catch((err) => console.error('Error fetching Khulnasoft Content: ', err));
  }, []);

  return (
    <View>
      {content && (
        <Content
          apiKey={KHULNASOFT_API_KEY}
          model={MODEL_NAME}
          content={content}
        />
      )}

      {/* Your content coming from your app (or also Khulnasoft) */}
      <Text>The rest of your page goes here</Text>
    </View>
  );
}
