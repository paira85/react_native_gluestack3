import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ReviewCard from '@/components/review/ReviewCard';
import ServicesCard from '@/components/service/ServiceCard';
import TagsCard from '@/components/tag/TagsCard';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import {
    ArrowLeftIcon
} from 'lucide-react-native';
import React from 'react';
import { Dimensions, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from "@expo/vector-icons";
const screenWidth = Dimensions.get('window').width;

export default function SurfCardDetail() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const detailId = String(id);

    const courseCards = [
        {
            id: '1',
            title: "서핑클럽서파리",
            location: "인구해변",
            desc: "[서핑클럽서파리]2014 인구해변 최초의 서핑스쿨",
            discount: "13%",
            priceOrigin: "80,000",
            priceSale: "70,000",
            link: '/',
            url: require('/assets/images/card/134008.jpg')
        },
        {
            id: '2',
            title: "로컬스테이",
            location: "남애항",
            desc: "전문적인 로컬 호스트와 함께하는 스테이",
            discount: "20%",
            priceOrigin: "120,000",
            priceSale: "96,000",
            link: '/',
            url: require('/assets/images/card/134008.jpg')
        },
        {
            id: '3',
            title: "렛미서프",
            location: "송지호해변",
            desc: "고성군, 강원특별자치도에서 서핑 스쿨",
            discount: "13%",
            priceOrigin: "50,000",
            priceSale: "60,000",
            link: '/',
            url: require('/assets/images/card/image_0.jpg')
        },
        {
            id: '4',
            title: "고서프",
            location: "송지호해변",
            desc: "고성 송지호해수욕장에 위치한 고서프입니다",
            discount: "30%",
            priceOrigin: "30,000",
            priceSale: "66,000",
            link: 'https://www.instagram.com/gosurf_official/',
            url: require('/assets/images/card/image_0.jpg')
        },
    ];

    const detail = courseCards.find((card) => {
        // console.log('card',card)
        return card.id === detailId
    }
    );
    console.log('detail', detail)


    const data = {
        services: [
            { icon: "dog-side", label: "반려동물" },
            { icon: "sofa", label: "휴식석" },
            { icon: "parking", label: "주차" },
            { icon: "food-takeout-box", label: "테이크아웃" },
            { icon: "human-male-female", label: "화장실" },
            { icon: "wifi", label: "와이파이" },
            { icon: "baby-carriage", label: "키즈존" },
            { icon: "smoking-off", label: "금연" },
        ],
        reviewScore: 5.0,
        reviewCount: 2,
        tags: ["카페", "음료", "커피", "디저트", "라떼", "에이드", "바다지기라떼"],
    };

    return (
        <SafeAreaView className="bg-white flex-1" >
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <Box className="h-full w-full mb-10 relative">

                    <Pressable className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white justify-center items-center z-20"
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Icon as={ArrowLeftIcon} />
                    </Pressable>
                    <Box className="relative">
                        <Image
                            //source={require('/assets/images/card/image_0.jpg')}
                            source={detail?.url}
                            resizeMode="cover"
                            className="w-full min-h-[400px] max-h-[600px] h-[600px]"
                            alt="CATEGORY"
                        />

                        <Box className="absolute inset-0 items-center justify-center  ">
                            <Text className="text-center text-white text-3xl font-bold mb-2"
                                style={{
                                    textShadowColor: "rgba(0, 0, 0, 0.7)",
                                    textShadowOffset: { width: 1, height: 1 },
                                    textShadowRadius: 4,
                                }}>
                                {detail?.title}
                            </Text>
                        </Box>
                    </Box>
                    <View className="px-5 py-4">
                        {/* 운영시간 */}
                        <Box className="flex-row items-center mb-2">

                            <Ionicons name="time-outline" size={18} />
                            <Text className="text-[14px]">09:00~18:00</Text>
                        </Box>

                        {/* 주소 */}
                        <Box className="flex-row items-center mb-2">

                            <Ionicons name="location" size={18} />
                            <Text className="text-[14px]">{detail?.location}</Text>
                        </Box>

                        {/* 전화번호 */}
                        <Box className="flex-row items-center mb-2">

                            <Feather name="phone" size={18} />
                            <Text className="text-[14px]">010-2681-8651</Text>
                        </Box>

                        <Box className="flex-row mt-4">
                            <Pressable
                                className="flex-1 bg-blue-700 py-3 rounded-xl mr-3"
                                onPress={() =>
                                    Linking.openURL(
                                        "https://map.kakao.com/link/search/전은경서프스쿨"
                                    )
                                }
                            >
                                <Text className="text-white text-center font-semibold">길찾기</Text>
                            </Pressable>

                            <Pressable
                                className="flex-1 bg-gray-300 py-3 rounded-xl"
                                onPress={() => Linking.openURL("tel:01026818651")}
                            >
                                <Text className="text-black text-center font-semibold">
                                    전화하기
                                </Text>
                            </Pressable>
                        </Box>
                    </View>


                    <Divider className="my-5 bg-gray-200" />

                    {/* 설명문 */}
                    <Box className="px-5">
                        <Text className="text-[14px] text-gray-700 leading-6 mb-5">
                            대한민국 여자 롱보드 레전드 14년 경력의 프로서퍼가 직접 운영하는
                            전은경 서프스쿨입니다.
                            가족, 친구, 연인 모두 서핑으로 돈독해지는 시간을 느껴보세요.
                            초보자부터 전문 서퍼까지 친절하고 안전하게 강습해드립니다.
                            전문적이고 친절한 강습으로 편안하고 즐거운 하루가 되길 바랍니다.
                            첫 서핑은 전은경서프스쿨에서 시작해 보세요.
                        </Text>
                    </Box>

                    <Divider className="my-5 bg-gray-200" />


                    {/* 제공 서비스 카드 */}
                    <ServicesCard services={data.services} />


                    <Divider className="my-5 bg-gray-200" />


                    {/* 리뷰 카드 */}
                    <ReviewCard
                        score={data.reviewScore}
                        count={data.reviewCount}
                        onWrite={() => router.push("")}
                    />


                    <Divider className="my-5 bg-gray-200" />

                    {/* 태그 카드 */}
                    <TagsCard tags={data.tags} />

                    
                <Footer />
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}
