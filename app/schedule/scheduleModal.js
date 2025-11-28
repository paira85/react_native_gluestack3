import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from "@/components/ui/radio";
import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { RadioButton } from 'react-native-paper';   // 라디오 UI 편하게
import {
    CircleIcon
}
    from 'lucide-react-native';

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];




export default function DaySelectModal({ visible, onClose, onSubmit, days , ids}) {
  const [selectedDay, setSelectedDay] = useState(null);
  const places = [
    { id: 1, name: "수산항 봉수대 전망대", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 2, name: "아이서프", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 3, name: "서프호랑", img: require("/assets/images/background/1739799352351-15.jpg") },
    { id: 4, name: "힐링서프", img: require("/assets/images/background/1739799352351-15.jpg") },
  ];

    
  const parsedDays = days.map((item, idx) => {
    let d = new Date(item)
    const year = d.getFullYear() ;
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const week = dayNames[d.getDay()];
    return {
      id: idx+ 1,
      label: `[DAY${idx + 1}] ${year}-${month}-${day} (${week})`,
      date: item // 원본 날짜 필요하면 유지
    };
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-4">
        <View className="w-full bg-white rounded-2xl p-5 max-h-[70%]">

          {/* 제목 */}
          <Text className="text-lg font-bold mb-4">날짜선택</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <RadioGroup value={selectedDay} onValueChange={setSelectedDay}>
            {parsedDays.map((item, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => setSelectedDay(item.date)}
                className="py-4 border-b border-gray-200 flex-row justify-between items-center"
              >
                <Text className="text-base">{item.label}</Text>
                {/* <RadioButton
                  value={item.label}
                  status={selectedDay?.label === item.label ? "checked" : "unchecked"}
                  onPress={() => setSelectedDay(item)}
                /> */}
                <Radio value={item.date} >
                    <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>선택</RadioLabel>
                </Radio>
                
              </TouchableOpacity>
            ))}
            </RadioGroup>
          </ScrollView>

          {/* 버튼 */}
          <View className="flex-row mt-5">
            <TouchableOpacity 
              onPress={onClose}
              className="flex-1 py-3 bg-gray-200 rounded-xl mr-2"
            >
              <Text className="text-center font-semibold">닫기</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                onSubmit(selectedDay , ids)
              }}
              className="flex-1 py-3 bg-blue-600 rounded-xl ml-2"
            >
              <Text className="text-center text-white font-semibold">추가하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
