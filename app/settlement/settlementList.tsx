import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

import { router, useFocusEffect } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { useSettlement } from "@/hook/useSettlement";
import { useSQLiteContext } from "expo-sqlite";
//로컬 스토어
import { useSettlementStore } from "../../store/settlementStore";
import { Ionicons } from "@expo/vector-icons";
import SettlmementModal from "@/components/settlement/SettlmementModal";
import { initSettlementDB, getSettlementGroupRows, getSettlementRowAndGroupId, getSettlementRows, updateSettlementComplate } from "@/db/settlementDB";
import { SettlementShare } from "@/components/settlement/SettlementShare";
import SettlementSubModal from "@/components/settlement/SettlementSubModal";


export default function SettlementListScreen() {
    const navigation = useNavigation();
    //안드로이드용
    const db = useSQLiteContext();
    // const { listStore , groupStroe , update} = useSettlementStore();

    const [selected, setSelected] = useState(0);
    const [groupSelected, setGroupSelected] = useState(0);
    const [groupList, setGroupList] = useState([])
    const [list, setList] = useState([])
    // const groupData = groupStroe.filter(item => String(item.id) === String(groupSelected))
    const groupData = groupList.filter(item => String(item.id) === String(groupSelected))
    const [modalVisible, setModalVisible] = useState(false)
    const [subModalVisible, setSubModalVisible] = useState(false)
    
    console.log('groupData', groupData)


    // const selectList = listStore.filter( m => String(m.group_id) === String(selected))
    const selectList = list.filter(m => String(m.group_id) === String(selected))

    const totalAmount = useMemo(() => {

        return selectList.reduce(
            (sum, x) => ({
                pay: sum.pay + Math.round(x.pay),
                per: sum.per + Math.round(x.per),
                complate: sum.complate + (x.complate == 'true' ? 1 : 0),
                need: sum.need + (x.complate == 'true' ? 0 : Math.round(x.pay)),
                total: sum.total + 1,
            }),
            { pay: 0, per: 0, complate: 0, need: 0, total: 0 } // 초기값
        );
    }, [selectList]);

    // const [state, set] = useState({ list: [], initialized: false });
    const init = async () => {
        await initSettlementDB(db);
        const groupRows = await getSettlementGroupRows(db);
        setGroupList(groupRows)
        if (groupRows.length > 0) {
            setGroupSelected(groupRows[0].id)
            setSelected(groupRows[0].id)

            const listRows = await getSettlementRows(db)
            // const listRows = await getSettlementRowAndGroupId(db , groupRows[0].id);
            console.log('listRows', listRows)
            setList(listRows)
        }
    };

    const lists = async () => {
        // const listRows = await getSettlementRows    (db)
        const listRows = await getSettlementRowAndGroupId(db, groupSelected);
        console.log('listRows', listRows)
        setList(listRows)
    };

    const reload = async () => {

        setGroupSelected(groupSelected)
        const listRows = await getSettlementRowAndGroupId(db, groupSelected);
        console.log('listRows', listRows)
        setList(listRows)
    }

    useEffect(() => {
        lists();
    }, [])

    useEffect(() => {
        const init = async () => {
            // const listRows = await getSettlementRows    (db)
            const listRows = await getSettlementRowAndGroupId(db, groupSelected);
            console.log('listRows', listRows)
            setList(listRows)
        };
        init();
    }, [selected])


    useFocusEffect(
        useCallback(() => {
            init();
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
                                pathname: '../main',
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

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row px-2 py-1"
                >
                    {/* {groupStroe?.map((g,idx) => ( */}
                    {groupList?.map((g, idx) => (

                        <TouchableOpacity
                            key={idx}
                            className="py-2"
                            onPress={() => {
                                setGroupSelected(g.id)
                                setSelected(g.id)
                            }
                            }
                            className={`px-3 py-1 rounded-md mr-2 ${selected.id === g.id ? "bg-yellow-300" : "bg-white"}`}
                        >
                            <Text
                                className={'text-base'}
                            >
                                {/* {g.groupName} */}
                                {g.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>


                {/* Summary Card */}
                <View className="bg-[#0F2C63] p-4 rounded-2xl mb-6">

                    <TouchableOpacity
                        className="py-2"
                        onPress={() =>
                            router.push({
                                pathname: "/settlement/settlementForm",
                                params: {
                                    group_id: groupData[0]?.id,
                                    type: "group",
                                    id: ""

                                }
                            })
                        }
                    >
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-lg text-white font-semibold mb-3">
                                {groupList.length > 0 && groupList[0].title}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("GroupEdit", { group })}>
                                <Text className="text-white">✏ 수정</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row justify-between mb-1">
                            <Text className="text-gray-300">총 지출</Text>
                            <Text className="text-yellow-300 font-semibold">
                                {totalAmount.pay}원
                            </Text>
                        </View>

                        <View className="flex-row justify-between mb-1">
                            <Text className="text-gray-300">참여 인원</Text>
                            <Text className="text-yellow-300 font-semibold">
                                {groupList.length > 0 && groupList[0].members}명
                            </Text>
                        </View>



                        <View className="flex-row justify-between mt-3">
                            <Text className="text-red-500 font-semibold">미정산 금액</Text>
                            <Text
                                className={`font-bold text-red-500`}
                            >    {totalAmount.need.toLocaleString()}원
                            </Text>
                        </View>

                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-300">1인당 부담액</Text>
                            <Text className="text-yellow-300 font-semibold">
                                {totalAmount.per.toLocaleString()}원
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
                            onPress={() => setModalVisible(true)}
                        >
                            <Text className="text-center text-[#0B1C3F] font-semibold">
                                정산 하기
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 bg-[#1F3B7A] py-3 rounded-xl"
                            onPress={() => {
                                console.log('groupData' , groupData)
                                console.log('selectList' , selectList) 
                                  SettlementShare(groupData[0], selectList)  
                                  }
                            }
                        >
                            <Text className="text-center text-white font-semibold">
                                내역 공유
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Member List */}
                <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-white text-lg font-semibold mb-3">
                        정산 현황
                    </Text>
                    <Pressable
                        className="  absolute right-2
                            w-24 h-12 rounded-full
                            justify-center items-center bg-white
                            shadow-lg "
                        onPress={() => navigation.navigate("ItemAdd", { groupId })}
                    >
                        <Text className="text-center text-neutral-800 font-semibold">+ 항목추가</Text>
                    </Pressable>
                </View>

                <View className="space-y-4 pb-20">

                    {/* {listStore && listStore */}
                    {list && list
                        .filter(m => String(m.group_id) === String(selected))
                        .map((m) => (

                            <TouchableOpacity
                                key={m.id}
                                className="py-2"
                                onPress={() =>
                                    router.push({
                                        pathname: "/settlement/settlementForm",
                                        params: {
                                            group_id: groupData[0]?.id,
                                            type: "list",
                                            id: m.id

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
                                            KRW {Math.round(m.pay).toLocaleString()}
                                        </Text>
                                    </View>

                                    <View className="flex-row justify-between mb-3">
                                        <Text className="text-gray-300">인당금액</Text>
                                        <Text className="text-white">
                                            KRW {Math.round(m.per).toLocaleString()}
                                        </Text>
                                    </View>

                                    {/* Result */}

                                    <View className="flex-row justify-between mb-3">

                                        {m.complate == 'true' ?
                                            (<Text className="text-green-500 font-bold ">정산완료</Text>) :
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
                data={selectList.filter(item => (item.complate !== 'true'))}
                onClose={() => setModalVisible(false)}
                onSubmit={async (ids) => {
                    console.log('selectedDay', selectList)
                    await updateSettlementComplate(db, ids)
                    reload()
                    // const updateDate = selectList.filter(item => (item.id === ids))
                    // update(ids, {
                    //     ...updateDate
                    //     , complate: 'true'
                    // });

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
                    absolute bottom-8 right-6
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
                {/* <Ionicons name="add" size={30} color="white" /> */}
                <Text className="text-center text-white font-semibold">+ 신규</Text>
            </Pressable>

            <Pressable
                className="  absolute bottom-8 right-24
                    w-16 h-16 rounded-full
                    bg-neutral-800
                    justify-center items-center
                    shadow-lg"
                onPress={() => navigation.navigate("ItemAdd", { groupId })}
            >
                <Text className="text-center text-white font-semibold">+ 항목</Text>
            </Pressable>
        </SafeAreaView>
    );
}
