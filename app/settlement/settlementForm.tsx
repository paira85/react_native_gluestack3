import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {  Pressable, Text, TextInput } from "react-native";
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

  //안드로이드용
  useEffect(()=>{
    setTitle(existing?.title || "")
    setDate(existing?.date || "")
    setAmount(existing?.amount || "")
  },[existing])

  const  handleSave = async () => {
    const data = { title, date, amount: parseInt(amount) };
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

  return (
    <Box className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-6">
        {existing ? "정산 수정" : "정산 입력"}
      </Text>

    <Text className="text-typography-500">항목명</Text>
      <TextInput className="mb-3" placeholder="항목명" value={title} onChangeText={setTitle} />
      <Text className="text-typography-500">날짜</Text>
      <TextInput className="mb-3" placeholder="날짜(YYYY-MM-DD)" value={date} onChangeText={setDate} />
      {/* <Input className="mb-3" placeholder="금액" valuse={amount} onChangeText={setAmount} keyboardType="numeric" /> */}

        <Text className="text-typography-500">금액</Text>
        <Input textAlign="center" >
            <InputField type='text'  placeholder="금액" value={amount}  onChangeText={setAmount} keyboardType="numeric"/>
            {/* <InputSlot className="pr-3" onPress={handleState} >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot> */}
        </Input>
        
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
