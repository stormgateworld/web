
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const email = body.email;

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
