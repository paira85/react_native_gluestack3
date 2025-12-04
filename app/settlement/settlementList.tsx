import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  FlatList,  Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { Box } from "@/components/ui/box";
import { router, useFocusEffect } from "expo-router";
import { Divider } from "@/components/ui/divider";
import { SafeAreaView } from "react-native-safe-area-context";
import SettlementItem from "@/components/settlement/SettlmementModal";
import { useSettlement } from "@/hook/useSettlement";
import { useSQLiteContext } from "expo-sqlite";
//로컬 스토어
import { useSettlementStore } from "../../store/settlementStore";
import { Ionicons } from "@expo/vector-icons";
import SettlmementModal from "@/components/settlement/SettlmementModal";

export default function SettlementListScreen() {
    const navigation = useNavigation();
    //안드로이드용
    const db = useSQLiteContext();
    const { list,initialized , refresh} = useSettlement(db);
    const { listStore , groupStroe , update} = useSettlementStore();

    const [selected, setSelected] = useState(0);
    const [groupSelected, setGroupSelected] = useState(0);
    const groupData = groupStroe.filter(item => String(item.id) === String(groupSelected))
    const [modalVisible , setModalVisible] = useState(false)

    console.log('groupData' , groupData)
        
    // 📌 합계 계산
    // const totalAmount = useMemo(() => {
    //     return list.reduce((sum, x) => sum + Number(x.amount || 0), 0);
    // }, [list]);


    const selectList = listStore.filter( m => String(m.group_id) === String(selected))
    
    const totalAmount = useMemo(() => {
        // return selectList.reduce(
        //     (sum, x) => ({
        //     pay : sum.pay + Number(x.pay||0),
        //     per : sum.per + Number(x.per||0),
        //     }),
        //     {pay:0,per:0}
        // );

        return selectList.reduce(
            (sum, x) => ({
                pay: sum.pay + Number(x.pay || 0),
                per: sum.per + (x.complate == true ? 0  :  Number(x.per || 0)),
                complate: sum.complate + (x.complate == true ? 1 :  0),
                need: sum.need +  (x.complate == true ? 0  :  x.pay),
                total: sum.total + 1,
            }),
            { pay: 0, per: 0 , complate:0, need:0, total:0} // 초기값
        );
    }, [selectList ]);

    // const [state, set] = useState({ list: [], initialized: false });
   
    useEffect( ()=>{
        // console.log('SettlementListScreen useEffect')
        
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
        if(! groupSelected){
            setGroupSelected(groupStroe[0]?.id)
            setSelected(groupStroe[0]?.id)
        }

    },[])


    useFocusEffect(
        useCallback(() => {
        if(! groupSelected){
            console.log('useCallback' , groupStroe)
            setGroupSelected(groupStroe[0]?.id)
        }
        }, [])
    );



    return (        
        <SafeAreaView className="bg-white flex-1" >
            <ScrollView className="flex-1 bg-[#0B1C3F] px-5 pt-4">
                {/* Back Button */}
                <View className="flex-row items-center mb-4">
                    <Ionicons name="chevron-back" size={24} color="white"  
                        onPress={() => {
                            router.push({
                                    pathname: '../',
                                    params: {
                                        
                                    }
                                })
                            }
                        }
                    />
                    <Text className="text-white text-xl font-semibold ml-2">
                    정산 내역
                    </Text>
                </View>

                <View className="bg-[#0F2C63] p-3 rounded-xl flex-row gap-4 ">
                    {groupStroe?.map((g,idx) => (
                        <TouchableOpacity
                        key={idx}
                        className="py-2"
                        onPress={() => {
                                setGroupSelected(g.id)
                                setSelected(g.id)
                            }
                        }
                        >
                        <Text
                            className={`bg-white py-3 ${
                            selected.id === g.id ? "text-yellow-300" : "text-gray"
                            } text-base`}
                        >
                            {g.groupName}
                        </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                

                {/* Summary Card */}
                <View className="bg-[#0F2C63] p-4 rounded-2xl mb-6">

                    <TouchableOpacity
                        className="py-2"
                        onPress={() => 
                            router.push({
                                pathname: "/settlement/settlementForm",
                                params: {
                                    group_id : groupData[0]?.id, 
                                    type:"group",
                                    id :""

                                }
                            })
                        }
                        >
                        <Text className="text-lg text-white font-semibold mb-3">
                            {groupData.length > 0  && groupData[0].groupName}
                        </Text>

                        <View className="flex-row justify-between mb-1">
                            <Text className="text-gray-300">총 지출</Text>
                            <Text className="text-yellow-300 font-semibold">
                                {totalAmount.pay}원
                            </Text>
                        </View>

                        <View className="flex-row justify-between mb-1">
                            <Text className="text-gray-300">참여 인원</Text>
                            <Text className="text-yellow-300 font-semibold">
                                {groupData.length > 0  && groupData[0].members}명
                            </Text>
                        </View>

                    

                        <View className="flex-row justify-between mt-3">
                            <Text className="text-red-500 font-semibold">미정산 금액</Text>
                            <Text
                                className={`font-bold text-red-500`}
                            >    {totalAmount.need}원
                            </Text>
                        </View>

                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-300">1인당 부담액</Text>
                            <Text className="text-yellow-300 font-semibold"> 
                                {totalAmount.per}원
                            </Text>
                        </View>
                        

                        <View className="flex-row justify-between mb-3">
                            <Text className="text-gray-300">정산 완료</Text>
                            <Text className="text-yellow-300 font-semibold">
                                {totalAmount.complate}/{totalAmount.total}건
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <View className="flex-row space-x-3 mt-3">
                        <TouchableOpacity className="flex-1 bg-yellow-300 py-3 rounded-xl"
                            onPress={ () => setModalVisible(true)}
                        >
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
                    
                {listStore && listStore
                    .filter(m => String(m.group_id) === String(selected))
                    .map((m) => (

                        <TouchableOpacity
                        key={m.id}
                        className="py-2"
                        onPress={() => 
                            router.push({
                                pathname: "/settlement/settlementForm",
                                params: {
                                    group_id : groupData[0]?.id, 
                                    type:"list",
                                    id :m.id

                                }
                            })
                        }
                        >
                        <View
                            
                            className="bg-[#0F2C63] p-4 rounded-2xl border border-[#223B7F]"
                        >
                            {/* Profile Row */}
                            <View className="flex-row items-center mb-3">
                            <View className={`w-10 h-10 rounded-full justify-center items-center bg-yellow-300`}>
                                <Text className="text-[#0B1C3F] font-bold">
                                    {m.category}
                                </Text>
                            </View>

                            <View className="ml-3">
                                <Text className="text-white font-semibold">{m.title}</Text>
                                <Text className="text-gray-300 text-sm"> {m.created_at}</Text>
                            </View>
                            </View>

                            {/* Values */}
                            <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-300">총지출액</Text>
                            <Text className="text-white">
                                KRW {m.pay.toLocaleString()}
                            </Text>
                            </View>

                            <View className="flex-row justify-between mb-3">
                                <Text className="text-gray-300">인당금액</Text>
                                <Text className="text-white">
                                    KRW {m.per.toLocaleString()}
                                </Text>
                            </View>

                            {/* Result */}
                        
                            <View className="flex-row justify-between mb-3">
                                
                                    {m.complate == true ? 
                                    (<Text className="text-green-500 font-bold ">정산완료</Text>): 
                                    (<Text className="text-red-500 font-bold ">정산대기</Text>)
                                    }
                                
                                <Text className="text-white text-right">
                                    비고 : {m.memo}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )
                   
                    )}
                </View>
            </ScrollView>        
            
            <SettlmementModal
                visible={modalVisible}
                data={selectList.filter(item => (item.complate !== true))}
                onClose={() => setModalVisible(false)}
                onSubmit={(ids) => {
                    console.log('selectedDay', ids)
                    const updateDate = selectList.filter( item => (item.id === ids))
                    update(ids, {
                        ...updateDate
                        ,complate:true
                    });

                }}
            />
                

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
