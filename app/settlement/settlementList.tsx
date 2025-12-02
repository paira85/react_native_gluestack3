import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  FlatList,  Pressable } from "react-native";
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

export default function SettlementListScreen() {
    const navigation = useNavigation();
    //안드로이드용
    const db = useSQLiteContext();
    const { list,initialized , refresh} = useSettlement(db);
        
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
    return (        
        <SafeAreaView className="bg-white flex-1" >
        <Box className="flex-1 p-4 bg-gray-100 top-10">
            <Text className="text-2xl font-bold mb-4">정산 내역</Text>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SettlementItem item={item} onPress={() =>
                        router.push({
                            pathname: "/settlement/settlementForm",
                            params: { id: item.id }
                        })

                    } />
                )}
            />

            {/* 🔥 총 합산 영역 */}
            <Box className="bg-white p-4 rounded-xl shadow mt-3 py-4 bottom-10">
                <Text className="text-lg font-semibold text-gray-700">총 합계</Text>
                <Divider className="my-2" />
                <Text className="text-2xl font-bold text-blue-600">
                    {totalAmount.toLocaleString()} 원
                </Text>
            </Box>

            {/* 등록 버튼 */}
            <Pressable
                className="mt-6 bg-blue-600 py-4 bottom-10"
                onPress={(item) =>
                    router.push({
                        pathname: "/settlement/settlementForm",
                        params: { id: '' }
                    })

                }
            >
                <Text className="text-white font-semibold">+ 정산 입력</Text>
            </Pressable>
        </Box>
        </SafeAreaView>
    );
}
