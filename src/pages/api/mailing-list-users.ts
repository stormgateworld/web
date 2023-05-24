export const prerender = false;

import type { APIRoute } from 'astro';
import { drizzle } from "drizzle-orm/d1";
import { getRuntime } from "@astrojs/cloudflare/runtime";

import type { NewMailingListUser } from '../../models'
import { mailingListUsers } from '../../../db/schema';

export const client = (database: any) => drizzle(database);

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const email = body.email;

    const newUser: NewMailingListUser = {
      email,
      createdAt: new Date(),
    };

    const runtime = getRuntime(request) as any;
    console.log(runtime.env.DB)
    const db = drizzle(runtime.env.DB)

    // await db.insert(mailingListUsers).values(newUser).run()
    await db.insert(mailingListUsers).values(newUser).returning().get()

    return new Response(JSON.stringify({
      message: "Email: " + email
    }), {
      status: 200
    })
  }
  return new Response(null, { status: 400 });
}

export const put: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({
    message: "foo"
  }), {
    status: 200
  })
}
