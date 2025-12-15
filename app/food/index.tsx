import HomeTab from "@/components/cards/house/HouseHome";
import InfoTab from "@/components/cards/house/HouseInfo";
import ReviewTab from "@/components/cards/house/HouseReview";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

export default function CafeDetailScreen() {
    const [tab, setTab] = useState("메뉴");

    return (
        <View className="flex-1 bg-white">
            <ScrollView>

                {/* 상단 이미지 */}
                <View className="h-72 relative">
                    <Swiper showsPagination>
                        <Image
                            source={{ uri: "https://picsum.photos/600/400" }}
                            className="w-full h-full"
                        />
                        <Image
                            source={{ uri: "https://picsum.photos/601/400" }}
                            className="w-full h-full"
                        />
                        <Image
                            source={{ uri: "https://picsum.photos/602/400" }}
                            className="w-full h-full"
                        />
                    </Swiper>

                    {/* 뒤로가기 */}
                    <TouchableOpacity className="absolute top-12 left-4 bg-black/50 p-2 rounded-full"
                        onPress={() => {
                            // navigation.navigate("/main", {"params":{}})
                            router.push({
                                pathname: "/main",
                                params: {},
                            })
                        }}>
                        <Text className="text-white text-lg">←</Text>


                    </TouchableOpacity>

                    {/* 사진 수 */}
                    <View className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm">사진 999+</Text>
                    </View>
                </View>

                {/* 카페 정보 */}
                <View className="px-5 py-4">
                    <Text className="text-xl font-bold">커닝 대흥점</Text>
                    <Text className="text-gray-500 mt-1">
                        방문자 리뷰 1,749 · 블로그 리뷰 1,044
                    </Text>

                    <Text className="text-gray-600 mt-2">
                        원두 밸런스가 뛰어난 필터커피의 정석
                    </Text>

                    {/* 버튼 */}
                    <View className="flex-row gap-3 mt-4">
                        <TouchableOpacity className="flex-1 py-3 rounded-full bg-blue-100">
                            <Text className="text-center text-blue-600 font-semibold">출발</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 py-3 rounded-full bg-blue-600">
                            <Text className="text-center text-white font-semibold">도착</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 탭 메뉴 */}
                <View className="flex-row border-b border-gray-200">
                    {["홈", "메뉴", "리뷰", "사진", "정보"].map((t) => (
                        <TouchableOpacity
                            key={t}
                            onPress={() => setTab(t)}
                            className={`flex-1 py-3 ${tab === t ? "border-b-2 border-blue-600" : ""
                                }`}
                        >
                            <Text
                                className={`text-center ${tab === t ? "text-blue-600 font-bold" : "text-gray-500"
                                    }`}
                            >
                                {t}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 메뉴 리스트 */}
                {tab === "메뉴" && (
                    <View className="px-5 py-4 space-y-5">
                        <MenuItem
                            title="딸기우유케이크"
                            price="8,800원"
                            image="https://picsum.photos/200/200"
                        />
                        <MenuItem
                            title="딸기생크림케이크"
                            price="8,800원"
                            image="https://picsum.photos/201/200"
                        />
                        <MenuItem
                            title="초코딸기케이크"
                            price="8,800원"
                            image="https://picsum.photos/202/200"
                        />
                    </View>
                )}

                {tab === "홈" && (
                    <HomeTab />
                )}

                {tab === "리뷰" && (
                    <ReviewTab />
                )}

                {tab === "정보" && (
                    <InfoTab />
                )}
            </ScrollView>
        </View>
    );
}

function MenuItem({ title, price, image }) {
    return (
        <View className="flex-row items-center">
            <View className="flex-1">
                <Text className="text-base font-semibold">{title}</Text>
                <Text className="text-gray-500 mt-1">{price}</Text>
            </View>
            <Image
                source={{ uri: image }}
                className="w-20 h-20 rounded-lg ml-4"
            />
        </View>
    );
}
