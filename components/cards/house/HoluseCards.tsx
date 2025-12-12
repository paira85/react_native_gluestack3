import { Icon } from '@/components/ui/icon';
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import HouseImage from './HouseImage';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function HoluseCards() {
    const imageUrls1=[
        require("/assets/images/house/01/1.png"),
        require("/assets/images/house/01/2.png"),
        require("/assets/images/house/01/3.png"),
    ]

    const imageUrls2=[
        require("/assets/images/house/02/1.png"),
        require("/assets/images/house/02/2.png"),
        require("/assets/images/house/02/3.png"),
    ]

    return (
        <View className="mb-3">
            {/* 숙박유형 */}
            <View className="mt-6 ">
                <Text className="text-sm font-semibold mb-2">숙박유형</Text>
                <View className="flex-row gap-2">
                    {["전체", "호텔/리조트", "모텔"].map((label, idx) => {
                        const selected = idx === 0;
                        return (
                            <TouchableOpacity
                                key={label}
                                className={`px-4 py-1.5 rounded-full border ${selected ? "bg-black border-black" : "border-gray-300"
                                    }`}
                            >
                                <Text className={`${selected ? "text-white" : "text-gray-700"}`}>{label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* CARD (숙소 1개 예시) */}
            
            <Pressable onPress={()=>{
                router.push({
                    pathname: "/house/HouseDetail",
                    params: { id: 1 },
                })
            }}>
            <View className="mt-6 rounded-2xl bg-white shadow-sm ">
                {/* 이미지영역 */}
                <HouseImage urls={imageUrls1}/>

                <View className="px-4 py-4">
                    <Text className="text-xs text-gray-500 mb-1">펜션/풀빌라</Text>
                    <Text className="text-base font-semibold">양양 티미하우스 펜션</Text>
                    <Text className="text-sm text-gray-500 mt-1">217.7km</Text>

                    <View className="flex-row items-center mt-2">
                        <Text className="text-red-500 font-bold text-lg">79%</Text>
                        <Text className="line-through text-gray-400 text-xs ml-2">210,000원</Text>
                        <Text className="text-lg font-bold ml-auto">45,000원</Text>
                    </View>
                </View>

                {/* 하트 */}
                <TouchableOpacity className="absolute right-4 top-4">
                    <Icon />
                </TouchableOpacity>
            </View>
            </Pressable>
            <Pressable onPress={()=>{
                router.push({
                    pathname: "/house/HouseDetail",
                    params: { id: 2 },
                })
            }}>
                <View className="mt-6 rounded-2xl bg-white shadow-sm ">
                    {/* 이미지영역 */}
                    <HouseImage urls={imageUrls2}/>

                    <View className="px-4 py-4">
                        <Text className="text-xs text-gray-500 mb-1">펜션/풀빌라</Text>
                        <Text className="text-base font-semibold">양양 티미하우스 펜션</Text>
                        <Text className="text-sm text-gray-500 mt-1">217.7km</Text>

                        <View className="flex-row items-center mt-2">
                            <Text className="text-red-500 font-bold text-lg">79%</Text>
                            <Text className="line-through text-gray-400 text-xs ml-2">210,000원</Text>
                            <Text className="text-lg font-bold ml-auto">45,000원</Text>
                        </View>
                    </View>


                    {/* 하트 */}
                    <TouchableOpacity className="absolute right-4 top-4">
                        <Icon />
                    </TouchableOpacity>
                </View>
            </Pressable>
        </View>
    )
}
