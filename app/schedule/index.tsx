import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import {
  initScheduleDB,
  getScheduleRows,
  insertSchedule
} from "../../db/scheduleDB";
import { userSchedule } from "@/hook/useSchedule";
import { router } from "expo-router";

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

  const [title,setTitle] = useState("");
  const [memo,setMemo] = useState("");
  useEffect(()=>{
    const init = initScheduleDB(db);
    const rows = getScheduleRows(db);
    console.log('init')
    console.log('rows' , rows)
  },[]  )

  
  const saveTrip = async () => {    
    // 날짜 자동 생성 & 저장
    const days = generateDays(startDate, endDate);
    const result = await insertSchedule(db,title,memo,startDate ,endDate)

    const datas = days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {});

    navigation.navigate("schedule/scheduleResult", { startDate, endDate, datas })

  };


  console.log('datas1111' , datas)
  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Text className="text-xl font-bold text-gray-800 mb-4">언제 떠나세요?</Text>

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
            keyboardType="numeric"
            placeholder="2"
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
        <Text className="text-xl font-semibold text-gray-700">
          출발일 : {startDate || "미정"}
        </Text>
        <Text className="text-xl font-semibold text-gray-700 mt-1">
          도착일 : {endDate || "미정"}
        </Text>
      </View>

      {/* 다음 버튼 */}
      <TouchableOpacity
        disabled={!startDate || !endDate}
        onPress={() => 
          saveTrip()
        }
        className={`mt-10 py-4 rounded-xl ${
          startDate && endDate ? "bg-blue-700" : "bg-gray-300"
        }`}
      >
        <Text className="text-center text-white font-bold text-xl">저장</Text>
      </TouchableOpacity>
      
    </View>
  );
}
