import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from '@/components/ui/box';

import { Divider } from '@/components/ui/divider';

import { Image } from '@/components/ui/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import * as Location from "expo-location";
import Header from '@/components/Header';
const placeholder = (w, h) =>
  ({ uri: `https://via.placeholder.com/${w}x${h}.png?text=IMG` });

export default function MainLayout() {
  return (
    <SafeAreaView className="bg-white flex-1" >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 ">
          <Header />         

          <Divider className="bg-primary-500" />

          {/* BODY */}
          <Box className="flex-1 h-full w-full px-4">
            {/* BIG BANNER */}
            <Image
              source={placeholder(50, 50)}
              className="w-full h-60"
              resizeMode="cover"
            />

            {/* Title under banner */}
            <Text className="text-center text-3xl font-bold text-gray-900 mt-4">
              Oceans Day
            </Text>
            <Text className="text-center text-gray-700 mt-2">
              양양바다 앞 웨이브웍스에서 일과 쉼{"\n"}로컬의 감성을 함께 느끼는 1박2일 리트릿
            </Text>

            {/* 슬라이더 점 */}
            <View className="flex-row justify-center mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <View
                  key={i}
                  className={`w-3 h-3 mx-1 rounded-full ${i === 1 ? "bg-blue-700" : "bg-gray-300"}`}
                />
              ))}
            </View>


            {/* 쿠폰 영역 */}
            <View className="px-4 mt-6">
              <Text className="text-xl font-bold text-blue-900">GOGO! Mr강강</Text>

              <View className="flex-row justify-between mt-4">
                <View className="border border-blue-800 rounded-xl px-5 py-4 flex-1 mr-3">
                  <Text className="text-blue-800 font-semibold">🎫 보유쿠폰 0</Text>
                </View>

                <View className="border border-blue-800 rounded-xl px-5 py-4 flex-1">
                  <Text className="text-blue-800 font-semibold">🎁 쿠폰 받기</Text>
                </View>
              </View>
            </View>
          </Box>
          <Divider className="bg-primary-500" />
          {/* 하단 큰 아이콘 메뉴 */}
          <Box className="flex flex-row justify-evenly py-4 bg-primary-500">
            {/* HOME */}
            <View className="items-center">
              <Image source={placeholder(50, 50)} className="w-8 h-8" />
              <Text className="text-green-600 mt-1 font-bold">HOME</Text>
            </View>

            {/* TAXI */}
            <View className="items-center">
              <Image source={placeholder(50, 50)} className="w-8 h-8" />
              <Text className="text-green-600 mt-1 font-bold">TAXI</Text>
            </View>

            {/* MAP */}
            <View className="items-center">
              <Image source={placeholder(50, 50)} className="w-8 h-8" />
              <Text className="text-green-600 mt-1 font-bold">MAP</Text>
            </View>

            {/* MY */}
            <View className="items-center">
              <Image source={placeholder(50, 50)} className="w-8 h-8" />
              <Text className="text-green-600 mt-1 font-bold">MY</Text>
            </View>

            {/* MENU */}
            <View className="items-center">
              <Image source={placeholder(50, 50)} className="w-8 h-8" />
              <Text className="text-green-600 mt-1 font-bold">MENU</Text>
            </View>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
