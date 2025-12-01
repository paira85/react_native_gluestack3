import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {  Pressable, Text, TextInput } from "react-native";
import { useSettlementStore } from "../../store/settlementStore";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { router } from "expo-router";

export default function SettlementFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const { list, add, update, remove } = useSettlementStore();
  console.log('list' ,list)
  console.log('id' ,id)
  const existing = list.find((d) => String(d.id) === String(id));
  console.log('existing' ,existing)

  const [title, setTitle] = useState(existing?.title || "");
  const [date, setDate] = useState(existing?.date || "");
  const [amount, setAmount] = useState(existing?.amount?.toString() || "");

  const handleSave = () => {
    const data = { title, date, amount: parseInt(amount) };
    console.log('amount' , amount)
    if (existing) update(id, data);
    else add(data);


    router.push({
            pathname: "/settlement/settlementResult",
            params: { type: existing ? "update" : "add"  }
        })
    // navigation.navigate(
    //     "/settlement/settlementResult"
    //     , {
    //         type: existing ? "update" : "add" 
    //     });
  };

  const [showPassword, setShowPassword] = React.useState(true);
//   const handleState = () => {
//     setShowPassword((showState) => {
//       return !showState;
//     });
//   };

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
            <InputField type={showPassword ? 'text' : 'password'}  placeholder="금액" value={amount}  onChangeText={setAmount} keyboardType="numeric"/>
            {/* <InputSlot className="pr-3" onPress={handleState} >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot> */}
        </Input>
        
      <Pressable className="bg-blue-600 mt-2" onPress={handleSave}>
        <Text className="text-white font-semibold">{existing ? "수정하기" : "등록하기"}</Text>
      </Pressable>

      {existing && (
        <Pressable className="bg-red-600 mt-4" onPress={() => { remove(id); navigation.goBack(); }}>
          <Text className="text-white font-semibold">삭제하기</Text>
        </Pressable>
      )}
    </Box>
  );
}
