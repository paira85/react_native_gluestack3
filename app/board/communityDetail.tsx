import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
type Props = {
  navigation?: any;
};

export default function EventDetailScreen({ navigation }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");

  const data = {
    category: "이벤트",
    title: "'양양송이 탐험대' 이벤트",
    createdAt: "2025-10-10 11:46:33",
    views: 95,
    body: "미션 수행하고 스탬프를 모으면\n‘양양송이 탐험대원’ 인증 선물까지!\n(매일 선착순 150명)",
    courseTitle: "코스 개요",
    courseDesc: "가족과 함께 즐기는 모험형 송이 체험 프로그램",
    routeTitle: "이동루트",
    routeDesc:
      "양양 파머스마켓 → 수석분재 → 양양한우 소비촉진 행사장 → 생강테라스 → 양양송이 미식가든",
    distanceTitle: "이동길이",
    distanceValue: "725m",
    timeTitle: "소요시간",
    timeValue: "30분",
    mapTitle: "스탬프 위치 사진",
    mapImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
  };

  const onToggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? Math.max(0, prev - 1) : prev + 1));
  };

  return (
    <SafeAreaView className="flex-1 bg-white text-base ">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-200 flex-row items-center">
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/board/community",
              params: {},
            })

          }
          className="w-10 h-10 items-center justify-center -ml-2"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#111827" />
        </Pressable>

        <Text className="flex-1 text-center font-bold text-gray-900">
          이벤트 상세
        </Text>

        {/* right spacer to keep title centered */}
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="px-5 pt-5">
          {/* Category pill */}
          <View className="self-start rounded-full bg-blue-900 px-4 py-2">
            <Text className="text-white font-bold">{data.category}</Text>
          </View>

          {/* Title */}
          <Text className="mt-4 text-base font-extrabold text-gray-900">
            {data.title}
          </Text>

          {/* Meta row */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-gray-400">{data.createdAt}</Text>

            <View className="flex-row items-center">
              <View className="flex-row items-center mr-3">
                <Ionicons name="eye-outline" size={20} color="#1f3b82" />
                <Text className="ml-1 text-gray-700 font-semibold">
                  {data.views}
                </Text>
              </View>

              <Pressable
                onPress={onToggleLike}
                className="flex-row items-center rounded-2xl border border-gray-200 px-4 py-2"
              >
                <Ionicons
                  name={liked ? "thumbs-up" : "thumbs-up-outline"}
                  size={18}
                  color={liked ? "#1f3b82" : "#111827"}
                />
                <Text className="ml-2 text-gray-800 font-semibold">
                  {likeCount}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Divider */}
          <View className="mt-6 h-px bg-gray-200" />

          {/* Body */}
          <Text className="mt-6 text-lg font-semibold text-gray-900 leading-7">
            {data.body.split("\n").map((line, idx) => (
              <Text key={idx}>
                {idx === 2 ? (
                  <Text className="bg-yellow-200">{line}</Text>
                ) : (
                  line
                )}
                {"\n"}
              </Text>
            ))}
          </Text>

          {/* Sections */}
          <View className="mt-10">
            <Text className="text-2xl font-extrabold text-gray-900">
              {data.courseTitle}
            </Text>
            <Text className="mt-2 text-lg text-gray-800">
              {data.courseDesc}
            </Text>
          </View>

          <View className="mt-8">
            <Text className="text-2xl font-extrabold text-gray-900">
              {data.routeTitle}
            </Text>
            <Text className="mt-2 text-lg text-gray-800 leading-7">
              {data.routeDesc}
            </Text>
          </View>

          <View className="mt-8">
            <Text className="text-2xl font-extrabold text-gray-900">
              {data.distanceTitle}
            </Text>
            <Text className="mt-2 text-lg text-gray-800">
              {data.distanceValue}
            </Text>
          </View>

          <View className="mt-8">
            <Text className="text-2xl font-extrabold text-gray-900">
              {data.timeTitle}
            </Text>
            <Text className="mt-2 text-lg text-gray-800">
              {data.timeValue}
            </Text>
          </View>

          <View className="mt-10">
            <Text className="text-2xl font-extrabold text-gray-900">
              {data.mapTitle}
            </Text>

            <View className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
              <Image
                source={{ uri: data.mapImage }}
                className="w-full h-44"
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Comment Input (fixed-like area inside scroll end) */}
        <View className="mt-8 px-5">
          <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="댓글을 입력해주세요"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-900"
            />
            <Pressable
              onPress={() => {
                // TODO: submit comment
              }}
              className="ml-3 w-12 h-12 rounded-full bg-white items-center justify-center border border-gray-200"
            >
              <Ionicons name="create-outline" size={22} color="#6B7280" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
