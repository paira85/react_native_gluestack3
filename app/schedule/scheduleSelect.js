import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "@/components/ui/image"; 
import { Checkbox } from "@/components/ui/checkbox";
import DaySelectModal from "./scheduleModal"

const places = [
  { id: 1, name: "수산항 봉수대 전망대", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 2, name: "아이서프", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 3, name: "서프호랑", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 4, name: "힐링서프", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 5, name: "고성카페", img: require("/assets/images/background/1739799352351-15.jpg") },
  { id: 6, name: "뷰카페", img: require("/assets/images/background/1739799352351-15.jpg") },
];


export default function CourseSelect() {
  const navigation = useNavigation();
  const {startDate , endDate } = useRoute().params;
  const [selected, setSelected] = useState([]);


  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


    // 날짜 배열 만들기
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    dates.push(formatDate(new Date(current)));
    current.setDate(current.getDate() + 1);
  }

  //start -end 까지 이빨빠진 날짜 만들기
  //datas = [2025-01-01,2025-01-02,2025-01-03,]

  //배열을 토대로 [{"2025-01-01":[]},{"2025-01-02":[]},{"2025-01-03":[]}]
  const base = dates.reduce((acc, d) => {
    acc[d] = [];  // 기본은 빈 배열
    return acc;
  }, {});

  //설정하고 초기 세팅
  const [datas, setDatas] = useState(base);

  const [modalVisible,setModalVisible] = useState(false)



  const places = [
    { id: 1, name: "수산항 봉수대 전망대", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 2, name: "아이서프", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 3, name: "서프호랑", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 4, name: "힐링서프", img: require("/assets/images/background/1739799352351-15.jpg") },
  ];


  const toggle = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };


  const setScheduleMapping  = (day , ids) => {



    const selectObj = places.filter(p => ids.includes(p.id));
    console.log('selectObj ' , selectObj)

    setDatas( (prev) => ({
      
      ...prev, 
      [day]:selectObj     
       
    }))
    
  }

  console.log('datas' , datas)



  return (
    <View className="flex-1 bg-white px-5 pt-14 h-full">
      <Text className="ext-lg font-semibold mb-3 " >인기 검색어</Text>

      {/* <ScrollView horizontal className="flex-row mb-4 gap-3 w-full"> */}
      <View className="py-2 flex-row flex-wrap  w-full gap-5">
        {["카페", "서핑", "맛집", "온천"].map((v) => (
          <View className=" bg-gray-100 py-4 w-[50px] items-center" key={v}>
            <Text >{v}</Text>
          </View>
        ))}
      </View>
      {/* </ScrollView> */}

      <ScrollView showsVerticalScrollIndicator={false} className="flex-row mb-4">
        <View className="flex-row flex-wrap ">
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
          days={dates}
          ids={selected}
          onClose={() => setModalVisible(false)}
          onSubmit={(day , ids) => {
            console.log('selectedDay', day)
            setScheduleMapping(day , ids);
            setModalVisible(false);
          }}
        />

      <TouchableOpacity
        className="bg-blue-700 py-4 rounded-lg mb-5"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center text-white text-lg font-bold">추가하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-700 py-4 rounded-lg mb-5"
        onPress={() => navigation.navigate("schedule/scheduleResult", { startDate, endDate, datas })}
      >
        <Text className="text-center text-white text-lg font-bold">다음</Text>
      </TouchableOpacity>
    </View>
  );
}
