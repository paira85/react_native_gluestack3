// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
  
//   initialRouteName: '(tabs)',
// };

import { Stack } from 'expo-router';
import { useSettlementStore } from "../../store/settlementStore";

import RootNavigation from '../navigate';
import { useEffect } from 'react';

export default function AppLayout() {
  return (
    <Stack>
       <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="about"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
