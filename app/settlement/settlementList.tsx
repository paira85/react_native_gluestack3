import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  FlatList,  Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { Divider } from "@/components/ui/divider";
import { SafeAreaView } from "react-native-safe-area-context";
import SettlementItem from "@/components/settlement/SettlementItem";
import { useSettlement } from "@/hook/useSettlement";
import { useSQLiteContext } from "expo-sqlite";
//로컬 스토어
import { useSettlementStore } from "../../store/settlementStore";
import { Ionicons } from "@expo/vector-icons";

export default function SettlementListScreen() {
    const navigation = useNavigation();
    //안드로이드용
    const db = useSQLiteContext();
    const { list,initialized , refresh} = useSettlement(db);
    const { list,initialized , refresh} = useSettlementStore();
        
    // 📌 합계 계산
    const totalAmount = useMemo(() => {
        return list.reduce((sum, x) => sum + Number(x.amount || 0), 0);
    }, [list]);

    // const [state, set] = useState({ list: [], initialized: false });
   
    useEffect( ()=>{
        console.log('SettlementListScreen useEffect')
        
        // 안드로이드용
        // const init = async () => {
        //     await db.execAsync(`
        //         CREATE TABLE IF NOT EXISTS settlement (
        //             id INTEGER PRIMARY KEY AUTOINCREMENT,
        //             title TEXT,
        //             amount INTEGER,
        //             date TEXT,
        //             test TEXt,
        //             created_at TEXT
        //         );
        //     `);
        //     const rows = await db.getAllAsync("SELECT * FROM settlement;");
        //     console.log("rows:", rows);

        //     setList(rows);
        // };

        // init();
    },[])

    
    const summary = {
        total: 25000,
        members: 2,
        complete: 0,
        need: 1,
    };

    const members = [
        {
        id: 1,
        name: "사용자",
        role: "생성자",
        actual: 25000,
        share: 12500,
        type: "receive",
        },
        {
        id: 2,
        name: "동반자",
        role: "",
        actual: 0,
        share: 12500,
        type: "pay",
        },
    ];
    

    
    // 예시 데이터
    const settlementGroups = [
    {
        id: "group1",
        name: "박&모 정산",
        summary: {
        total: 23355,
        members: 2,
        perUser: 456,
        pending: 123,
        complete: 0,
        need: 1,
        },
        items: [
        {
            id: 1,
            category: "음식",
            title: "123",
            memo: "123",
            pay: 123,
            settle: 123,
            result: 123,
        },
        {
            id: 2,
            category: "음식",
            title: "33",
            memo: "222",
            pay: 23232,
            settle: 23232,
            result: 23232,
        },
        ],
    },
    {
        id: "group2",
        name: "부산 여행 정산",
        summary: {
        total: 70200,
        members: 3,
        perUser: 23400,
        pending: 1000,
        complete: 1,
        need: 3,
        },
        items: [],
    },
    ];

     const [selected, setSelected] = useState(settlementGroups[0]);


    return (        
        <SafeAreaView className="bg-white flex-1" >
            <ScrollView className="flex-1 bg-[#0B1C3F] px-5 pt-4">
                {/* Back Button */}
                <View className="flex-row items-center mb-4">
                    <Ionicons name="chevron-back" size={24} color="white" />
                    <Text className="text-white text-xl font-semibold ml-2">
                    정산 내역
                    </Text>
                </View>

                <View className="bg-[#0F2C63] p-3 rounded-xl">
                    {settlementGroups.map((g) => (
                        <TouchableOpacity
                        key={g.id}
                        className="py-2"
                        onPress={() => setSelected(g)}
                        >
                        <Text
                            className={`${
                            selected.id === g.id ? "text-yellow-300" : "text-white"
                            } text-base`}
                        >
                            {g.name}
                        </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                

                {/* Summary Card */}
                <View className="bg-[#0F2C63] p-4 rounded-2xl mb-6">
                    <Text className="text-lg text-white font-semibold mb-3">
                        박&모 정산
                    </Text>

                    <View className="flex-row justify-between mb-1">
                        <Text className="text-gray-300">총 지출</Text>
                        <Text className="text-yellow-300 font-semibold">
                            {totalAmount.toLocaleString()}원
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-1">
                        <Text className="text-gray-300">참여 인원</Text>
                        <Text className="text-yellow-300 font-semibold">
                            {summary.members}명
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600">1인당 부담액</Text>
                        <Text className="font-semibold">
                            456원
                        </Text>
                    </View>

                    <View className="flex-row justify-between mt-3">
                        <Text className="text-gray-700 font-semibold">미정산 금액</Text>

                        <Text
                            className={`font-bold text-green-600}`}
                        >    123
                        </Text>
                    </View>
                    

                    <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-300">정산 완료</Text>
                        <Text className="text-yellow-300 font-semibold">
                            {summary.complete}/{summary.need}
                        </Text>
                    </View>

                    <View className="flex-row space-x-3 mt-3">
                        <TouchableOpacity className="flex-1 bg-yellow-300 py-3 rounded-xl">
                            <Text className="text-center text-[#0B1C3F] font-semibold">
                            정산 하기
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 bg-[#1F3B7A] py-3 rounded-xl">
                            <Text className="text-center text-white font-semibold">
                            내역 공유
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Member List */}
                <Text className="text-white text-lg font-semibold mb-3">
                    정산 현황
                </Text>
                
                <View className="space-y-4 pb-20">
                {list.map((m) => (
                    <View
                        key={m.id}
                        className="bg-[#0F2C63] p-4 rounded-2xl border border-[#223B7F]"
                    >
                        {/* Profile Row */}
                        <View className="flex-row items-center mb-3">
                        <View className={`w-10 h-10 rounded-full justify-center items-center bg-yellow-300`}>
                            <Text className="text-[#0B1C3F] font-bold">
                                음식
                            </Text>
                        </View>

                        <View className="ml-3">
                            <Text className="text-white font-semibold">{m.title}</Text>
                            <Text className="text-gray-300 text-sm"> {m.date}</Text>
                        </View>
                        </View>

                        {/* Values */}
                        <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-300">총지출액</Text>
                        <Text className="text-white">
                            KRW {m.amount.toLocaleString()}
                        </Text>
                        </View>

                        <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-300">인당금액</Text>
                        <Text className="text-white">
                            KRW {(m.amount /2).toLocaleString()}
                        </Text>
                        </View>

                        {/* Result */}
                       
                        <Text className="text-green-400 font-bold text-right">
                            ● 비고 : 중국집
                        </Text>
                    </View>
                    ))}
                </View>
            </ScrollView>        
            

            {/* 등록 버튼 */}
           
            <Pressable
                onPress={(item) =>
                    router.push({
                        pathname: "/settlement/settlementForm",
                        params: { id: '' }
                    })}
                activeOpacity={0.8}
                className="
                    absolute bottom-8 left-6
                    w-16 h-16 rounded-full
                    bg-neutral-800
                    justify-center items-center
                    shadow-lg
                "
                style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 5,
                }}
                >
                <Ionicons name="add" size={30} color="white" />
            </Pressable>
        </SafeAreaView>
    );
}
