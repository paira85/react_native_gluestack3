import { Icon } from '@/components/ui/icon';
import React from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Image } from '../ui/image';
import { Image } from 'react-native';
const screenWidth = Dimensions.get('window').width;
// import { Food } from "../../types/Food";  // alias 사용 시
import { Food } from "@/types/Food";  // alias 사용 시

interface Props {
    food : Food;
}


export default function FoodCard({ food } : Props) {
    if (!food ) return null;
    
    return (
        <View className="mb-3 rounded-3xl mx-auto shadow-md bg-white px-3 gap-2">
            <View className="py-4 ">
                <Text className="text-base mb-1 font-semibold">{food.title}</Text>
                <View className="flex-row items-center mt-2 gap-2">                    
                    <Text className="text-base">{food.category}</Text>
                    <Text className="text-base">{food.coupon ? `(쿠폰 ${food.coupon}%)` : null}</Text>
                    <Text className="text-sm text-gray-500 mt-1 ml-auto">{food.status}</Text>
                </View>
                <Text className="text-sm text-gray-500 mt-1">{food.desc}</Text>
            </View>
            {/* 이미지영역 */}
            <View>
                <Image
                    source={food.img}
                    className="rounded-xl w-full h-full"
                    style={{ height: 200, width: screenWidth - 20 }}
                    resizeMode="cover"
                />
            </View>

            <View className="px-4 py-4">
                <View className="flex-row items-center mt-2">
                    <Text className="font-bold text-xs">☆ {food.star}</Text>
                    <Text className="text-xs font-bold ml-auto">리뷰 {food.review}</Text>
                </View>
                <View>
                    <Text className="text-gray-500 text-xs  mt-1"> {food.answer}</Text>
                </View>
            </View>
        </View>        
    )
}
