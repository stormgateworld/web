import { getDatabase } from "../db";
import { mailingListUsers } from "../../db/schema";


export async function fetchUsers(request: Request) {
  const db = await getDatabase(request)
  const users = db.select().from(mailingListUsers).all()
  return users
}
