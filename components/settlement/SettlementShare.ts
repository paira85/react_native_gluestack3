import * as Print from "expo-print";
import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

import { Platform } from 'react-native';
import { formatDate, formatDateTimes } from "../utils/data";

interface Props {
  settleInfo: GroupSettle,
  items: Settle[]

}

interface GroupSettle {
  title: string,
  total: string,
  members: string,
  perPerson: string,
  remain: string,
  date: string,
}

interface Settle {
  title: string,
  category: string,
  amount: string,
  perPrice: string,
  memo: string,
  status: string,
}

// export default async function SettlementShare({settleInfo, items}:Props){

const getCachePath = async () => {
  // 대기 루프
  while (!FileSystem.cacheDirectory) {
    await new Promise(res => setTimeout(res, 50));
  }
  return FileSystem.cacheDirectory + "share.txt";
};

export const SettlementShareText = async (groupData, selectList) => {
  console.log('selectList', selectList)
  console.log('selectList', selectList)
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

  console.log('Platform.OS' , Platform.OS) 
  // 파일 임시 생성
  const filePath  = await getCachePath()
  
  // const filePath = `${FileSystem.cacheDirectory}share.txt`;
  console.log('filePath', filePath)
  // await FileSystem.writeAsStringAsync(filePath, text, { encoding: FileSystem.EncodingType.UTF8 });
  await FileSystem.writeAsStringAsync(filePath, text, { encoding:'utf8' as any });

  // 공유 실행
  await Sharing.shareAsync(filePath, {
    mimeType: "text/plain",
    dialogTitle: "정산 내역 공유",
  });
};



export const SettlementSharePdf = async (groupData, selectList) => {
  console.log('SettlementSharePdf' , groupData)
  console.log('SettlementSharePdf' , selectList)

  const result = selectList.reduce(
      (sum, x) => ({
          pay: sum.pay + Math.round(x.pay),
          per: sum.per + Math.round(x.per),
          complate: sum.complate + (x.complate == 'true' ? 1 : 0),
          need: sum.need + (x.complate == 'true' ? 0 : Math.round(x.pay)),
          total: sum.total + 1,
      }),
      { pay: 0, per: 0, complate: 0, need: 0, total: 0 } // 초기값            
  );

  console.log('result' , result)
 // PDF에 들어갈 HTML
  let html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: sans-serif; padding: 24px; }
        h1 { font-size: 26px; margin-bottom: 12px; }
        .section-title { font-size: 18px; margin-top: 24px; margin-bottom: 10px; font-weight: bold; }
        .item { margin-bottom: 12px; }
        .small { color: #666; font-size: 14px; }
        hr { margin: 20px 0; }
      </style>
    </head>
    <body>
      <h1>정산 요약 – ${groupData.title}</h1>

      <p>■ 총 지출 : ${result.pay}원</p>
      <p>■ 참여 인원 : ${groupData.members}명</p>
      <p>■ 1인 부담액 : ${result.per}원</p>
      <p>■ 미정산 금액 : ${result.need}원</p>

      <hr />
      <div class="section-title">🧾 정산 항목</div>
  `;

  selectList.forEach((v, idx) => {
    html += `
      <div class="item">
        <b>${idx + 1}. ${v.title}</b> (${v.category}) – ${v.pay}원<br/>
        <span class="small">인당금액 : ${v.per}원</span><br/>
        ${v.memo ? `<span class="small">비고 : ${v.memo}</span><br/>` : ""}
        <span class="small">${v.complate === "true" ? "✔ 정산 완료" : "❌ 정산 대기"}</span>
      </div>
    `;
  });

  html += `
      <hr />
      <p class="small">📅 생성일 : ${formatDateTimes(groupData.days)}</p>
      <p class="small">🔗 Momentrip 정산 내역</p>
    </body>
  </html>
  `;

  try {
    // PDF 생성
    const { uri } = await Print.printToFileAsync({ html });
    console.log("PDF 생성 경로:", uri);

    // 파일 이름을 friendly 하게 변경 (선택)
    const newPath = FileSystem.cacheDirectory + `${groupData.title}_정산.pdf`;
    await FileSystem.moveAsync({ from: uri, to: newPath });

    // PDF 공유
    await Sharing.shareAsync(newPath, {
      mimeType: "application/pdf",
      dialogTitle: "정산 PDF 공유",
    });
  } catch (e) {
    console.log("PDF Error:", e);
  }
};
