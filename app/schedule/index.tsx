import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ScheduleAddRange() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Text className="text-2xl font-bold text-gray-800 mb-4">언제 떠나세요?</Text>

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
        <Text className="text-lg font-semibold text-gray-700">
          출발일 : {startDate || "미정"}
        </Text>
        <Text className="text-lg font-semibold text-gray-700 mt-1">
          도착일 : {endDate || "미정"}
        </Text>
      </View>

      {/* 다음 버튼 */}
      <TouchableOpacity
        disabled={!startDate || !endDate}
        onPress={() => navigation.navigate("schedule/scheduleSelect", { startDate, endDate })}
        className={`mt-10 py-4 rounded-xl ${
          startDate && endDate ? "bg-blue-700" : "bg-gray-300"
        }`}
      >
        <Text className="text-center text-white font-bold text-lg">다음</Text>
      </TouchableOpacity>
    </View>
  );
}
