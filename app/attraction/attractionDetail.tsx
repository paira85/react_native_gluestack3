import ServicesCard from "@/components/service/ServiceCard";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
// import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import {
  ArrowLeftIcon
} from 'lucide-react-native';
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AttractionDetailScreen({ }: any) {
  const navigation = useNavigation();
  const { item } = useRoute().params;
  // const route = useRoute();

  // const item = route.params?.item;
  console.log('item ', item)

  return (
    <SafeAreaView className="bg-white flex-1" >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <Pressable className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white justify-center items-center z-20"
          onPress={() => {
            navigation.goBack()
          }}>
          <Icon as={ArrowLeftIcon} />
        </Pressable>
        <Box className="w-full h-full relative ">
          {/* 넣고 안넣고 차이 */}
          {/* <Box className="w-full  h-full  relative ">  */}

          <View className="relative">
            <Image
              source={item.image}
              className="w-full min-h-[400px] max-h-[600px] h-[600px]"
              resizeMode="cover"
            />
          </View>

          <View className="px-6 py-5">
            <Text className="text-3xl font-bold text-black">{item.title}</Text>
            <Text className="text-gray-600 text-base mt-1">{item.location}</Text>

            <View className="flex-row items-center mt-3">
              <Text className="text-yellow-400 text-2xl mr-1">★</Text>
              <Text className="text-gray-700 text-lg">{item.like}</Text>
            </View>

            <Text className="text-gray-700 text-base mt-4 leading-6">
              {item.description}
            </Text>

            <Divider className="my-5 bg-gray-200" />

            <Box className="flex-row mt-4 ">
              <Pressable
                className="flex-1 bg-blue-700 py-3 rounded-xl mr-3  items-center"
                onPress={() =>
                  Linking.openURL(
                    "https://map.kakao.com/link/search/전은경서프스쿨"
                  )
                }
              >
                <Ionicons name="location" size={18} className="text-center text-yellow-300" />
                <Text className="text-white text-center font-semibold">길찾기</Text>
              </Pressable>
            </Box>
            {/* 액션버튼 */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("attraction/attractionList", {})

              }
              className="mt-7 py-3 bg-green-600 rounded-xl"
            >
              <Text className="text-center text-white font-semibold text-lg">
                뒤로가기
              </Text>
            </TouchableOpacity>
          </View>

          {/* 제공 서비스 카드 */}
          <ServicesCard services={null} />

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
