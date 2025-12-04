import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import {
    initScheduleDB,
    getScheduleRows,
    insertSchedule
} from "../../db/scheduleDB";


export default function ListScreen({ }) {
    const [trips, setTrips] = useState([]);
    const [list, setList] = useState<any[]>([]);

    const navigation = useNavigation();

    const db = useSQLiteContext();
    const init = initScheduleDB(db);


    useEffect(() => {
        const init = initScheduleDB(db);
        const rows = getScheduleRows(db);
        console.log(rows)
        setTrips(rows)
        setList(rows)
    }, [])

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>예정된 여행</Text>

            <ScrollView>
                {trips.map((trip) => (
                    <TouchableOpacity
                        key={trip.id}
                        onPress={() =>
                            navigation.navigate("EditScreen", { travelId: trip.id })
                        }
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            borderRadius: 12,
                            marginVertical: 10,
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>{trip.title}</Text>
                        <Text style={{ marginTop: 5 }}>
                            {trip.startDate} ~ {trip.endDate}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* + 버튼 */}
            <TouchableOpacity
                onPress={() => navigation.navigate("schedule/index")}
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "#00c2a8",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 32, color: "white" }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
