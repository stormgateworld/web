import type { InferModel } from "drizzle-orm";

import type { mailingListUsers } from "../db/schema";

export type MailingListUser = InferModel<typeof mailingListUsers>;
export type NewMailingListUser = InferModel<typeof mailingListUsers, "insert">;
