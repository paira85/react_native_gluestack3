import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from '@/components/ui/box';

import { Divider } from '@/components/ui/divider';

import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import MainBanner from '@/components/MainBanner';
import Gupon from '@/components/event/Gupon';
import { Icon } from '@/components/ui/icon';
const placeholder = (w, h) =>
  ({ uri: `https://via.placeholder.com/${w}x${h}.png?text=IMG` });

import {
  InstagramIcon,
  FacebookIcon,
  Camera,
  MailIcon,
  ChromeIcon,
  PhoneIcon,
}
from 'lucide-react-native';
import { P } from '@expo/html-elements';
import Footer from '@/components/Footer';
import BottomMenu from '@/components/menus/BottomMenu';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';

export default function MainLayout() {
  const bannerData = [
    {
      image: require("/assets/images/background/1739799352351-26.jpg"),
      title: "FINNS \n Beach Club",
      subtitle: "In Bali",
    },
    {
      image: require("/assets/images/background/1739799352351-27.jpg"),
      title: "World's \n Best Beach Club",
      subtitle: "In Bali",
    }, 
  ];
  
  const categoriesRow1 = [
    { label: "관광선물", icon: require("/assets/images/icons/gift.png") },
    { label: "산책", icon: require("/assets/images/icons/gps.png") },
    { label: "카페/펍", icon: require("/assets/images/icons/coffee-cup.png") },
    { label: "음식점", icon: require("/assets/images/icons/pizza.png") },
    { label: "서핑", icon: require("/assets/images/icons/skateboard.png") },
  ];


  const courseTabs = ["양양서핑", "무료체험", "유료체험", "작은영화관", "GOGO"];

  const courseCards = [
    {
      title: "서핑클럽서파리",
      location: "인구해변",
      desc: "[서핑클럽서파리]2014 인구해변 최초의 서핑스쿨",
      discount: "13%",
      priceOrigin: "80,000",
      priceSale: "70,000",
    },
    {
      title: "로컬스테이",
      location: "남애항",
      desc: "전문적인 로컬 호스트와 함께하는 스테이",
      discount: "20%",
      priceOrigin: "120,000",
      priceSale: "96,000",
    },
  ];

  return (
    <SafeAreaView className="bg-white flex-1" >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>

        <Box className="flex-1 ">
            <Header />         
            {/* BODY */}
            <Box className="flex-1 h-full w-full mb-10">
              {/* BIG BANNER */}           
              <MainBanner data={bannerData} />        
              {/* 쿠폰 영역 */}
              <Gupon />

              {/* 카테고리 아이콘 2줄 */}
              <Box className="bg-white pt-6 px-4 mb-3">
                {/* 1줄 */}
                <Box className="flex-row justify-around gap-4">
                  {categoriesRow1.map((item) => (
                    <View key={item.label} className="items-center ">
                     
                        <Image
                          source={item.icon}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="contain"
                          className="w-10 h-10 mb-1 h-[60px]"
                        />
                      
                      <Text className="text-[12px] text-[#00306E] ">
                        {item.label}
                      </Text>              
                    </View>
                  ))}
                </Box>
              </Box>

              <Box className="bg-white pt-6 px-4 mb-3">
                {/* 1줄 */}
                <Box className="flex-row justify-around gap-4">
                  {categoriesRow1.map((item) => (
                    <View key={item.label} className="items-center ">
                     
                        <Image
                          source={item.icon}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="contain"
                          className="w-10 h-10 mb-1 h-[60px]"
                        />
                      
                      <Text className="text-[12px] text-[#00306E] ">
                        {item.label}
                      </Text>              
                    </View>
                  ))}
                </Box>
              </Box>


              {/* "즐기는 양양" 섹션 */}
              <Box className="px-4 mt-4">
                <Text className="text-[22px] font-extrabold text-black mb-2">
                  즐기는 양양
                </Text>

                {/* 탭/필터 줄 */}
                <HStack className="items-center flex-wrap mb-3">
                  {courseTabs.map((t, idx) => (
                    <Pressable key={t}>
                      <Text
                        className={`mr-4 mb-1 ${
                          idx === 0 ? "font-bold text-black" : "text-gray-500"
                        }`}
                      >
                        {t}
                      </Text>
                    </Pressable>
                  ))}
                </HStack>
              </Box>


              {/* 코스 카드 가로 스크롤 */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                {courseCards.map((item) => (
                  <Box
                    key={item.title}
                    className="bg-white rounded-3xl mr-4 shadow-sm"
                    style={{ width: 260 }}
                  >
                    {/* 이미지 */}
                    <Box className="h-40 rounded-3xl overflow-hidden">
                      <Image
                        source={require("/assets/images/card/134008.jpg") }
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
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
                ))}
              </ScrollView>
            </Box>
            <Divider className="bg-primary-500" />
            {/* 하단 큰 아이콘 메뉴 */}
            <BottomMenu />
        </Box>
        <Footer />        
         
        </ScrollView>
    </SafeAreaView>
  );
}
