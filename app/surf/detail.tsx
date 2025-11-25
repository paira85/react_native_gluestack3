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
}
    from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function SurfCardDetail() {

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

    return (
        <SafeAreaView className="bg-white flex-1" >
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
            <Header />       
            <Box className="h-full w-full mb-10">    
                <View className="gpa-4 flex-row">
                    <Pressable onPress={() =>
                                    router.push({
                                        pathname: "/main"
                                    })
                                }
                    ><Text>Home</Text></Pressable>
                    <Text>></Text> 
                    <Text>Card Detail</Text>
                </View>       
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
            <Footer />   
        </ScrollView>
        </SafeAreaView>
    )
}
