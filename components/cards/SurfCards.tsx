import React from 'react'
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from '../ui/text'
import { Box } from '../ui/box';
import { Image } from '../ui/image';
import { HStack } from '../ui/hstack';
import { router } from 'expo-router';

type Props = {
    fnTabIndex: (index: number) => void;
    index: number;
};

export default function SurfCards ({fnTabIndex,index } : Props) {
   
    const courseTabs = ["양양서핑", "무료체험", "유료체험", "작은영화관", "GOGO"];

    const courseCards = [
        [
            {
                id:'1',
                title: "서핑클럽서파리",
                location: "인구해변",
                desc: "[서핑클럽서파리]2014 인구해변 최초의 서핑스쿨",
                discount: "13%",
                priceOrigin: "80,000",
                priceSale: "70,000",
                link:'/',
                url:require('/assets/images/card/134008.jpg')
            },
            {
                id:'2',
                title: "로컬스테이",
                location: "남애항",
                desc: "전문적인 로컬 호스트와 함께하는 스테이",
                discount: "20%",
                priceOrigin: "120,000",
                priceSale: "96,000",
                link:'/',
                url:require('/assets/images/card/134008.jpg')
            },
        ],
        [
            {
                id:'3',
                title: "렛미서프",
                location: "송지호해변",
                desc: "고성군, 강원특별자치도에서 서핑 스쿨",
                discount: "13%",
                priceOrigin: "50,000",
                priceSale: "60,000",
                link:'/',
                url:require('/assets/images/card/image_0.jpg')
            },
            {
                id:'4',
                title: "고서프",
                location: "송지호해변",
                desc: "고성 송지호해수욕장에 위치한 고서프입니다" ,             
                discount: "30%",
                priceOrigin: "30,000",
                priceSale: "66,000",
                link:'https://www.instagram.com/gosurf_official/',
                url:require('/assets/images/card/image_0.jpg')
            },
        ]
    ];


    return (
        <>
        {/* "즐기는 양양" 섹션 */}
        <Box className="px-4 mt-4">
            <Text className="text-[22px] font-extrabold text-black mb-2">
                즐기는 인제
            </Text>

            {/* 탭/필터 줄 */}
            <HStack className="items-center flex-wrap mb-3">
                {courseTabs.map((t, idx) => (
                <Pressable
                    key={t}
                    onPress={() => {
                            console.log('idx',idx)
                            fnTabIndex(idx)                        
                        }
                    }
                >
                    <Text
                    className={`mr-4 mb-1 ${
                        idx === index ? "font-bold text-black" : "text-gray-500"
                    }`}

                    // onPress={() => setEnJoiTabIndex(idx)}
                    
                    >
                    {t}
                    </Text>
                </Pressable>
                ))}
            </HStack>
            
            {/* 코스 카드 가로 스크롤 */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {courseCards[index]?.map((item) => (
                    <Pressable
                     key={item.title}
                        onPress={() =>
                        router.push({
                            pathname: "/surf/detail",
                            params: { id: item.id },
                        })
                    }
                    
                    >
                    <Box
                        key={item.title}
                        className="bg-white rounded-3xl mr-4 shadow-sm"
                        style={{ width: 260 }}
                    >
                        {/* 이미지 */}
                        <Box className="h-40 rounded-3xl overflow-hidden">
                            <Image
                                //source={require("/assets/images/card/134008.jpg")}
                                source={item.url}
                                className="h-full w-full"
                                resizeMode="cover"
                                alt="card"
                            />
                        </Box>

                        {/* 내용 */}
                        <Box className="px-4 py-3">
                            <Text className="text-xs text-gray-500 mb-1">
                                {item.location}
                            </Text>
                            <Text className="text-lg font-bold text-black mb-1">
                                {item.title}
                            </Text>
                            <Text className="text-xs text-gray-600 mb-2" numberOfLines={2}>
                                {item.desc}
                            </Text>

                            <HStack className="items-center mb-2">
                                <Text className="text-xs font-bold text-[#FFB800] mr-1">
                                    {item.discount}
                                </Text>
                                <Text
                                    className="text-xs text-gray-400 mr-2"
                                    style={{ textDecorationLine: "line-through" }}
                                >
                                    {item.priceOrigin}
                                </Text>
                                <Text className="text-sm font-bold text-[#00306E]">
                                    {item.priceSale}
                                </Text>
                            </HStack>

                            {/* 하단 버튼들 or 좋아요 등은 나중에 추가 */}
                        </Box>
                    </Box>
                    </Pressable>
                ))}
            </ScrollView>
        </Box>
        </>
    )
}
