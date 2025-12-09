import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {  Alert, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Input, InputField } from '@/components/ui/input';
import { router } from "expo-router";
//실제 안드로이드 DB
import { useSettlement } from "@/hook/useSettlement";
import { useSQLiteContext } from "expo-sqlite";
//로컬 스토어
import { useSettlementStore } from "../../store/settlementStore";
import { Ionicons } from "@expo/vector-icons";
import { initSettlementDB, insertSettlement , insertGroupSettlement  , getSettlementGroup,  getSettlementRow  , deleteSettlement , updateSettlement} from "@/db/settlementDB";

export default function SettlementFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const group_id = route.params?.group_id;
  const id = route.params?.id;
  const type = route.params?.type;
  
  //로컬 스토어
  // const { listStore , groupStroe , groupAdd , add,  update , remove } = useSettlementStore();
  

  //안드로이드용
  const db = useSQLiteContext();  
  const { list } = useSettlement(db);

  // const existing = listStore.find((d) => String(d.id) === String(id));
  // const groupExisting = groupStroe.find((d) => String(d.id) === String(group_id));
  
  //신규
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("음식");
  const [memo, setMemo] = useState("");
  const [totalPay, setTotalPay] = useState("");
  const [perUser, setPerUser] = useState("");
  const [compareShop, setCompareShop] = useState("");
  const [groupExisting, setGroupExisting ]= useState();
  const [existing, setExisting ]= useState();
  const [items, setItems] = useState([]);
  const categories = ["음식", "교통", "숙박", "쇼핑", "관광", "기타"];


  //안드로이드용
  useEffect(()=>{
    const init = async () => {
        await initSettlementDB(db);
        const groupRows = await getSettlementGroup(db ,group_id );
        console.log('groupRows' , groupRows)
        setGroupExisting(groupRows)
            
        setGroupName(groupRows?.title || "")
        setMembers(groupRows?.members || "")

        const listRows = await getSettlementRow (db, id )
        // const listRows = await getSettlementRowAndGroupId(db , groupRows[0].id);
        console.log('listRows' , listRows)  
        setExisting(listRows)
        
        setTitle(listRows?.title)
        setCategory(listRows?.category)
        setMemo(listRows?.memo)
        setTotalPay(listRows?.pay)
        setPerUser(listRows?.per)
        setCompareShop(listRows?.compare_Shop)
    };
    init();

    // setTitle(existing?.title)
    // setCategory(existing?.category)
    // setMemo(existing?.memo)
    // setTotalPay(existing?.pay)
    // setPerUser(existing?.per)
    // setCompareShop(existing?.compareShop)

  },[group_id , id])


  const  handleSave = async () => {
    
    let group_id = groupExisting ? groupExisting.id :  Date.now();    

    const groupData = {
      id: group_id,
      groupName:groupName,
      members:members,
      complete: 0,
      need: 0,
      total:0
    }

    // 2. 항목들 저장 (루프)

    if (!groupExisting){
      // groupAdd(groupData);
      const groupResult = await insertGroupSettlement(db, groupName ,members,0,0,0,Date.now())
      group_id = groupResult.lastInsertRowId
      console.log('group_id ' , group_id)
    }

    if (existing){
      const pay = parseFloat(totalPay);
      const per = perUser ? parseFloat(perUser) : pay / parseInt(members);

      const newItem = {
        id: id,
        category,
        title,
        memo,
        pay,
        per,
        compareShop,
        group_id,
      };
      // update(id, newItem);
      updateSettlement(db,category,title,memo,pay,per,compareShop, id)
    }else{
      for (let item of items) {
        item["group_id"] = group_id
        if (!existing){        
          // add(item);
          console.log('item ' , item.group_id)
          await insertSettlement(db,item.category,item.title,item.memo ,item.pay , item.per ,  item.compareShop , item.group_id)
        }        
      }
    }


    router.push({
        pathname: "/settlement/settlementList",
        params: { }
    })
    return ;
  };

  const addItem = () =>{
    if (!title || !totalPay) return;

    const pay = parseFloat(totalPay);
    const per = perUser ? parseFloat(perUser) : pay / parseInt(members);

    console.log('perUser' , perUser)
    console.log('perUser' , pay)
    console.log('perUser' , members)
    
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
  

  const handleDelete = () =>{
    if (Platform.OS == "web"){
      if(confirm("삭제하시겠습니까?")){
        // remove(id)
        deleteSettlement(db,id)
        router.push({
            pathname: "/settlement/settlementList",
            params: {   }
        })
      }
    }else{
      Alert.alert(
        "삭제하시겠습니까?",
        "이 작업은 되돌릴 수 없습니다.",
        [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: () => remove(id) }
        ]
      );

    }
    
  }

  return (
    <Box className="flex-1 bg-[#071B3B] px-5 pt-5 pb-40">
      <ScrollView className="">
        {/* ========== 정산 그룹 입력 영역 ========== */}
        <View className="flex-row items-center mb-4">
          <Ionicons name="chevron-back" size={24} color="white"  
                onPress={() => {
                    router.push({
                            pathname: 'settlement/settlementList',
                            params: {
                                
                            }
                        })
                    }
                }
            />
          <Text className="text-white text-xl font-semibold mb-3">정산 그룹 설정</Text>
        </View>
        <View className="bg-[#0F2C63] p-4 rounded-2xl mb-8">
          <Text className="text-gray-200 mb-1">그룹명</Text>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="예: 박&모 정산"
            placeholderTextColor="#aaa"
            editable={!groupExisting}   
            className="text-white bg-[#1A3B7A] px-3 py-2 rounded-xl mb-4"
          />

          <Text className="text-gray-200 mb-1">참여 인원</Text>
          <TextInput
            value={members}
            onChangeText={setMembers}
            keyboardType="numeric"
            placeholder="2"
            placeholderTextColor="#aaa"
            editable={!groupExisting}           
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

          {!existing && 
            <TouchableOpacity
              onPress={addItem}
              className="bg-yellow-300 py-3 rounded-xl mt-2"
            >
              <Text className="text-center font-semibold text-[#071B3B]">
                항목 추가</Text>
            </TouchableOpacity>
          }

          
          {existing &&  existing.complate !='true' &&
            <TouchableOpacity
              onPress={handleSave}
              className="bg-yellow-300 py-3 rounded-xl mt-2"
            >
              <Text className="text-center font-semibold text-[#071B3B]">
                수정 하기
              </Text>
            </TouchableOpacity>
          }

          {existing && 
            <TouchableOpacity
              onPress={handleDelete}
              className="bg-red-300 py-3 rounded-xl mt-2 z-10"
            >
              <Text className="text-center font-semibold text-[#071B3B]">
                삭제 하기
              </Text>
            </TouchableOpacity>
          }
        </View>

        {/* ========== 저장된 항목 리스트 ========== */}
        {items.length > 0 && (
          <View>
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

            
            <Pressable className="bg-gray-300 py-3 rounded-xl mt-2" onPress={handleSave}>
              <Text className="text-center font-semibold text-[#071B3B]">저장하기

              </Text>
            </Pressable>
          </View>
          )
        }  
      </ScrollView>
        

      {/* <Pressable className="bg-gray-600 mt-2" onPress={handleSave}>
        <Text className="text-white font-semibold">등록하기</Text>
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


      <Pressable className="bg-red-600 mt-4" onPress={async () => { 
        
          navigation.goBack(); 
        }}>
          <Text className="text-white font-semibold">뒤로가기</Text>
      </Pressable> */}
    </Box>
  );
}
