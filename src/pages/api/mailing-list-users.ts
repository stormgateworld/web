export const prerender = false;

import type { APIRoute } from "astro";
import { drizzle } from "drizzle-orm/d1";

import type { NewMailingListUser } from "../../models";
import { mailingListUsers } from "../../../db/schema";
import { getDatabase } from "../../db";
import { fetchUsers } from "../../services/foo_service";

export const client = (database: any) => drizzle(database);

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const email = body.email;

    const newUser: NewMailingListUser = {
      email,
      createdAt: new Date(),
    };

    const db = await getDatabase(request);
    await db.insert(mailingListUsers).values(newUser).returning().get();

    return new Response(
      JSON.stringify({
        message: "Email: " + email,
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
};

export const get: APIRoute = async ({ request }) => {
  const users = await fetchUsers(request);

  return new Response(
    JSON.stringify({
      users,
    }),
    {
      status: 200,
    }
  );
};

export const put: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "foo",
    }),
    {
      status: 200,
    }
  );
};
