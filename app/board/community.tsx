import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CommunityList from "@/components/board/communityList";
import { ArrowLeft, Search } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { Pressable, Text } from "react-native";
import { Icon } from "@/components/ui/icon";

export default function CommunityScreen({ navigation }) {
  const mockData = [
    {
      id: 1,
      title: "'양양송이 탐험대' 이벤트",
      type: "이벤트",
      category: "이벤트",
      user: "관리자",
      date: "2025-10-10 11:42:06",
      views: 93,
      likes: 0,
    },
    {
      id: 2,
      title: "양양 여행가는 달 이벤트🍁",
      type: "공지",
      category: "공지",
      user: "관리자",
      date: "2025-10-10 11:37:25",
      views: 62,
      likes: 0,
    },
    {
      id: 3,
      title: "양양 송이 축제 너무 좋아요!! 👍🏼",
      type: "축제",
      category: "축제",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80",
      user: "h.**********",
      date: "2025-10-13 11:03:28",
      views: 13,
      likes: 0,
    },
     {
      id: 4,
      title: "aaaaaaaa 👍🏼",
      type: "일반",
      category: "일반",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80",
      user: "h.**********",
      date: "2025-10-13 11:03:28",
      views: 13,
      likes: 0,
    },
     {
      id: 5,
      title: "bbbbbbbb 👍🏼",
      type: "일반",
      category: "일반",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80",
      user: "h.**********",
      date: "2025-10-13 11:03:28",
      views: 13,
      likes: 0,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 bg-white">
        {/* Header */}
        <Box className="px-4 py-3 border-b border-gray-200 flex-row items-center justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={ArrowLeft} className="h-6 w-6 text-black" />
          </Pressable>

          <Text className="text-[20px] font-bold">커뮤니티</Text>

          <Pressable>
            <Icon as={Search} className="h-6 w-6 text-black" />
          </Pressable>
        </Box>

        {/* 리스트 컴포넌트 */}
        <CommunityList data={mockData} />
      </Box>
    </SafeAreaView>
  );
}
