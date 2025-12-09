// services/settlement.ts
export async function initSettlementDB(db: any) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS group_settlement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      members INTEGER,
      complete integer,
      need integer,
      total integer,
      days text,
      created_at date,
      updated_at date
    );
  `);
  // await db.execAsync(`drop table settlement;`)
  await db.execAsync(`
    
    CREATE TABLE IF NOT EXISTS settlement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category Text,
      title TEXT,
      memo TEXT,
      pay TEXT,
      per TEXT,
      complate text,
      compare_Shop text,
      group_id INTEGER,
      created_at date,
      updated_at date
    );
  `);
}


// INSERT
export async function insertGroupSettlement(
  db: any,
  title: string,
  members: number,
  complete: number,
  need: number,
  total: number,
  days:string,
) {
  const createdAt = new Date().toISOString();

  return await db.runAsync(
    "INSERT INTO group_settlement (title, members, complete, need, total, days,created_at , updated_at) VALUES (?, ?, ?, ?,?, ?, ?, ?)",
    [title, members, complete, need ,total ,days ,createdAt ,createdAt ]
  );
}

// INSERT
export async function insertSettlement(
  db: any,
  category: string,
  title: string,
  memo: string,
  pay: string,
  per: string,
  compare_Shop: string,
  group_id: number
) {
  const createdAt = new Date().toISOString();
  console.log('insertData ',group_id )
  await db.runAsync(
    "INSERT INTO settlement (category, title, memo, pay, per ,compare_Shop , group_id, created_at , updated_at) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)",
    [category, title, memo, pay, per,  compare_Shop , group_id , createdAt,createdAt]
  );
}



// SELECT ALL
export async function getSettlementGroupRows(db: any) {
  return await db.getAllAsync("SELECT * FROM group_settlement order by id desc");
}

// SELECT ALL
export async function getSettlementGroup(db: any, id:string) {
  return await db.getFirstAsync("SELECT * FROM group_settlement where id =?",[id]);
}

// SELECT ALL
export async function getSettlementRows(db: any) {
  return await db.getAllAsync("SELECT * FROM settlement ORDER BY id DESC");
}

// SELECT ALL
export async function getSettlementRowAndGroupId(db: any , group_id :string) {
  return await db.getAllAsync("SELECT * FROM settlement where  group_id = ?" , [group_id]);
}

// SELECT ALL
export async function getSettlementRow(db: any , id :string) {
  return await db.getFirstAsync("SELECT * FROM settlement where  id = ?" , [id]);
}



// UPDATE
export async function updateSettlement(
  db: any,
  category:string,
  title: string,
  memo: string,
  pay: number,
  per: number,
  compare_Shop: string,
  id: number,
) {
  await db.runAsync(
    "UPDATE settlement SET category = ?, title = ?, memo = ? , pay = ? , per = ? , compare_Shop = ?  WHERE id = ?",
    [ category, title, memo, pay, per ,compare_Shop,id ]
  );
}


// UPDATE
export async function updateSettlementComplate(
  db: any,
  id: number,
) {
  await db.runAsync(
    "UPDATE settlement SET COMPLATE = 'true'  WHERE id = ?",
    [ id ]
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
