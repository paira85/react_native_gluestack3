// app/settings.tsx
import { View, Text } from 'react-native';

export default function About() {
  return (
    <View style={{ flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 20 }}>설정 화면입니다</Text>
    </View>
  );
}