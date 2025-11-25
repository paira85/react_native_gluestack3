import React from 'react'
import { Box } from './ui/box'
import { Text, View } from 'react-native'
import { Icon } from '@/components/ui/icon';
import { Divider } from './ui/divider'
import {
  InstagramIcon,
  FacebookIcon,
  Camera,
  MailIcon,
  ChromeIcon,
  PhoneIcon,
}
from 'lucide-react-native';
export default function Footer() {
  return (
    <Box>
        <View className="p-3 gap-2" >
        <Text className="font-semibold">고객센터</Text>
        <View className="flex-row gap-2">
            <Icon className="text-typography-500" as={PhoneIcon} />
            <Text className="">평일 오전9시 ~ 오후 6시</Text>
        </View>
        <View className="flex-row gap-2">
            <Icon className="text-typography-500" as={MailIcon}/>
            <Text className="">test@gmail.com</Text>
        </View>
        <View className="flex-row gap-2">
            <Icon className="text-typography-500" as={InstagramIcon}/>
            <Text className="">momoseungmo</Text>
        </View>

        <Text>@Copy right</Text>
        <Divider className="bg-primary-100 mt-5 mb-5" />
        <Text className="font-semibold">사업자 정보</Text>
        <View className="gap-2">
            <Text className="text-sm ">
            대표이사 : 개발자 momo
            </Text>
            <Text className="text-sm ">
            사업자 번호 : 111-11-11111
            </Text>
            <Text className="text-sm ">
            통신판매신고번호 : 2025-대한민국-0123
            </Text>
            <Text className="text-sm ">
            주소 : 서울특별시 강남구 강남대로 12길 34
            </Text>  
            <Text className="text-sm ">
            대표번호 : 0121-3456-7890 
            </Text>    
            
                            
        </View>
            
        </View>
    </Box>
  )
}
