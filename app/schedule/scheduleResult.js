import { View, Text, ScrollView, TouchableOpacity, Platform, Pressable } from "react-native";
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
import { useFocusEffect, useNavigation } from "expo-router";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import html2canvas from "html2canvas";

// import ViewShot from "react-native-view-shot";
// import * as FileSystem from "expo-file-system";
// import { PDFDocument, PageSizes } from 'pdf-lib';
import {
  initScheduleDB,
  getScheduleRowId,
  insertTripSchedule,
  getTripScheduleRowId,
  deleteTripSchedule
} from "../../db/scheduleDB";
import { useSQLiteContext } from "expo-sqlite";
import {
    ArrowLeftIcon
}
from 'lucide-react-native';


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
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { groupId, datas } = useRoute().params;
  console.log('groupId', groupId)

  const [modifyData, setModifyData] = useState({ "day": "", "datas": [] })
  const [modalVisible, setModalVisible] = useState(false)
  const [days, setDays] = useState()
  const [nights, setNights] = useState()
  const [peopleCount, setPeopleCount] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [title, setTitle] = useState()
  const [memo, setMemo] = useState()

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

  useEffect(() => {
    const init = async () => {
      await initScheduleDB(db)
      let row = await getScheduleRowId(db, groupId)
      console.log('row', row)
      setDays(row.days)
      setNights(row.nights)
      setPeopleCount(row.peopleCount)
      setTitle(row.title)
      setEndDate(row.endDate)
      setStartDate(row.startDate)
      setMemo(row.memo)
      let tripRows = await getTripScheduleRowId(db, groupId)
      console.log('tripRows', tripRows)

      const dayDates = []
      const result = tripRows.reduce((acc, items) => {
        if (!acc[items.date]) acc[items.date] = [];
        acc[items.date].push(items)
        return acc;
      }, {});
      
      if(tripRows.length>0){
        console.log('result', result)
        setList(result)
      }
    }
    init()

  }, [groupId])

  const exportPDF = async () => {
    try {
      let uri = null;

      if (Platform.OS === "web") {
        // 웹 캡처
        const element = document.querySelector('[data-id="mySchedule"]')
        console.log('element', element)
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

  const saveTrip = async () => {
    console.log('list', list)
    const flatArray = [];

    let days = 0;
    let order = 0;

    await deleteTripSchedule(db , groupId)
    await db.withTransactionAsync(async () => {
      for (let key in list) { 
        days++

        if(list[key].length < 1){
          await insertTripSchedule(db, groupId, days, key, '', '', '', '')
          console.log("저장완료") 
        } 

        for (let j in list[key]) {
          order++;
          let item = list[key][j]
          // flatArray.push({          
          //   tripId:groupId,
          //   day: count,
          //   data:key,
          //   placeId: item.id,
          //   title: item.name,
          //   // img: item.img.uri ?? null
          //   memo:''
          // });
          await insertTripSchedule(db, groupId, days, key, order, item.title?item.title:item.memo, item.id, item.name)
          console.log("저장완료")
        }
      }
    });
    let tripRows = await getTripScheduleRowId(db, groupId)

    const result = tripRows.reduce((acc, items) => {
      if (!acc[items.date]) acc[items.date] = [];
      acc[items.date].push(items)
      return acc;
    }, {});
     
    if(tripRows.length>0){
      setList(result) 
    }
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-14" dataSet={{ id: "mySchedule" }}>
      <ViewShot ref={cardRef} dataSet={{ id: "mySchedule" }} >
        {/* 상단 타이틀 영역 */}
        <View className="flex-row items-center mb-5 gap-3" >
          <Pressable className="w-8 bg-black h-8 rounded-full justify-center items-center "
            onPress={ () => {                       
                navigation.goBack()
            }}>
            <Icon as={ArrowLeftIcon}  className="text-white font-semibold "/>
          </Pressable>
          
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
            <Text>✨ {startDate} 부터 총 {days}박 {nights}일</Text>

            <Ionicons name="create-outline" size={24} color="#444" />
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-700">여행 목적</Text>
            <Text className="text-gray-500">{peopleCount}명</Text>
          </View>
          <Text className="text-gray-500">{memo}</Text>
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

            {
              values.map((item, i) => (
                item.title ? (
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
                    <Text className="font-semibold text-gray-800">{item.title? item.title : "일정이 없습니다."}</Text>
                    {/* <Text className="mt-1 text-gray-500">₩ {item.price.toLocaleString()}</Text> */}
                    <Feather name="minus-circle" size={22} color="black" onPress={(e) => {
                      e.stopPropagation();
                      setRemoveData(key, item)
                    }} />
                  </View>
                </View>
                ) : ( 
                <Text className="text-gray-400 px-1 text-sm">
                  등록된 일정이 없습니다.
                </Text>
                ) 
              ))
            }
          </View>
        ))}
      </ViewShot>
      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={modifyData}
        onSubmit={(day, ids) => {
          setCallback(day, ids);
          setModalVisible(false);
        }}
      />
      <TouchableOpacity className="bg-blue-600 py-4 rounded-2xl mt-4 mb-12" onPress={saveTrip}>
        <Text className="text-center text-white font-bold text-lg">저장</Text>
      </TouchableOpacity>

      {list.length > 0 ? (
      <TouchableOpacity className="bg-blue-600 py-4 rounded-2xl mt-4 mb-12" onPress={exportPDF}>
        <Text className="text-center text-white font-bold text-lg">PDF 저장</Text>
      </TouchableOpacity>
      ):(<></>)}



    </ScrollView>

  );
}
