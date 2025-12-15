import { BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";
import { Badge, Ban, Car, ChevronLeft, Heart, Share2, Utensils, Wifi } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AmenityKey = "wifi" | "restaurant" | "noSmoking" | "parking" | "styler" | "oceanView";

type HotelDetail = {
  id: string;
  name: string;
  category: string; // 호텔 · 2성급
  address: string;
  highlights: string[]; // 객실이 깨끗한 / 조식이 맛있는 / 바다가 보이는
  rating: number; // 9.6
  reviewCount: number; // 1175
  images: string[];
  checkInLabel: string; // 12.24 수
  checkOutLabel: string; // 12.25 목
  guestsLabel: string; // 인원 2
  intro: string;
  amenities: { key: AmenityKey; label: string }[];
};

const { width } = Dimensions.get("window");

const MOCK: HotelDetail = {
  id: "h-avenue",
  name: "H-에비뉴 광안리해변점",
  category: "호텔 · 2성급",
  address: "부산 수영구 민락동 181-154 · 광안리해변 1분",
  highlights: ["객실이 깨끗한", "조식이 맛있는", "바다가 보이는"],
  rating: 9.6,
  reviewCount: 1175,
  images: [
    // "https://images.unsplash.com/photo-1505691723518-36a5ac3b2f2b?w=1200",
    // "https://images.unsplash.com/photo-1560067174-8943bdfe42b6?w=1200",
    // "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
    require("/assets/images/house/02/1.png"),
    require("/assets/images/house/02/2.png"),
    require("/assets/images/house/02/3.png"),
  ],
  checkInLabel: "12.24 (수)",
  checkOutLabel: "12.25 (목)",
  guestsLabel: "인원 2",
  intro:
    "동급 최고급 설비\n한식, 양식을 동시에 즐기는 조식 뷔페\n전 객실 삼성 큐브 공기청정기 비치\n5성급 최고급 구스 침구\n광안리에서 잊지 못할 추억을 남기세요",
  amenities: [
    { key: "wifi", label: "무선인터넷" },
    { key: "restaurant", label: "레스토랑" },
    { key: "noSmoking", label: "금연" },
    { key: "parking", label: "무료주차" },
    { key: "styler", label: "스타일러" },
    { key: "oceanView", label: "오션뷰" },
  ],
};

function AmenityIcon({ k }: { k: AmenityKey }) {
  // gluestack Icon에 lucide 아이콘을 그대로 써도 되고,
  // 아래처럼 RN 컴포넌트로 바로 렌더해도 돼.
  const size = 20;
  switch (k) {
    case "wifi":
      return <Wifi width={size} height={size} />;
    case "restaurant":
      return <Utensils width={size} height={size} />;
    case "noSmoking":
      return <Ban width={size} height={size} />;
    case "parking":
      return <Car width={size} height={size} />;
    case "styler":
      return <Text className="text-base">🧺</Text>;
    case "oceanView":
      return <Text className="text-base">🌊</Text>;
    default:
      return <Text className="text-base">•</Text>;
  }
}

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams();
  console.log('id', id)
  const [liked, setLiked] = useState(false);
  const data = MOCK;

  const ratingBadgeText = useMemo(() => data.rating.toFixed(1), [data.rating]);
  console.log('ratingBadgeText', ratingBadgeText)

  return (


    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header (Sticky 느낌: ScrollView 위에 고정) */}
      <Box className="bg-white">
        <HStack className="items-center justify-between px-4 py-3">
          <Pressable onPress={() => navigation.navigate("/event", { id:'6'  })}>
            <HStack className="items-center">
              <ChevronLeft width={22} height={22} />
              <Text className="ml-1 text-base font-semibold">뒤로</Text>
            </HStack>
          </Pressable>

          <Text
            className="max-w-[60%] text-base font-semibold"
            numberOfLines={1}
          >
            {data.name}
          </Text>

          <HStack className="items-center">
            <Pressable onPress={() => console.log("share")} className="p-2">
              <Share2 width={20} height={20} />
            </Pressable>
            <Pressable
              onPress={() => setLiked((v) => !v)}
              className="p-2"
              hitSlop={8}
            >
              <Heart
                width={20}
                height={20}
                // @ts-ignore (SVG stroke/fill)
                fill={liked ? "black" : "transparent"}
              />
            </Pressable>
          </HStack>
        </HStack>
        <Divider />
      </Box>

      {/* Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 96 }}>
        {/* Gallery */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="bg-black"
        >
          {data.images.map((uri, idx) => (
            <View key={uri} style={{ width }}>
              <Image
                // source={{ uri }}
                
                source={uri}
                style={{ width, height: 240 }}
                resizeMode="cover"
              />
              <Box className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1">
                <Text className="text-white text-xs">
                  {idx + 1} / {data.images.length}
                </Text>
              </Box>
            </View>
          ))}
        </ScrollView>

        {/* Summary */}
        <Box className="bg-white px-4 py-4">
          <Text className="text-sm text-gray-500">{data.category}</Text>
          <Text className="mt-1 text-xl font-bold">{data.name}</Text>
          <Text className="mt-2 text-sm text-gray-600">{data.address}</Text>

          <HStack className="mt-3 items-center">
            <Badge className="bg-yellow-400 rounded-md">
              {/* <BadgeText className="text-black font-bold">{ratingBadgeText}</BadgeText> */}
              <Text>{ratingBadgeText}</Text>

            </Badge>
            <Text className="ml-2 text-sm text-gray-700">
              {data.reviewCount.toLocaleString()}개 평가
            </Text>
          </HStack>

          <HStack className="mt-3 flex-wrap">
            {data.highlights.map((t) => (
              <Box key={t} className="mr-2 mb-2 rounded-full bg-gray-100 px-3 py-1">
                <Text className="text-xs text-gray-700">✨ {t}</Text>
              </Box>
            ))}
          </HStack>
        </Box>

        <Box className="h-2" />

        {/* Dates / Guests */}
        <Box className="bg-white px-4 py-4">
          <HStack className="items-center justify-between">
            <VStack>
              <Text className="text-xs text-gray-500">체크인</Text>
              <Text className="text-sm font-semibold">{data.checkInLabel}</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="text-xs text-gray-500">체크아웃</Text>
              <Text className="text-sm font-semibold">{data.checkOutLabel}</Text>
            </VStack>
            <VStack className="items-end">
              <Text className="text-xs text-gray-500">인원</Text>
              <Text className="text-sm font-semibold">{data.guestsLabel}</Text>
            </VStack>
          </HStack>

          <Button
            className="mt-4 rounded-xl"
            variant="outline"
            onPress={() => console.log("open date/guest modal")}
          >
            <ButtonText>일정/인원 변경</ButtonText>
          </Button>
        </Box>

        <Box className="h-2" />

        {/* Amenities */}
        <Box className="bg-white px-4 py-4">
          <HStack className="items-center justify-between">
            <Text className="text-base font-bold">편의시설 및 서비스</Text>
            <Pressable onPress={() => console.log("more amenities")}>
              <Text className="text-sm text-gray-500">더보기</Text>
            </Pressable>
          </HStack>

          <View className="mt-4 flex-row flex-wrap">
            {data.amenities.map((a) => (
              <View
                key={a.key}
                className="w-1/4 items-center mb-4"
              >
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <AmenityIcon k={a.key} />
                </View>
                <Text className="mt-2 text-xs text-gray-700 text-center" numberOfLines={2}>
                  {a.label}
                </Text>
              </View>
            ))}
          </View>
        </Box>

        <Box className="h-2" />

        {/* Location / Map Placeholder */}
        <Box className="bg-white px-4 py-4">
          <HStack className="items-center justify-between">
            <Text className="text-base font-bold">위치 및 주변 정보</Text>
            <Pressable onPress={() => console.log("open map")}>
              <Text className="text-sm text-gray-500">지도 크게</Text>
            </Pressable>
          </HStack>

          <Text className="mt-2 text-sm text-gray-600">{data.address}</Text>

          {/* 지도 자리(나중에 react-native-maps / naver map 등으로 교체) */}
          <View className="mt-3 h-44 overflow-hidden rounded-2xl bg-gray-200 items-center justify-center">
            <Text className="text-gray-600">지도 컴포넌트 자리</Text>
            <Text className="text-xs text-gray-500 mt-1">
              (react-native-maps / NaverMap / KakaoMap으로 교체)
            </Text>
          </View>
        </Box>

        <Box className="h-2" />

        {/* Intro */}
        <Box className="bg-white px-4 py-4">
          <Text className="text-base font-bold">숙소 소개</Text>
          <Text className="mt-2 text-sm text-gray-700 leading-6">
            {data.intro}
          </Text>
        </Box>
      </ScrollView>

      {/* Bottom CTA */}
      <Box className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200">
        <Button className="rounded-2xl" onPress={() => console.log("show rooms")}>
          <ButtonText className="font-bold">모든 객실 보기</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
}