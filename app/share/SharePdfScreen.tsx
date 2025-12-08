// SharePdfScreen.tsx
import React, { useRef } from "react";
import { View, Text, Button, Alert, StyleSheet, Platform } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import html2canvas from "html2canvas";


export default function SharePdfScreen() {
 
    const cardRef = useRef(null);

    // 캡처 & 공유
    const shareLocalPdf = async () => {
        try {

            let uri = null;

            if (Platform.OS === "web") {
                // 웹 캡처
                const element = document.getElementById("captureView"); // 캡처 영역
                if (!element) {
                    Alert.alert("오류", "캡처 영역을 찾을 수 없습니다.");
                    return;
                }
                const canvas = await html2canvas(element);
                uri = canvas.toDataURL("image/png");

                // 웹 다운로드 예시
                const link = document.createElement("a");
                link.href = uri;
                link.download = "schedule.png";
                link.click();

                alert("저장 완료", "웹에서는 이미지 다운로드로 저장됩니다.");
                return;
            }


            if (!(await Sharing.isAvailableAsync())) {
                Alert.alert("공유 불가", "이 기기에서는 공유 기능을 사용할 수 없습니다.");
                return;
            }

            uri = await captureRef(cardRef, {
                format: "png",
                quality: 1,
            });

            const saveUri = FileSystem.cacheDirectory + "schedule.png";
            await FileSystem.copyAsync({ from: uri, to: saveUri });

            await Sharing.shareAsync(saveUri, {
                mimeType: "image/png",
                dialogTitle: "일정 공유하기",
            });
        } catch (e) {
            console.log(e);
            alert("오류", "일정 공유 중 오류가 발생했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            {Platform.OS === "web" ? (
            <div id="captureView" style={{ padding: 20 }}>
                { /* 일정 카드 UI 그대로 */ }
                   <Text >
                    ✨ 1박 3일
                </Text>
            </div>
            ) : (
            <ViewShot ref={cardRef} >
                {/* ⬇⬇ 여기에 일정 카드 그대로 표시 ⬇⬇ */}
                <Text >
                    ✨ 1박 3일
                </Text>
            </ViewShot>
            )}

            <View style={styles.buttonWrapper}>
                <Button title="앱 내부 로컬 PDF 공유" onPress={shareLocalPdf} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
    buttonWrapper: { marginBottom: 12 },
});
