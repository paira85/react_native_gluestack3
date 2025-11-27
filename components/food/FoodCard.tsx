import { Icon } from '@/components/ui/icon';
import React from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Image } from '../ui/image';
import { Image } from 'react-native';
const screenWidth = Dimensions.get('window').width;


export default function FoodCard() {
    const imageUrls1=[
        require("/assets/images/house/01/1.png"),
        require("/assets/images/house/01/2.png"),
        require("/assets/images/house/01/3.png"),
    ]

    return (
        <View className="mb-3">
            {/* 숙박유형 */}
            <View className="mt-6  flex-1">
                <Text className="text-sm font-semibold mb-2">음식점유형</Text>
                <View className="flex-row gap-2">
                    {["커피","베이커리","펌"].map((label, idx) => {
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
                
            <View className="mb-3">
                {/* CARD (숙소 1개 예시) */}
                <View className="mt-6 rounded-2xl bg-white shadow-sm">
                    
                    <View className="px-4 py-4">
                        <Text className="text-base mb-1 font-semibold">휴백담 베이커리 카페 강원도 인제 본점</Text>
                        <View className="flex-row items-center mt-2">
                            <Text className="text-base">카페,디저트</Text>
                            <Text className="text-sm text-gray-500 mt-1 ml-auto">영업중</Text>
                        </View>
                        <Text className="text-sm text-gray-500 mt-1">넓은 매장에서 여유롭게 즐기는 시간</Text>
                    
                        {/* 이미지영역 */}
                        <View className=''>
                            <Image
                                source={require("/assets/images/food/01/1.png")}
                                style={{ height: 20, width: screenWidth - 20}}
                                resizeMode="cover"
                                className="h-[20px]"                                
                            />
                        </View>
                    </View>

                    <View className="px-4 py-4">
                        <View className="flex-row items-center mt-2 ">
                            <Text className="font-bold text-xs">☆4.59</Text>
                            <Text className="text-xs font-bold ml-auto">리뷰 555</Text>
                        </View>
                        <View>
                            <Text className="font-semibold text-xs">리뷰 작성중입니다.</Text>
                        </View>
                    </View>
                </View>

                <View className="mt-6 rounded-2xl bg-white shadow-sm">
                    <View className="px-4 py-4">
                        <Text className="text-base mb-1 font-semibold">백담문스카페카페</Text>
                        <View className="flex-row items-center mt-2">
                            <Text className="text-base">카페,디저트</Text>
                            <Text className="text-sm text-gray-500 mt-1 ml-auto">영업중</Text>
                        </View>
                        <Text className="text-sm text-gray-500 mt-1">커피와 쿠키가 맛있는 카페</Text>

                    </View>
                    {/* 이미지영역 */}
                    <View>
                        <Image
                            source={require("/assets/images/food/02/4.png")}
                            className="rounded-xl w-full h-full"
                            style={{ height: 200, width: screenWidth - 20 }}
                            resizeMode="cover"
                        />
                    </View>

                    <View className="px-4 py-4">
                        <View className="flex-row items-center mt-2">
                            <Text className="font-bold text-xs">☆4.59</Text>
                            <Text className="text-xs font-bold ml-auto">리뷰 555</Text>
                        </View>
                        <View>
                            <Text className="text-gray-500 text-xs  mt-1">진한 쌍화차의 힐링 한 잔</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
