import { Icon } from '@/components/ui/icon';
import React from 'react'
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Image } from '../ui/image';
import { Image } from 'react-native';
// import { Image } from 'expo-image'
const screenWidth = Dimensions.get('window').width;
// import { Food } from "../../types/Food";  // alias 사용 시
import { Food } from "@/types/Food";  // alias 사용 시
import { router } from 'expo-router';

interface Props {
    food: Food;
}

export default function FoodCard({ food }: Props) {
    if (!food) return null;

    return (
        <Pressable key={1} onPress={() =>
            router.push({
                pathname: "/food",
                params: { item: JSON.stringify({}) },
            })
        }
        >
            <View className="mb-3 rounded-2xl shadow-md bg-white gap-1 py-2 px-2">
                <View className="py-4">
                    <Text className="text-base mb-1 font-semibold">{food.title}</Text>
                    <View className="flex-row items-center mt-2 gap-2">
                        <Text className="text-base  text-gray-500">{food.category}</Text>
                        <Text className="text-base">{food.coupon ? `(쿠폰 ${food.coupon}%)` : null}</Text>
                        <Text className="text-sm text-gray-500 mt-1 ml-auto">{food.status}</Text>
                    </View>
                    <Text className="text-sm text-gray-500 mt-1 text-[#f5683c] font-semibold">{food.desc}</Text>
                </View>
                {/* 이미지영역 */}
                <View className="rounded-xl bg-gray-100">
                    <Image
                        source={food.img}
                        className="rounded-xl w-full h-full min-w-[350px]"
                        style={{ height: 200, width: screenWidth - 15 }}
                        resizeMode="cover"
                    />
                </View>

                <View className="rounded-xl w-full py-3  bg-gray-100">
                    <View className="flex-row items-center mt-2">
                        <Text className="font-bold text-xs">☆ {food.star}</Text>
                        <Text className="text-xs font-bold ml-auto">리뷰 {food.review}</Text>
                    </View>
                    <View>
                        <Text className="text-gray-500 text-xs mt-1"> {food.answer}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
