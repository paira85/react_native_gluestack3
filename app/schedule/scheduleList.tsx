import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Pressable, Image } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import {
    initScheduleDB,
    getScheduleRows,
    insertSchedule,
    deleteSchedule
} from "../../db/scheduleDB";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fab } from "@/components/ui/fab";
import {
  Heart,
  MoreVertical,
  Calendar,
  Search,
  MapPin,
  MessageCircle,
  User,
  Plus,
} from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import TripCardCurrent from "@/components/trip/TripCardCurrent";
import TripCardCompleted from "@/components/trip/TripCardComplate";

export default function ListScreen({ }) {
    const [trips, setTrips] = useState<any[]>([]);

    const navigation = useNavigation();

    const db = useSQLiteContext();
    // const init = initScheduleDB(db);


    useEffect(() => {
        const init = async () => {
          
            const init = await initScheduleDB(db);
            const rows = await  getScheduleRows(db);
            setTrips(rows)
        };
        init();
        
    }, [])

    
    const deleteItem = async(id)=>{
        await deleteSchedule(db, id)
        const rows = await  getScheduleRows(db);
        setTrips(rows)
    }

    return (
        <Box className="flex-1 ">
            <SafeAreaView style={{ flex: 1 }}>
                <Box className="flex-1">
                {/* 상단 영역 */}
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 화면 제목 */}
                    <Box className="px-5 pt-4">
                    <Text className="text-xl font-extrabold  leading-tight">
                        나의 여행
                    </Text>
                    </Box>

                    {/* 진행 중 여행 카드 */}
                    <Box className="mt-5 px-5 gap-3">
                        {trips.map((trip) => (                        
                        <TripCardCurrent trip={trip} key={trip.id} deleteItem={deleteItem} />
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
                    className="mb-20 mr-6 h-16 w-16 rounded-full bg-white"
                     onPress={()=>{
                        router.push({
                            pathname: "schedule/",
                            params: { }
                        })
                    }}
                >
                    <Icon as={Plus} className="h-7 w-7 text-black" />
                </Fab>

                {/* 하단 탭바 */}
                {/* <BottomTabBar /> */}
                </Box>
            </SafeAreaView>
        </Box>
        
        
    );
}
