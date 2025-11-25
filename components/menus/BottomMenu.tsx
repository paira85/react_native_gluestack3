import React from 'react'
import { Box } from '../ui/box'
import { Text, View } from 'react-native'
import { Image } from '@/components/ui/image';

export default function BottomMenu() {
    const placeholder = (w, h) => ({ uri: `https://via.placeholder.com/${w}x${h}.png?text=IMG` });

  return (
     <Box className="flex flex-row justify-items-stretch bg-primary-500 pb-10">
        {/* HOME */}
        <View className="flex-1 items-center justify-center">
            {/* <Image source={placeholder(50, 50)} className="w-8 h-8" alt="BOTTOMHOME" /> */}
            <Text className="text-green-600 mt-1 font-bold">HOME</Text>
        </View>

        {/* TAXI */}
        <View className="flex-1 items-center">
            {/* <Image source={placeholder(50, 50)} className="w-8 h-8" alt="BOTTOMTAXI" /> */}
            <Text className="text-green-600 mt-1 font-bold">TAXI</Text>
        </View>

        {/* MAP */}
        <View className="flex-1 items-center">
            {/* <Image source={placeholder(50, 50)} className="w-8 h-8" alt="BOTTOMMAP"/> */}
            <Text className="text-green-600 mt-1 font-bold">MAP</Text>
        </View>

        {/* MY */}
        <View className="flex-1 items-center">
            {/* <Image source={placeholder(50, 50)} className="w-8 h-8" alt="BOTTOMMY"/> */}
            <Text className="text-green-600 mt-1 font-bold">MY</Text>
        </View>

        {/* MENU */}
        <View className="flex-1 items-center">
            {/* <Image source={placeholder(50, 50)} className="w-8 h-8" alt="BOTTOMMENU"/> */}
            <Text className="text-green-600 mt-1 font-bold">MENU</Text>
        </View>
        </Box>
  )
}
