https://nativewindui.com/screen/otp-screen

https://reactnativereusables.com/docs/components/accordion

https://docs.nativebase.io/?utm_source=HomePage&utm_medium=header&utm_campaign=NativeBase_3

https://reactnative.dev/docs/image

https://tailwindcss.com/docs/display
# 글루스택
https://gluestack.io/ui/docs/home/getting-started/installation
# ICON
https://www.iconfinder.com/search?q=user


# variant={"ghost"} 콤보박스의 배경 스타일 === 카테고리 메뉴 
# { justify-start : 정렬 관련 (Flexbox) 
  justify-content: flex-start; → flex 아이템들을 왼쪽 정렬 }
# { text-muted-foreground 글자색 설정 
  보통 테마에서 “흐릿한 전경색”(회색톤 텍스트)으로 지정됨 }
# { hover:text-white	호버 시 글자색 변경	
  마우스를 올리면 글자색이 하얗게 바뀜}
# { hover:pl-6	호버 시 왼쪽 여백 변경	
  마우스를 올리면 padding-left: 1.5rem; (기본 6단계) 적용됨 }
# { transition-all	전환 효과 적용	
  모든 속성(색상, 여백 등)에 트랜지션(부드럽게 변화) 효과를 줌}
# { duration-500	전환 시간 설정	
  트랜지션 효과가 0.5초(500ms) 동안 실행됨 }


# {items-center}


# font-semibold	글자 두께 설정	
  font-weight: 600;	
  반굵은(Bold보다 살짝 얇은) 글씨체
# tracking-tight	자간(글자 간격) 설정	
  letter-spacing: -0.025em;	
  글자 사이 간격을 약간 좁게 만듦
# items-center	
  Flex/Grid 정렬 관련	
  align-items: center;	
  Flex 또는 Grid 컨테이너 내부 요소를 세로 방향 가운데 정렬

# flex-col	Flex 방향 설정	
  flex-direction: column;	
  Flex 아이템들을 세로로 쌓이게 정렬
# grid-cols-2	Grid 열 개수 설정	
  grid-template-columns: repeat(2, minmax(0, 1fr));	
  Grid 컨테이너에서 2열(2 columns) 레이아웃을 만듦

# w-full	너비를 100%로 설정	
  width: 100%;	부모 요소의 너비를 꽉 채움
# h-[210px]	정확한 높이 지정	
  height: 210px;	고정 높이를 210픽셀로 지정

# fixed	화면에 고정 위치	
  position: fixed;
  right-1/2	오른쪽에서 화면의 절반만큼 떨어짐	right: 50%;
# bottom-10	하단에서 2.5rem 떨어짐	
  bottom: 2.5rem;
# translate-x-1/2	(x축으로 50% 이동)
# z-20	z-index 설정	
  z-index: 20;
# items-center	flex/grid 컨테이너일 때 중앙 정렬	
  align-items: center; (단, display: flex 필요) 

 # !py-5	상하 패딩 강제 변경 (override)	
  padding-top: 1.25rem; padding-bottom: 1.25rem;
# !px-6	좌우 패딩 강제 변경	
  padding-left: 1.5rem; padding-right: 1.5rem;
# rounded-full	완전한 원형 모서리	
  border-radius: 9999px;
  
# variant="destructive" 는 shadcn/ui나 custom Button 컴포넌트의 prop으로, 보통 붉은색(위험/삭제) 스타일을 의미합니다.
  예: background-color: #dc2626; color: white;
  

# line-clamp
line-clamp-2
line-clamp는 “한 줄 또는 여러 줄 텍스트를 제한하고 잘라내는” 속성이에요.
예를 들어 line-clamp-2는 두 줄까지만 보이고, 세 번째 줄부터는 ... 으로 생략됩니다.
