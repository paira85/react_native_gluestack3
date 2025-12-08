import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from '@/components/ui/icon';
import ScheduleModal from '@/components/schedule/scheduleModal'
import Feather from '@expo/vector-icons/Feather';
import {
  AddIcon,
  MailIcon
}
  from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import html2canvas from "html2canvas";

// import ViewShot from "react-native-view-shot";
// import * as FileSystem from "expo-file-system";
// import { PDFDocument, PageSizes } from 'pdf-lib';


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

export default function ScheduleResult() {
  const { startDate, endDate, datas } = useRoute().params;

  const [modifyData, setModifyData] = useState({ "day": "", "datas": [] })
  const [modalVisible, setModalVisible] = useState(false)
  const totalDays = Object.keys(datas).length - 1; // 3
  const totalNights = Object.keys(datas).length;           // 2

  const [list, setList] = useState(datas);
  const cardRef = useRef(null);

  // for( var key in datas){
  //   console.log('key ' , datas [key])
  // }
  const setModalData = (key, lists) => {
    const data = {
      "day": key,
      "datas": lists
    }
    setModifyData(data)
    setModalVisible(true)
  }

  const setCallback = (key, lists) => {
    setList(prev => ({
      ...prev,
      [key]: lists
    }));

  }

  const setRemoveData = (day, item) => {
    // const ids = datas.filter(item => item.id != data.id);

    let deletedId = item.id
    setList(prev => ({
      ...prev,
      [day]: prev[day].filter(p => p.id !== deletedId)
    }));

    // console.log('setRemoveData',data.id)
  }
  console.log(Object.entries(list))

  const exportPDF = async () => {
    try {
      let uri = null;

      if (Platform.OS === "web") {
        // 웹 캡처
        const element = document.querySelector('[data-id="mySchedule"]')
        console.log('element' , element)
        const canvas = await html2canvas(element);
        uri = canvas.toDataURL("image/png");

        // 웹 다운로드 예시
        const link = document.createElement("a");
        link.href = uri;
        link.download = "schedule.png";
        link.click();

        alert("저장 완료", "웹에서는 이미지 다운로드로 저장됩니다.");
        return;
      }


      if (!(await Sharing.isAvailableAsync())) {
        alert("공유 불가", "이 기기에서는 공유 기능을 사용할 수 없습니다.");
        return;
      }

      uri = await captureRef(cardRef, {
        format: "png",
        quality: 1,
      });

      const saveUri = FileSystem.cacheDirectory + "schedule.png";
      await FileSystem.copyAsync({ from: uri, to: saveUri });

      await Sharing.shareAsync(saveUri, {
        mimeType: "image/png",
        dialogTitle: "일정 공유하기",
      });
    } catch (e) {
      console.log(e);
      alert("오류", "일정 공유 중 오류가 발생했습니다.");
    }
  };

  const saveTrip = () =>{
    console.log('list' , list)

    const flatArray = [];

    list.forEach(([date, items]) => {
      items.forEach(item => {
        flatArray.push({
          date,
          id: item.id,
          name: item.name,
          img: item.img ?? null
        });
      });
    });

    console.log(flatArray);

  }

  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-14" dataSet={{ id: "mySchedule" }}>
      <ViewShot ref={cardRef} dataSet={{ id: "mySchedule" }} >
        {/* 상단 타이틀 영역 */}
        <View className="flex-row justify-between items-center mb-5" >
          <Text className="text-2xl font-bold">내 일정</Text>
        </View>

        {/* <View className="flex-row w-full justify-between px-3 py-2  "> 
          <Text>✨ {startDate} 부터 총 {totalDays}박 {totalNights}일</Text>
          
          <Ionicons name="create-outline" size={24} color="#444" />
        </View> */}

        {/* 지출 금액 요약 */}
        {/* <View className="bg-white p-4 rounded-2xl shadow mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold text-gray-700">총 지출금</Text>
            <Text className="font-bold text-lg text-pink-600">₩ 287,000</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">개인 지출</Text>
            <Text className="font-semibold text-gray-700">₩ 287,000</Text>
          </View>
        </View> */}

        <View className="bg-white p-4 rounded-2xl shadow mb-6">
          <View className="flex-row w-full justify-between px-3 py-2  ">
            <Text>✨ {startDate} 부터 총 {totalDays}박 {totalNights}일</Text>

            <Ionicons name="create-outline" size={24} color="#444" />
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-700">여행 목적</Text>
            <Text className="text-gray-500">2명</Text>
          </View>
          <Text className="text-gray-500">강원도 간편 여행</Text>
        </View>


        {/* DAY별 타임라인 */}
        {Object.entries(list).map(([key, values = []], index) => (
          <View key={index} className="mb-5 bg-gray-200  ">
            <View className="flex-row w-full justify-between px-3 py-2  ">
              <Text className="font-bold mb-3  text-base ">
                {index + 1}일차 <Text className="text-gray-500 text-base ">({key})</Text>
              </Text>
              <Ionicons name="add-circle-outline" size={24} color="black" onPress={(e) => {
                e.stopPropagation();      // 부모 onPress로 전파 막기
                setModalData(key, values)
              }} />
            </View>

            {values?.length > 0 ? (
              values.map((item, i) => (
                <View key={i} className="flex-row">
                  {/* Time */}
                  <View className="w-16">
                    <Text className="text-gray-600 font-medium text-center text-base">{i + 1}</Text>
                  </View>

                  {/* Timeline Line */}
                  <View className="items-center mr-4">
                    <View className="w-3 h-3 rounded-full bg-pink-500" />
                    {i !== values.length - 1 && <View className="w-0.5 h-10 bg-gray-300" />}
                  </View>

                  {/* Content Box */}
                  <View className="flex-1 bg-white p-4 rounded-2xl shadow mb-6 flex-row justify-between" >
                    <Text className="font-semibold text-gray-800">{item.name}</Text>
                    {/* <Text className="mt-1 text-gray-500">₩ {item.price.toLocaleString()}</Text> */}
                    <Feather name="minus-circle" size={22} color="black" onPress={(e) => {
                      e.stopPropagation();
                      setRemoveData(key, item)
                    }} />
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-400 px-1 text-sm">
                등록된 일정이 없습니다.
              </Text>
            )
            }
          </View>
        ))}
      </ViewShot>
      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={modifyData}
        onSubmit={(day, ids) => {
          console.log('selectedDay', day)
          console.log('selectedids', ids)
          setCallback(day, ids);
          setModalVisible(false);
        }}
      />



      <TouchableOpacity className="bg-blue-600 py-4 rounded-2xl mt-4 mb-12" onPress={exportPDF}>
        <Text className="text-center text-white font-bold text-lg">PDF 저장</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-blue-600 py-4 rounded-2xl mt-4 mb-12" onPress={saveTrip}>
        <Text className="text-center text-white font-bold text-lg">저장</Text>
      </TouchableOpacity>


    </ScrollView>

  );
}
