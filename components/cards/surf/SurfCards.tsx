import React, { useEffect } from 'react'
import { Dimensions, Pressable, ScrollView, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';

import { HStack } from '@/components/ui/hstack';
import { router } from 'expo-router';

type Props = {
    fnTabIndex: (index: number) => void;
    index: number;
};

const screenWidth = Dimensions.get('window').width;

export default function SurfCards ({fnTabIndex,index } : Props) {

   
    const courseTabs = ["양양서핑", "무료체험", "유료체험", "작은영화관", "GOGO"];

    const courseCards = 
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
        ,
        {
            id:'5',
            title: "고서프2",
            location: "송지호해변",
            desc: "고성 송지호해수욕장에 위치한 고서프입니다" ,             
            discount: "30%",
            priceOrigin: "30,000",
            priceSale: "66,000",
            link:'https://www.instagram.com/gosurf_official/',
            url:require('/assets/images/card/image_0.jpg')
        },
    ]


    return (
        <>
        {/* "즐기는 양양" 섹션 */}
        <Box className="px-4 mt-4 gap-3 flex-1">
            <Text className="text-[22px] font-extrabold text-black mb-2">
                서핑샵 목록
            </Text>

            {/* 코스 카드 가로 스크롤 */}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                className=" "
            >
                {courseCards?.map((item,idx) => (
                    <Pressable
                     key={item.id}
                        onPress={() =>
                        router.push({
                            pathname: "/surf/detail",
                            params: { id: item.id },
                        })
                    }
                    
                    >
                    <Box
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm mb-4"
                    >
                        {/* 이미지 */}
                        <Box className="">
                            <Image
                                //source={require("/assets/images/card/134008.jpg")}
                                source={item.url}
                                className="h-full w-full rounded-2xl "
                                resizeMode="cover"
                                alt="card"
                                style={{ height: 200, width: screenWidth - 20 }}
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
