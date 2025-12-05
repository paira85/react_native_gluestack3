import React, { useEffect, useState } from "react";
import { ScrollView, Image, Pressable, Text } from "react-native";

import { ChevronDown, Eye, ThumbsUp } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Icon } from "@/components/ui/icon";

const TABS = ["전체", "축제", "공지", "이벤트", "일반"];

type Post = {
  id: number;
  title: string;
  type: "공지" | "이벤트" | "축제" | "일반";
  category: string; // 탭 구분용 (전체 or 양양NOW or 양양톡 or 이벤트)
  user: string;
  date: string;
  likes: number;
  views: number;
  thumbnail?: string;
};

interface Props {
  data: Post[];
}

export default function CommunityCard({ data }: Props) {
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

  const [selected, setSelected] = useState(data?.type);

  
  const filtered =
    selected === "전체" ? mockData : mockData.filter((v) => v.category === selected);

  useEffect(()=>{
    setSelected(data?.type)
  },[data])
  
  return (
    <Box className="flex-1">
      
      {/* 게시물 리스트 */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-4 px-4">
        {filtered.map((item) => (
          <Box key={item.id} className="border-b border-gray-200 pb-4 mb-4">
            {/* 제목 */}
            <Text className="text-[17px] font-semibold mb-1">
              <Text
                className={
                  item.type === "공지"
                    ? "text-blue-700"
                    : item.type === "이벤트"
                    ? "text-blue-900"
                    : "text-green-700"
                }
              >
                [{item.type}]{" "}
              </Text>
              {item.title}
            </Text>

            {/* 썸네일 + 내용 */}
            <HStack className="justify-between items-start mt-2">
              <VStack className="flex-1 pr-2">
                <Text numberOfLines={2} className="text-[14px] text-gray-700">
                  {item.title}
                </Text>
                <Text className="text-[12px] mt-1 text-gray-500">
                  {item.user}
                </Text>
              </VStack>

              {item.thumbnail && (
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-20 h-20 rounded-xl"
                />
              )}
            </HStack>

            {/* footer */}
            <HStack className="mt-2 items-center">
              <HStack className="items-center mr-4">
                <Icon as={Eye} className="h-4 w-4 mr-1 text-gray-600" />
                <Text>{item.views}</Text>
              </HStack>

              <HStack className="items-center mr-4">
                <Icon as={ThumbsUp} className="h-4 w-4 mr-1 text-gray-600" />
                <Text>{item.likes}</Text>
              </HStack>

              <Text className="text-[12px] text-gray-500 ml-auto">{item.date}</Text>
            </HStack>
          </Box>
        ))}

      </ScrollView>
    </Box>
  );
}
