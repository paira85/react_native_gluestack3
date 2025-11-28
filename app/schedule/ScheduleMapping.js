import { useRoute, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function ScheduleMapping() {
  const navigation = useNavigation();
  const { startDate, endDate, selectedCourses } = useRoute().params;

  // 날짜 배열 만들기
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const [mapData, setMapData] = useState(
    dates.reduce((acc, d) => ({ ...acc, [d.toISOString().split("T")[0]]: [] }), {})
  );

  const toggleCourse = (date, course) => {
    setMapData((prev) => {
      const list = prev[date];
      const exists = list.some((c) => c.id === course.id);
      return {
        ...prev,
        [date]: exists ? list.filter((c) => c.id !== course.id) : [...list, course],
      };
    });
  };

  const goNext = () => {
    navigation.navigate("ScheduleResult", {
      startDate,
      endDate,
      schedule: mapData,
    });
  };

  return (
   <ScrollView showsVerticalScrollIndicator={false}>
  <View className="flex-row flex-wrap justify-between">
    {places.map((p) => {
      const isSelected = selected.includes(p.id);
      return (
        <TouchableOpacity
          key={p.id}
          onPress={() => toggle(p.id)}
          activeOpacity={0.9}
          className="w-[48%] mb-4"
        >
          <View
            className={`rounded-xl overflow-hidden border ${
              isSelected ? "border-blue-600" : "border-gray-300"
            }`}
          >
            {/* 체크박스(네모 박스) */}
            <View
              className={`absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center ${
                isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
              }`}
            >
              {isSelected && (
                <Text className="text-white text-sm font-bold">✓</Text>
              )}
            </View>

            {/* 이미지 */}
            <Image
              source={p.img}
              className="w-full h-36"
              resizeMode="cover"
            />

            {/* 타이틀 */}
            <Text className="p-2 text-base font-semibold text-gray-800">
              {p.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
</ScrollView>
  );
}
