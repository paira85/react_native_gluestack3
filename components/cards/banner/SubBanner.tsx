import React, { useRef, useState } from "react";
import { View, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function SubBanner( {datas}) {

    const [index, setIndex] = useState(0);
    const onScroll = (e: any) => {
        const x = e.nativeEvent.contentOffset.x;
        setIndex(Math.round(x / width));
    };

    return (
        <View className="mt-3">
            {/* 배너 슬라이드 */}
            <FlatList
                data={datas}
                horizontal
                pagingEnabled
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => router.push(item.link)}
                    >
                        <Image
                            // source={{ uri: item.image }}
                            source={item.image}
                            className="rounded-2xl mx-4"
                            style={{
                                width: width - 32,
                                height: 180,
                                objectFit: "cover",
                            }}
                        />
                    </TouchableOpacity>
                )}
            />

            {/* 페이지 인디케이터 */}
            <View className="flex-row justify-center mt-3">
                {datas.map((_, i) => (
                    <View
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full mx-1 ${index === i ? "bg-[#0038ff]" : "bg-gray-300"
                            }`}
                    />
                ))}
            </View>
        </View>
    );
}
