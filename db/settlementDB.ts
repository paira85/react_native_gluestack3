// services/settlement.ts
export async function initSettlementDB(db: any) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS settlement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount INTEGER,
      date TEXT,
      created_at TEXT
    );
  `);
}

// INSERT
export async function insertSettlement(
  db: any,
  title: string,
  amount: number,
  date: string
) {
  const createdAt = new Date().toISOString();
  await db.runAsync(
    "INSERT INTO settlement (title, amount, date, created_at) VALUES (?, ?, ?, ?)",
    [title, amount, date, createdAt]
  );
}

// SELECT ALL
export async function getSettlementRows(db: any) {
  return await db.getAllAsync("SELECT * FROM settlement ORDER BY id DESC");
}

// UPDATE
export async function updateSettlement(
  db: any,
  id: number,
  title: string,
  amount: number,
  date: string
) {
  await db.runAsync(
    "UPDATE settlement SET title = ?, amount = ?, date = ? WHERE id = ?",
    [title, amount, date, id]
  );
}

// DELETE
export async function deleteSettlement(db: any, id: number) {
  await db.runAsync("DELETE FROM settlement WHERE id = ?", [id]);
}

// DELETE ALL (선택)
export async function clearSettlement(db: any) {
  await db.runAsync("DELETE FROM settlement");
}
