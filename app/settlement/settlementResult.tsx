import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from '@/components/ui/button';
import {  Pressable, Text, TextInput } from "react-native";
import { router } from "expo-router";

export default function SettlementResultScreen() {
  const navigation = useNavigation();
  const { type } = useRoute().params;

  return (
    <Box className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold mb-4">
        {type === "add" ? "등록 완료!" : "수정 완료!"}
      </Text>

      <Text className="text-gray-600 text-lg mb-8">
        정산 내역이 정상적으로 {type === "add" ? "등록" : "수정"}되었습니다.
      </Text>

      <Button className="bg-blue-600 w-full" onPress={() => {
            router.push({
                    pathname: "/settlement/settlementList",
                })
            }
        }>
        <Text className="text-white font-semibold">확인</Text>
      </Button>
    </Box>
  );
}
