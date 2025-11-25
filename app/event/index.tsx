import React from 'react'

import { Text, View } from 'react-native'
import { Icon } from '@/components/ui/icon';

import {
  InstagramIcon,
  FacebookIcon,
  Camera,
  MailIcon,
  ChromeIcon,
  PhoneIcon,
}
from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
export default function EventList() {
  return (
    <Box className="f-ull w-full flex-1">
       <View className="flex-row">
            <Text> 뒤로가기 </Text>
            <Text>  쿠폰 사용/예약</Text>
        </View>

        <View className="flex-row p-4 gap-4">
            <View className="border-2 p-4"><Text>관광/선물</Text></View>
            <View className="border-2 p-4"><Text>산책</Text></View>
            <View><Text>카페/펍</Text></View>
            <View><Text>음식점</Text></View>
            <View><Text>서핑</Text></View>            
            <View><Text>숙박</Text></View>      
        </View>
    </Box>
  )
}
