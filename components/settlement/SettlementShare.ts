import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface Props{
    settleInfo:GroupSettle,
    items : Settle[]

}

interface GroupSettle{
    title:string,
    total:string,
    members:string,
    perPerson:string,
    remain:string,
    date:string,
}

interface Settle{
    title:string,
    category:string,
    amount:string,
    perPrice:string,
    memo:string,
    status:string,
}

// export default async function SettlementShare({settleInfo, items}:Props){
export const SettlementShare = async(groupData, selectList) => {
    console.log('selectList' , selectList)
    console.log('selectList' , selectList)
  let text = `📌 [정산 요약 – ${groupData.title}]\n\n`;
  text += `■ 총 지출 : ${groupData.total}원\n`;
  text += `■ 참여 인원 : ${groupData.members}명\n`;
  text += `■ 1인 부담액 : ${groupData.perPerson}원\n`;
  text += `■ 미정산 금액 : ${groupData.remain}원\n\n`;
  text += `-----------------------------------\n\n`;
  text += `🧾 [정산 항목]\n`;

  selectList.forEach((v, idx) => {
    text += `${idx + 1}. ${v.title} (${v.category}) – ${v.amount}원\n`;
    text += `   인당금액 : ${v.perPrice}원\n`;
    if (v.memo) text += `   비고 : ${v.memo}\n`;
    text += v.status === '완료' ? `   ✔ 정산 완료\n\n` : `   ❌ 정산 대기\n\n`;
  });

  text += `-----------------------------------\n`;
  text += `📅 생성일 : ${groupData.date}\n`;
  text += `🔗 Momentrip 정산 내역\n`;

  // 파일 임시 생성
  const filePath = `${FileSystem.cacheDirectory}share.txt`;
  console.log('filePath' , filePath)
  await FileSystem.writeAsStringAsync(filePath, text, { encoding: FileSystem.EncodingType.UTF8 });

  // 공유 실행
  await Sharing.shareAsync(filePath, {
    mimeType: "text/plain",
    dialogTitle: "정산 내역 공유",
  });
};
 