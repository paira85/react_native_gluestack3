import { deleteSchedule } from "@/db/scheduleDB";
import { useSQLiteContext } from "expo-sqlite";
import {
  Calendar,
  Heart,
  MoreVertical
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
      <ScrollView className="flex-1 gap-1">
        <Text className="mb-1 text-[18px] font-semibold ">
          {trip.title}
        </Text>

        <View className="flex-row items-center">
          <Icon as={Calendar} className="mr-2 h-4 w-4 " />
          <Text className="text-[14px] ">
            {trip.startDate} → {trip.endDate}
          </Text>
        </View>

        <View className="mt-2 items-center flex-row">
          <Icon
            as={Heart}
            className="mr-2 h-4 w-4"
          />
          <Text className="text-[14px] ">
            {trip.memo}
          </Text>
        </View>


        <View className="flex-row mt-1 items-center">
          <Icon as={Heart} className="mr-2 h-4 w-4 " />
          <Text className="text-[14px] ">
            {trip.savedCount}개 저장
          </Text>
        </View>
      </ScrollView>

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
