import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "@/components/ui/image"; 
import { Checkbox } from "@/components/ui/checkbox";

const places = [
  { id: 1, name: "수산항 봉수대 전망대", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 2, name: "아이서프", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 3, name: "서프호랑", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 4, name: "힐링서프", img: require("/assets/images/background/1739799352351-15.jpg") },
];

export default function CourseSelect() {
  const navigation = useNavigation();
  const {startDate , endDate } = useRoute().params;
  const [selected, setSelected] = useState([]);

  const [modalVisible ,setModalVisible] = useState(false)


  const days = [
    { id: 1, label: "[DAY1] 11/29 (토)" },
    { id: 2, label: "[DAY2] 11/30 (일)" },
    { id: 3, label: "[DAY3] 12/01 (월)" },
    { id: 4, label: "[DAY4] 12/02 (화)" },
    { id: 5, label: "[DAY5] 12/03 (수)" }
  ];

    // 날짜 배열 만들기
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  console.log('dates' , dates)
  const [mapData, setMapData] = useState(
    dates.reduce((acc, d) => (
      {
       ...acc, 
       [d.toISOString().split("T")[0]] : [] 
      }) , {}
    )
  );

  console.log('dates' , dates)

  const places = [
    { id: 1, name: "수산항 봉수대 전망대", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 2, name: "아이서프", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 3, name: "서프호랑", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 4, name: "힐링서프", img: require("/assets/images/background/1739799352351-15.jpg") },
  ];

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


  const toggle = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Text className="text-xl font-semibold mb-2">인기 검색어</Text>

      <ScrollView horizontal className="flex-row mb-4">
        {["카페", "서핑", "맛집", "온천"].map((v) => (
          <View className="px-4 py-2 bg-gray-100 rounded-full mr-2" key={v}>
            <Text>{v}</Text>
          </View>
        ))}
      </ScrollView>

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
                    className={`absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center z-20 ${
                      isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <Text className="text-white text-sm font-bold">✓</Text>
                    )}
                  </View>
                  
                  {/* 카드 이미지 */}
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

      <DaySelectModal
          visible={modalVisible}
          days={days}
          onClose={() => setModalVisible(false)}
          onSubmit={(selected) => {
            setScheduleMapping(selected);
            setModalVisible(false);
          }}
        />

      <TouchableOpacity
        className="bg-blue-700 py-4 rounded-lg mb-5"
        onPress={() => null}
      >
        <Text className="text-center text-white text-lg font-bold">추가하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-700 py-4 rounded-lg mb-5"
        onPress={() => navigation.navigate("schedule/scheduleMapping", { startDate, endDate, selected })}
      >
        <Text className="text-center text-white text-lg font-bold">다음</Text>
      </TouchableOpacity>
    </View>
  );
}
