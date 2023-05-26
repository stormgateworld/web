import { getDatabase } from "../db";
import { mailingListUsers } from "../../db/schema";


export async function fetchUsers(request: Request) {
  const db = await getDatabase(request)
  console.log(db)
  const users = await db.select().from(mailingListUsers).all()
  return users
}
