import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {  Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Input, InputField } from '@/components/ui/input';
import { router } from "expo-router";
//실제 안드로이드 DB
import { insertSettlement , updateSettlement , deleteSettlement}  from '@/db/settlementDB'
import { useSettlement } from "@/hook/useSettlement";
import { useSQLiteContext } from "expo-sqlite";
//로컬 스토어
import { useSettlementStore } from "../../store/settlementStore";

export default function SettlementFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  //로컬 스토어
  const { add, update, remove } = useSettlementStore();
  
  //안드로이드용
  const db = useSQLiteContext();  
  const { list } = useSettlement(db);

  const existing = list.find((d) => String(d.id) === String(id));

  //로컬 스토어
  const [title, setTitle] = useState(existing?.title || "");
  const [date, setDate] = useState(existing?.date || "");
  const [amount, setAmount] = useState(existing?.amount?.toString() || "");

  //신규
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("2");
  const [groupMemo, setGroupMemo] = useState("");

  const [category, setCategory] = useState("음식");
  const [memo, setMemo] = useState("");
  const [totalPay, setTotalPay] = useState("");
  const [perUser, setPerUser] = useState("");
  const [compareShop, setCompareShop] = useState("");

  const [items, setItems] = useState([]);

  const categories = ["음식", "교통", "숙박", "쇼핑", "관광", "기타"];

  //안드로이드용
  useEffect(()=>{
    setTitle(existing?.title || "")
    setDate(existing?.date || "")
    setAmount(existing?.amount || "")
  },[existing])

  const  handleSave = async () => {
    const data = { title, date, amount: parseInt(amount) };

    console.log('items', items)

    // 2. 항목들 저장 (루프)
    for (const item of items) {
      if (existing){
        add(item);
      }
    }
    
    return ;

    if (existing){
      update(id, data);
      // const result = await db.runAsync(
      //   `UPDATE settlement SET title = ?, amount = ? , date = ? WHERE id = ?`,
      //   [data.title, data.amount, data.date, data.id]
      // )
      ;
      const result = await updateSettlement(db, id,data.title, data.amount, data.date)
      console.log('result' , result)

    } 
    else{
      add(data);
      const result = await insertSettlement(db, data.title, data.amount, data.date)
      // const result = await db.runAsync(
      //   `INSERT INTO settlement (title, amount, date, created_at)
      //   VALUES (?, ?, ?, ?)`,
      //   [data.title, data.amount, data.date, new Date().toISOString()]
      // );
      console.log('result' , result)
    } 

    router.push({
        pathname: "/settlement/settlementResult",
        params: { type: existing ? "update" : "add"  }
    })
  };

  const addItem =() =>{
    if (!title || !totalPay) return;

    const pay = parseFloat(totalPay);
    const per = perUser ? parseFloat(perUser) : pay / parseInt(members);

    
    const newItem = {
      id: Date.now(),
      category,
      title,
      memo,
      pay,
      per,
      compareShop,
    };


    setItems([...items, newItem]);

    setTitle("");
    setMemo("");
    setTotalPay("");
    setPerUser("");
    setCompareShop("");
  }


  return (
    <Box className="flex-1 bg-[#071B3B] px-5 pt-5 pb-40">
      <ScrollView className="">
        {/* ========== 정산 그룹 입력 영역 ========== */}
        <Text className="text-white text-xl font-semibold mb-3">정산 그룹 설정</Text>

        <View className="bg-[#0F2C63] p-4 rounded-2xl mb-8">
          <Text className="text-gray-200 mb-1">그룹명</Text>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="예: 박&모 정산"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          <Text className="text-gray-200 mb-1">참여 인원</Text>
          <TextInput
            value={members}
            onChangeText={setMembers}
            keyboardType="numeric"
            placeholder="2"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          {/* <Text className="text-gray-200 mb-1">메모</Text>
          <TextInput
            value={groupMemo}
            onChangeText={setGroupMemo}
            placeholder="메모를 입력하세요"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl"
          /> */}
        </View>

        {/* ========== 정산 항목 입력 영역 ========== */}
        <Text className="text-white text-xl font-semibold mb-3">정산 항목 입력</Text>

        <View className="bg-[#0F2C63] p-4 rounded-2xl mb-8">

          {/* 카테고리 */}
          <Text className="text-gray-200 mb-1">카테고리</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {categories.map((c) => {
              const active = c === category;
              return (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCategory(c)}
                  className={`px-4 py-2 mr-2 rounded-full border 
                    ${active ? "bg-yellow-300 border-yellow-200" : "bg-[#1A3B7A] border-[#2F4C90]"}`}
                >
                  <Text className={`${active ? "text-[#071B3B]" : "text-white"} font-semibold`}>
                    {c}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* 제목 */}
          <Text className="text-gray-200 mb-1">항목 제목</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="예: 점심식사"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          {/* 메모 */}
          <Text className="text-gray-200 mb-1">메모</Text>
          <TextInput
            value={memo}
            onChangeText={setMemo}
            placeholder="메모 입력"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          {/* 총 지출액 */}
          <Text className="text-gray-200 mb-1">총 지출액</Text>
          <TextInput
            value={totalPay}
            onChangeText={setTotalPay}
            keyboardType="numeric"
            placeholder="예: 23232"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          {/* 인당 금액 */}
          <Text className="text-gray-200 mb-1">인당 금액 (자동 계산 가능)</Text>
          <TextInput
            value={perUser}
            onChangeText={setPerUser}
            keyboardType="numeric"
            placeholder="입력 안 하면 자동 계산됨"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          {/* 비교 장소 */}
          <Text className="text-gray-200 mb-1">비교 장소</Text>
          <TextInput
            value={compareShop}
            onChangeText={setCompareShop}
            placeholder="예: 중국집"
            placeholderTextColor="#aaa"
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          <TouchableOpacity
            onPress={addItem}
            className="bg-yellow-300 py-3 rounded-xl mt-2"
          >
            <Text className="text-center font-semibold text-[#071B3B]">항목 추가</Text>
          </TouchableOpacity>
        </View>

        {/* ========== 저장된 항목 리스트 ========== */}
        <Text className="text-white text-xl font-semibold mb-3">입력된 정산 항목</Text>

        {items.map((item) => (
          <View key={item.id} className="bg-[#0F2C63] p-4 rounded-2xl mb-4">
            <Text className="text-yellow-300 font-semibold">{item.category}</Text>
            <Text className="text-white text-lg">{item.title}</Text>
            <Text className="text-gray-400">{item.memo}</Text>

            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-300">총지출액</Text>
              <Text className="text-white">KRW {item.pay.toLocaleString()}</Text>
            </View>

            <View className="flex-row justify-between mt-1">
              <Text className="text-gray-300">인당금액</Text>
              <Text className="text-white">KRW {item.per.toLocaleString()}</Text>
            </View>

            <Text className="text-green-400 text-right mt-2">
              ● 비교 : {item.compareShop || "-"}
            </Text>
          </View>
        ))}

      </ScrollView>
        

      <Pressable className="bg-blue-600 mt-2" onPress={handleSave}>
        <Text className="text-white font-semibold">{existing ? "수정하기" : "등록하기"}</Text>
      </Pressable>

      {existing && (
        <Pressable className="bg-red-600 mt-4" onPress={async () => { 
          remove(id); 
          await deleteSettlement(db,id)
          navigation.goBack(); 
        }}>
          <Text className="text-white font-semibold">삭제하기</Text>
        </Pressable>
      )}
    </Box>
  );
}
