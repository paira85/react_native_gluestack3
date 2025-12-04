import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, Pressable, Text, View } from "react-native";
import {
  Heart,
  MoreVertical,
  Calendar,
  Search,
  MapPin,
  MessageCircle,
  User,
  Plus,
} from "lucide-react-native";
import { VStack } from "../ui/vstack/index.web";
import { HStack } from "../ui/hstack/index.web";
import { Icon } from "../ui/icon/index.web";

interface Props {
    trip : Trip;
}

interface Trip {
  title:string;
  startDate:string;
  memo:string;
  endDate:string;
  savedCount:string;
}
import { useSQLiteContext } from "expo-sqlite";
import { deleteSchedule } from "@/db/scheduleDB";

/** 완료된 여행 작은 카드 */
export default function  TripCardCompleted ({ trip }: Props){
  
  const db = useSQLiteContext();

  return (
    <Pressable className="flex-row items-center rounded-3xl bg-gray-100 px-4 py-3">
      {/* 썸네일 */}
      {/* <Box className="mr-4 h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800">
        
        <Icon as={Calendar} className="h-6 w-6 text-neutral-500" />
      </Box> */}

      {/* 내용 */}
      <VStack className="flex-1 gap-1">
        <Text className="mb-1 text-[18px] font-semibold ">
          {trip.title}
        </Text>

        <HStack className="items-center">
          <Icon as={Calendar} className="mr-2 h-4 w-4 " />
          <Text className="text-[14px] ">
            {trip.startDate} → {trip.endDate}
          </Text>
        </HStack>

        <View className="mt-2 items-center flex-row">
          <Icon
            as={Heart}
            className="mr-2 h-4 w-4"
          />
          <Text className="text-[14px] ">
            {trip.memo}
          </Text>
        </View>


        <HStack className="mt-1 items-center">
          <Icon as={Heart} className="mr-2 h-4 w-4 " />
          <Text className="text-[14px] ">
            {trip.savedCount}개 저장
          </Text>
        </HStack>
      </VStack>

      <Pressable hitSlop={10} onPress={async ()=>{
        await deleteSchedule(db , trip.id)
      }}>
        <Icon
          as={MoreVertical}
          className="h-6 w-6 text-neutral-200"
        />
      </Pressable>
    </Pressable>
  );
};
