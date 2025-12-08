// services/settlement.ts
export async function initScheduleDB(db: any) {
  // await db.execAsync(`drop table Schedule`)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        memo TEXT,
        startDate TEXT,
        endDate TEXT,
        nights INTEGER,
        days INTEGER,
        peopleCount INTEGER,
        created_at date,
        updated_At date

    );
  `);

   await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Trip_Schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tripId TEXT,
        day INTEGER,
        date TEXT,
        orderNo INTEGER,
        title TEXT,
        placeId TEXT,
        memo TEXT,
        created_at date, 
        updated_at date
      );
    `);
}


// INSERT
export async function insertSchedule(
  db: any,
  title: string,
  memo: string,
  startDate: string,
  endDate: string,
  days:string,
  nights:string,  
  peopleCount:string,
) {
  const createdAt = new Date().toISOString();
  const result = await db.runAsync(
    "INSERT INTO Schedule (title, memo, startDate, endDate , nights , days , peopleCount , created_at , updated_at ) VALUES (?, ?, ?, ?,?,?,?, ?, ?)",
    [title, memo, startDate, endDate,  nights , days , peopleCount  , createdAt , createdAt]
  );
  return result;
}

// INSERT
export async function insertTripSchedule(
  db: any,
  tripId: string,
  day:string,
  date: string,
  orderNo: string,
  title: string,
  placeId: string,
  memo: string
) {

  const createdAt = new Date().toISOString();
  await db.runAsync(
    `  INSERT INTO Trip_Schedule 
          (tripId, day, date, orderNo, title, placeId, memo , created_at , updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?)
    `,
     [
        tripId,
        day,
        date,
        orderNo,
        title,
        placeId,
        memo,
        createdAt,
        createdAt,
      ]
  );
}



// SELECT ALL
export async function getScheduleRows(db: any) {
  return await db.getAllAsync("SELECT * FROM Schedule ORDER BY id DESC");
}


// SELECT ALL
export async function getScheduleRowId(db: any , id:string) {
  return await db.getFirstAsync("SELECT * FROM Schedule where id = ? ",[id]);
}


// SELECT ALL
export async function getTripScheduleRowId(db: any , tripId:string) {
  return await db.getAllAsync("SELECT * FROM Trip_Schedule where tripId = ? ",[tripId]);
}

// SELECT ALL
export async function deleteTripSchedule(db: any , tripId:string) {
  return await db.runAsync("DELETE FROM Trip_Schedule WHERE tripId = ?", [tripId]);
}



// UPDATE
export async function updateSchedule(
  db: any,
  id: number,
  title: string,
  amount: number,
  date: string
) {
  await db.runAsync(
    "UPDATE Schedule SET title = ?, amount = ?, date = ? WHERE id = ?",
    [title, amount, date, id]
  );
}

// DELETE
export async function deleteSchedule(db: any, id: number) {
  await db.runAsync("DELETE FROM Schedule WHERE id = ?", [id]);
}

// DELETE ALL (선택)
export async function clearSchedule(db: any) {
  await db.runAsync("DELETE FROM Schedule");
}
