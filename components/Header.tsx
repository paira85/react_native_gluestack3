import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Box } from './ui/box'
import * as Location from "expo-location";
import { Image } from './ui/image';
import { Avatar, AvatarImage } from './ui/avatar';


const { width } = Dimensions.get("window");
const isSmall = width <= 360;
export default function Header() {
    const alramCount = useState<React.SetStateAction<Number>>(1)
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const WEATHER_API_KEY = "8d632174c03e90218ea182bb46b17c91"

    const load = async () => {
        try {
            setLoading(true);

            // 위치 권한 요청
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("위치 권한이 없습니다.");
                setLoading(false);
                return;
            }

            // 현재 위치 가져오기
            let loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const lat = loc.coords.latitude;
            const lon = loc.coords.longitude;
            setLocation({ lat, lon });

            // 날씨 조회
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${WEATHER_API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            // console.log('data', data)
            // console.log('data', Math.round(data.main.temp))
            // console.log('data', data.weather[0].description)
            // console.log('data', data.weather[0].icon)
            // console.log('data', data.name)
            setWeather({
                temp: Math.round(data.main.temp),           // 온도
                desc: data.weather[0].description,          // 날씨 설명
                icon: data.weather[0].icon,                 // 아이콘 코드
                name: data.name,                            // 지역명
            });
        } catch (e) {
            console.log(e);
            setErrorMsg("데이터를 가져오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
    <Box className ="flex flex-row items-center justify-between px-4 py-2 bg-primary-500 screen-xs:text-[11px]  "
        >
        {/* Logo */ }
        < Box className ="flex-row h-full items-center" >
            <Image className="w-10 h-10"
            style={{ tintColor: "#ffffff" }}
            source={require("../assets/images/logs/home_white.png")}
            resizeMode="contain"
            alt="HEADER_LOG"
            />
            <Text className="pl-3  font-bold text-white">GoGo Inje</Text>
        </Box >

        {/* Weather */ }
        < View className = "flex-row items-center " >
            {weather?.temp  ?
            (
                <>
                <Text className="text-[22px] font-bold text-white mr-1">{weather?.temp}°</Text>
                <Image
                source={{
                    uri: `https://openweathermap.org/img/wn/${weather?.icon}@2x.png`,
                }}
                className="w-10 h-10"
                alt="HEADER_WEATHER"
                />
                <Text className="text-[16px] text-white">
                    {/* ☀ */}
                    {weather?.name}
                </Text>
                </>
            )
                : (
                    <>
                    <Text className="text-[22px] font-bold text-white mr-1">19°</Text> 
                    <Text className="text-[16px] text-white">☀ 대한민국</Text>
                    </>
                )
            }           
        </View >

        <View className="flex-row items-center space-x-5">
            <View className="relative">
                <Avatar size="md">
                    <AvatarImage
                        source={require("/assets/images/background/1739799352351-26.jpg")}
                    />

                    {/* 알람 Badge */}
                    <View className="absolute -top-1 -right-1 bg-blue-700 w-4 h-4 rounded-full items-center justify-center">
                        <Text className="text-white text-[10px]">
                            {alramCount}
                        </Text>
                    </View>
                </Avatar>
            </View>
        </View>
    </Box >
  )
}
