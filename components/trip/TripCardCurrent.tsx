import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { Image } from "@/components/ui/image";

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

import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useSQLiteContext } from "expo-sqlite";
import { deleteSchedule } from "@/db/scheduleDB";

interface Props {
    trip : Trip;
    deleteItem : void;
    showModal: void;
}

interface Trip {
    id : number;
  title:string;
  startDate:string;
  endDate:string;
  memo:string;
  savedCount:string;
  imageUri:string;
  
}


/** 진행 중 여행 큰 카드 */
export default function TripCardCurrent( { trip, showModal , deleteItem }: Props) {
    
  return (
    <>
      {/* 이미지 영역 */}
      {/* <Box className="h-56 w-full bg-neutral-800">
    
          <Image
            source={{ uri: trip.imageUri }}
            style={{ flex: 1 }}
            className="w-full h-24"
            alt="Image"
          />
          HEllo

        <Box className="absolute left-4 top-4 rounded-full bg-[#B5F5C8] px-4 py-1">
          <Text className="text-[14px] font-semibold text-[#1B3A26]">
            {trip.title}
          </Text>
        </Box>
      </Box> */}

      {/* 내용 영역 */}
      <Box className="px-5 py-4">
        <HStack className="items-start justify-between">
          <VStack className="flex-1 ">
            <Text className="mb-2 text-[22px] font-extrabold text-white ">
              {trip.title}
            </Text>

            <HStack className="items-center">
              <Icon
                as={Calendar}
                className="mr-2 h-4 w-4 text-neutral-300"
              />
              <Text className="text-[14px] text-neutral-200">
                {trip.startDate} → {trip.endDate}
              </Text>
            </HStack>

            <View className="mt-2 items-center flex-row">
              <Icon
                as={Heart}
                className="mr-2 h-4 w-4 text-neutral-300"
              />
              <Text className="text-[14px] text-neutral-200">
                {trip.memo}
              </Text>
            </View>

            <HStack className="mt-2 items-center">
              <Icon
                as={Heart}
                className="mr-2 h-4 w-4 text-neutral-300"
              />
              <Text className="text-[14px] text-neutral-200">
                {trip.savedCount}개 저장
              </Text>
            </HStack>
          </VStack>

          <Pressable hitSlop={10}  onPress={()=>{
                console.log(1)
                showModal(trip.id)
                // deleteItem(trip.id)
          }}>
            <Icon
              as={MoreVertical}
              className="mt-1 h-6 w-6 text-neutral-200"
            />
          </Pressable>
        </HStack>
      </Box>
    </>
  );
};