import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Icon } from '@/components/ui/icon';
import {
    InstagramIcon,
    FacebookIcon,
    Camera,
    MailIcon,
    ChromeIcon,
    PhoneIcon,
    ArrowLeftIcon
}
    from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Dimensions } from 'react-native';
import ServicesCard from '@/components/service/ServiceCard';
import ReviewCard from '@/components/review/ReviewCard';
import TagsCard from '@/components/tag/TagsCard';

const screenWidth = Dimensions.get('window').width;

export default function SurfCardDetail() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const detailId = String(id);

    const courseCards = [
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
    ];

    const detail = courseCards.find((card) =>{
            // console.log('card',card)
            return card.id === detailId
        }
    );
    console.log('detail',detail)


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
                    onPress={ () => {                       
                        navigation.goBack()
                    }}>
                    <Icon as={ArrowLeftIcon}  />
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
                <View>
                    <Text>
                        {detail?.location}
                    </Text>
                    <Text>
                        {detail?.desc}
                    </Text>
                    <Text>
                        {detail?.link}
                    </Text>
                </View>
            </Box>                

             {/* 제공 서비스 카드 */}
            <ServicesCard services={data.services} />

            {/* 리뷰 카드 */}
            <ReviewCard
                score={data.reviewScore}
                count={data.reviewCount}
                onWrite={() => router.push("/writeReview")}
            />

            {/* 태그 카드 */}
            <TagsCard tags={data.tags} />
            <Footer />   
        </ScrollView>
        </SafeAreaView>
    )
}
