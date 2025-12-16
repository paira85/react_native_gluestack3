import React, { useState } from "react";
import { ScrollView, Image, Pressable, Text, View } from "react-native";

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

export default function CommunityList({ data }: Props) {
  const [selected, setSelected] = useState("전체");

  
  const filtered =
    selected === "전체" ? data : data.filter((v) => v.category === selected);


    // 공지 / 이벤트 상단 고정 라인
  const fixedNotice = data.filter(
    (v) => v.type === "공지" || v.type === "이벤트" || v.type === "축제"
  )
  
  // 일반 게시글
  // 일반 게시글
  const normalPosts = data.filter(
    (v) => !(v.type === "공지" || v.type === "이벤트")
  );

  return (
    <Box className="flex-1">
      {/* 탭 메뉴 */}
      <HStack className="px-4 mt-2 border-b border-gray-300">
        {TABS.map((t) => (
          <Pressable key={t} className="mr-5 pb-3" onPress={() => setSelected(t)}>
            <Text
              className={
                selected === t
                  ? "font-bold text-[17px] text-black"
                  : "font-medium text-[17px] text-gray-500"
              }
            >
              {t}
            </Text>
            {selected === t && <Box className="h-[2px] bg-black mt-2 rounded-full" />}
          </Pressable>
        ))}
      </HStack>

      {/* 게시물 리스트 */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-4 px-4 gap-3">
        {fixedNotice.map((item) => (
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

        <View className="py-4"><Text className="font-semibold">일반 게시글</Text></View>
         {/* 일반 게시글 */}
        {filtered.map((item) => (
          <Box key={item.id} className="border-b border-gray-200 pb-4 ">
            <HStack className="justify-between items-start">
              <VStack className="flex-1 pr-2">
                <Text className="text-[17px] font-semibold mb-1">
                  {item.title}
                </Text>
                <Text className="text-[12px] text-gray-500">{item.user}</Text>
              </VStack>

              {item.thumbnail && (
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-20 h-20 rounded-xl"
                />
              )}
            </HStack>

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
