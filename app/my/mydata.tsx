import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MyPageScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="bg-[#0b2c6f]">
        {/* Top bar */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="white" />
          </Pressable>
          <Text className="text-white text-lg font-bold">마이페이지</Text>
          <View className="flex-row space-x-4">
            <Ionicons name="notifications-outline" size={22} color="white" />
            <Ionicons name="settings-outline" size={22} color="white" />
          </View>
        </View>

        {/* Wave area (이미지 대신 컬러 레이어) */}
        <View className="h-32 bg-[#0b2c6f]" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* PROFILE */}
        <View className="-mt-16 items-center">
          <View className="relative">
            <Image
              source={{
                uri: "https://dummyimage.com/200x200/ffffff/000000&text=YY",
              }}
              className="w-28 h-28 rounded-full border-4 border-white"
            />
            <Pressable className="absolute bottom-1 right-1 bg-blue-900 w-8 h-8 rounded-full items-center justify-center">
              <Ionicons name="camera" size={16} color="white" />
            </Pressable>
          </View>

          <Text className="mt-4 text-2xl font-bold text-gray-900">
            Mr강강
          </Text>
          <Text className="text-gray-500 mt-1">
            paira85@naver.com
          </Text>

          <Pressable className="mt-4 px-6 py-2 border border-gray-300 rounded-full">
            <Text className="text-gray-700 font-semibold">
              개인정보 변경
            </Text>
          </Pressable>
        </View>

        {/* MY TRAVEL */}
        <SectionTitle title="나의 여행" />

        <View className="flex-row justify-around mt-6">
          <StatItem label="내 일정" value={1} />
          <StatItem label="찜" value={0} />
          <StatItem label="내 쿠폰" value={0} />
          <StatItem label="내 리뷰" value={0} />
        </View>

        <Divider />

        {/* PURCHASE */}
        <SectionTitle title="구매 · 예약 내역" />

        <View className="flex-row justify-around mt-6">
          <StatItem label="서핑숍" value={0} />
          <StatItem label="체험" value={0} />
          <StatItem label="숙박" value={0} />
          <StatItem label="택시콜" value={0} />
          <StatItem label="양양몰" value={0} />
        </View>

        <Divider />

        {/* MENU LIST */}
        <MenuItem title="AR게임" subtitle="나의 랭킹 확인하기" />
        <MenuItem title="스탬프 투어" subtitle="나의 스탬프 내역" />

        <View className="px-5 mt-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            서핑 강습인증서
          </Text>

          <View className="flex-row justify-between">
            <Pressable className="flex-1 mr-2 py-4 border border-gray-300 rounded-2xl items-center">
              <Text className="text-gray-700 font-semibold">발급내역</Text>
            </Pressable>
            <Pressable className="flex-1 ml-2 py-4 border border-gray-300 rounded-2xl items-center">
              <Text className="text-gray-700 font-semibold">신청내역</Text>
            </Pressable>
          </View>
        </View>

        <Divider />

        <ListItem icon="document-text-outline" label="취소 및 환불 내역" />
        <ListItem icon="alert-circle-outline" label="불편사항 신고 내역" />
        <ListItem icon="headset-outline" label="고객센터" />
        <ListItem icon="megaphone-outline" label="공지/안내" />

        {/* LOGOUT */}
        <View className="px-5 mt-10">
          <Pressable className="py-4 border-2 border-gray-400 rounded-2xl items-center">
            <Text className="text-xl font-bold text-gray-800">
              로그아웃
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= components ================= */

const SectionTitle = ({ title }: { title: string }) => (
  <View className="px-5 mt-10">
    <Text className="text-xl font-extrabold text-gray-900">
      <Text className="bg-teal-200"> {title} </Text>
    </Text>
  </View>
);

const StatItem = ({ label, value }: any) => (
  <View className="items-center">
    <Text className="text-2xl font-extrabold text-blue-900">{value}</Text>
    <Text className="mt-1 text-gray-600">{label}</Text>
  </View>
);

const Divider = () => (
  <View className="mt-10 h-px bg-gray-200 mx-5" />
);

const MenuItem = ({ title, subtitle }: any) => (
  <Pressable className="px-5 py-6 flex-row justify-between items-center border-b border-gray-200">
    <View>
      <Text className="text-sm text-gray-500">{title}</Text>
      <Text className="text-lg font-bold text-gray-900 bg-teal-200">
        {subtitle}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
  </Pressable>
);

const ListItem = ({ icon, label }: any) => (
  <Pressable className="px-5 py-5 flex-row items-center justify-between border-b border-gray-200">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={22} color="#6B7280" />
      <Text className="ml-4 text-gray-800 text-lg">{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
  </Pressable>
);
