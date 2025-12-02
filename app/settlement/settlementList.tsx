import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Platform, Pressable, View } from "react-native";
import { Button, Text } from "react-native";
import SettlementItem from "../../components/settlement/SettlementItem";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { Divider } from "@/components/ui/divider";
import { useSettlementStore } from "@/store/settlementStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettlementListScreen() {
    const navigation = useNavigation();
    // const { list, initialized } = useSettlementStore();
    const { list, initialized, init, add, update, remove } = useSettlementStore();


    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [editId, setEditId] = useState(null);
    // const [list, setList] w= useState([]);
    const [loading, setLoading] = useState(false);

    // 📌 합계 계산
    const totalAmount = useMemo(() => {
        return list.reduce((sum, x) => sum + Number(x.amount || 0), 0);
    }, [list]);


    useEffect(()=>{
        init()
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
