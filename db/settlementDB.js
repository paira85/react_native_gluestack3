import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

// export const db = Platform.OS === "web" ? null : SQLite.openDatabase("settlement.db");

let db = null;
if (Platform.OS !== "web") {
  db = SQLite.openDatabase("settlement.db");
}
export { db };

export const initDB = () => {
  if (!db) return;
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

export const selectAll = (callback) => {
  if (!db) return;
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM settlements ORDER BY id DESC", [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};

export const insertItem = (item, callback) => {
  if (!db) return;
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO settlements (title, date, amount) VALUES (?, ?, ?)",
      [item.title, item.date, item.amount],
      () => callback()
    );
  });
};

export const updateItem = (id, item, callback) => {
  if (!db) return;
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE settlements SET title=?, date=?, amount=? WHERE id=?",
      [item.title, item.date, item.amount, id],
      () => callback()
    );
  });
};

export const deleteItem = (id, callback) => {
  if (!db) return;
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM settlements WHERE id=?", [id], () => callback());
  });
};
