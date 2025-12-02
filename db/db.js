// import * as SQLite from 'expo-sqlite';
// const db = await SQLite.openDatabaseAsync('databaseName');

// // `execAsync()` is useful for bulk queries when you want to execute altogether.
// // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
// await db.execAsync(`
// PRAGMA journal_mode = WAL;
// CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
// INSERT INTO test (value, intValue) VALUES ('test1', 123);
// INSERT INTO test (value, intValue) VALUES ('test2', 456);
// INSERT INTO test (value, intValue) VALUES ('test3', 789);
// `);

// // `runAsync()` is useful when you want to execute some write operations.
// const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100);
// console.log(result.lastInsertRowId, result.changes);
// await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', 999, 'aaa'); // Binding unnamed parameters from variadic arguments
// await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', [999, 'aaa']); // Binding unnamed parameters from array
// await db.runAsync('DELETE FROM test WHERE value = $value', { $value: 'aaa' }); // Binding named parameters from object

// // `getFirstAsync()` is useful when you want to get a single row from the database.
// const firstRow = await db.getFirstAsync('SELECT * FROM test');
// console.log(firstRow.id, firstRow.value, firstRow.intValue);

// // `getAllAsync()` is useful when you want to get all results as an array of objects.
// const allRows = await db.getAllAsync('SELECT * FROM test');
// for (const row of allRows) {
//   console.log(row.id, row.value, row.intValue);
// }

// // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
// for await (const row of db.getEachAsync('SELECT * FROM test')) {
//   console.log(row.id, row.value, row.intValue);
// }

import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

let _db = null;

export const isWeb = Platform.OS === "web";

function getDB() {
  if (Platform.OS === "web") {
    // Web debugging mock
    console.warn("⚠ Web mode: SQLite disabled (data not saved)");
    return {
      transaction: (callback) => {
        callback({
          executeSql: (sql, params, onSuccess) => {
            console.log("SQL (web ignored):", sql, params);
            if (onSuccess) onSuccess(null, { rows: { _array: [] } });
          }
        });
      },
    };
  }
  if (!_db) _db = SQLite.openDatabase("settlement.db");
  return _db;
}

/* ---------------------------
    테이블 생성
---------------------------- */
export async function initDB() {
  // const db = getDB();
  // console.log('db' , db)
  // db.transaction(tx => {
  //   tx.executeSql(
  //     `
  //     CREATE TABLE IF NOT EXISTS settlement (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       title TEXT,
  //       amount INTEGER,
  //       created_at TEXT
  //     );
  //     `
  //   );
  // });

  console.log('Platform.OS' , Platform.OS)
  if (Platform.OS === "web") return;

  const db = useSQLiteContext();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS settlement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      date TEXT,
      amount INTEGER,
      created_at TEXT
    );
  `);

  return db;
}

/* ---------------------------
    전체 조회
---------------------------- */
export async function selectAll(callback) {
  // const db = getDB();
  // db.transaction(tx => {
  //   tx.executeSql(
  //     "SELECT * FROM settlement ORDER BY id DESC",
  //     [],
  //     (_, result) => callback(result.rows._array)
  //   );
  // });

  if (Platform.OS === "web") return;

  const db = useSQLiteContext();

  const rows = await db.getAllAsync("SELECT * FROM settlement;");

  return rows
}

/* ---------------------------
    INSERT
---------------------------- */
export async function insertItem(data, callback) {
  // const { title, amount } = data;
  // const db = getDB();
  // db.transaction(tx => {
  //   tx.executeSql(
  //     `INSERT INTO settlement (title, amount, created_at) VALUES (?, ?, datetime('now'))`,
  //     [title, amount],
  //     () => callback()
  //   );
  // });

  if (Platform.OS === "web") return;

  const db = useSQLiteContext();

  const result = await db.runAsync(
    `INSERT INTO settlement (title, date, amount, created_at)
      VALUES (?, ?, ?, ?)`,
    [data.title, data.date , data.price, new Date().toISOString()]
  );
  
  return result
}

/* ---------------------------
    UPDATE
---------------------------- */
export function updateItem(id, data, callback) {
  const { title, amount } = data;
  const db = getDB();
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE settlement SET title = ?, amount = ? WHERE id = ?`,
      [title, amount, id],
      () => callback()
    );
  });
}

/* ---------------------------
    DELETE
---------------------------- */
export async function deleteItem(id, callback) {
  // const db = getDB();
  // db.transaction(tx => {
  //   tx.executeSql(
  //     `DELETE FROM settlement WHERE id = ?`,
  //     [id],
  //     () => callback()
  //   );
  // });
  if (Platform.OS === "web") return;

  const db = useSQLiteContext();

  await db.runAsync(`DELETE FROM settlement WHERE id = ?`, [id]);
}
