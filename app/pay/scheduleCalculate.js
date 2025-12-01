import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ScheduleResult() {
  const { startDate,endDate, datas } = useRoute().params;
  console.log('endDate' , startDate)
  console.log('endDate' , endDate)
  console.log('endDate' , datas)

  // 예시 데이터 (DB 연동 가능)
  const timeline = [
    {
      day: 1,
      date: "2025-11-29",
      list: [
        { time: "09:00", title: "아이서프", price: 65000 },
        { time: "13:00", title: "힐링서프", price: 55000 },
        { time: "19:00", title: "저녁 바비큐", price: 42000 },
      ],
    },
    {
      day: 2,
      date: "2025-11-30",
      list: [
        { time: "10:00", title: "오색그린야드호텔 온천", price: 20000 },
        { time: "15:00", title: "보난자요트투어", price: 120000 },
      ],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-14">
      {/* 상단 타이틀 영역 */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-2xl font-bold">내 일정</Text>
        <Ionicons name="create-outline" size={26} color="#444" />
      </View>

      <Text className="text-gray-500 mb-2 text-base">
        ✨ {startDate} 부터 총 {timeline.length}박 {timeline.length + 1}일
      </Text>

      {/* 지출 금액 요약 */}
      <View className="bg-white p-4 rounded-2xl shadow mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="font-semibold text-gray-700">총 지출금</Text>
          <Text className="font-bold text-lg text-pink-600">₩ 287,000</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">개인 지출</Text>
          <Text className="font-semibold text-gray-700">₩ 287,000</Text>
        </View>
      </View>

      {/* DAY별 타임라인 */}
      {timeline.map((dayObj, idx) => (
        <View key={idx} className="mb-8">
          <Text className="font-bold text-xl mb-3">
            D{dayObj.day} <Text className="text-gray-500 text-base">({dayObj.date})</Text>
          </Text>

          {dayObj.list.map((item, i) => (
            <View key={i} className="flex-row">
              {/* Time */}
              <View className="w-16">
                <Text className="text-gray-600 font-medium">{item.time}</Text>
              </View>

              {/* Timeline Line */}
              <View className="items-center mr-4">
                <View className="w-3 h-3 rounded-full bg-pink-500" />
                {i !== dayObj.list.length - 1 && <View className="w-0.5 h-10 bg-gray-300" />}
              </View>

              {/* Content Box */}
              <View className="flex-1 bg-white p-4 rounded-2xl shadow mb-6">
                <Text className="font-semibold text-gray-800">{item.title}</Text>
                <Text className="mt-1 text-gray-500">₩ {item.price.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity className="bg-blue-600 py-4 rounded-2xl mt-4 mb-12">
        <Text className="text-center text-white font-bold text-lg">PDF / 엑셀로 저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
