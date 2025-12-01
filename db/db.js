import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";


// 플랫폼 구분
const isWeb = Platform.OS === "web";

// 웹일 경우 DB 사용 X
let db = null;
if (Platform.OS !== "web") {
  db = SQLite.openDatabase("settlement.db");
}
export { db };

export const initDB = () => {
  if (isWeb) return; // 웹에서는 건너뜀

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS settlements (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        date TEXT,
        amount INTEGER
      );`
    );
  });
};