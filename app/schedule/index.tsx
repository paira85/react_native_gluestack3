import { View, Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import {
  initScheduleDB,
  getScheduleRows,
  insertSchedule
} from "../../db/scheduleDB";

import { Icon } from '@/components/ui/icon';
import { userSchedule } from "@/hook/useSchedule";
import { router } from "expo-router";
import {
  ArrowLeftIcon,
}
  from 'lucide-react-native';
import { ScrollView } from "react-native-gesture-handler";

function generateDays(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const days = [];

  while (s <= e) {
    days.push(s.toISOString().split("T")[0]);
    s.setDate(s.getDate() + 1);
  }
  return days;
}

export default function ScheduleAddRange() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //설정하고 초기 세팅
  const [datas, setDatas] = useState([]);
  const [peopleCount, setPeopleCount] = useState(1);

  const db = useSQLiteContext();
  const init = initScheduleDB(db);

  const onDayPress = (day) => {
    const selected = day.dateString;

    // ① start 없을 때 → start 입력
    if (!startDate) {
      setStartDate(selected);
      return;
    }

    // ② start 있고 end 비어있고, 선택 날짜가 start 이전일 경우 → 새로 start로 설정
    if (startDate && !endDate && selected < startDate) {
      setStartDate(selected);
      return;
    }

    // ③ 정상 종료일 입력
    if (startDate && !endDate) {
      setEndDate(selected);
      return;
    }

    // ④ 이미 start+end 있으면 리셋하고 새 start 지정
    setStartDate(selected);
    setEndDate(null);
  };

  // 날짜 범위 표시 UI
  const getMarkedDates = () => {
    let marks = {};

    if (startDate) {
      marks[startDate] = {
        startingDay: true,
        selected: true,
        color: "#22C55E",
        textColor: "#fff",
      };
    }

    if (startDate && endDate) {
      // 사이 날짜들 하이라이트
      let cur = new Date(startDate);
      const end = new Date(endDate);

      while (cur <= end) {
        const date = cur.toISOString().split("T")[0];
        marks[date] = {
          color: date === startDate || date === endDate ? "#22C55E" : "#95F4B3",
          textColor: "#004225",
        };
        cur.setDate(cur.getDate() + 1);
      }

      marks[endDate] = {
        endingDay: true,
        selected: true,
        color: "#22C55E",
        textColor: "#fff",
      };
    }

    return marks;
  };

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  useEffect(() => {
    const init = initScheduleDB(db);
    const rows = getScheduleRows(db);
  }, [])


  const saveTrip = async () => {
    // 날짜 자동 생성 & 저장

    const days = generateDays(startDate, endDate);

    const totalDays = Object.keys(days).length - 1; // 3
    const totalNights = Object.keys(days).length;   // 2
    const result = await insertSchedule(db, title, memo, startDate, endDate, totalDays, totalNights, peopleCount)

    let groupId = result.lastInsertRowId

    const datas = days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {});
    navigation.navigate("schedule/scheduleResult", { groupId, startDate, endDate, datas })

  };

  return (
    <ScrollView className="flex-1">

      <View className="flex-1 bg-white px-5 pt-5  mb-10">
        <View className="flex-row items-center mb-5 gap-3" >
          <Pressable className="w-8 bg-black h-8 rounded-full justify-center items-center "
            onPress={() => {
              navigation.goBack()
            }}>
            <Icon as={ArrowLeftIcon} className="text-white font-semibold " />
          </Pressable>

          <Text className="text-xl font-bold text-gray-800 ">언제 떠나세요?</Text>
        </View>
        <View className="bg-[#0F2C63] p-4 rounded-2xl mb-8">
          <Text className="text-gray-200 mb-1">여행 제목</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="예: 여행제목"
            placeholderTextColor="#aaa"  
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          <Text className="text-gray-200 mb-1">여행 노트</Text>
          <TextInput
            value={memo}
            onChangeText={setMemo}
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          <Text className="text-gray-200 mb-1">여행 인원수</Text>
          <TextInput
            value={peopleCount}
            onChangeText={setPeopleCount}
            keyboardType="numeric"
            placeholder="1"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />
        </View>


        <Calendar
          markingType="period"
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          theme={{
            arrowColor: "#22C55E",
            todayTextColor: "#3B82F6",
            textDayFontSize: 16,
          }}
        />

        {/* 선택 표시 */}
        <View className="mt-8">
          <Text className="text-md font-semibold text-gray-700">
            출발일 : {startDate || "미정"}
          </Text>
          <Text className="text-md font-semibold text-gray-700 mt-1">
            도착일 : {endDate || "미정"}
          </Text>
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity
          disabled={!startDate || !endDate}
          onPress={() =>
            saveTrip()
          }
          className={`mt-10 py-4 rounded-xl ${startDate && endDate ? "bg-[#1A3B7A]" : "bg-gray-300"
            }`}
        >
          <Text className="text-center text-white font-bold text-ms">저장</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
