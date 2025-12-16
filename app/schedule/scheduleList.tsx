import SettlementSubModal from "@/components/settlement/SettlementSubModal";
import TripCardCompleted from "@/components/trip/TripCardComplate";
import TripCardCurrent from "@/components/trip/TripCardCurrent";
import { Box } from "@/components/ui/box";
import { Fab } from "@/components/ui/fab";
import { Icon } from "@/components/ui/icon";
import { router, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
    ArrowLeftIcon,
    Plus
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    deleteSchedule,
    getScheduleRows,
    initScheduleDB
} from "../../db/scheduleDB";

export default function ListScreen({ }) {
    const [trips, setTrips] = useState<any[]>([]);
    const [subModalVisible, setSubModalVisible] = useState(false);
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const db = useSQLiteContext();
    // const init = initScheduleDB(db);


    useEffect(() => {
        const init = async () => {

            const init = await initScheduleDB(db);
            const rows = await getScheduleRows(db);
            setTrips(rows)
        };
        init();

    }, [])


    const deleteItem = async () => {
        await deleteSchedule(db, selected)
        const rows = await getScheduleRows(db);

        setSubModalVisible(false)
        setSelected(null)
        setTrips(rows)
    }

    const updateItem = async () => {
        setSubModalVisible(false)
        setSelected(null)
        navigation.navigate("schedule/scheduleResult",
            {
                "groupId": selected,
                "datas": {}
            })
    }
    const showModal = async (id) => {
        setSubModalVisible(true)
        setSelected(id)
    }
    return (
        <Box className="flex-1">
            <SafeAreaView style={{ flex: 1 }}>
                {/* 상단 영역 */}
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 화면 제목 */}
                    <Box className="px-5 pt-4">

                        <View className="flex-row items-center mb-5 gap-3" >
                            <Pressable className="w-8 bg-black h-8 rounded-full justify-center items-center "
                                onPress={() => {
                                    // navigation.navigate("schedule/scheduleList",{})
                                    router.push({
                                        pathname: "/main",
                                        params: {},
                                    })
                                }}>
                                <Icon as={ArrowLeftIcon} className="text-white font-semibold " />
                            </Pressable>

                            <Text className="text-xl font-extrabold  leading-tight">
                                나의 여행
                            </Text>
                        </View>

                    </Box>

                    {/* 진행 중 여행 카드 */}
                    <Box className="mt-5 px-5 gap-3">
                        <Text className="mb-4 text-lg font-extrabold ">
                            진행중인 여행
                        </Text>
                        {trips.map((trip) => (
                            <Pressable
                                key={trip.id}
                                onPress={() => {
                                    console.log('2222')
                                    navigation.navigate("schedule/scheduleResult",
                                        {
                                            "groupId": trip.id,
                                            "datas": {}
                                        })
                                }}
                                className="flex-1 py-3 rounded-xl ml-2 bg-neutral-800"
                            >
                                <TripCardCurrent trip={trip} showModal={showModal} />
                                {/* deleteItem={deleteItem} */}
                            </Pressable>
                        ))}
                    </Box>


                    {/* 완료된 여행 섹션 */}
                    <Box className="mt-10 px-5">
                        <Text className="mb-4 text-lg font-extrabold ">
                            완료된 여행
                        </Text>

                        {trips.map((trip) => (
                            <Box key={trip.id} className="mb-4">
                                <TripCardCompleted trip={trip} />
                            </Box>
                        ))}
                    </Box>
                </ScrollView>

                {/* 플로팅 추가 버튼 */}
                <Fab
                    placement="bottom right"
                    className="mb-16 mr-3 h-16 w-16 rounded-full bg-neutral-800"
                    onPress={() => {
                        router.push({
                            pathname: "schedule/",
                            params: {}
                        })
                    }}
                >
                    <Icon as={Plus} className="h-7 w-7 text-white" />
                </Fab>

                {/* 하단 탭바 */}
                {/* <BottomTabBar /> */}
            </SafeAreaView>

            <SettlementSubModal
                visible={subModalVisible}
                onDeleted={deleteItem}
                onUpdated={updateItem}
                onClose={() => setSubModalVisible(false)}
                onSubmit={async (ids) => {
                    console.log('selectedDay', ids)
                }}

            />
        </Box>




    );
}
